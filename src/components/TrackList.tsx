import {
  VStack,
  HStack,
  Text,
  Flex,
  Box,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import type { Track } from "../types/track";
import { formatDuration } from "../utils/formatters";
import { Heart } from "lucide-react";
import { useFavourites } from "../hooks/useFavourites";

interface TrackListProps {
  tracks: Track[];
  albumName?: string;
  artistName?: string;
}

export const TrackList = ({
  tracks,
  albumName,
  artistName,
}: TrackListProps) => {
  const { addToFavourites, isFavourite } = useFavourites();
  const toast = useToast();

  const handleAddFavourite = (track: Track) => {
    const trackWithAlbum = {
      ...track,
      album: albumName ? { title: albumName } : track.album,
      artist: artistName ? { name: artistName } : track.artist,
    };
    addToFavourites(trackWithAlbum);
    toast({
      title: "Added to favourites",
      description: `${track.name} has been added to your favourites.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const getArtistName = (track: Track): string => {
    if (artistName) return artistName;
    if (typeof track.artist === "string") return track.artist;
    return track.artist?.name || "Unknown Artist";
  };

  if (!tracks || tracks.length === 0) {
    return (
      <Text color="gray.500" py={8} textAlign="center">
        No Tracks available
      </Text>
    );
  }

  return (
    <VStack spacing={0} align="stretch" divider={<Divider />}>
      {tracks.map((track, index) => {
        const trackArtistName = getArtistName(track);
        const isFav = isFavourite(track.name, trackArtistName);
        return (
          <Flex
            key={`${track.name}-${index}`}
            align="center"
            justify="space-between"
            p={4}
            _hover={{ bg: "gray.50" }}
            transition="background-color 0.2s"
          >
            <HStack spacing={4} flex={1}>
              <Text
                fontWeight="medium"
                color="gray.500"
                fontSize="sm"
                minW="30px"
                textAlign="right"
              >
                {track["@attr"]?.rank || index + 1}
              </Text>
              <Box flex={1}>
                <Text fontWeight="medium" fontSize="md">
                  {track.name}
                </Text>
                {track.duration && (
                  <Text fontSize="sm" color="gray.500">
                    {formatDuration(track.duration)}
                  </Text>
                )}
              </Box>
              {track.playcount && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  display={{ base: "none", md: "block" }}
                >
                  {parseInt(track.playcount).toLocaleString()} plays
                </Text>
              )}
            </HStack>
            <IconButton
              aria-label={
                isFav ? "Remove from favourites" : "Add to favourites"
              }
              icon={<Heart size={18} fill={isFav ? "currentColor" : "none"} />}
              onClick={() => !isFav && handleAddFavourite(track)}
              isDisabled={isFav}
              colorScheme={isFav ? "red" : "brand"}
              variant={isFav ? "solid" : "ghost"}
              size="sm"
            />
          </Flex>
        );
      })}
    </VStack>
  );
};
