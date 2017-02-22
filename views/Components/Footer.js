import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="navbar navbar-inverse navbar-fixed-bottom">
              <div className="container">
                <a href='http://twitter.com/jeremylshepherd'>
                    <span className="navbar-brand">
                        @Jeremy L Shepherd
                    </span>
                </a>
                <div className= "navbar-right">
                    <span className="navbar-text navbar-right">
                        {'...in partial completion of Backend Certification.  '}
                        <i className="fa fa-free-code-camp" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
            </footer>
        );
    }
}