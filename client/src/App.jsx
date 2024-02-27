import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './componentes/home/Home';
import Landing from './componentes/landing/Landing';
import About from './componentes/about/About';
import Create from './componentes/create/Create';
import Details from './componentes/details/Details';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/home' element={< Home />} />
        <Route path='/about' element={< About />} />
        <Route path='/create' element={< Create />} />
        <Route path='home/pokemons/:id' element={< Details />} />
      </Routes>

    </div>
  );
}

export default App;
