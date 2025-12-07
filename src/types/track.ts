import type { Artist } from "./artist";

export interface Track {
  name: string;
  duration: string;
  playcount?: string;
  listeners?: string;
  artist?: Artist | { name: string };
  album?: {
    title: string;
    mbid?: string;
    image?: Array<{
      "#text": string;
      size: string;
    }>;
  };
  url?: string;
  mbid?: string;
  "@attr"?: {
    rank: string;
  };
}

export interface FavouriteTrack extends Track {
  addedAt: number;
  albumName?: string;
  artistName?: string;
}
