import React, { Component } from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke({vote, votes, text, id}) {
  function upVote(evt) { vote(id, +1);}
  function downnVote(evt) { vote(id, -1);}


    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={evt => vote(id, +1)}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={evt => vote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  }

export default Joke;
