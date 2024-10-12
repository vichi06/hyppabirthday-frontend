// app/components/ClientWrapper.tsx
"use client"; // This is a client-side component

import { useAuth } from "../context/AuthContext"; // Adjust the path to your AuthContext
import Header from "./Header/Header"; // Import the Header component
import Sidebar from "./SideBar"; // Import the Sidebar component

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth(); // Use the authentication context

  return (
    <div>
      {/* Conditionally render Sidebar if user is logged in, otherwise render Header */}
      {user ? <Sidebar /> : <Header />}
      {/* Main content area */}
      <main className="flex">{children}</main>
    </div>
  );
}
