import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { fetchPosts, fetchSearchPost, fetchUserLikes } from "../redux/postSlice";
import "../styles/PostCard.css"
import Masonry from "react-masonry-css"

export default function Home() {
  const dispatch = useDispatch();
  const [testing, setTesting] = useState(true);
  const postCardList = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);

  const [searchWord, setSearchWord] = useState('');
  const userId = auth.currentUser?.uid;

  const loadData = async () => {
    await dispatch(fetchPosts());
    await dispatch(fetchUserLikes(userId));
    setTesting(true)
  };

  useEffect(() => {
    // dispatch(fetchPosts());
    // dispatch(fetchUserLikes(userId))
    loadData();
    //console.log("ndngjd");
  }, [loadData, userId]);

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

  const handleSearch = async () => {
    if (searchWord.trim() === "") {
      dispatch(fetchPosts());
    } else {
      console.log("searching")
      dispatch(fetchSearchPost(searchWord));
    }
    console.log(postCardList);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      background: '#f0f0f0',
      padding: '8px',
      borderRadius: '4px',
    },
    searchBox: {
      flex: 1,
      padding: '8px',
      marginRight: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    searchButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      background: '#007bff',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };
  return (
    <div className="p-4">
      <div style = {styles.container}>
        <input type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          style={styles.searchBox}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
      </div>

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
