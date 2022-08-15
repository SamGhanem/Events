import React, {useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


const ViewList = (props) =>{
    const {eventList, setEventList, removeFromDom} = props;
    const navigator = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8000/api/events")
        .then((res) => {
            setEventList(res.data.events);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    },[setEventList])

    const deleteEvent = (id) => 
    axios.delete('http://localhost:8000/api/events/' + id)
    .then(res => {
    removeFromDom(id)
    navigator("/")
    })
    console.log(eventList.length)
    return (
        <div className='nesstable'>
            {eventList.length ? <div class="nes-table-responsive ">
                <table class=" nes-table is-bordered is-centered is-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{
                            eventList.map((events, index)=>{
                            return <tr>
                                <td> {events.title}</td>
                                <td> {events.place} </td>
                            <td>
                                <Link className='nes-btn is-success' to={`/events/update/${events._id}`}>Edit</Link>
                                <button className='nes-btn is-error' onClick={(e) => deleteEvent(events._id)}>Delete</button>
                                <Link className='nes-btn is-primary' to={`/`}>GO HOME</Link>
                            </td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            </div> :
            <div className="nes-container is-rounded is-dark">
                <h2>No events scheduled as of now</h2> <Link className='nes-btn is-primary' to={`/`}>GO HOME</Link>
            </div>}
        </div>
)
}
export default ViewList;