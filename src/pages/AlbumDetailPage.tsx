import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  Spinner,
  Text,
  VStack,
  Image,
  Heading,
  HStack,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlbumDetail } from "../hooks/useAlbumDetail";
import { formatNumber, getImageUrl } from "../utils/formatters";
import { TrackList } from "../components/TrackList";

const normalizeTracksToArray = (value: unknown) => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export const AlbumDetailPage = () => {
  const { artist, album } = useParams<{ artist: string; album: string }>();
  const navigate = useNavigate();

  const {
    data: albumData,
    isLoading,
    error,
  } = useAlbumDetail(
    decodeURIComponent(artist || ""),
    decodeURIComponent(album || "")
  );

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Spinner size="xl" color="brand.600" thickness="4px" />
        </Box>
      </Container>
    );
  }
  if (error || !albumData) {
    return (
      <Container maxW="container.xl" py={8}>
        <Button
          mb={4}
          leftIcon={<ChevronLeft size={20} />}
          onClick={() => navigate(-1)}
          variant="ghost"
        >
          Back
        </Button>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text>Failed to load album details. Please try again.</Text>
        </Alert>
      </Container>
    );
  }

  const tracks = normalizeTracksToArray(albumData.tracks?.track);

  const artistName =
    typeof albumData.artist === "string"
      ? albumData.artist
      : albumData.artist.name;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Button
          leftIcon={<ChevronLeft size={20} />}
          onClick={() => navigate(-1)}
          alignSelf="flex-start"
          variant="ghost"
        >
          Back to Albums
        </Button>
        <Card>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8}>
              <Box>
                <Image
                  src={getImageUrl(albumData.image, "extralarge")}
                  alt={albumData.name}
                  borderRadius="lg"
                  w="100%"
                  shadow="lg"
                />
              </Box>
              <VStack align="start" spacing={4}>
                <Box>
                  <Heading size="2xl" mb={2}>
                    {albumData.name}
                  </Heading>
                  <Text fontSize="xl" color="gray.600" mb={4}>
                    {artistName}
                  </Text>
                  <HStack spacing={4} flexWrap="wrap">
                    {albumData.playcount && (
                      <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                        {formatNumber(albumData.playcount)} plays
                      </Badge>
                    )}
                    {albumData.listeners && (
                      <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                        {formatNumber(albumData.listeners)} listeners
                      </Badge>
                    )}
                    {tracks.length > 0 && (
                      <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                        {tracks.length} tracks
                      </Badge>
                    )}
                  </HStack>
                </Box>
                {albumData.wiki?.summary && (
                  <Box>
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: albumData.wiki.summary.replace(
                          /<a[^>]*>.*?<\/a>/g,
                          ""
                        ),
                      }}
                      color="gray.700"
                      noOfLines={4}
                    />
                  </Box>
                )}

                {albumData.tags?.tag && albumData.tags.tag.length > 0 && (
                  <HStack spacing={2} flexWrap="wrap">
                    {albumData.tags.tag.slice(0, 5).map((tag, index) => (
                      <Badge key={index} variant="outline" colorScheme="gray">
                        {tag.name}
                      </Badge>
                    ))}
                  </HStack>
                )}
              </VStack>
            </Grid>
          </CardBody>
        </Card>
        <Divider />
        <Heading size="lg">Track List</Heading>
        <Card>
          <CardBody p={0}>
            <TrackList
              tracks={tracks}
              albumName={albumData.name}
              artistName={artistName}
            />
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};
