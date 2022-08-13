import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './views/home';
import EventForm from './components/form';
import ViewList from './components/displayAll';
import Update from './components/update';
import './cal.css';
// script.js
import "nes.css/css/nes.min.css";
import { useState } from 'react';


function App() {
  const [eventList, setEventList] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home eventList={eventList} setEventList={setEventList} />}/>
            <Route path='/events/viewall' element={<ViewList eventList={eventList} setEventList={setEventList}/> } />
            <Route path='/events/update/:id'  element={<Update/>}/>          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
