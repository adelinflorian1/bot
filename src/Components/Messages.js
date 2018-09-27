import './Messages.css'

import $ from "jquery";
import React from 'react';
import Reflux from 'reflux';

import {getAnswer} from '../Controller/MessageController'
import MessagesActions from '../Actions/MessagesActions';
import MessagesStore from '../Stores/MessagesStore';

import Loader from '../shared/Loader/Loader'

class Messages extends Reflux.Component {
    constructor( props ){
        super( props );
        this.state = {
            message:'',
            writing:false,
        };
        this.store = MessagesStore;
    }

    componentDidMount(){

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3002/message",
          "method": "GET",
          "headers": {
            "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc5Njk2OTIsImV4cCI6MTUzODA1NjA5Mn0.ikyK0x6EvSc_DrJaJ530SZ7bAIFG0B7o6YNaeHuxlC0",
            "Cache-Control": "no-cache",
            "Postman-Token": "99fbfa72-c55d-4270-82b1-81eb66c0b2b2"
          }
        }

        $.ajax(settings).done(function (response) {
            MessagesActions.setMessages(response);
        });
    }

    onChangeMessage(event){
        this.setState({
            message:event.target.value,
        });
    }

    sendMessage(event){
        if(this.state.message==='') return;
        let message = {
            id: -1,
            text: this.state.message,
            timestamp: '12:30',
        }
        MessagesActions.addMessage(message);

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3002/message",
          "method": "POST",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzcyNjg4MTAsImV4cCI6MTUzNzM1NTIxMH0.ALd4lUJUihVzK1rZQJsdIh2ToTyv9AJOULzRWMNmlyA",
            "Cache-Control": "no-cache",
            "Postman-Token": "893b822b-c64d-4911-9b08-9ca25782be4b"
          },
          "data": {
            "text": this.state.message,
            "timestamp": "12:30"
          }
        }

        $.ajax(settings).done((response) =>{
            setTimeout(()=>{
                this.setState({
                    writing:true,
                    message:'',
                });
            },1000);
            setTimeout(()=>{
                let message = {
                    id: 0,
                    text: 'Not smart enough, sorry :(',
                    timestamp: '12:30',
                }
                MessagesActions.addMessage(message);
                this.setState({
                    writing:false,
                });
                getAnswer();
            },3000);
        });
    }

    render() {

    const writing = {
        display: this.state.writing ? 'block' : 'none',
    };

    return (
      <div className="container">
          <div className='scroll'>
          <div className = 'chatbox-wrapper' >
                {this.state.messages.map( (message,i) =>
                    <div className = 'chatbox-message-wrapper' key={i} >
                        <div className = { message.id !==0 ? 'chatbox-message chatbox-me' : 'chatbox-message chatbox-others'} >
                            <img src ='https://miro.medium.com/max/480/1*paQ7E6f2VyTKXHpR-aViFg.png' alt='bahooo'/>
                            <span className = 'message'>{message.text}</span>
                            <span className = 'timestamp'>{message.timestamp}</span>
                        </div>
                    </div>
                )}

                <div className = 'chatbox-message-wrapper' style={writing}>
                    <div className = 'chatbox-message chatbox-others'>
                        <img src ='https://miro.medium.com/max/480/1*paQ7E6f2VyTKXHpR-aViFg.png' alt='bahooo'/>
                        <Loader/>
                    </div>
                </div>
            </div>
            </div>
            <div className = 'bottom-text-box' >
                <div className = 'text-box'>
                    <textarea placeholder = 'Write a message...' onChange={this.onChangeMessage.bind(this)} value={this.state.message}/>
                    <button className = 'send-button' onClick={this.sendMessage.bind(this)}>Send</button>
                    <i className="far fa-smile"></i>
                </div>
            </div>

      </div>
    );

  }
}

export default Messages;
