// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-oorange text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">hyppabirthday</h1>
        <nav>
          {!user ? (
            <>
              <Link href="/register" className="link">
                {"s'inscrire"}
              </Link>
              <Link href="/login" className="link">
                se connecter
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
