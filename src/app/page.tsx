"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("auth");
    if (isAuth) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <p>Loading...</p>;
}
