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
                        <a href="/auth/github" className="btn btn-custom-darken"><span className="fa fa-github" alt="github logo"></span> Github</a>
                    </div>
                );
            }
        
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1><span className="fa fa-user"></span> {user}</h1>
                    {greeting}
                </div>
            </div>
            
        );
    }
}