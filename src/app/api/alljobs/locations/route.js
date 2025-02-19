export async function GET() {
  const jobLocations = ["Bangladesh", "India", "Russia", "United States", "Australia", "Canada", "Japan", "Singapore", "Germany"];
  return Response.json(jobLocations, { status: 200 });
}
