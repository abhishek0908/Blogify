import useCheckFavorite from '../utils/useCheckFavorite'
import BlogCart from './BlogCart'
const MyFavorite = ()=>{
    const data = useCheckFavorite()
    return (
    <div className="favorite">
        <div className="myfavorite">
             {data && data.favoriteBlogs.map((blog)=>{
                return <BlogCart key={blog._id} blogData={blog} />;
             })}
        </div>
    </div>
    )
}
export default MyFavorite