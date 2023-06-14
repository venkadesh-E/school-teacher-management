import React from "react";
import "../App.css";
import StudentImg from "./Pictures/student1.jpg";
import TeacherImg from "./Pictures/teacher3.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-center my-2 fontStyle">Sky High School</h1>
      <h2 className="text-center my-3 fontStyle">Class 10</h2>
      <div className="box">
        <Link to="/student">
          <img src={StudentImg} alt="" /> <br />{" "}
          <span className="button1">Student</span>
        </Link>{" "}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/teacher">
          <img src={TeacherImg} alt="" />
          <br /> <span className="button2">Teacher</span>
        </Link>
      </div>
    </>
  );
};

export default Home;
