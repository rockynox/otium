import React, {useState} from "react";

type SelectUserModalProps = {
    setUser: any,
}

export const SelectUserModal = (props: SelectUserModalProps) => {

    const [inputText, setInputText] = useState("");

    const handleTextChange = (event: any) => setInputText(event.target.value);

    const handleSubmit = (event: any) => props.setUser(inputText);

    return (
        <div className="modal" style={{display: "block"}}>
            <div className="modal-content">
                <h4>Enter your name</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        value={inputText}
                        onChange={handleTextChange}
                        type="text"
                    />
                    <label>Enter you name</label>
                </div>
            </form>
            <div className="modal-footer">
                <div className="btn modalButton" onClick={() => props.setUser(inputText)}>Add</div>
            </div>
        </div>
    );
};
