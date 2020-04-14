import {useParams} from "react-router-dom";
import React from "react";

export const ItemView = (props: {}) => {
    let {id} = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
};
