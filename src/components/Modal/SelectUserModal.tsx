import React, {useState} from "react";
// @ts-ignore
import {Select} from "react-materialize";
import _ from "lodash";
import {User} from "../../types/User";

type SelectUserModalProps = {
    setUser: any,
}

const users = {
    "id1": {"name": "Leo"},
    "id2": {"name": "Aline"},
    "id3": {"name": "Jean-Guy"},
    "id4": {"name": "Marie-Jeanne"}
};

export const SelectUserModal = (props: SelectUserModalProps) => {

    const [newUserName, setNewUserName] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const handleTextChange = (event: any) => setNewUserName(event.target.value);

    const handleSelectChange = (event: any) => setSelectedUser(event.target.value);

    const handleSubmit = () => {
        if (selectedUser) {
            console.log("user selected");
            // @ts-ignore
            props.setUser(users[selectedUser]);
            return;
        } else {
            const newUser = new User(newUserName);
            props.setUser(newUser);
        }

    };

    const renderUserOptions = () => {
        return _.map(users, (user: any, userId: string) => {
            return (
                <option value={userId} key={userId}>
                    {user.name}
                </option>
            );
        });
    };

    return (
        <div className="modal welcome-modal">
            <div className="modal-content">
                <h3>Bienvenue sur Otium !</h3>
                <Select
                    id="Select-9"
                    multiple={false}
                    onChange={handleSelectChange}
                    value={selectedUser}
                >
                    <option disabled value="" key="">
                        Choisissez votre nom
                    </option>
                    {renderUserOptions()}
                </Select>
                <h5>Si vous êtes nouveau, entrez votre nom</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            value={newUserName}
                            onChange={handleTextChange}
                            type="text"
                        />
                        <label>Enter votre nom</label>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <div className="btn modalButton" onClick={handleSubmit}>Continuer</div>
            </div>
        </div>
    );
};
