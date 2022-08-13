import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './views/home';
import EventForm from './components/form';
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
            {/* <Route path='/events/create' element={<EventForm eventList={eventList} setEventList={setEventList}/>}/> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
