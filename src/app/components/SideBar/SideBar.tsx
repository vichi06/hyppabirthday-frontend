"use client"; // Ensure it's a client-side component

import { useAuth } from "../../context/AuthContext"; // Ensure correct path

import { MdOutlineDashboard } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import Tab from "./Tab/Tab";
import { useState } from "react";

const tabs = [
  {
    name: "Tableau de bord",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
  },
  { name: "Paramètres", icon: <SlSettings />, href: "/settings" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("Tableau de bord");

  if (!user) return null;

  return (
    <div className="h-auto w-64 bg-oorange text-white flex flex-col items-start float-left gap-2">
      <div className="w-full sticky top-0 py-6 px-4">
        <h2 className="text-2xl font-bold mb-6">hyppabirthday</h2>
        <div className="flex flex-col gap-2">
          {tabs.map((tab, index) => (
            <Tab
              key={`tab${index}`}
              name={tab.name}
              icon={tab.icon}
              href={tab.href}
              active={activeTab === tab.name}
              onClick={() => setActiveTab(tab.name)}
            />
          ))}
        </div>
        <hr className="border-t-2 border-white w-full my-2" />
        <button
          onClick={logout}
          className="px-4 py-2 rounded w-full text-center"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
