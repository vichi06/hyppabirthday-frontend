"use client"; // This is a client-side component

import styles from "./styles.module.css";

export default function ContentWrapper({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className={`${styles.container} shadow-md p-5`}>
      <div className="flex mb-4">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
