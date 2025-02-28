import { NextResponse } from "next/server";
import connectMongo from "../../../../../connectMongo";

export async function GET(req, context) {
  await connectMongo();
  const { id } = await context.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
