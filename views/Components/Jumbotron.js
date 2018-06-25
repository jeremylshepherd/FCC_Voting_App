import React from "react";

export default class Jumbotron extends React.Component {
    render() {
        var user = this.props.displayName ? "Hello, " + this.props.displayName : "FCC Voting App";
        var greeting;
            if(this.props.displayName) {
                greeting = <h3>Welcome back! Let's get started with a new Poll!</h3>;
            }else{
                greeting = (
                    <div>
                        <p>Login or Register with:</p>
                        <a href="/auth/github" className="btn btn-custom-darken" data-pwa-auth><span className="fa fa-github" alt="github logo"></span> Github</a>
                    </div>
                );
            }
        let avatar = this.props.avatar ? <img className="avatar img-circle" src={this.props.avatar} /> : <span className="fa fa-free-code-camp" />;
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1>{avatar} {user}</h1>
                    {greeting}
                </div>
            </div>
            
        );
    }
}