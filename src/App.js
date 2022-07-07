import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Pagination } from "./components/Pagination";
import { Posts } from "./components/Posts";

function App() {
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(10);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setloading(true);
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setposts(res.data);
    setloading(false);
  };

  //get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstpost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstpost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
