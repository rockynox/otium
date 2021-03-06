import React, {useEffect, useState} from "react";
import {Home} from "./ItemList/Home";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ItemView} from "./ItemDetail/ItemView";
import {SelectUserModal} from "./UserConnection/SelectUserModal";
import {User} from "./types/User";
import "./common.css";
import {Tooltip} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


const customHistory = createBrowserHistory();

export const App = () => {

    const [connectedUser, setConnectedUser] = useState<User | null>(null);

    //TODO: Remove that
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setConnectedUser(new User("id", "Local"));
        }
    }, []);

    const renderBody = () => {
        if (!connectedUser) {
            return <SelectUserModal setConnectedUser={setConnectedUser}/>;
        }
        return (
            <Switch>
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
        <div className="main-content">
            <Router history={customHistory}>
                <div>
                    <nav>
                        <div className="brand-logo center">Otium</div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                        {connectedUser && (
                            <div className="right user-indicator">
                                {/*<div>*/}
                                {/*    Connected user<br/>*/}
                                {/*    {connectedUser?.name}*/}
                                {/*</div>*/}
                                <Tooltip title={"Connecté en tant que " + connectedUser.name}>
                                    <Avatar>{connectedUser.name[0]}</Avatar>
                                </Tooltip>
                            </div>
                        )}
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
