import React from 'react';
import "./Input.css"

const Input = (props) => {
    return (
        <div>
            <input
                className = "input"
                type = {props.type}
                placeholder = {props.placeholder}
                onChange={(e) => props.setMail(e.target.value)}
                value = {props.mail}
            />
        </div>
    );
};

export default Input;