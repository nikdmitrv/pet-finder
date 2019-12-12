import React, { Component } from 'react';

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

        const body = JSON.stringify({
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

        const request = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body,
        }

        fetch('/api/found', request)
            .then((response) => response.json())
            .then((data) => this.setState({ message: data.message }))
    }

    render() {
        return (<div>
            <div>{this.state.message}</div>
            <form onSubmit={this.handleSubmit}>
                <label for='dog-breed'>Breed:</label>
                <input name='dogBreed' id='dog-breed' type='text' />

                <label for='dog-description'>Description:</label>
                <input name='dogDescription' id='dog-description' type='text' />

                <label for='dog-sex'>Sex:</label>
                <input name='dogSex' id='dog-sex' />

                <label for='author-name'>Name:</label>
                <input name='authorName' id='author-name' />

                <label for='author-email'>Email:</label>
                <input name='authorEmail' id='author-email' />

                <label for='author-phoneNumber'>Phone number:</label>
                <input name='authorPhoneNumber' id='author-phoneNumber' />

                <label for='author-address'>Adress:</label>
                <input name='authorAddress' id='author-address' />

                <button>Submit</button>
            </form>
        </div>);
    }
}

export default FoundForm;