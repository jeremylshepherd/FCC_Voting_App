import React, {Component} from "react";
import Jumbotron from "./Jumbotron";
import Poll from './Poll_es6';
import PollForm from "./PollForm_es6";
import {Link} from 'react-router';
import $ from "jquery";

export default class Main extends Component {
    constructor(props) {
        super(props);
         this.state ={
             addPoll: false
         };
         
         this.state = {
             user: {},
             _id: '',
             displayName: '',
             username: '',
             auth: false,
             polls: []
         };
         
         this.handleVote = this.handleVote.bind(this);
         this.deletePoll = this.deletePoll.bind(this);
    }
    
    handleVote(obj) {
        $.ajax({
          url: `/api/vote/${obj._id}`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
            console.log('Main', JSON.stringify(data, null, 2));
            this.userPolls();
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
              this.userPolls();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/' + id + '/delete', status, err.toString());
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
              _id: data._id,
              displayName: data.github.displayName,
              username: data.github.username,
              auth: true
            });
            this.userPolls();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    }
    
    userPolls() {
        if(!this.state.user.github.username){
            return;
        }
        $.ajax({
          url: '/api/' + this.state.user.github.username + '/polls',
          dataType: 'json',
          cache: false,
          success: function(data) {
            console.log('Loaded!');
            this.setState({
                polls: data
              });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/' + this.state.user.github.username + '/polls', status, err.toString());
          }.bind(this)
        });
    }
    
    componentDidMount() {
        this.getUser();
    }
    
    toggleForm() {
        this.setState({
            addPoll: !this.state.addPoll
        });
    }
    
    render() {
        let formButton = this.state.addPoll ?  <span className="btn btn-danger" onClick={this.toggleForm}>Cancel Poll</span> : <span className="btn btn-primary" onClick={this.toggleForm}>Add Poll</span>;
        let formForm =  this.state.addPoll ? <PollForm submit={this.addNewPoll}/> : <span />;
        let formHeading = this.state.addPoll ? 'Click button to cancel ' : 'Here are your polls. Click button to add additional polls. ';
        
        let form = (
          <div>
            <h3 className="text-center">
            {formHeading}
            {formButton}
            </h3>
            {formForm}
          </div>
        );
        
        let pollNodes = this.state.polls.map((poll, i) => {
            return (
                <Poll poll={poll} key={i} del={this.props.deletePoll } vote={this.props.handleVote.bind(this)} user={this.state.user} _id={this.state._id} auth={this.state.auth}/>
            );
        });
        
        let all = (
        <div className="col-xs-12">
            <h3 className="text-center">Welcome, please register or log in. Click button view all polls. <Link to="polls" type="button" className="btn btn-default">View Polls</Link></h3>
        </div>
        );
        
        let subheading = this.props.auth ? form : all;
        return (
            <div>
                <Jumbotron displayName={this.state.displayName}/>
                <div className="container">{subheading}</div>
                <div className="container">{pollNodes}</div>
            </div>
        );
    }
}