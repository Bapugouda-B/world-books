import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavBookList from './components/FavBooks/FavBookList.js';
import HomePage from './pages/HomePage.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favoritebooks" element={<FavBookList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
