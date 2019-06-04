import React, {Component} from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './Jokelist.css';

class Jokelist extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
        };
        this.handleClick = this.handleClick.bind(this);
    }
    async getJokes() {
        let jokes = [];

        //Generates 10 jokes
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});
            jokes.push({id: uuid(), text: res.data.joke, votes: 0});
        }
        console.log(jokes);
        //Set state jokes to local variable jokes (add the jokes to the state)
        this.setState(st => ({
            jokes: [...st.jokes, ...jokes]
        }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
    }
    async componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes();
        }
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(joke =>
                joke.id === id ? {...joke, votes: joke.votes + delta} : joke)
            }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }
    handleClick(e) {
        this.getJokes();
    }
    render() {
        return (
            <div className="Jokelist">
                <div className="Jokelist-sidebar">
                    <h1 className="Jokelist-title"><span>Dad</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="Laughing emoji"/>
                    <button className="Jokelist-new" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="Jokelist-jokes">
                    {this.state.jokes.map(joke => (
                        <Joke
                            key={joke.id}
                            text={joke.text}
                            votes={joke.votes}
                            upvote={() => this.handleVote(joke.id, 1)}
                            downvote={() => this.handleVote(joke.id, -1)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Jokelist;