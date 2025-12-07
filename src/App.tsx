import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { HomePage } from './pages/HomePage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { Header } from './components/Header';


function AppContent(){
 
 
return (
<Box minH="100vh" bg="gray.50">
  <Header />
<Routes>
  <Route path="/" element={ <HomePage />} />
  <Route path="/album/:artist/:album" element={ <AlbumDetailPage />} />
  <Route path="/favourites" element={ <FavouritesPage />} />
</Routes>
</Box>
)
}

function App() {

  return (
    <BrowserRouter>
    <AppContent />
    </BrowserRouter>
  )
}

export default App
