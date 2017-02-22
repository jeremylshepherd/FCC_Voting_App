import React from 'react';
import ReactDOM from "react-dom";
import ReactApp from "../views/Components/ReactApp.js";
import PollPage from "../views/Components/PollPage.js";
import AllPolls from "../views/Components/AllPolls.js";
import Main from "../views/Components/Main.js";
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute } from 'react-router';

let app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={ReactApp}>
            <IndexRoute component={Main} />
            <Route path='polls' component={AllPolls} />
            <Route path='poll/:poll' component={PollPage} />
        </Route>
    </Router>, 
    app
);