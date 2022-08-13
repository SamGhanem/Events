import React, {useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



const ViewList = (props) =>{
    const {eventList, setEventList} = props;
    useEffect(() => {
        axios.get("http://localhost:8000/api/events")
        .then((res) => {
            setEventList(res.data.events);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    },[])

    return (
            <div >
                <div class="nes-table-responsive">
            <table class="nes-table is-bordered is-centered">
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
                            <Link to={`/events/update/${events._id}`}>Edit</Link>
                        </td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
)
}
export default ViewList;