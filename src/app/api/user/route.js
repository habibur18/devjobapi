import { UserModel } from "@/models/user-create";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectMongo from "../../../../connectMongo";

export async function GET() {
  await connectMongo();
  const users = await UserModel.find().select("-password"); // Exclude password
  return NextResponse.json(users);
}

export async function POST(req) {
  await connectMongo();
  const { name, email, password } = await req.json();

  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Create new user
  const newUser = new UserModel({ name, email, password });

  // Generate tokens
  newUser.generateTokens();

  // Save user
  await newUser.save();

  return NextResponse.json({
    message: "User registered successfully",
    // also send id
    userId: newUser._id,
    accessToken: newUser.accessToken,
    refreshToken: newUser.refreshToken,
  });
}

// login

export async function PUT(req) {
  await connectMongo();
  const { email, password } = await req.json();

  const user = await UserModel.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Generate tokens
  user.generateTokens();

  // Save user
  await user.save();

  return NextResponse.json({
    message: "User logged in successfully",
    // also send id
    userId: user._id,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  });
}
