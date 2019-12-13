import React, { Component } from 'react';

class FilterForm extends Component {
    state = {}

    handleSubmit = (event) => {
        event.preventDefault();
        const { breed, sex, date } = event.target
        this.props.handleFiltration({
            byBreed: breed.value,
            bySex: sex.value,
            byDate: date.value,
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label for='breedFilter'>Порода</label>
                    <input name='breed' id='breedFilter' />

                    <label for='sexFilter'>Пол</label>
                    <input name='sex' id='sexFilter' />

                    <label for='dateFilter'>Дата</label>
                    <input name='date' id='dateFilter' />

                    <button>Filter</button>
                </form>
            </div>
        );
    }

}


export default FilterForm;