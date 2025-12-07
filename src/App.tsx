// import { useState, startTransition, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { HomePage } from './pages/HomePage';

function AppContent(){


return (
<Box minH="100vh" bg="gray.50">
<Routes>
  <Route path="/" element={ <HomePage />} />
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
