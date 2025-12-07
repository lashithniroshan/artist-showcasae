import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavouriteTrack, Track } from "../types/track";

interface FavouritesState {
  items: FavouriteTrack[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Track>) {
      const track = action.payload;
      const artistName =
        typeof track.artist === "string"
          ? track.artist
          : track.artist?.name || "Unknown Artist";
      const exists = state.items.some(
        (item) => item.name === track.name && item.artistName === artistName
      );
      if (!exists) {
        const favouriteTrack: FavouriteTrack = {
          ...track,
          artistName,
          albumName: track.album?.title,
          addedAt: Date.now(),
        };
        state.items.push(favouriteTrack);
      }
    },
    removeFavourite(
      state,
      action: PayloadAction<{ name: string; artistName: string }>
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.name === action.payload.name &&
            item.artistName === action.payload.artistName
          )
      );
    },
    clearFavourites(state) {
      state.items = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
