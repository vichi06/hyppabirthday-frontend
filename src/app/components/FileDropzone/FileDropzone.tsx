// app/components/ClientWrapper.tsx
"use client"; // This is a client-side component

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import styles from "./styles.module.css";
import { PiDownload } from "react-icons/pi";

export default function FileDropzone({
  type,
  refresh,
  horizontal,
}: {
  type: string;
  refresh: () => void;
  horizontal: boolean;
}) {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle file input change (manual selection)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  // Handle dragover event to allow dropping
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dropZoneRef.current) dropZoneRef.current.classList.add(styles.active);
  };

  // Handle dragleave event to reset the drop zone appearance
  const handleDragLeave = () => {
    if (dropZoneRef.current)
      dropZoneRef.current.classList.remove(styles.active);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dropZoneRef.current)
      dropZoneRef.current.classList.remove(styles.active);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);

      // Assign the dropped file to the file input programmatically
      if (fileInputRef.current) fileInputRef.current.files = droppedFiles;
    }
  };

  useEffect(() => {
    if (file) handleSubmit();
  }, [file]);

  const handleSubmit = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!file) {
      alert("Please select a file");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("birthdayId", id.toString());
    formData.append("type", type);

    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/media-submission/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setIsLoading(false);
          refresh();
        });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <div
      className={styles.container}
      ref={dropZoneRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div className={`${horizontal ? styles.horizontal : styles.vertical}`}>
          <div>
            <PiDownload size={50} color="var(--bblue)" />
          </div>
          <div>
            <h1>Déplacer ou déposer vos fichiers ici-là pour les uploader</h1>
            <small>
              (Nous prenons seulement des .MOV ou .MP4 moins de 30Mo. Pas plus
              de 10 fichiers)
            </small>
          </div>
          <p>ou</p>
          <div className="cursor-pointer">
            <div className="bg-oorange text-white rounded-md text-center">
              <label htmlFor={`${type}-upload`}>
                Cliquer ici pour télécharger un fichier
              </label>
            </div>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              id={`${type}-upload`}
              type="file"
              accept={`${type}/*`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
