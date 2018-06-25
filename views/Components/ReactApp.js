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
        
        this.alertiOS = this.alertiOS.bind(this);
        this.getUser = this.getUser.bind(this);
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
    
    alertiOS() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipod|ipad/.test(userAgent);
        const auth = document.querySelectorAll('a[data-pwa-auth]');
        console.log(auth);
        const alertiOS = (e) => alert('You are on iOS and will be redirected to the browser. Please use the app there until Apple fixes this bug.');
        if(("standalone" in window.navigator) && window.navigator.standalone && ios){
            for(let i = 0; i < auth.length; i++) {
                auth[i].addEventListener('click', alertiOS,false);
            }
        }
    }
    
    componentDidMount() {
        this.getUser();
        this.alertiOS();
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