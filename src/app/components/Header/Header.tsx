// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-oorange text-white p-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">hyppabirthday</h1>
        </Link>
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
              className="bg-white text-oorange px-4 py-2 transition rounded-3xl hover:bg-oorange hover:text-white"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
