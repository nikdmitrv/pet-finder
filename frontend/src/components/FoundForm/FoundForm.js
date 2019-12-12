import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFoundAdvertAC } from '../../redux/actions';

class FoundForm extends Component {
    state = {
        message: null
    }

    handleInput = (event) => {
        const data = {}
        data[field] = event.target.name
        this.setState(data)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { dogBreed, dogDescription, dogSex,
            authorName, authorEmail, authorPhoneNumber, authorAddress } = this.state

        const advert = JSON.stringify({
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
            },
            createdAt: Date.now(),
        })

        this.props.createAdvert(advert);



        // const request = {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body,
        // }

        // fetch('/api/found', request)
        //     .then((response) => response.json())
        //     .then((data) => this.setState({ message: data.message }))
    }

    render() {
        return (<div>
            <div>{this.state.message}</div>
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
        </div>);
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        createAdvert: advert => dispatch(createFoundAdvertAC(advert))
    }
}

export default connect(null, mapDispatchToProps)(FoundForm);