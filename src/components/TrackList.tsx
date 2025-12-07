import { VStack, HStack, Text, Flex, Box, Divider, IconButton } from "@chakra-ui/react";
import type { Track } from "../types/track";
import { formatDuration } from "../utils/formatters";
import { Heart } from "lucide-react";

interface TrackListProps {
  tracks: Track[];
  albumName?: string;
  artistName?: string;
}

export const TrackList = ({ tracks }: TrackListProps) => {
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
            aria-label="Add to favourites"
            icon={<Heart size={18} />}
            colorScheme="brand"
            variant="ghost"
            size="sm"
            />
          </Flex>
        );
      })}
    </VStack>
  );
};
