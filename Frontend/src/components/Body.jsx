import { useEffect, useState } from "react"
import BlogCart from "./BlogCart"
const Body = ()=>{
    const[showBlogs,setShowBlogs] = useState([])
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async()=>{
        const blogs = await fetch('http://localhost:3000/getallblogs/');
         const jsonblog = await blogs.json()
         setShowBlogs(jsonblog);
    }
    return (
      
        <div className="div">

            {showBlogs.map(blog => {
                // console.log(blog.title);
                return <BlogCart key={blog._id} blogData={blog} />;
            })}
        </div>
        
           
    );
    
}
export default Body