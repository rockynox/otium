import React from "react";
import Select from "@material-ui/core/Select";
import {User} from "../types/User";
import {MenuItem} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

type SelectComponentProps = {
    setSelectedUser: (selectedUser: User) => void,
    selectedUser: User | undefined
    users: User[]
}

export const UserSelector = (props: SelectComponentProps) => {

    const handleSelectChange = (event: any) => {
        const selectedUserId = event.target.value;
        const selectedUser = props.users.find(user => user.id === selectedUserId);
        if (selectedUser) {
            props.setSelectedUser(selectedUser);
        }
    };

    const renderUserOptions = () => {
        return props.users.map((user: User) => {
            return (
                <MenuItem value={user.id} key={user.id}>
                    {user.name}
                </MenuItem>
            );
        });
    };
    return (
        <div>
            <FormControl className="select-user">
                <InputLabel id="demo-simple-select-label">Choisisser votre nom</InputLabel>
                <Select
                    id="demo-simple-select"
                    onChange={handleSelectChange}
                    value={props.selectedUser ? props.selectedUser.id : ""}
                >
                    {renderUserOptions()}
                </Select>
            </FormControl>
        </div>
    );
};
