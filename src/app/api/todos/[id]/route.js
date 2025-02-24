import { TodoModel } from "@/models/Todo-model";
import { NextResponse } from "next/server";
import connectMongo from "../../../../../connectMongo";

export async function DELETE(reqest, { params }) {
  await connectMongo();
  const { id } = await params;
  const todo = await TodoModel.findByIdAndDelete(id);
  return NextResponse.json(todo);
}
