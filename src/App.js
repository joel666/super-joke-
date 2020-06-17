import React from 'react';
import './App.css';
// get our fontawesome imports
import  {faTwitter} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Joke extends React.Component {
    render() {
    const textCenter={textAlign: "center"};
    // this.props.data.items = null;
    if (this.props.data.error) {
      return <div>Error: {this.props.data.error.message}</div>;
    } else if (!this.props.data.items) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <h2 style={textCenter}>{this.props.data.items.setup}</h2>
            <h2 style={textCenter}>{this.props.data.items.punchline}</h2>
        </div>
      );
    }
  }
}

class ShareJoke extends React.Component {
  constructor(props) {
    super(props);
    this.shareAsTweet = this.shareAsTweet.bind(this);
  }

  shareAsTweet() {
       if (this.props.joke.length !== 0) {
          window.open(`https://twitter.com/intent/tweet?hashtags=jokes&text=${encodeURIComponent(this.props.joke.setup)} ${encodeURIComponent(this.props.joke.punchline)}`,'_blank');
       }
    
  }
  render() {
    return(
      <FontAwesomeIcon icon={faTwitter} size="2x" style={{color:"#1da1f2"}} onClick={this.shareAsTweet}/>
    );
  }
}

class App extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
        this.getQuote = this.getQuote.bind(this);
    }
    getQuote() {
        const url = "https://official-joke-api.appspot.com/jokes/random";
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }
    render() {
        return (
            <div className="wrap">
              <div className="head">
                <h3>Radom Joke Generator</h3>
              </div>
              <div className="data">
                  <Joke data={this.state}/>
              </div>
              <div className="gen">
                <ShareJoke joke={this.state.items} style={{justifySelf: "start"}}/>
                <button className="btn-getjok" onClick={this.getQuote} style={{justifySelf: "end", marginLeft: "auto"}}>Get Joke</button>
              </div>
            </div>
        );
    }
}

export default App;
