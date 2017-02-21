import React from "react";
import {Link} from "react-router";

export default class Nav extends React.Component {
    render() {
        let icon = this.props.avatar !== '' ? (
            <div className="navbar-right"><img src={this.props.avatar} className="navbar-text img-circle icon"/>
                <a href="/logout" className="btn btn-danger navbar-btn"><span className="fa fa-eject"/> Logout</a>
            </div>
        ) : (
            <div className="navbar-right">
                <span className="navbar-text">Login or Register with:</span>
                <a href="/auth/github" className="btn btn-custom-darken"><span className="fa fa-github" alt="github logo"></span> Github</a>
            </div>
        );
        return (
            <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">
                <Link to='/'>
                    <span className="navbar-brand">
                    <i className="fa fa-free-code-camp fa" aria-hidden="true"></i>
                        {'   FCC Voting App'}
                    </span>
                </Link>
                <ul className="nav navbar-nav">
                    <li><Link to='/polls'>All Polls</Link></li>
                </ul>
                {icon}
              </div>
            </nav>
        );
    }
}