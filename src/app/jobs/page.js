"use client";

import { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit can be set here
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0); // Track the total number of jobs available

  const fetchJobs = async (page, limit) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      //   query.append("q", "software");
      //   query.append("fullTime", "true");
      //   query.append("location", "Canada");

      if (limit) query.append("limit", limit); // Add limit if specified
      if (page) query.append("page", page); // Add page if specified

      const response = await fetch(`/api/alljobs?${query.toString()}`);
      const data = await response.json();

      // Update jobs by appending new data
      setJobs((prevJobs) => {
        // Append new jobs to the existing ones
        return [...prevJobs, ...data.jobs];
      });

      // Store the total number of jobs from the backend
      setTotalJobs(data.totalJobs);
      // Check if there are more jobs to load based on the total count
      const loadedJobs = jobs.length + data.jobs.length; // Add length of previous and new jobs
      setHasMore(loadedJobs < data.totalJobs); // More jobs are available if loaded jobs are less than total jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs when the component mounts or when page or limit changes
  useEffect(() => {
    fetchJobs(page, limit);
  }, [page, limit]);

  const loadMore = () => {
    if (hasMore) {
      // Increment page to fetch more jobs
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Optional: If you want to allow users to change the number of jobs per page (limit)
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
    setJobs([]);
  };

  return (
    <div>
      {/* Limit selector */}
      count: {jobs.length} and has more {hasMore ? "yes" : "no"} and total jobs: {totalJobs}
      <div>
        <label htmlFor="limit">Jobs per page:</label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      {/* Job list */}
      <ul>
        {jobs.map((job) => (
          <li key={job._id} className="border border-gray-300 p-4">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {/* Load more button */}
      {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default JobList;
