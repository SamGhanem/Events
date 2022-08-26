import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
  const { username } = useParams();
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    console.log('HELLO?');
    axios
      .get(`http://localhost:8000/api/events/${username}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setEventList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>You are viewing {username} Profile</h1>

      {eventList.map((events) => (
        <div key={events._id}>
          <p>{events.title}</p>
          <p>{events.releaseYear}</p>
          <p>{events.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;