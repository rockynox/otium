import React, {useEffect, useState} from "react";
import {User, UserCreationDto} from "../../types/User";
import {databaseReference} from "../../database/firebase";
import {SelectComponent} from "../SelectComponent";


type SelectUserModalProps = {
    setCurrentUser: (user: User) => void,
}

export const SelectUserModal = (props: SelectUserModalProps) => {

    const [newUserName, setNewUserName] = useState("");
    const [selectedUser, setSelectedUser] = useState<User>(new User("", ""));
    const [users, setUsers] = useState<User[]>([]);
    const loading = Object.keys(users).length === 0;

    useEffect(() => {
        databaseReference.users.once("value", (snapshot: { val: any }) => {
            const users: User[] = Object.entries(snapshot.val()).map((entry) => {
                const [id, userWithoutId] = entry as [string, User];
                return {id: id, name: userWithoutId.name} as User;
            });
            setUsers(users);
        });
    });

    const handleTextChange = (event: any) => setNewUserName(event.target.value);

    const handleSubmit = () => {
        if (selectedUser) {
            props.setCurrentUser(selectedUser);
            return;
        } else {
            props.setCurrentUser(createUser(newUserName));
        }

    };

    const createUser = (newUserName: string): User => {
        const newUser = new UserCreationDto(newUserName);
        const newUserRef = databaseReference.users.push(newUser);
        const newUserId = newUserRef.key as string;
        return new User(newUserId, newUserName);
    };

    return (
        <div className="modal welcome-modal">
            <div className="modal-content">
                <h3>Bienvenue sur Otium !</h3>
                {loading ?
                    <div>Loading...</div>
                    : <SelectComponent setSelectedUser={setSelectedUser} selectedUser={selectedUser} users={users}/>
                }

                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            value={newUserName}
                            onChange={handleTextChange}
                            type="text"
                        />
                        <label>Ou enter le ici si vous êtes nouveau</label>
                    </div>
                </form>

            </div>
            <div className="modal-footer">
                <div className="btn modalButton" onClick={handleSubmit}>Continuer</div>
            </div>
        </div>
    );
};
