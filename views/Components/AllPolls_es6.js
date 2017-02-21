import React, {Component} from "react";
import Poll from './Poll_es6';
import {Link, browserHistory} from 'react-router';
import $ from "jquery";

export default class AllPolls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: true,
            auth: false,
            user: {},
            _id: '',
            polls: []
        };
        this.toggleList = this.toggleList.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
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
              auth: true
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    }
    
    allPolls() {
        $.ajax({
          url: '/api/polls',
          dataType: 'json',
          cache: false,
          success: function(data) {
            console.log('Loaded!');
            this.setState({
                polls: data
              });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/polls', status, err.toString());
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
            console.log('All',JSON.stringify(data, null, 2));
            this.allPolls();
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
              this.allPolls();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/' + id + '/delete', status, err.toString());
          }.bind(this)
        });
    }
    
    toggleList() {
        this.setState({list: !this.state.list});
    }
    
    componentDidMount() {
        this.getUser();
        this.allPolls();
    }
    
    render() {
        
        let pollNodes = this.state.polls.map((poll, i) => {
            return (
                <Poll poll={poll} key={i} del={this.props.deletePoll} vote={this.props.handleVote} user={this.state.user} _id={this.state._id} auth={this.state.auth}/>
            );
        });
        
        let listNodes = this.state.polls.map((poll, i) => {
            return (
                <div className='col-xs-12 panel panel-primary' key={i}>
                    <Link to={`/poll/${poll._id}`}>
                        <h3 className="panel-heading text-center">{poll.title}</h3>
                    </Link>
                </div>
            );
        });
        
        let nodes = this.state.list ? listNodes : pollNodes;
        
        let emphasis = this.state.list ? 
            (<span><strong>List View</strong> | ChartView </span>) :
            (<span> List View | <strong>ChartView</strong></span>);
            
        let view = (
            <div className="center-block" onClick={this.toggleList}>
                <h3 className="text-center">{emphasis}</h3>
            </div>
        );
        
        return (
            <div>
                <div className="container">
                    {view}
                    {nodes}
                </div>
            </div>
        );
    }    
}