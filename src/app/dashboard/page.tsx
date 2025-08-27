"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("auth"); // ✅ sessionStorage use karo
    if (!isAuth) {
      router.push("/login"); // 👉 login page par redirect
    }
  }, [router]);

  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl">Welcome to Dashboard</h1>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          sessionStorage.removeItem("auth"); // ✅ logout thi session clear
          router.push("/login");
        }}
      >
        Logout
      </button>
      <div>
      <Link href="/student/add">
        <Button type="primary">Add Student</Button>
      </Link>
    </div>
    </div>
    </>
  );
}
