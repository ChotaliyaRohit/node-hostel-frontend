"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("auth", "true");
        router.push("/dashboard");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-600 to-indigo-900 relative overflow-hidden">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {/* Username */}
        <div className="flex items-center bg-white/20 rounded-full mb-4 px-4 py-2">
          <FaUser className="mr-2 text-white/70" />
          <input
            type="email"
            placeholder="Username"
            className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-white/20 rounded-full mb-4 px-4 py-2">
          <FaLock className="mr-2 text-white/70" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-purple-500" /> Remember me
          </label>
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-white text-purple-600 font-semibold w-full py-2 rounded-full hover:bg-purple-200 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p className="mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="font-bold underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
