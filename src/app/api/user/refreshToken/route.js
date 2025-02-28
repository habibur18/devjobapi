import { UserModel } from "@/models/user-create";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectMongo from "../../../../../connectMongo";
import { generateTokens } from "../../../../../utils/generateTokens";

export async function POST(req) {
  await connectMongo();

  // Get userId and refreshToken from request body
  const { userId, refreshToken } = await req.json();

  if (!userId || !refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if decoded token userId matches the one from frontend
    if (decoded.userId !== userId) {
      return NextResponse.json({ error: "Invalid token or user mismatch" }, { status: 403 });
    }

    // Find user in DB
    const user = await UserModel.findById(userId);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
    }

    // Generate new accessToken & refreshToken
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    // Update both tokens in the DB
    user.accessToken = accessToken;
    user.refreshToken = newRefreshToken;
    await user.save();

    return NextResponse.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log("Error verifying refresh token:", error);
    return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 403 });
  }
}
