var React = require("react"),
    ReactDOM = require("react-dom"),
    Poll = require("./Poll"),
    Link = require('react-router').Link,
    Nav = require("./Nav"),
    Footer = require("./Footer"),
    $ = require('jquery');
    
    
var AllPolls = React.createClass({
    getInitialState: function() {
        return ({
            avatar: '',
            list: true,
            polls: []
        });
    },
    
    getPolls: function() {
        $.ajax({
          url: '/api/polls',
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({
                polls: data
              });
          }.bind(this),
          error: function(xhr, status, err) {
             console.error('/api/polls', status, err.toString());
          }.bind(this)
        });
    },
    
    getUser: function() {
        $.ajax({
            url: '/api/me',
            dataType: 'json',
            cache: false,
            success: function(data) {
              this.setState({
                  avatar: data.github.avatar
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('No user logged in.');
              //console.error('/api/me', status, err.toString());
            }.bind(this)
        });
    },
    
    handleVote: function(obj) {
        $.ajax({
          url: `/api/vote/${obj._id}`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
            this.getPolls();
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
            console.error('/api/delete/' + id, status, err.toString());
          }.bind(this)
        });
    },
    
    toggleList: function() {
        this.setState({list: !this.state.list});
    },
    
    componentDidMount: function() {
        this.getPolls();
        this.getUser();
    },
    
    render: function() {
        let pollNodes = this.state.polls.map((poll, i) => {
            return (
                <Poll poll={poll} key={i} del={this.handleDelete} vote={this.handleVote}/>
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
        let view = this.state.list ? (
                <div className="center-block" onClick={this.toggleList}>
                    <h3 className="text-center"><strong>List View</strong> | ChartView </h3>
                </div>
            ) : (
                <div className="center-block" onClick={this.toggleList}>
                    <h3 className="text-center">List View | <strong>ChartView</strong></h3>
                </div>
            );
        return (
            <div>
                <Nav avatar={this.state.avatar} />
                <div className="container">
                    {view}
                    {nodes}
                </div>
                <Footer />
            </div>
        );
    }    
});

module.exports = AllPolls;

