import { Container } from "@chakra-ui/react"
import { FavouritesList } from "../components/FavouritesList"

export const FavouritesPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
     <FavouritesList />
    </Container>
  )
}