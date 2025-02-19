import JobModel from "@/models/jobs-model";
import connectMongo from "../../../../connectMongo";

// GET http://localhost:3000/api/alljobs?q=software&fullTime=true&location=Canada
export async function GET(request) {
  await connectMongo();

  // Extract query parameters from the URL
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") || "";
  const fullTime = url.searchParams.get("fullTime") === "true";
  const location = url.searchParams.get("location") || "";

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
    // Fetch filtered jobs from the database
    const jobs = await JobModel.find(filter);

    // Return the filtered jobs as a response
    return Response.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response("Failed to fetch jobs", { status: 500 });
  }
}
