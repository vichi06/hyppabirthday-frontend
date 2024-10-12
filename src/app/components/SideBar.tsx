"use client"; // Ensure it's a client-side component

import { useAuth } from "../context/AuthContext"; // Ensure correct path
import Link from "next/link";

export default function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) return null; // Only show sidebar when logged in

  return (
    <div className="h-screen w-64 bg-oorange text-white flex flex-col items-start py-6 px-4 float-left">
      <h2 className="text-2xl font-bold mb-6">hyppabirthday</h2>

      {/* Dashboard Button */}
      <Link
        href="/dashboard"
        className="text-oorange font-bold bg-white px-4 py-2 rounded w-full text-center"
      >
        Tableau de bord
      </Link>
      <hr className="border-t-2 border-white w-full my-2" />
      {/* Logout Button */}
      <button
        onClick={logout}
        className="px-4 py-2 rounded w-full text-center"
      >
        Se déconnecter
      </button>
    </div>
  );
}
