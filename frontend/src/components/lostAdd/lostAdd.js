import React, { Component } from 'react'
import axios from 'axios';

class LostAdd extends Component {
    state ={
        message: null
    }



handleInput = (event) => {
    const data = {}
    const field = event.target.name
    data[field] = event.target.value
    this.setState(data);
}

    handleSubmit = (event) => {
        event.preventDefault();

        const { dogBreed, dogDescription, dogSex,
            authorName, authorEmail, authorPhoneNumber, authorAddress } = this.state

        const advert = {
            dogData: {
                breed: dogBreed,
                description: dogDescription,
                sex: dogSex,
            },
            authorData: {
                name: authorName,
                email: authorEmail,
                phoneNumber: authorPhoneNumber,
                adress: authorAddress,
            }
        }
    axios.post('api/lost', advert)
    .then(res=>console.log("собака на месте ")
    )
    
}



render() {
    return (
        <div>
               <form onSubmit={this.handleSubmit}>
                <label for='dog-breed'>Порода:</label>
                <input onChange={this.handleInput} name='dogBreed' id='dog-breed' type='text' />

                <label for='dog-description'>Описание:</label>
                <input onChange={this.handleInput} name='dogDescription' id='dog-description' type='text' />

                <label for='dog-sex'>Пол:</label>
                <input onChange={this.handleInput} name='dogSex' id='dog-sex' />

                <label for='author-name'>Имя:</label>
                <input onChange={this.handleInput} name='authorName' id='author-name' />

                <label for='author-email'>Email:</label>
                <input onChange={this.handleInput} name='authorEmail' id='author-email' />

                <label for='author-phoneNumber'>Телефонный номер:</label>
                <input onChange={this.handleInput} name='authorPhoneNumber' id='author-phoneNumber' />

                <label for='author-address'>Адрес:</label>
                <input onChange={this.handleInput} name='authorAddress' id='author-address' />

                <button>Submit</button>
            </form>
            
        </div>
    )
}
}


export default LostAdd;