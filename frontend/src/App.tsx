import { useState } from "react";

import api from "./services/api";

import SearchBar from "./components/SearchBar";

import JobCard from "./components/JobCard";

function App() {

  const [keyword, setKeyword] = useState("");

  const [jobs, setJobs] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const searchJobs = async () => {

    if (!keyword) return;

    setLoading(true);

    setError("");

    setJobs([]);

    try {

      const response = await api.get(
        `/search-jobs?keyword=${keyword}`
      );

      console.log(
        "API Response:",
        response.data
      );

      if (Array.isArray(response.data)) {

        setJobs(response.data);

      } else {

        setError("Invalid API response");
      }

    } catch (error) {

      console.log(error);

      setError(
        "Failed to fetch jobs"
      );
    }

    setLoading(false);
  };

  return (

    <div
    style={{
  padding: "40px 20px",
  maxWidth: "none",

  fontFamily: "Arial",
  backgroundColor: "#f3f4f6",
  minHeight: "100vh"
}}
    >

      <h1
  style={{
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "48px",
    color: "#111827"
  }}
>
  AI Government Job Finder
</h1>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        searchJobs={searchJobs}
      />

      {
        
  loading && (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px"
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #ddd",
          borderTop: "5px solid #2563eb",
          borderRadius: "50%",
          margin: "0 auto",
          animation: "spin 1s linear infinite"
        }}
      />

      <h2
        style={{
          marginTop: "20px",
          color: "#374151"
        }}
      >
        Fetching latest government jobs...
      </h2>
    </div>
  )
}
      

      {
        error &&
        <h2
          style={{
            color: "red"
          }}
        >
          {error}
        </h2>
      }

      {
        jobs.length === 0 &&
        !loading &&
        !error &&
        (
          <p>
            No jobs found
          </p>
        )
      }

      {
        jobs.map((job, index) => {

          if (!job) return null;

          return (

            <JobCard
              key={index}
              job={job}
            />
          );
        })
      }

    </div>
  );
}

export default App;