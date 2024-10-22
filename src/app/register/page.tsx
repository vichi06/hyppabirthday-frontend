// app/register/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

// Components
import AuthentificationWrapper from "../components/AuthentificationWrapper";
import SpecialInput from "../components/SpecialInput/SpecialInput";

export default function RegisterPage() {
  const [birthdayName, setBirthdayName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [birthdate, setBirthdate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { user, register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(username, email, password, {
        name: birthdayName,
        birthdate: birthdate,
      }).then(() => setLoading(false));
      router.push("/dashboard");
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message || "Registration failed");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // Adjust the input width based on its content
  useEffect(() => {
    if (inputRef.current) {
      // Create a temporary span to measure the width of the input text
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.fontSize = getComputedStyle(inputRef.current).fontSize;
      tempSpan.style.fontFamily = getComputedStyle(inputRef.current).fontFamily;
      tempSpan.textContent = birthdayName || " "; // Default to space to handle empty input
      document.body.appendChild(tempSpan);

      const width = tempSpan.offsetWidth;
      inputRef.current.style.width = `${width}px`;

      document.body.removeChild(tempSpan);
    }
  }, [birthdayName]);

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  return (
    <AuthentificationWrapper>
      {loading ? (
        <p>Chargement</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="pb-4">
            C{"'"}est le <b>birthday</b> de{" "}
            <input
              ref={inputRef}
              type="text"
              placeholder="???"
              value={birthdayName}
              className={styles.birthdayName}
              onChange={(e) => setBirthdayName(e.target.value)}
              autoFocus
            />{" "}
            🎉 né(e) le{" "}
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className={styles.birthdate}
              required
            />
            .
          </p>
          <div className={styles.register}>
            <h1>Créer son p&apos;tit compte</h1>
            <p>
              (Peu de données vous sont demandées. On s&apos;en cogne légèrement
              de qui vous êtes...)
            </p>
            {error && <p>{error}</p>}
            <div className="flex flex-col gap-3 mt-2">
              <SpecialInput
                type="username"
                label="Surnom"
                value={username}
                setValue={setUsername}
              />
              <SpecialInput
                type="email"
                label="Email"
                value={email}
                setValue={setEmail}
              />
              <SpecialInput
                type="password"
                label="Mot de passe"
                value={password}
                setValue={setPassword}
              />
            </div>
            <small className="text-bblue">
              Un mot de passe solide qui pousse à la salle c’est{" "}
              <b>8 caractères minimum, une lettre spéciale et un numéro !</b>
            </small>
            <button
              type="submit"
              className="mt-2 bg-bblue text-white rounded-3xl py-3 w-full font-bold shadow-xl border-2 border-bblue transition hover:bg-white hover:text-bblue hover:border-2 hover:border-bblue"
              disabled={loading}
            >
              {"S'inscrire"}
            </button>
          </div>
        </form>
      )}
    </AuthentificationWrapper>
  );
}
