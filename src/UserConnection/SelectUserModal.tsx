import React, {useEffect, useState} from "react";
import {User, UserCreationDto} from "../types/User";
import {databaseReference} from "../Database/firebaseConfiguration";
import {UserSelector} from "./UserSelector";
import {ErrorSnackbar} from "../Common/ErrorSnackbar";
import {getSnapshotAsObjectArray} from "../Database/databaseUtils";
import {CircularProgress} from "@material-ui/core";
import "./userConnection.css";


type SelectUserModalProps = {
    setConnectedUser: (user: User) => void,
}

export const SelectUserModal = (props: SelectUserModalProps) => {

    const [newUserName, setNewUserName] = useState("");
    const [selectedUser, setSelectedUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const loading = Object.keys(users).length === 0;
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

    useEffect(() => {
        const databaseSubscription = databaseReference.users.on("value", (snapshot) => {
            setUsers(getSnapshotAsObjectArray(snapshot) as User[]);
        });
        return () => {
            databaseReference.users.off("value", databaseSubscription);
        };
    });

    const handleTextChange = (event: any) => setNewUserName(event.target.value);

    const handleSubmit = async (event: any) => {
        if (event) {
            event.preventDefault();
        }
        if (selectedUser) {
            props.setConnectedUser(selectedUser);
            return;
        } else {
            createUser(newUserName)
                .then(newUser => {
                    props.setConnectedUser(newUser);
                })
                .catch(() => {
                    return;
                });
        }
    };

    const createUser = async (newUserName: string): Promise<User> => {
        const newUser = new UserCreationDto(newUserName);
        debugger
        return databaseReference.users.push(newUser)
            .then((newUserRef) => {
                if (newUserRef) {
                    const newUserId = newUserRef.key as string;
                    return new User(newUserId, newUserName);
                }
                throw new Error("No reference returned");
            })
            .catch(((reason) => {
                setErrorSnackbarOpen(true);
                throw new Error(reason);
            }));
    };

    return (
        <div className="modal welcome-modal">
            <ErrorSnackbar open={errorSnackbarOpen} setOpen={setErrorSnackbarOpen}/>
            <div className="modal-content">
                <h3>Bienvenue sur Otium !</h3>
                <div className="introduction-text">
                    L'otium, en latin, est un terme qui designe le champs lexical du temps libre.<br/>
                    C'est le temps durant lequel une personne profite du repos pour s'adonner à la méditation, au loisir
                    studieux ou au divertissement.
                </div>
                {loading ?
                    <CircularProgress/>
                    : <UserSelector setSelectedUser={setSelectedUser} selectedUser={selectedUser} users={users}/>
                }

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            value={newUserName}
                            onChange={handleTextChange}
                            type="text"
                        />
                        <label>Ou entrer le ici si vous êtes nouveau</label>
                    </div>
                </form>

            </div>
            <div className="modal-footer">
                <div className="btn modalButton" onClick={handleSubmit}>Continuer</div>
            </div>
        </div>
    );
};
