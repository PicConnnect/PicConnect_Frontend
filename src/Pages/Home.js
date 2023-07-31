import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import {
  fetchPosts,
  fetchSearchPost,
  fetchUserLikes,
} from "../redux/postSlice";
import "../styles/PostCard.css";
import Masonry from "react-masonry-css";

export default function Home() {
  const dispatch = useDispatch();
  const [testing, setTesting] = useState(true);
  const postCardList = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);

  const [searchWord, setSearchWord] = useState("");
  const userId = auth.currentUser?.uid;

  const loadData = async () => {
    await dispatch(fetchPosts());
    await dispatch(fetchUserLikes(userId));
    setTesting(true);
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

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchWord.trim() === "") {
      dispatch(fetchPosts());
    } else {
      console.log("searching");
      dispatch(fetchSearchPost(searchWord));
    }
    console.log("this is ", postCardList);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      background: "#f0f0f0",
      padding: "8px",
      borderRadius: "4px",
    },
    searchBox: {
      flex: 1,
      padding: "8px",
      marginRight: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    searchButton: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      background: "#007bff",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
    },
  };
  return (
    <div className="p-4">
      {/* <div style={styles.container}>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          style={styles.searchBox}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>
      </div> */}

      <div class="max-w-2xl mx-auto">
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-white shadow-md dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
              placeholder="Search Mockups, Logos..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>

        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
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
