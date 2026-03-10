'use client'

import { handleLogin } from "@/actions/authActions";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
      <p className="text-gray-500 mb-8">Log in to manage your listings.</p>

      <form action={async (formData) => {
        setLoading(true);
        await handleLogin(formData);
        setLoading(false);
      }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" required 
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="password" type="password" required 
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        
        <button disabled={loading} type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        New to Lynkerr? <Link href="/signup" className="text-blue-600 font-bold">Create account</Link>
      </p>
    </div>
  );
}