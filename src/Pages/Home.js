import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { fetchPosts, fetchUserLikes } from "../redux/postSlice";
import "../styles/PostCard.css"
import Masonry from "react-masonry-css"

export default function Home() {
  const dispatch = useDispatch();
  const postCardList = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);
  const userId = auth.currentUser?.uid;

  const loadData = async () => {
    await dispatch(fetchPosts());
    await dispatch(fetchUserLikes(userId));
  };

  useEffect(() => {
    // dispatch(fetchPosts());
    // dispatch(fetchUserLikes(userId))
    loadData();
    //console.log("ndngjd");
  }, [userId]);

  let content;

  if (postStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (postStatus === "succeeded") {
    content = postCardList.map((item) => (
      <PostCard
        key={item.id}
        url={item.urls}
        title={item.title}
        postId={item.id}
        likeButton={true}
      />
    ));
  } else if (postStatus === "failed") {
    content = <div>{postError}</div>;
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {content}
      </Masonry>
    </div>
  );
}
