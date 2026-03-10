'use client'

import { handleSignUp } from "@/actions/authActions";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-2">Create an account</h1>
      <p className="text-gray-500 mb-8">Join Lynkerr to share your travel stories.</p>

      <form action={async (formData) => {
        setLoading(true);
        await handleSignUp(formData);
        setLoading(false);
      }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input name="displayName" type="text" placeholder="John Doe" required 
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" placeholder="john@example.com" required 
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="password" type="password" placeholder="••••••••" required 
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        
        <button disabled={loading} type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account? <Link href="/login" className="text-blue-600 font-bold">Login</Link>
      </p>
    </div>
  );
}