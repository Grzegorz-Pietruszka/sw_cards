import React, {
  Component
} from 'react';
import Character from './Character-card';
import spinner from './img/spinner.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      characters: {},
      chosenCharacter: '',
      chosenCharacterData: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      chosenCharacter: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      chosenCharacterData: this.state.characters.filter(
        (char) => char.name === this.state.chosenCharacter
      )
    });
  };

  componentDidMount = () => {
    this.setState({
      isLoading: true
    });
    fetch('https://swapi.co/api/people/?page=2')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          isLoading: false,
          characters: data.results,
          chosenCharacter: data.results[0].name,
          chosenCharacterData: data.results[0]
        })
      )
      .catch((error) => console.log(error));
  };

  render() {
    const {
      isLoading,
      characters,
      chosenCharacter,
      chosenCharacterData
    } = this.state;
    if (isLoading) {
      return <img src = {
        spinner
      }
      className = "spinner"
      alt = "loading spinner" / > ;
    } else {
      if (characters.length > 0) {
        return ( <
          div >
          <
          div className = "background" / >
          <
          div className = "midground" / >
          <
          div className = "foreground" / >
          <
          div className = "form" >
          <
          form onSubmit = {
            this.handleSubmit
          } >
          <
          label className = "label" >
          Choose a SW character:
          <
          select value = {
            chosenCharacter
          }
          onChange = {
            this.handleChange
          } > {
            characters.map((character) => ( <
              option key = {
                character.name
              }
              value = {
                character.name
              } > {
                character.name
              } <
              /option>
            ))
          } <
          /select> <
          /label> <
          input type = "submit"
          value = "Submit" / >
          <
          /form> <
          /div> <
          div className = "container" >
          <
          div className = "container-background" >
          <
          Character chosenCharacterData = {
            chosenCharacterData[0]
          }
          /> <
          /div> <
          /div> <
          /div>
        );
      }
      return null;
    }
  }
}

export default App;