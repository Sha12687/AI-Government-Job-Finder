from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
import os
from openai import OpenAI

app = Flask(__name__)

CORS(app)

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

headers = {
    "User-Agent": "Mozilla/5.0"
}


def fetch_sarkari_result_links():

    url = "https://www.sarkariresult.com/"

    response = requests.get(
        url,
        headers=headers
    )

    soup = BeautifulSoup(
        response.content,
        "html.parser"
    )

    return soup


def search_jobs(keyword):

    soup = fetch_sarkari_result_links()

    jobs = []

    seen_links = set()

    category_keywords = {

        "teacher": [
            "teacher",
            "tgt",
            "pgt",
            "lecturer",
            "faculty",
            "professor"
        ],

        "railway": [
            "railway",
            "rrb"
        ],

        "police": [
            "police",
            "constable",
            "si"
        ],

        "engineer": [
            "engineer",
            "developer",
            "software"
        ],

        "medical": [
            "medical",
            "nurse",
            "doctor"
        ]
    }

    skip_words = [
        "result",
        "answer key",
        "admit card",
        "syllabus",
        "exam date"
    ]

    required_words = [
        "online form",
        "recruitment",
        "vacancy",
        "bharti",
        "apply online",
        "notification"
    ]

    for link in soup.find_all("a"):

        title = link.get_text(strip=True)
        href = link.get("href")

        if not title or not href:
            continue

        if href.endswith(".pdf"):
            continue

        if href.startswith("/"):
            href = (
                "https://www.sarkariresult.com"
                + href
            )

        title_lower = title.lower()

        if not any(
            word in title_lower
            for word in required_words
        ):
            continue

        if any(
            word in title_lower
            for word in skip_words
        ):
            continue

        if keyword.lower() in category_keywords:

            if not any(
                word in title_lower
                for word in category_keywords[keyword.lower()]
            ):
                continue

        else:

            if keyword.lower() not in title_lower:
                continue

        if href in seen_links:
            continue

        seen_links.add(href)

        jobs.append({
            "title": title,
            "link": href
        })

    return jobs


def fetch_job_content(url):

    try:

        response = requests.get(
            url,
            headers=headers,
            verify=False,
            timeout=30
        )

        soup = BeautifulSoup(
            response.content,
            "html.parser"
        )

        return soup.get_text(
            separator=" ",
            strip=True
        )[:12000]

    except:
        return ""


system_prompt = """
Extract:

1. Job Title
2. Total Vacancies
3. Opening Date
4. Closing Date
5. Apply Link
6. Eligibility
7. Education Qualification
8. Age Limit
9. Application Fees
10. Salary

Return JSON only.
"""


def extract_job_details(content):

    response = client.chat.completions.create(

        model="gpt-4.1-mini",

        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": content
            }
        ],

        temperature=0
    )

    return response.choices[0].message.content


@app.route("/search-jobs", methods=["GET"])
def get_jobs():

    keyword = request.args.get("keyword")

    results = search_jobs(keyword)

    final_jobs = []

    for job in results[:5]:

        content = fetch_job_content(
            job["link"]
        )

        details = extract_job_details(
            content
        )

        final_jobs.append({
            "title": job["title"],
            "link": job["link"],
            "details": details
        })

    return jsonify(final_jobs)


if __name__ == "__main__":
 app.run(host="0.0.0.0", port=10000)
 app.run(debug=True)