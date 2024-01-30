import { useEffect, useState } from "react";

const useBlogContent = (resId, dispatch) => {
  const [blogContent, setBlogContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const blogData = await fetch(`http://localhost:3000/getblog/${resId}`, {
          method: "GET",
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          }
        });
        const blogDataJson = await blogData.json();

        setBlogContent(blogDataJson);

      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, [resId]);

  return blogContent;
}

export default useBlogContent;
