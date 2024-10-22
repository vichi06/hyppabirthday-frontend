// app/components/ClientWrapper.tsx
"use client"; // This is a client-side component

import { useAuth } from "../context/AuthContext"; // Adjust the path to your AuthContext
import Header from "./Header/Header"; // Import the Header component
import Sidebar from "./SideBar/SideBar"; // Import the Sidebar component
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth(); // Use the authentication context
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className={`flex min-h-screen ${!user ? "flex-col" : ""}`}>
      {/* Conditionally render Sidebar if user is logged in, otherwise render Header */}
      {pathname.includes("/happy-birthday") ? null : user ? (
        <Sidebar />
      ) : (
        <Header />
      )}
      {/* Main content area */}
      <main className="flex flex-grow overflow-y-auto">{children}</main>
    </div>
  );
}
