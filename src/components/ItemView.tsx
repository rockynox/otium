import {useParams} from "react-router-dom";
import React from "react";

export function ItemView(value: { test: string }) {
    let {id} = useParams();

    return (
        <div>
            <h3>ID: {id} {value.test}</h3>
        </div>
    );
}
