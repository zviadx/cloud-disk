import React, {useState} from 'react';
import Input from "../Input/Input";
import {Button} from "react-bootstrap";
// import {getCurrUser} from "../../tools/login";
import {setUser} from "../../tools/registration"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Login/Login.css"
import {useDispatch} from "react-redux"


const Registration = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")``
    const [password, setPassword] = useState("")

    return (
        <div className="login">
            <Input
                className="login__mail"
                type="text"
                placeholder="Enter Email"
                setMail={setEmail}
                mail={email}
            />

            <Input
                className="login__mail"
                type="text"
                placeholder="Enter Password"
                setMail={setPassword}
                mail={password}
            />


            <Button
                className="login__button"
                variant='primary'
                onClick ={() => {
                    dispatch(setUser(email, password))

                  }
                }
            >REGISTRATION
            </Button>



            {/*<Button variant="secondary">Secondary</Button>{' '}*/}
            {/*<Button variant="success">Success</Button>{' '}*/}
            {/*<Button variant="warning">Warning</Button>{' '}*/}
            {/*<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}*/}
            {/*<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}*/}
            {/*<Button variant="link">Link</Button>*/}



        </div>
    );
};

export default Registration;