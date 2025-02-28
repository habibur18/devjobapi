"use client";
import { useEffect, useOptimistic, useState, useTransition } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (todo, newTodo) => [...todo, newTodo]);
  const [isPending, starTransition] = useTransition();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    const optimisticTodo = { _id: Date.now(), title: todo };
    starTransition(() => {
      setOptimisticTodos((prev) => [...prev, optimisticTodo]);
    });
    const url = "https://devjobapi.vercel.app/api/todos";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todo }),
    });
    const data = await res.json();
    setTodos((prev) => [...prev, data]);
  };
  const fetchData = async () => {
    const url = "https://devjobapi.vercel.app/api/todos";
    const res = await fetch(url);
    const data = await res.json();
    setTodos(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Todo</label>
        <input type="text" name="todo" id="todo" className="border p-2" />
      </form>
      <div>
        <ul>
          {optimisticTodos.map((todo) => (
            <li key={todo._id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
