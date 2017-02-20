var React = require("react"),
    Link = require("react-router").Link;

var Footer = React.createClass({
    render: function () {
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
});

module.exports = Footer;