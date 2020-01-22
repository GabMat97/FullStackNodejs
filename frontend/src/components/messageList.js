import React, { Component } from 'react';
class MessageList extends Component {
  render(){
      if (this.props.messages){
      return(
        <ul id='message_list'>
        {this.props.messages.map(message=>{
          return <li
          className='message'
          key={message.id}>
            {message.content}
            <br/>
            {message.date}
            </li>
          })}
          </ul>)
       } else {
          return (<div>no messages</div>)
       }
      }
};
export default MessageList
