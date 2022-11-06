import React, { useContext } from 'react';

export default function About() {

  return (
    <div>
      <div className="container text-center">
        <h2>About Me</h2>
        <p>Hi, I'm Sachin Vaish. A React Js learner<br /> This is my 3rd project for learnig Front-end & Back-end using React Js as Front-End & Nodejs as Back-End.<br /> I've done this with the help of "Code with Harry" - A youtuber</p>
      </div>
      <div className="d-flex justify-content-center">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  );
}
