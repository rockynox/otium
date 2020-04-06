import React, {Component} from "react";
import {Home} from "./components/Home";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
// @ts-ignore
import {Button, Modal} from "react-materialize";


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

function About() {
    return <div>
        <Button
            className="modal-trigger"
            href="#modal1"
            node="button"
        >
            Show Modal
        </Button>
        <Modal
            bottomSheet={false}
            fixedFooter={false}
            header="Modal Header"
            id="modal1"
        >
            Lorem ipsum dolor sit amet
        </Modal>
    </div>;
}

function Users() {
    return <h2>Users</h2>;
}
