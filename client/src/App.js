import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './views/home';
import ViewList from './components/displayAll';
import Update from './components/update';
// import Login from './components/login';
// import Register from './components/register';
// import Header from './components/Header';
import './cal.css';
// script.js
import "nes.css/css/nes.min.css";
import { useState } from 'react';


function App() {
  const [eventList, setEventList] = useState([]);
  // const [isLoggedin, setIsLoggedin] = useState(false);
  const removeFromDom = id => {
    setEventList(eventList.filter(event => event._id !== id));
}
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} /> */}
          <Routes>
            <Route path='/' element={<Home eventList={eventList} setEventList={setEventList} />}/>
            <Route path='/events/viewall' element={<ViewList removeFromDom={removeFromDom} eventList={eventList} setEventList={setEventList}/> } />
            <Route path='/events/update/:id'   element={<Update/>} /></Routes>
            {/* <Route path="/register" element={<Register setIsLoggedin={setIsLoggedin} />} /> */}
            {/* <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
