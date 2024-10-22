"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthentificationWrapper from "../components/AuthentificationWrapper";
import SpecialInput from "../components/SpecialInput/SpecialInput";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      setError("Token est invalide ou même pas présent en fait.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (password !== confirmPassword) {
      setError("Tu sais pas copier-coller? Les deux mots de passe sont différents");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            passwordConfirmation: confirmPassword,
            token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Modification de mot de passe échouée");
      }

      setMessage("Mot de passe modifié avec succès !");
      setLoading(false);

      router.push("/login");
    } catch (err: unknown) {
      console.log(err || "An unknown error occurred.");
      setLoading(false);
    }
  };

  return (
    <AuthentificationWrapper>
      <h1>Modifier son mot de passe</h1>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      {!message && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
          <SpecialInput
            type="password"
            label="Nouveau mot de passe"
            value={password}
            setValue={setPassword}
            autofocus
          />
          <SpecialInput
            type="password"
            label="Confirme le mot de passe"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <button
            type="submit"
            disabled={loading}
            className="group bg-bblue text-white rounded-xl py-3 w-full shadow-xl border border-bblue transition hover:bg-white hover:text-bblue hover:border-bblue"
          >
            {loading ? "ça modifie..." : "Modifier le mot de passe"}
          </button>
        </form>
      )}
    </AuthentificationWrapper>
  );
};

export default ResetPassword;
