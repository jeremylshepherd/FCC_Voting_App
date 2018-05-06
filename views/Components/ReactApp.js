import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import $ from "jquery";

export default class ReactApp extends React.Component {
    
    constructor(){
        super();
        
        this.state = {
            user: {},
            username: '',
            auth: false,
            avatar: '',
            polls: []
        };
    }
    
    getUser() {
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
    }
    
    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <Nav avatar={this.state.avatar} name={this.state.displayName}/>
                    <main>
                        {this.props.children}
                    </main>
                <Footer />
            </div>
        );
    }
}