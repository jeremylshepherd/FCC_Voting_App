import React from "react";
import ReactDOM from "react-dom";
import Poll from "./Poll";
import Nav from "./Nav";
import Footer from "./Footer";
import $ from "jquery";
import {browserHistory} from "react-router";

export default class PollPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            avatar: '/icon-user-default.png',
            poll: {
                title: 'null',
                options: [
                    {
                        text: 'null',
                        votes: 0
                    }    
                ],
                _id: this.props.params.poll,
                author: 'null'
            }
        };
    }
    
    getPoll() {
        let pollId = this.props.params.poll || this.state.poll._id;
        $.ajax({
          url: '/api/poll/' + pollId,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({poll: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/poll/' + pollId, status, err.toString());
          }.bind(this)
        });
    }
    
    getUser() {
        $.ajax({
            url: '/api/me',
            dataType: 'json',
            cache: false,
            success: function(data) {
              this.setState({
                  user: data,
                  avatar: data.github.avatar
                });
                this.getPoll();
            }.bind(this),
            error: function(xhr, status, err) {
              console.error('/api/me', status, err.toString());
            }.bind(this)
        });
    }
    
    handleVote(obj) {
        $.ajax({
          url: `/api/vote/${obj._id}`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
            this.getPoll();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(`/api/vote/${obj._id}`, status, err.toString());
          }.bind(this)
        });
    }
    
    componentDidMount() {
        this.getPoll();
        this.getUser();
    }
    
    deletePoll(id) {
        $.ajax({
          url: '/api/delete/' + id,
          type: 'DELETE',
          success: function(data) {
              browserHistory.push('/polls');
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/' + id + '/delete', status, err.toString());
          }.bind(this)
        });
    }
    
    render() {
        return (
            <div>
                <Nav avatar={this.state.avatar} />
                <div className="container">
                    <Poll poll={this.state.poll} del={this.deletePoll.bind(this)} vote={this.handleVote.bind(this)} id={this.state.poll.author}/>
                </div>
                <Footer />
            </div>
        );
    }
}
