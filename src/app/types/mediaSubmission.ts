export interface MediaSubmission {
  documentId: number;
  id: number;
  type: string;
  image?: BaseMediaAttributes;
  video?: BaseMediaAttributes;
  quote?: { author: string; message: string };
  submittedBy: number;
  birthday: number;
}

export interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface BaseMediaAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageAttributes extends BaseMediaAttributes {
  width: number;
  height: number;
  formats: {
    thumbnail?: MediaFormat;
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
  };
}

export interface VideoAttributes extends BaseMediaAttributes {
  duration: number; // Additional attribute for video
  width: number;
  height: number;
}
