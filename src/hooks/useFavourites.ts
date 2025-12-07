import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addFavourite,
  clearFavourites,
  removeFavourite,
} from "../store/favouritesSlice";
import type { Track } from "../types/track";

export const useFavourites = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.items);

  const addToFavourites = useCallback(
    (track: Track) => {
      dispatch(addFavourite(track));
    },
    [dispatch]
  );

  const removeFromFavourites = useCallback(
    (name: string, artistName: string) => {
      dispatch(removeFavourite({ name, artistName }));
    },
    [dispatch]
  );

  const clearAllFavourites = useCallback(() => {
    dispatch(clearFavourites());
  }, [dispatch]);

  const isFavourite = useCallback(
    (trackName: string, artistName: string) => {
      return favourites.some(
        (fav) => fav.name === trackName && fav.artistName === artistName
      );
    },
    [favourites]
  );
  return {
    favourites,
    addToFavourites,
    removeFromFavourites,
    clearAllFavourites,
    isFavourite,
    count: favourites.length,
  };
};
