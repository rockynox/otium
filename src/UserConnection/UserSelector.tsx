import React from "react";
// @ts-ignore
import {Select} from "react-materialize";
// @ts-ignore
import _ from "lodash";
import {User} from "../types/User";

type SelectComponentProps = {
    setSelectedUser: (selectedUser: User) => void,
    selectedUser: User | undefined
    users: User[]
}

export const UserSelector = (props: SelectComponentProps) => {

    const handleSelectChange = (event: any) => {
        const selectedUserId = event.target.value;
        props.setSelectedUser(props.users[selectedUserId]);
    };

    const renderUserOptions = () => {
        return _.map(props.users, (user: User, userId: string) => {
            return (
                <option value={userId} key={userId}>
                    {user.name}
                </option>
            );
        });
    };
    return (
        <div>
            <Select
                id="Select-9"
                onChange={handleSelectChange}
                value={props.selectedUser?.id || ""}
            >
                <option disabled value="" key="">
                    Choisisser votre nom
                </option>
                {renderUserOptions()}
            </Select>
        </div>
    );
};
