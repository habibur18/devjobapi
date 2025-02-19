// import JobModel from "@/models/jobs-model";
// import connectMongo from "../../../../connectMongo";

// // GET http://localhost:3000/api/alljobs?q=software&fullTime=true&location=Canada
// export async function GET(request) {
//   await connectMongo();

//   // Extract query parameters from the URL
//   const url = new URL(request.url);
//   const searchQuery = url.searchParams.get("q") || "";
//   const fullTime = url.searchParams.get("fullTime") === "true";
//   const location = url.searchParams.get("location") || "";

//   // Build filter object based on query params
//   const filter = {};

//   // Title or Company name filter
//   if (searchQuery) {
//     filter.$or = [
//       { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search
//       { company: { $regex: searchQuery, $options: "i" } },
//     ];
//   }

//   // Full Time filter
//   if (fullTime) {
//     filter.type = "Full Time";
//   }

//   // Location filter
//   if (location) {
//     filter.location = { $regex: location, $options: "i" }; // Case-insensitive search
//   }

//   try {
//     // Fetch filtered jobs from the database
//     const jobs = await JobModel.find(filter);

//     // Return the filtered jobs as a response
//     return Response.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return new Response("Failed to fetch jobs", { status: 500 });
//   }
// }

// import JobModel from "@/models/jobs-model";
// import connectMongo from "../../../../connectMongo";

// // GET http://localhost:3000/api/alljobs?q=software&fullTime=true&location=Canada&page=1
// export async function GET(request) {
//   await connectMongo();

//   // Extract query parameters from the URL
//   const url = new URL(request.url);
//   const searchQuery = url.searchParams.get("q") || "";
//   const fullTime = url.searchParams.get("fullTime") === "true";
//   const location = url.searchParams.get("location") || "";
//   const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1 if no page param is provided
//   const limit = parseInt(url.searchParams.get("limit")) || 5;

//   // Build filter object based on query params
//   const filter = {};

//   // Title or Company name filter
//   if (searchQuery) {
//     filter.$or = [
//       { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search
//       { company: { $regex: searchQuery, $options: "i" } },
//     ];
//   }

//   // Full Time filter
//   if (fullTime) {
//     filter.type = "Full Time";
//   }

//   // Location filter
//   if (location) {
//     filter.location = { $regex: location, $options: "i" }; // Case-insensitive search
//   }

//   try {
//     // Fetch filtered jobs from the database with pagination
//     const jobs = await JobModel.find(filter)
//       .skip((page - 1) * limit) // Skip the jobs based on the current page
//       .limit(limit); // Limit the number of results per page

//     // Count the total number of jobs matching the filter to determine if there are more pages
//     const totalJobs = await JobModel.countDocuments(filter);

//     // Return the filtered jobs as a response along with pagination info
//     return Response.json({ jobs, totalJobs }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return new Response("Failed to fetch jobs", { status: 500 });
//   }
// }

import JobModel from "@/models/jobs-model";
import connectMongo from "../../../../connectMongo";

// GET http://localhost:3000/api/alljobs?q=software&fullTime=true&location=Canada&page=1&limit=5
export async function GET(request) {
  await connectMongo();

  // Extract query parameters from the URL
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") || "";
  const fullTime = url.searchParams.get("fullTime") === "true";
  const location = url.searchParams.get("location") || "";
  const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1 if no page param is provided
  const limit = parseInt(url.searchParams.get("limit")); // limit is optional

  // Build filter object based on query params
  const filter = {};

  // Title or Company name filter
  if (searchQuery) {
    filter.$or = [
      { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search
      { company: { $regex: searchQuery, $options: "i" } },
    ];
  }

  // Full Time filter
  if (fullTime) {
    filter.type = "Full Time";
  }

  // Location filter
  if (location) {
    filter.location = { $regex: location, $options: "i" }; // Case-insensitive search
  }

  try {
    let jobs;

    if (limit && page) {
      // If both limit and page are provided, paginate
      jobs = await JobModel.find(filter)
        .skip((page - 1) * limit) // Skip the jobs based on the current page
        .limit(limit); // Limit the number of results per page
    } else {
      // If no limit or page, fetch all data
      jobs = await JobModel.find(filter);
    }

    // Count the total number of jobs matching the filter to determine if there are more pages
    const totalJobs = await JobModel.countDocuments(filter);

    // Return the filtered jobs as a response along with pagination info
    return Response.json({ jobs, totalJobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response("Failed to fetch jobs", { status: 500 });
  }
}
