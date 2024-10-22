"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import ContentWrapper from "@/app/components/ContentWrapper/ContentWrapper";

import { MediaSubmission } from "@/app/types/mediaSubmission";
import FileDropzone from "@/app/components/FileDropzone/FileDropzone";

import ItemWrapper from "@/app/components/ItemWrapper/ItemWrapper";
import Link from "next/link";

export default function Birthday() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [videos, setVideos] = useState<MediaSubmission[]>([]);
  const [photos, setPhotos] = useState<MediaSubmission[]>([]);
  const [quotes, setQuotes] = useState<MediaSubmission[]>([]);

  const [author, setAuthor] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleGoBack = () => router.back();

  const fetchData = async () => {
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/media-submission?filters[birthday][$eq]=${id}&populate=image&populate=video&populate=quote`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const data = response.data.data;

      setPhotos(data.filter((d: MediaSubmission) => d.type === "image"));
      setVideos(data.filter((d: MediaSubmission) => d.type === "video"));
      setQuotes(data.filter((d: MediaSubmission) => d.type === "quote"));
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="p-5">
      <button
        onClick={handleGoBack}
        className="bg-oorange text-white py-2 px-4 rounded"
      >
        Retourner en arrière
      </button>
      <p>Votre proche n{"'"}attend que vous pour lui faire plaisir !</p>
      <ContentWrapper
        title="Carrousel"
        description="Ajouter des vidéos sous format mp4 pour remplir votre carrousel."
      >
        <div className="flex flex-wrap gap-4">
          <FileDropzone
            type="video"
            refresh={() => fetchData()}
            horizontal={videos.length === 0}
          />
          <div className="flex gap-10 relative">
            {videos.map((video, index) => (
              <ItemWrapper
                item={video}
                key={`video${index}`}
                fetchData={fetchData}
              >
                <video controls>
                  <source
                    src={`http://localhost:1337/${video.video?.url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </ItemWrapper>
            ))}
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper
        title="Album Photo"
        description="Collectionne les meilleurs souvenirs de ton proche."
      >
        <div className="flex flex-wrap gap-4">
          <FileDropzone
            type="image"
            refresh={() => fetchData()}
            horizontal={photos.length === 0}
          />
          {photos.map((photo, index) => (
            <ItemWrapper
              item={photo}
              key={`photo${index}`}
              fetchData={fetchData}
            >
              <Image
                alt="photo"
                src={`http://localhost:1337${photo.image?.url}`}
                key={index}
                width={250}
                height={400}
                className="min-h-[400px]"
              />
            </ItemWrapper>
          ))}
        </div>
      </ContentWrapper>
      <ContentWrapper
        title="Livre d’or"
        description="Collectionne les meilleurs souvenirs de ton proche"
      >
        <div>
          <div className="border border-dashed border-bblue">
            <div>
              <label>Nom/Surnom/Prénom</label>
              <div>
                <p>Ce nom apparaîtra comme l{"'"}auteur du mot</p>
                <input
                  value={author}
                  type="text"
                  placeholder="Monsieur Lambert"
                  onChange={(event) => setAuthor(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label>Message personnalisé</label>
              <div>
                <p>Ce texte fera office de message</p>
                <textarea
                  placeholder=""
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
            </div>
            {/* <div>
              <label>Une petite photo ?</label>
              <div>
                <input type="file" value={icon} />
              </div>
            </div> */}
            <button>Upload</button>
          </div>
          {quotes.map((quote, index) => (
            <div key={`quote${index}`}>
              <p key={index}>{quote.quote?.author}</p>
              <p key={index}>{quote.quote?.message}</p>
            </div>
          ))}
        </div>
      </ContentWrapper>
      <Link
        href="/happy-birthday/1"
        className="fixed right-5 bottom-5 bg-bblue text-white p-2 cursor-pointer"
      >
        <p>Voir le rendu</p>
      </Link>
    </div>
  );
}
