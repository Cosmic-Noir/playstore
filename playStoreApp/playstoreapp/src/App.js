import React, { Component } from "react";
import Game from "./game/game";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: "",
      genre: "",
      error: null
    };
  }

  setSort(sort) {
    this.setState({ sort });
  }

  setGenre(genre) {
    this.setState({ genre });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = "http://localhost:8000/apps";
    const params = [];
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if (this.state.genre) {
      params.push(`genre=${this.state.genre}`);
    }
    const query = params.join("&");
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({ error: "Sorry, could not get apps at this time" });
      });
  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <Game {...app} key={i} />;
    });
    return (
      <main className="App">
        <h1>Apps:</h1>
        <div className="filter">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="sort">Sort:</label>
            <select
              id="sort"
              name="sort"
              onChange={e => this.setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="Rating">Rating</option>
              <option value="App">App</option>
            </select>
            <label htmlFor="genres">Genres:</label>
            <select
              id="genres"
              name="genres"
              onChange={e => this.setGenre(e.target.value)}
            >
              <option value="">None</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Strategy">Strategy</option>
              <option value="Casual">Casual</option>
              <option value="Arcade">Arcade</option>
              <option value="Card">Card</option>
            </select>
            <button type="submit">Filter</button>
            <div className="App_error">{this.state.error}</div>
          </form>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;
