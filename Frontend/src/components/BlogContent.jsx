import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBlogContent from "../utils/useBlogContent";
import useAddFavorite from "../utils/useAddFavorite";
import useRemoveFavorite from "../utils/useRemoveFavorite";

const BlogContent = () => {
  const { resId } = useParams();
  const blogContent = useBlogContent(resId);
  const addFav= ()=>
  {
    useAddFavorite(resId)
  }
  const remFav= ()=>
  {
    console.log("Its Working")
    useRemoveFavorite(resId)
  }

  return (
    <div className="blogcontent">
      {blogContent && (
        <>
          <h1>{blogContent.title}</h1>
          <p>{blogContent.content}</p>
          <button type="button" onClick={addFav}> Add To Favorite</button>
          <button type="button" onClick={remFav}> Remove from Favorite</button>
        </>
      )}
    </div>
  );
};

export default BlogContent;
