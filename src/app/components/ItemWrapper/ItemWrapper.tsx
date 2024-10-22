"use client"; // This is a client-side component

import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { MediaSubmission } from "@/app/types/mediaSubmission";
import axios from "axios";

import styles from "./styles.module.css";

export default function ItemWrapper({
  children,
  item,
  fetchData,
}: {
  children: React.ReactNode;
  item: MediaSubmission;
  fetchData: () => void;
}) {
  const [isBeingDeleted, setIsBeingDeleted] = useState<boolean>(false);

  const handleDelete = async () => {
    const jwt = localStorage.getItem("jwt");

    setIsBeingDeleted(true);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/media-submission/${item.documentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.utils}>
          <FaRegEye color="white" size={30} />
        </div>
        <div className="absolute top-0 bottom-0 left-1/2 border-l-2 border-dashed border-white transform-translate-x-1/2" />
        <div onClick={handleDelete} className={styles.utils}>
          <MdDeleteOutline color="white" size={30} />
        </div>
      </div>
      {isBeingDeleted ? <p>En cours de suppression</p> : children}
    </div>
  );
}
