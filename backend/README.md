# AI-Government-Job-Finder
AI-powered Government Job Finder built with React, TypeScript, Flask, and web scraping. Search real-time Sarkari jobs by category like teacher, railway, police, medical, engineering, banking, and defence with detailed eligibility, fees, vacancies, and dates.

# AI Government Job Finder

AI-powered Government Job Finder built using:

- React
- TypeScript
- Flask
- Python
- BeautifulSoup
- Vite

Search real-time government jobs from Sarkari Result by category:

- Teacher
- Railway
- Police
- Engineer
- Medical
- Banking
- Defence

---

# Features

- Real-time Sarkari job search
- Modern React UI
- Flask backend API
- Responsive job cards
- Eligibility details
- Application fees
- Opening & closing dates
- Vacancy information
- Salary details

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Axios

## Backend
- Flask
- BeautifulSoup
- Requests

---

# Project Structure

```bash
govt-job-finder/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── services/
│
├── backend/
│   ├── app.py
│   ├── scraper.py
│   └── requirements.txt
```

---

# Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Run Backend

```bash
cd backend
uv run app.py
```

Backend runs on:

```txt
http://127.0.0.1:5000
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Endpoint

```txt
GET /search-jobs?keyword=teacher
```

Example:

```txt
http://127.0.0.1:5000/search-jobs?keyword=railway
```

---

# Deployment

## Frontend
Deploy on Vercel

## Backend
Deploy on Render

---

# Screenshots

Add your project screenshots here.

---

# Author

Shashant Chaudhary
