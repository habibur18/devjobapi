import connectMongo from "../../../connectMongo";

export async function GET() {
  await connectMongo();
  return new Response("Hello, Next.js!");
}
