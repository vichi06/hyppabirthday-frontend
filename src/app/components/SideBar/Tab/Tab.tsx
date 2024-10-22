import Link from "next/link";
import React from "react";

interface TabProps {
  name: string;
  icon: React.ReactNode; // The icon component (ReactNode allows JSX).
  href: string;
  active: boolean;
  onClick: () => void; // Function to set the active state.
}

const Tab: React.FC<TabProps> = ({ name, icon, href, active, onClick }) => {
  return (
    <Link
      href={href}
      passHref
      onClick={onClick}
      className={`flex items-center w-full p-3 space-x-2 rounded-lg transition-colors ${
        active ? "bg-white text-oorange" : "text-white hover:bg-white hover:text-oorange"
      }`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </Link>
  );
};

export default Tab;
