import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function JokeList({ numJokesToGet = 5}) {
  const [jokes, setJokes] = useState([])
  const [isLoading, setIsLoading] = useState(true)


useEffect(function() {
  async function getJokes() {
    let j = [...jokes];
    let seenJokes = new Set()
    try {
      while (j.length < numJokesToGet) {
        let res = await axios.get(`"https://icanhazdadjoke.com"`, {
          headers: {Accept: "application/json"}
        });
        let {...jokeObj} = res.data

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({...jokeObj, votes: 0})
        } else {
          console.error("duplicate found!")
        }
      }
      setJokes(j)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  if (jokes.length === 0) getJokes()
}, [jokes, numJokesToGet])


// empty joke list and then call getJokes
function GenerateNewJokes() {
  setJokes([])
  setIsLoading(true)
}

// change vote for this id by delta
function vote(id, delta) {
  setJokes(allJokes => 
    allJokes.map(j => (j.id === id ? {...j, votes: j.votes + delta} : j))
  )
}

// render: either loading spinner or list of sorted jobs
if (isLoading) {
  return (
    <div className="loading">
      <i className="fas fa-4x fa-spinner fa-spin" />
    </div>
    )
}

let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

return (
  <div className="JokeList">
    <button className="JokeList-getmore" onClick={generateNewJokes}>
      Get New Jokes
      </button>

    {sortedJokes.map(({joke, id, votes}) => (
      <Joke text={joke} key={id} id={id} votes={votes} vote={vote} />
    ))}
  </div>
);
}

export default JokeList;
