import React from "react";
import Poll from "./Poll";
import $ from "jquery";
import {browserHistory} from "react-router";

export default class PollPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            avatar: '/icon-user-default.png',
            _id: '999999999',
            auth: false,
            owner: false,
            poll: {
                title: 'null',
                options: [
                    {
                        text: 'null',
                        votes: 0
                    }    
                ],
                _id: this.props.params.poll,
                author: '999999999'
            }
        };
        
        this.handleVote = this.handleVote.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
        this.getPoll = this.getPoll.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    
    getUser() {
      $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.getPoll();
          this.setState({
              user: data,
              _id: data._id,
              auth: true,
              owner: data._id == this.state.poll.author ? true : false
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    }
    
    getPoll() {
        let pollId = this.props.params.poll || this.state.poll._id;
        $.ajax({
          url: '/api/poll/' + pollId,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({
              poll: data,
              owner: data.author == this.state._id ? true : false
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/poll/' + pollId, status, err.toString());
          }.bind(this)
        });
    }
    
    componentDidMount() {
        this.getPoll();
        this.getUser();
    }
    
    handleVote(obj) {
        $.ajax({
          url: `/api/vote/${obj._id}`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
            console.log('PollPage',JSON.stringify(data, null, 2));
            this.getPoll();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(`/api/vote/${obj._id}`, status, err.toString());
          }.bind(this)
        });
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
                <div className="container">
                    <Poll poll={this.state.poll} del={this.deletePoll.bind(this)} vote={this.handleVote.bind(this)} user={this.state.user} _id={this.state._id} auth={this.state.auth} owner={this.state.owner}/>
                </div>
            </div>
        );
    }
}
