import React, {Component} from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import YouTubeGetID from './YouTubeGetID';
import './MealGenerator.css'

class MealGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            isLoaded: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    
    handleClick() {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    meals: data.meals[0],
                    isLoaded: true
                })
            })
    }

    render() {
        const { meals } = this.state;
        let strURL = meals.strYoutube;
        let url;
        if (typeof strURL === 'string') {
            url = YouTubeGetID(strURL)
        } else {
            console.log('err')
        }
           
        return (
            <div> 
                <button onClick={this.handleClick}>Get new meal</button>
                {this.state.isLoaded && <h2>Meal Name: {meals.strMeal} </h2>}
                <br />
                <img src={meals.strMealThumb} />
                <br />
                {this.state.isLoaded && <h2 className="recipe">Recipe: {meals.strInstructions}</h2> }
                {this.state.isLoaded && <YoutubeEmbed embedId={url} />}
            </div>
        )
    }
}

export default MealGenerator;