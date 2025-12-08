import {
  Card,
  CardBody,
  Image,
  Text,
  VStack,
  Badge,
  Box,
} from "@chakra-ui/react";
import type { Album } from "../types/album";
import { getImageUrl, formatNumber } from "../utils/formatters";

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

export const AlbumCard = ({ album, onClick }: AlbumCardProps) => {
  const artistName =
    typeof album.artist === "string" ? album.artist : album.artist.name;

  return (
    <Card
      onClick={onClick}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
      shadow="md"
      overflow="hidden"
    >
      <Box position="relative">
        <Image
          src={getImageUrl(album.image)}
          alt={album.name}
          h="200px"
          w="100%"
          objectFit="cover"
        />
        {album.playcount && (
          <Badge
            position="absolute"
            top="2"
            right="2"
            colorScheme="purple"
            fontSize="xs"
          >
            {formatNumber(album.playcount)} plays
          </Badge>
        )}
      </Box>
      <CardBody>
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg" noOfLines={1} w="100%">
            {album.name}
          </Text>
          <Text fontSize="sm" color="gray.600" noOfLines={1} w="100%">
            {artistName}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};
