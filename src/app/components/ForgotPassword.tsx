// components/ForgotPassword.tsx
import { useState } from "react";
import SpecialInput from "./SpecialInput/SpecialInput";
import { IoBackspaceOutline } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

const ForgotPassword: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset email.");
      }

      const data = await response.json();
      setMessage(data.message || "Check your email for reset instructions!");
      setEmail("");
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-1">
        <IoBackspaceOutline
          size={30}
          onClick={onClose}
          className="cursor-pointer"
        />
        <h1>C{"'"}est balo ça,</h1>
      </div>{" "}
      <p>
        On t{"'"}envoit un mail pour modifier ton mot de passe. Garde-le dans un
        coin de ta tête le nouveau !
      </p>
      <form onSubmit={handleSubmit} className="my-5">
        <SpecialInput
          value={email}
          setValue={setEmail}
          type="email"
          label="Email"
          autofocus
        />

        <button
          type="submit"
          className="group mt-4 bg-bblue text-white rounded-xl py-3 w-full shadow-xl border border-bblue transition hover:bg-white hover:text-bblue hover:border-bblue"
        >
          Envoyer le lien de modification
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
