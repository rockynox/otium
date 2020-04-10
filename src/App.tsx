import React, {useEffect, useState} from "react";
import {Home} from "./components/Home";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ItemView} from "./components/ItemView";
import {SelectUserModal} from "./components/SelectUserModal";
import {User} from "./types/User";


const customHistory = createBrowserHistory();

export const App = () => {

    const [connectedUser, setConnectedUser] = useState<User | null>(null);

    //TODO: Remove that
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setConnectedUser(new User("id", "Aline"));
        }
    }, []);

    const renderBody = () => {
        if (!connectedUser) {
            return <SelectUserModal setConnectedUser={setConnectedUser}/>;
        }
        return (
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/users" component={Users}/>
                <Route path="/item/:id" children={<ItemView/>}/>
                <Route path="/" children={<Home connectedUser={connectedUser}/>}/>
            </Switch>
        );
    };
    const renderVersionDate = (buildDate: string) =>
        <div>
            Version built on: {buildDate}
        </div>;

    return (
        <div>
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
                            {connectedUser ? <li className="user-indicator">
                                <div>
                                    Connected user
                                </div>
                                <div>
                                    {connectedUser?.name}
                                </div>
                            </li> : null}

                        </ul>
                    </nav>
                    {renderBody()}
                </div>
            </Router>
            <div className="footer">
                Fait en temps de confinement, mais avec
                amour. {process.env.REACT_APP_BUILT_DATE ? renderVersionDate(process.env.REACT_APP_BUILT_DATE) : ""}
            </div>
        </div>
    );
};

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
