
import './App.css'
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';

function App() {


  return (
    <>
 <HashRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </HashRouter>
    </>
  )
}

export default App
