import {
  Card,
  CardBody,
  Heading,
  useToast,
  Text,
  VStack,
  Flex,
  Badge,
  Button,
  Input,
  Divider,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useFavourites } from "../hooks/useFavourites";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { formatDate, formatDuration } from "../utils/formatters";

export const FavouritesList = () => {
  const { favourites, removeFromFavourites, clearAllFavourites, count } =
    useFavourites();
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  const filteredFavourites = useMemo(() => {
    if (!searchQuery) return favourites;

    const query = searchQuery.toLowerCase();
    return favourites.filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        track.artistName.toLowerCase().includes(query) ||
        track.albumName?.toLowerCase().includes(query)
    );
  }, [favourites, searchQuery]);

  const handleRemove = (trackName: string, artistName: string) => {
    removeFromFavourites(trackName, artistName);
    toast({
      title: "Removed from Favourites",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };
  const handleClearAll = () => {
    clearAllFavourites();
    toast({
      title: "All Favourites Cleared",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  if (count === 0) {
    return (
      <Card>
        <CardBody textAlign="center" py={12}>
          <Text fontSize="6xl" mb={4}>
            ♡
          </Text>
          <Heading size="lg" mb={2}>
            No Favourites Yet
          </Heading>
          <Text color="gray.600">
            Start Adding your favourite tracks from albums or search results!
          </Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <Heading size="lg">
              My Favourites
              <Badge ml={3} colorScheme="brand" fontSize="md">
                {count}
              </Badge>
            </Heading>
            <Button
              colorScheme="red"
              size="sm"
              onClick={handleClearAll}
              leftIcon={<Trash2 size={16} />}
            >
              Clear All
            </Button>
          </Flex>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter favourites by name, artist, or album..."
            size="lg"
          />
          {filteredFavourites.length === 0 ? (
            <Text textAlign="center" color="gray.500" py={8}>
              No favourites match your search
            </Text>
          ) : (
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {filteredFavourites.map((track, index) => (
                <Flex
                  key={`${track.name}-${track.artistName}-${index}`}
                  align="center"
                  justify="space-between"
                  p={4}
                  _hover={{ bg: "gray.50" }}
                  transition="background 0.2s"
                >
                  <Box flex={1}>
                    <Text fontWeight="bold" fontSize="md" mb={1}>
                      {track.name}
                    </Text>
                    <HStack
                      spacing={4}
                      flexWrap="wrap"
                      fontSize="sm"
                      color="gray.600"
                    >
                      <Text>Artist: {track.artistName}</Text>
                      {track.albumName && <Text>Album: {track.albumName}</Text>}
                      {track.duration && (
                        <Text>Duration: {formatDuration(track.duration)}</Text>
                      )}
                      {track.addedAt && (
                        <Text display={{ base: "none", md: "block" }}>
                          Added: {formatDate(track.addedAt)}
                        </Text>
                      )}
                    </HStack>
                  </Box>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemove(track.name, track.artistName)}
                    leftIcon={<Trash2 size={16} />}
                  >
                    Remove
                  </Button>
                </Flex>
              ))}
            </VStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};
