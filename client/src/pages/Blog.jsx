import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-application-p9hy.onrender.com/api/v1/blog/all-blog"
      );
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isuser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blog;
