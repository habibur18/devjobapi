import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../../utils/verifyToken";

export const GET = async (req, context) => {
  const { id } = await context.params; // Extract userId from URL
  const accessToken = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from "Bearer token"

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify Token
  const decoded = verifyToken(accessToken);
  console.log(decoded);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  // Check if the token userId matches the requested id
  if (decoded.userId !== id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // Return hardcoded posts if authenticated
  const posts = [
    { id: 1, title: "Private Post 1", content: "This is a secret post." },
    { id: 2, title: "Private Post 2", content: "You unlocked a hidden post!" },
  ];

  return NextResponse.json({ posts }, { status: 200 });
};
