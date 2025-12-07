import type { Artist, ImageSize } from "./artist";
import type { Track } from "./track";

export interface Album {
  name: string;
    artist: string | Artist ;
    image: ImageSize[];
     playcount?: string;
  mbid?: string;
  url?: string;
}

export interface AlbumDetail extends Album {
  tracks?: {
    track: Track[];
  };
  wiki?: {
    published: string;
    summary: string;
    content: string;
  };
  listeners?: string;
  tags?: {
    tag: Array<{
      name: string;
      url: string;
    }>;
  };
}

export interface TopAlbum extends Album {
playcount: string;
}