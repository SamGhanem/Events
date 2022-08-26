import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import App from "../components/cal-works";
// import moment from "moment";




const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const Home = (props) => {
    const {eventList,setEventList} = props;
    const [startDay, setStartDay] = useState({});
    const [title, setTitle] = useState('');
    const [endDay, setEndDay] = useState({});
    const [trueEndDay,setTrueEndDay] = useState('')
    const [place, setPlace] = useState('');
    const [errors, setErrors] = useState({});

    const submitHandler =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/events/create",{
        start:startDay.start,
        end:trueEndDay,
        title,
        place
    })
    .then((res)=>{
        setEventList([...eventList, res.data.events]);
    })
    .catch(err =>{ 
        console.log("hellllo");
        setErrors(err.response.data.error.errors)
    })
    
}
useEffect(() => {
    axios.get("http://localhost:8000/api/events")
    .then((res) => {
        setEventList(res.data.events);
        console.log(res.data);
    })
    .catch((err) => console.log(err));
},[setEventList])

const endDate =(calEndData) =>{
    setEndDay({ ...endDay, end:calEndData })
    const date = new Date(calEndData)
    date.setDate(date.getDate() +1)
    setTrueEndDay(date);
}



    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <Link className='nes-btn is-primary' to={`/register`}>Register</Link>
            <form>
                <div>
                    <div>
                        {errors.title && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.title.message}</span>}
                        <input type="text" className='nes-input is-dark' placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <i className="nes-icon is-large heart"></i>
                        <input type="text" className='nes-input is-dark' placeholder="Add Place" style={{ width: "20%", marginRight: "10px" }} value={place} onChange={(e) => setPlace(e.target.value)} />
                    </div>
                    <div>
                        {errors.start && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.start.message}</span>}
                        <DatePicker  placeholderText="Start Date" style={{ marginRight: "10px" }} selected={startDay.start} onChange={(start) =>{console.log(start); setStartDay({ ...startDay, start })}} />
                        {errors.end && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.end.message}</span>}
                        <DatePicker placeholderText="End Date" selected={endDay.end} onChange={(end) =>  endDate(end)} />
                    </div>
                    <input className='nes-btn is-success' type='submit' value='Add the event'  onClick={submitHandler}/>
                    <i className="nes-icon is-large star"></i>
                    <Link className='nes-btn is-primary' to={`/events/viewall`}>View all events</Link>
                    
                </div>
                <i className="nes-mario"></i>
                <i className="nes-ash"></i>
                <i className="nes-mario"></i>
                <i className="nes-ash"></i>
            </form>
            
            <Calendar
                selectable
                style={{ height: 500, margin: "50px" }}
                localizer={localizer}
                events={eventList}
                resizable
                defaultView={"month"}
                defaultDate={new Date()} 
            ></Calendar>
        </div>
    );
}

export default Home;

