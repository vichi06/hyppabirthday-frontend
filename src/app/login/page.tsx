// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import AuthentificationWrapper from "../components/AuthentificationWrapper";

import ForgotPassword from "../components/ForgotPassword";
import SpecialInput from "../components/SpecialInput/SpecialInput";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

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
    <AuthentificationWrapper>
      {loading ? (
        <p>Chargement</p>
      ) : (
        <div>
          {showForgotPassword ? (
            <ForgotPassword onClose={() => setShowForgotPassword(false)} />
          ) : (
            <form onSubmit={handleSubmit} autoComplete="on" method="POST">
              <h1>De retour par minou !</h1>
              <p>Qui êtes-vous au juste?</p>
              {error && <p>{error}</p>}
              <div className="mt-14 mb-2 flex flex-col gap-5">
                <SpecialInput
                  value={email}
                  setValue={setEmail}
                  type="email"
                  label="Email"
                  autoComplete="email"
                  autofocus
                />
                <SpecialInput
                  value={password}
                  setValue={setPassword}
                  type="password"
                  label="Mot de passe"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex justify-end">
                <p
                  onClick={() => setShowForgotPassword(true)}
                  className="cursor-pointer text-sm hover:underline mb-5"
                >
                  T{"'"}as la mémoire courte ?
                </p>
              </div>
              <button
                type="submit"
                className="group bg-bblue text-white rounded-xl py-3 w-full shadow-xl border border-bblue transition hover:bg-white hover:text-bblue hover:border-bblue"
              >
                Se connecter
              </button>
            </form>
          )}
        </div>
      )}
    </AuthentificationWrapper>
  );
}
