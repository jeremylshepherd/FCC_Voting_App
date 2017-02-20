import  React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Jumbotron from "./Jumbotron";
import Subotron from "./Subotron";
import Poll from './Poll';
import InfoColumn from "./InfoColumn";
import PollForm from "./PollForm";
import {Link} from 'react-router';
import $ from "jquery";


var ReactApp = React.createClass({
    getInitialState: function() {
        return ({
            user: {},
            username: '',
            auth: false,
            polls: [],
            avatar: '',
            addPoll: false
        });
    },
    
    getUser: function() {
      $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              user: data,
              displayName: data.github.displayName,
              username: data.github.username,
              avatar: data.github.avatar,
              auth: true
            });
            this.loadPolls();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    },
    
    loadPolls: function () {
        if(!this.state.username){
            return;
        }
        $.ajax({
          url: '/api/' + this.state.username + '/polls',
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
    },
    
    addNewPoll: function(obj) {
        let poll = obj;
        $.ajax({
          url: '/api/newpoll',
          dataType: 'json',
          type: 'POST',
          data: poll,
          success: function(data) {
              this.loadPolls();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/' + this.state.user.github.username + '/polls', status, err.toString());
          }.bind(this)
        });
        this.setState({addPoll: false});
    },
    
    handleVote: function(obj) {
        $.ajax({
          url: `/api/vote/${obj._id}`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
            this.loadPolls();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(`/api/vote/${obj._id}`, status, err.toString());
          }.bind(this)
        });
    },
    
    deletePoll: function(id) {
        $.ajax({
          url: '/api/delete/' + id,
          type: 'DELETE',
          success: function(data) {
              this.loadPolls();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/' + id + '/delete', status, err.toString());
          }.bind(this)
        });
    },
    
    showForm: function() {
        this.setState({addPoll: true});
    },
    
    cancelForm: function() {this.setState({addPoll: false})},
    
    componentDidMount: function() {
        this.getUser();
        this.loadPolls();
    },
    
    render: function() {
      var form;
      if(this.state.addPoll) {
          form = (
              <div>
                <h3 className="text-center">Click button to cancel. <span className="btn btn-danger" onClick={this.cancelForm}>Cancel Poll</span></h3>
                <PollForm submit={this.addNewPoll}/>
              </div>
          );
      }else{
          form = (
              <div className="col-xs-12">
                  <h3 className="text-center">Here are your polls. Click button to add additional polls. <span className="btn btn-primary" onClick={this.showForm}>Add Poll</span></h3>
              </div>
          );
      }
      
      let pollNodes = this.state.polls.map((poll, i) => {
          return (
            <Poll poll={poll} key={i} del={this.deletePoll } vote={this.handleVote}/>
          );
      });
      let all = (
        <div className="col-xs-12">
            <h3 className="text-center">Welcome, please register or log in. Click button view all polls. <Link to="polls" type="button" className="btn btn-default">View Polls</Link></h3>
        </div>
      );
      let subheading = this.state.auth ? form : all;
        return (
            <div>
                <Nav avatar={this.state.avatar}/>
                <Jumbotron displayName={this.state.displayName}/>
                <div className="container">{subheading}</div>
                <div className="container">{pollNodes}</div>
                <Footer />
            </div>
        );
    }
});

module.exports = ReactApp;
