import React, {Component} from 'react';
import axios from 'axios';
import './Jokelist.css';

class Jokelist extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
        };

    }
    async componentDidMount() {
        //Load jokes
        let jokes = [];

        //Generates 10 jokes
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});
            jokes.push(res.data.joke);
        }

        //Set state jokes to local variable jokes (add the jokes to the state)
        this.setState({jokes: jokes});
    }

    render() {

        return (
            <div className="Jokelist">
                <div className="Jokelist-sidebar">
                    <h1 className="Jokelist-title"><span>Dad</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="Laughing emoji"/>
                    <button className="Jokelist-new">New Jokes</button>
                </div>

                <div className="Jokelist-jokes">
                    {this.state.jokes.map(joke => (
                        <div>{joke}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Jokelist;