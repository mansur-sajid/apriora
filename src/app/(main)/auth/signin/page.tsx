"use client"

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
        <p className="text-gray-600 mb-6">Sign in to continue</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
