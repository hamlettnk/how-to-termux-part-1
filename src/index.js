import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import "./App.css";


function Home() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/termux')
  }
  function goAbout() {
    navigate('/about')
  }
  return (
    <div className="home">
      <div className="home-top-nav">
        <button className="home-buttons" onClick={handleClick}>Blog</button>
        <button className="home-buttons" onClick={handleClick}>Tools</button>
        <button className="home-buttons" onClick={goAbout}>About</button>
      </div>
      <img className="home-logo" src={require("./images/termux-photo.jpg")} alt="logo" />
      <h1 className="logo-name">quarks</h1>
      <Link
        style={{ fontSize: 40, color: "black", display: "block", margin: "1rem 0" }}
        to="/termux"
      >
        Learn Termux
      </Link>
    </div>
  )
}


function About() {
  return (
    <div>
      <h1
        style={
          {
            fontSize: 100,
          }
        }
      >
        About
      </h1>
    </div>
  )
}


function Posts() {
  return (
    <div className="whole-post">
      <img src={require("./images/termux-photo-100x100.jpg")} alt="termux-photo" />
    </div>
  )
}

export default function ABlogPost() {
  return (
    <div className="whole-blog">
      <div>
        <h1 className="blog-title">How To Termux - part one</h1>
        <h3 className="blog-section-1"> Introduction to Termux</h3>
        <img className="blog-images" src={require("./images/termux-photo.jpg")} alt="termux-photo" />
        <p className="blog-paragraph">
          Termux is by far the best Linux terminal emulator for Android.<br></br>
          It Comes in handy for Linux lovers letting them use tools in Terminal.<br></br>
          So to start with Termux it will be a good idea to update and upgrade<br></br>
          the packages repository.
        </p>
        <h3 className="blog-section-1">Updating and Upgrading the packages repository</h3>
        <p className="blog-paragraph">
          That can be done by typing the following commands in the terminal
          <h4 className="blog-command">apt update</h4>
          and then
          <h4 className="blog-command">apt upgrade</h4>
          click <Link to="/">here</Link> if you get errors on the above step.
        </p>
      </div>
      <div className="posts-list">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </div>

    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="termux" element={<ABlogPost />} />
      <Route path="about" element={<About />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

