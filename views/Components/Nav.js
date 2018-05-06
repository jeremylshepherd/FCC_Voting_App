import React from "react";
import {Link} from "react-router";

export default class Nav extends React.Component {
    render() {
        let icon = this.props.avatar !== '' ? (
            <ul className="nav navbar-nav navbar-right">
                <li data-toggle="collapse"><Link to='/polls'>All Polls</Link></li>
                <li data-toggle="collapse"><img src={this.props.avatar} className="navbar-text img-circle icon"/><span className="avatar-text">{`  Logged in as ${this.props.name}`}</span></li>
                <li data-toggle="collapse"><a href="/logout" className="btn btn-danger"><span className="fa fa-eject"/> Logout</a></li>
            </ul>
        ) : (
            <ul className="nav navbar-nav navbar-right">
                <li data-toggle="collapse"><Link to='/polls'>All Polls</Link></li>
                <li data-toggle="collapse"><span className="navbar-text">Login or Register with:</span></li>
                <li data-toggle="collapse"><a href="/auth/github" className="btn btn-custom-darken"><span className="fa fa-github" alt="github logo"></span> Github</a></li>
            </ul>
        );
        return (
            <nav className="navbar navbar-inverse navbar-static-top navbar-collapse">
              <div className="container">
                <div className="row">
                    <div className="navbar-header">
                        <button
                          type="button"
                          className="navbar-toggle collapsed"
                          data-toggle="collapse"
                          data-target="#right-nav"
                          aria-expanded="false"
                        >
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar ib-top" />
                          <span className="icon-bar ib-mid" />
                          <span className="icon-bar ib-bot" />
                        </button>
                        <Link to='/'>
                            <span className="navbar-brand">
                            <i className="fa fa-free-code-camp" aria-hidden="true"></i>
                                {'   FCC Voting App'}
                            </span>
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="right-nav">
                    {icon}
                    </div>
                  </div>
              </div>
            </nav>
        );
    }
}