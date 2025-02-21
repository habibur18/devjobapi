import JobModel from "@/models/jobs-model";
import mongoose from "mongoose";
import connectMongo from "../../../../../connectMongo";

export async function GET(request, context) {
  try {
    await connectMongo();
    const { id } = await context.params;

    // Check if the ID is valid (MongoDB ObjectId validation)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid job ID" }, { status: 400 });
    }

    // Find the job by ID
    const job = await JobModel.findById(id);
    if (!job) {
      return Response.json({ message: "Job not found" }, { status: 404 });
    }

    return Response.json(job, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
