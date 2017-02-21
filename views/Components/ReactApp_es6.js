import React, {Component} from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import $ from "jquery";


var ReactApp = React.createClass({
    
    getInitialState: function(){
        return {
            user: {},
            username: '',
            auth: false,
            avatar: ''
        };
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
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    },
    
    componentDidMount: function() {
        this.getUser();
    },

    render: function() {
        return (
            <div>
                <Nav avatar={this.state.avatar}/>
                    <main>
                        {this.props.children}
                    </main>
                <Footer />
            </div>
        );
    }
});

module.exports = ReactApp;
