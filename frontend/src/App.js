import React from 'react';
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
import './App.css';
import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends React.Component {
 constructor(){
    super()
    this.state = {
      messages: []
    }
  }

getAllMessages=()=>{
      axios.get(`${PORT}/`)
      .then((result)=>{
        this.setState({
         messages: result.data
        })
      })
  }

  submitMessage = (data) => {
      axios.post(`${PORT}/message`, {
        content: data
      })
      .then((result)=>{
      })
    }

  componentDidMount(){
    this.getAllMessages()
  }

  render(){
    return (
      <div className="App">
      <MessageForm
      submitMessage={this.submitMessage}/>
      <MessageList/>
      </div>
    );
  }
}

export default MessageApp;
