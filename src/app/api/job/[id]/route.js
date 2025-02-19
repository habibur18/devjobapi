import JobModel from "@/models/jobs-model";
import connectMongo from "../../../../../connectMongo";

export async function GET(request, context) {
  await connectMongo();
  const id = context.params.id;
  console.log(id);
  const job = await JobModel.findById(id);
  return Response.json(job, { status: 200 });
}
