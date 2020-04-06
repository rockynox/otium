import React, {Component} from "react";
import {List} from "./components/List";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";


const customHistory = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <Router history={customHistory}>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/about" component={About}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function Home() {
    return <div className="container">
        <List/>
    </div>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
