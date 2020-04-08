import React from "react";
// @ts-ignore
import {Select} from "react-materialize";
// @ts-ignore
import _ from "lodash";
import {User} from "../types/User";

type SelectComponentProps = {
    setSelectedUser: any,
    selectedUser: User | string
    users: any
}

export const SelectComponent = (props: SelectComponentProps) => {

    const handleSelectChange = (event: any) => props.setSelectedUser(event.target.value);

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
                value={props.selectedUser}
            >
                <option disabled value="" key="">
                    Choisissez votre nom
                </option>
                {renderUserOptions()}
            </Select>
        </div>
    );
};
