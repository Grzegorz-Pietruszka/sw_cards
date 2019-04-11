import React, { Component } from 'react';
import spinner from './img/spinner.svg';

export default class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      chosenCharacterData: [],
      isLoading: false
    };
  }

  componentDidUpdate = prevProps => {
    const { chosenCharacterData } = this.props;
    if (chosenCharacterData !== undefined) {
      if (chosenCharacterData !== prevProps.chosenCharacterData) {
        this.setState({
          chosenCharacterData: chosenCharacterData
        });

        let api_key = 'On5G7wLclgHHPw1vIhKYgz9SMue0pLip';
        const name = chosenCharacterData.name;
        const url = `https://api.giphy.com/v1/gifs/search?q=${name}&api_key=${api_key}&limit=1`;

        this.setState({
          isLoading: true
        });
        fetch(url)
          .then(response => response.json())
          .then(data =>
            this.setState({
              img: data.data[0].images.fixed_height.url,
              isLoading: false
            })
          );
      }
    }
  };

  render() {
    const { isLoading, img, chosenCharacterData } = this.state;
    const { name, eye_color, height, skin_color } = chosenCharacterData;
    if (isLoading) {
      return <img src={spinner} className="spinner" alt="loading spinner" />;
    } else {
      return (
        <div className="container-flex">
          <div className="img-box">
            <img src={img} alt={name + ' GIF'} />
          </div>{' '}
          <div className="info-box">
            <p> Name: {name} </p> <p> Eye color: {eye_color} </p>
            <p> Height: {height} </p> <p> Skin color: {skin_color} </p>
          </div>
        </div>
      );
    }
  }
}
