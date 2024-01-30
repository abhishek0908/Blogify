import useMyBlogs from "../utils/useMyBlogs"
import BlogCart from './BlogCart'

const MyBlogs = ()=>{
    const {data,err} = useMyBlogs()
    return (
        <div className="myblogs">
            {data && data.map((blog)=>{
               return <BlogCart key={blog._id} blogData={blog} />;
            })}
        </div>
    )
}

export default MyBlogs