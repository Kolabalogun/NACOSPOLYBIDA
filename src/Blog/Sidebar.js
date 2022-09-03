import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Function/Context";
import { db } from "../Utils/Firebase";

const Sidebar = () => {
  const { blogs } = useGlobalContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const points = blogs;
  points.sort(function (a, b) {
    return b.dateId - a.dateId;
  });

  return (
    <div className="SearchSection">

      <h3>Search</h3>

      <div className="input">
        <input type="text" />
        <div className="searchIcon">
          <img src="svg/search.svg" alt="" />
        </div>
      </div>

      <div className="cat">
        <h3>Categories</h3>
      </div>
      <div className="list">
        <p>Admission(10)</p>
      </div>
      <div className="list">
        <p>Calender(6)</p>
      </div>
      <div className="list">
        <p>Education(14)</p>
      </div>
      <div className="list">
        <p>Travel(22)</p>
      </div>


      <div className="recentPosts">
        <h3>Recent Posts</h3>

        <div className="posts">
          {points?.map((blog, index) => (
            <Link className="post" key={index} to={`/detail/${blog.id}`}>
              <div className="postImg">
                <img src={blog.imgUrl} alt="" className="" />
              </div>

              <div className="talks">
                <p style={{ border: "none" }} className={`${blog.category}`}>
                  {blog.title}
                </p>
                <p>{blog.timestamp.toDate().toDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
