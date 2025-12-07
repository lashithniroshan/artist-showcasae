export interface Artist {
  name: string;
  mbid?: string;
  url?: string;
  image?: ImageSize[];
  streamable?: string;
}

export interface ImageSize {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge" | "mega" | "";
}
