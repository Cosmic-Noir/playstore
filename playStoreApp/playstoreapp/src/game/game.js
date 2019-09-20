import React from "react";

export default function Game(props) {
  return (
    <div className="game">
      <h2>{props.App}</h2>
      <div className="game_rating">Rating: {props.Rating}</div>
      <div className="game_genre">Genre: {props.Genres}</div>
    </div>
  );
}
