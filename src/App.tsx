import React, {useState} from "react";
import {Home} from "./components/Home";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ItemView} from "./components/ItemView";
import {SelectUserModal} from "./components/SelectUserModal";


const customHistory = createBrowserHistory();

export const App = () => {

    const [user, setUser] = useState("Aline");

    const renderBody = () => {
        if (!user) {
            return <SelectUserModal setUser={setUser}/>;
        }
        return (
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/users" component={Users}/>
                <Route path="/item/:id" children={<ItemView/>}/>
                <Route path="/" component={Home}/>
            </Switch>
        );
    };


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
                        <li className="user-indicator">
                            <div>
                                Connected user
                            </div>
                            <div>
                                {user}
                            </div>
                        </li>
                    </ul>
                </nav>
                {renderBody()}
            </div>
        </Router>
    );
};

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
