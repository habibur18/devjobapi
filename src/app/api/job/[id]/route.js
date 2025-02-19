import JobModel from "@/models/jobs-model";
import connectMongo from "../../../../../connectMongo";

export async function GET(request, context) {
  await connectMongo();
  const id = context.params.id;
  console.log(id);
  // Find the job by ID
  const isJob = await JobModel.findById(id);
  if (!isJob) {
    return Response.json({ message: "Job not found" }, { status: 404 });
  }
  const job = await JobModel.findById(id);
  return Response.json(job, { status: 200 });
}
