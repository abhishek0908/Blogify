import banner from '../img/banner.jpg'
const Banner = ()=>{
   return( <div className="banner">
        <div className="banner-img">
        <img src={banner} alt="" />
           <button className='overlay-button'>Explore Our Blogs</button>
        </div>
    </div>
   )
}
export default Banner