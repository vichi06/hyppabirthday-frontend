// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password).then(() => router.push("/dashboard"));
    } catch (error: unknown) {
      setLoading(false);
      // Use error handling with a better type than `any`
      if (error instanceof Error) {
        setError(error.message || "Login failed");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <div className="flex-1 p-14">
        {loading ? (
          <p className="text-center">Chargement</p>
        ) : (
          <div>
            <h1>Reviens vers nous!</h1>
            <small>
              Peu de données vous sont demandées. On s{"'"}en cogne légèrement
              de qui vous êtes...
            </small>

            <form onSubmit={handleSubmit}>
              {error && <p>{error}</p>}
              <div className="my-2">
                <label className="block">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-3 py-1.5 text-sm w-full"
                />
              </div>
              <div className="my-2">
                <label className="block">
                  Mot de passe <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-300 rounded-md px-3 py-1.5 text-sm w-full"
                />
              </div>
              <div className="flex justify-between my-2">
                <div>
                  <input type="checkbox" />
                  <p className="inline pl-1">Ne m{"'"}oublies pas</p>
                </div>
                <div>
                  <a className="text-bblue">Mémoire courte ?</a>
                </div>
              </div>
              <button
                type="submit"
                className="bg-bblue text-white rounded-md py-3 w-full font-bold shadow-xl border-2 border-bblue transition hover:bg-white hover:text-bblue hover:border-2 hover:border-bblue"
              >
                Allons-y !
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="flex-1 bg-sand"></div>
    </div>
  );
}
