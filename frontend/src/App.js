import React from 'react';
import ErrorHandler from './components/errorHandler.js'
import MessageList from './components/messageList.js'
import MessageForm from './components/messageForm.js'
import './App.css';
import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      error: undefined
    }
  }
  deleteMessage = (id) => {
    axios.delete(`${PORT}/delete/${id}`, {
      id: id
    })
    .then((result)=>{
      this.setMessages(result.data)
    })
    .catch((err)=>{
      this.setError(err.response);
    })
  }

  componentDidMount(){
    this.getAllMessages()
  }

  setError(error){
    this.setState({
      error: error
    })
  }

  setMessages(messages){
    this.setState({
      messages: messages
    })
  }

  getAllMessages=()=>{
    axios.get(`${PORT}/`)
    .then((result)=>{
      this.setMessages(result.data)
    })
    .catch((err)=>{
      this.setError(err)
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then((result)=>{
      this.setMessages(result.data)
    })
    .catch((err)=>{
      this.setError(err.response)
    })
  }

  render(){
    return (
      <div className="App">
      <ErrorHandler
      error={this.state.error}/>
      <MessageForm
      ref='messageFormRef'
      submitMessage={this.submitMessage}/>
      <MessageList
      messages={this.state.messages}
      handleDelete={this.deleteMessage}
      />
      </div>
    );
  }
}

export default MessageApp;
