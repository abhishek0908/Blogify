import axios from "axios";
import { useEffect, useState } from "react";

const useCheckFavorite = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('jwtToken');

      try {
        const response = await axios.get('http://localhost:3000/myfavoritelist/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
        setData(response.data);
      } catch (error) {
          console.log("Some Error")
      }
    };
    fetchData();
  }, []);
  return data;
};

export default useCheckFavorite;
