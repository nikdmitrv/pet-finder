import React, { Component } from 'react'

class LostAdd extends Component {
    constructor(props) {
        super(props);
        
    }
handleInput = (event) =>{
    const data = {}
    data 
}

handleSubmit=(e)=>{
    this.setState({
        Animal:{
        breed: e.target.value,
        description: e.target.value,
        sex: e.target.value,
        },
        Author:{
            name: e.target.value,
            email: e.target.value,
            phoneNumber: e.target.value,
            address: e.target.value,
        }
    })
    console.log(this.state);
}
    


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <label>Порода</label>
                    <input name="breed" type="text"
                    value={this..breed}
                    />
                    <label>Описание собаки</label>
                    <input name="description" type="text"
                    value={this.state.Animal.description} />
                    <lebel>Пол</lebel>
                    <input name="sex" type="text"
                    value={this.state.Animal.sex}/>
                    <lebel>Ваше Имя</lebel>
                    <input name="name" type="text"
                    value={this.state.Author.name}/>
                    <lebel>Ваш email</lebel>
                    <input name="email" type="text"
                    value={this.state.Author.email}/>
                    <lebel>Ваш номер телефона</lebel>
                    <input name="phoneNumber" type="text"
                    value={this.state.Author.phoneNumber}/>
                    <lebel>Где был найден пес</lebel>
                    <input name="adress" type="text"
                    value={this.state.Author.address}/>
                </form>
            </div>
        )
    }
}


export default LostAdd;