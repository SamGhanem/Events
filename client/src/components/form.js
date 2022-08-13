import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';

const EventForm = ({eventList, setEventList}) => {
    const [date, setDate] = useState("");
    const [about, setAbout] = useState('');
    const [place, setPlace] = useState('');
    const [errors, setErrors] = useState({});
    const navigator = useNavigate()

    const submitHandler =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/events/create",{
        date,
        about,
        place
    })
    .then((res)=>{
        console.log("byeee");
        navigator("/")
    })
    .catch(err =>{ 
        console.log("hellllo");
        setErrors(err.response.data.error.errors)
    })

    
}
    return(
        <div>
            <h1>Add Event</h1>
            <Link to={`/`}>Go home </Link>
            <form onSubmit={submitHandler}>
                <div>
                
                {errors.date && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.date.message}</span>}
                    <label>Date:</label>
                    <input onChange={(e)=> setDate(e.target.value)} value={date} name="date" type="datetime-local"/>
                </div>
                <div>
                    <label >About:</label>
                    <input className="" onChange={(e)=> setAbout(e.target.value)} value={about} name="about" type="text"/>
                </div>
                <div>
                    <label>place:</label>
                    <input onChange={(e)=> setPlace(e.target.value)} value={place} name="place" type="text"/>
                </div>
                <input type='submit' value='add the event' />
            </form>
        </div>
    )

}

export default EventForm;