"use client";
// "use client";
// import { useEffect, useState } from "react";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(5); // Default limit can be set here
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const fetchJobs = async (page, limit) => {
//     setLoading(true);
//     try {
//       const query = new URLSearchParams();
//       //   query.append("q", "front-end");
//       //   query.append("fullTime", "true");
//       //   query.append("location", "Canada");

//       if (limit) query.append("limit", limit); // Add limit if specified
//       if (page) query.append("page", page); // Add page if specified
//       console.log(query);
//       const response = await fetch(`/api/alljobs?${query.toString()}`);
//       const data = await response.json();
//       console.log(data);
//       setJobs((prevJobs) => [...prevJobs, ...data.jobs]); // Append new jobs to the existing ones
//       setTotalJobs(data.totalJobs); // Store the total number of jobs from the backendavailable
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs(page, limit); // Fetch jobs when the component mounts or when page or limit changes
//   }, [page, limit]);

//   const loadMore = () => {
//     if (hasMore) {
//       setPage((prevPage) => prevPage + 1); // Increment page to fetch more jobs
//     }
//   };

//   // Optional: If you want to allow users to change the number of jobs per page (limit)
//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value)); // Change the limit based on user selection
//     setPage(1); // Reset to page 1 when the limit changes
//     setJobs([]); // Clear existing jobs before fetching new ones
//   };

//   return (
//     <div>
//       {/* Limit selector */}
//       <div>
//         count {jobs.length} and has more {hasMore ? "yes" : "no"}
//         <label htmlFor="limit">Jobs per page:</label>
//         <select id="limit" value={limit} onChange={handleLimitChange}>
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//         </select>
//       </div>

//       {/* Job list */}
//       <ul>
//         {jobs.map((job) => (
//           <li key={job._id} className="border border-gray-300 p-4">
//             <h3>{job.title}</h3>
//             <p>{job.company}</p>
//             <p>{job.location}</p>
//           </li>
//         ))}
//       </ul>

//       {loading && <p>Loading...</p>}

//       {/* Load more button */}
//       {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
//     </div>
//   );
// };

// export default JobList;

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
        return [...prevJobs, ...data.jobs]; // Append new jobs to the existing ones
      });

      setTotalJobs(data.totalJobs); // Store the total number of jobs from the backend

      // Check if there are more jobs to load based on the total count
      const loadedJobs = jobs.length + data.jobs.length; // Add length of previous and new jobs
      setHasMore(loadedJobs < data.totalJobs); // More jobs are available if loaded jobs are less than total jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page, limit); // Fetch jobs when the component mounts or when page or limit changes
  }, [page, limit]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page to fetch more jobs
    }
  };

  // Optional: If you want to allow users to change the number of jobs per page (limit)
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value)); // Change the limit based on user selection
    setPage(1); // Reset to page 1 when the limit changes
    setJobs([]); // Clear existing jobs before fetching new ones
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
