// app/register/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// Components
import EmailInput from "../components/EmailInput";

export default function RegisterPage() {
  const [emails, setEmails] = useState<string[]>([]);
  const [birthdayName, setBirthdayName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [birthdayDate, setBirthdayDate] = useState<string>("");
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
        date: new Date(birthdayDate),
        participants: emails,
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
      inputRef.current.style.width = `${width + 20}px`;

      document.body.removeChild(tempSpan);
    }
  }, [birthdayName]);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="flex-1 p-14">
        {loading ? (
          <p className="text-center">Chargement</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>
              C{"'"}est le <b>birthday</b> de{" "}
              <input
                ref={inputRef}
                type="text"
                placeholder=""
                value={birthdayName}
                onChange={(e) => setBirthdayName(e.target.value)}
                className="min-w-[30px] shadow-md rounded-md mx-1 py-1 px-2 inline-flex w-auto border border-gray-300 focus-visible:border-oorange focus-visible:ring-oorange outline-none"
                style={{ width: "auto" }} // Dynamically set the width  required
              />{" "}
              🎉 né(e) le{" "}
              <input
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="border border-gray-300 focus-visible:border-oorange focus-visible:ring-oorange outline-none rounded-md px-2 py-1"
                required
              />
            </p>
            <p>Ajouter des participants</p>
            <EmailInput emails={emails} setEmails={setEmails} />
            <small>
              Un email sera envoyé à chaque participant avec un lien vers le le
              repository pour déposer des photos, vidéos ou commentaires. (Vous
              pourrez effectuer cette opération plus tard également)
            </small>
            <h1>Créer son p&apos;tit compte</h1>
            <small>
              Peu de données vous sont demandées. On s&apos;en cogne légèrement
              de qui vous êtes...
            </small>
            {error && <p>{error}</p>}
            <input
              type="text"
              placeholder="Surnom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="my-1 w-full text-sm border border-gray-300 p-1 rounded-md focus-visible:border-oorange focus-visible:ring-oorange outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-1 w-full text-sm border border-gray-300 p-1 rounded-md focus-visible:border-oorange focus-visible:ring-oorange outline-none"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="my-1 w-full text-sm border border-gray-300 p-1 rounded-md focus-visible:border-oorange focus-visible:ring-oorange outline-none"
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}"
              title="Password must be at least 8 characters long, contain at least one number and one special character."
              required
            />
            <small className="text-bblue">
              Un mot de passe solide qui pousse à la salle c’est{" "}
              <b>8 caractères minimum, une lettre spéciale et un numéro !</b>
            </small>
            <button
              type="submit"
              className="mt-2 bg-bblue text-white rounded-md py-3 w-full font-bold shadow-xl border-2 border-bblue transition hover:bg-white hover:text-bblue hover:border-2 hover:border-bblue"
              disabled={loading}
            >
              {"S'inscrire"}
            </button>
          </form>
        )}
      </div>
      <div className="flex-1 bg-sand"></div>
    </div>
  );
}
