// app/dashboard/page.tsx (example of a protected page)
"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Birthday } from "../types/birthday";

export default function Dashboard() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const router = useRouter();

  const fetchUserBirthdays = async () => {
    try {
      // Get the token and userId from local storage or your auth context
      const token = localStorage.getItem("jwt"); // or use context
      const userId = localStorage.getItem("userId"); // or use context

      if (!token || !userId) throw new Error("User not logged in");

      const response = await fetch(
        `http://localhost:1337/api/birthdays?populate=*&filters[user][id][$eq]=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch birthdays");

      const data = await response.json();
      setBirthdays(data.data); // Assuming your API returns a list of birthdays
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setError("error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBirthdays();
    console.log(birthdays);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <p>Chargement...</p>; // Show a loading state while redirecting
  }

  return (
    <div className="p-5">
      <h1>Tableau de bord</h1>
      <p>Bienvenue, {user.username}!</p>
      <p>Vos proches vous attendent :</p>
      {birthdays.map((b: Birthday, index: number) => (
        <p key={index}>{b.name}</p>
      ))}
      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}
    </div>
  );
}
