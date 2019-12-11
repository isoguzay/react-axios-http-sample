import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()

    this.state = {
      serverData : '',
      persons: [],
      userList: [],
      user: ''
    }

    this.getData = this.getData.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getUserList = this.getUserList.bind(this)
    console.log(this.state.serverData)
    console.log(this.state.user)
  }

  getData() {
    axios.get('https://reqres.in/api/products/3')
    .then(response => {
        this.setState({ serverData: response.data.data.name })
      })
  }

  //when page loads, get data from api
  componentDidMount() {
      axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }
  // get an user data from api
  getUser() {
    axios.get('https://reqres.in/api/users/2')
    .then(res => {
      this.setState({ user : res.data.data.first_name })
    })
  }

  getUserList() {
    axios.get('https://reqres.in/api/users?page=2')
      .then(res => {
        this.setState({ userList: res.data.data })
      })
  }

  render() {
    return (
      <div className="button__container">
        <button className="button" onClick={this.getData}> Get Data From Api</button>
        <p>Data From Server : {this.state.serverData} </p>
        <button className="button" onClick={this.getUser}> Get User From Api</button>
        <p> User Info From Server : {this.state.user} </p> 
        <button className="button" onClick={this.getUserList}> Get Users From Api</button>
        <p> The User List: </p>
        <ul>
          { this.state.userList.map(user => <li>{user.first_name} {user.last_name}</li>)} 
        </ul>
        <span> -  - - - - - - - - - -  -</span>
        <p> The Person List: </p>
        <ul>
          { this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
      </div>
    ) 
  }
}

export default App