import { useContext } from "react";
import { Link } from "react-router-dom";

const BlogCart = (props) => {
  const { title, content, createdAt, _id } = props.blogData;

  // Function to truncate the title after a certain number of characters
  const truncateText = (text, maxLength) => {
    if(text=== undefined || text.length<maxLength) return text
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className="blog-cart">
      <div className="content">
        <div className="title">

          <h2>{truncateText(title, 50)}</h2>
        </div>
        <div>
          <p>{truncateText(content, 200)}</p>
        </div>
      </div>
      <div className="cart-button">
        <button>
          <Link to={"/blog/" + _id}>Read More</Link>
        </button>
        <p>{createdAt}</p>
      </div>
    </div>
  );
};

export default BlogCart;
