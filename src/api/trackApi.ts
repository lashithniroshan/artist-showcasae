import { lastFmClient } from "./lastfmClient";
import type { Track } from "../types/track";

export interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: Track[];
    };
    "@attr": {
      for: string;
    };
  };
}

export interface TrackinfoResponse {
  track: Track & {
    wiki?: {
      summary: string;
      content: string;
    };
  };
}

export const trackApi = {
  search: async (track: string, limit: number = 30) => {
    return lastFmClient.request<TrackSearchResponse>({
      method: "track.search",
      track,
      limit,
    });
  },

  getInfo: async (artist: string, track: string) => {
    return lastFmClient.request<TrackinfoResponse>({
      method: "track.getInfo",
      artist,
      track,
    });
  },
};
