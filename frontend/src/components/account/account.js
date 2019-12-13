import React, { Component } from 'react'
import axios from "axios";

class Account extends Component {
    state={
        message: null
    }

    // takeInfo = () => {
    //     axios.get("api/lost").then(res => console.log("собака на месте "));
    //   };
      gettingInfo = async () => {
        const api_url = await
          fetch('');
        const data = await api_url.json();
        const data1 = data.url;
        // this.state = data1;
        console.log(data);
        this.setState({
          url: data1
        })
      }

    render(){
        return (
            <div>
                <p>Name: </p>
                <p>Email: </p>
                <p>Phone: </p>
            </div>
        )
    }
}

export default Account;