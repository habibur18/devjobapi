import { TodoModel } from "@/models/Todo-model";
import { NextResponse } from "next/server";
import connectMongo from "../../../../connectMongo";

export async function GET() {
  await connectMongo();
  const todos = await TodoModel.find();
  return NextResponse.json(todos);
}

export async function POST(reqest) {
  await connectMongo();
  //   await 3 seconds to simulate a slow response
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { title } = await reqest.json();
  const todo = await TodoModel.create({ title });
  return NextResponse.json(todo);
}
