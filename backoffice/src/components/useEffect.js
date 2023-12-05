import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchData(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const formattedData = response.data.map(user => ({
          id: user._id,
          username: user.user_name,
          lastname: user.last_name,
          firstname: user.first_name,
          role: user.role,
          creation: user.creation_date,
          email: user.email,
          active: user.active,
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [url]);

  return data;
}

export default useFetchData;
