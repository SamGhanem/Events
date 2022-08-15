import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";

const Update = (props) => {
    const { id } = useParams(); 
    const [startDay, setStartDay] = useState({});
    const [title, setTitle] = useState('');
    const [endDay, setEndDay] = useState({});
    const [trueEndDay,setTrueEndDay] = useState('')
    const [place, setPlace] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const updateEvent= (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/events/' + id, {
            start:startDay.start,
            end:trueEndDay,
            title,
            place,    
        })
            .then(res => {
                console.log(res);
                navigate("/events/viewall"); 
            })
            .catch(err => setErrors(err.response.data.error.errors))
    }

    useEffect(() => {
        console.log(id)
        axios.get('http://localhost:8000/api/events/' + id)
            .then(res => {
                console.log(res.data)
                setStartDay({start:new Date(res.data.events.start)});
                setTitle(res.data.events.title);
                setEndDay({end:new Date( res.data.events.end)});
                setPlace(res.data.events.place);
            })
            .catch(err => console.log(err))
    }, [])

    const endDate =(calEndData) =>{
        setEndDay({ ...endDay, end:calEndData })
        const date = new Date(calEndData)
        date.setDate(date.getDate() )
        setTrueEndDay(date);
    }
        return (
            
            <div className="App">
            <h2>Edit {title}</h2>
            <form onSubmit={updateEvent}>
                <div>
                    <div>
                        {errors.title && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.title.message}</span>}
                        <input type="text"  style={{ width: "20%", marginRight: "10px" }} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder={place.id} style={{ width: "20%", marginRight: "10px" }} value={place} onChange={(e) => setPlace(e.target.value)} />
                    </div>
                    <div>
                        {errors.start && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.start.message}</span>}
                        <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={startDay.start} onChange={(start) =>{console.log(start); setStartDay({ ...startDay, start })}} />
                        {errors.end && <span className="nes-text is-error nes-balloon from-left is-dark">{errors.end.message}</span>}
                        <DatePicker  selected={endDay.end} onChange={(end) =>  endDate(end)} />
                    </div>
                    <input className='nes-btn is-success' type='submit' value='Edit event'/>
                    <Link className='nes-btn is-warning' to={`/events/viewall`}>View all events</Link>
                </div>
                    <Link className='nes-btn is-primary' to={`/`}>GO HOME</Link>
            </form>
            </div>
        )
    
}

export default Update;