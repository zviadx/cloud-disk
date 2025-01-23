import React, {useState} from 'react';
import {useDispatch} from "react-redux";
// import {useRef} from "react"
import {getCurrUser} from "../../tools/login";
import "./Login.css"
import Input from "../Input/Input"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
// import {useNavigate} from "react-router-dom";



const Login = (props) => {
    const dispatch = useDispatch();
    // let navigate = useNavigate();
    const [email, setEmail] = useState("")
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
                    variant='secondary'
                    onClick ={() => {
                        dispatch(getCurrUser(email, password))
                        setEmail("")
                        setPassword("")
                    }
                    }
                >Log In
                </Button>



                {/*<Button variant="secondary">Secondary</Button>{' '}*/}
                {/*<Button variant="success">Success</Button>{' '}*/}
                {/*<Button variant="warning">Warning</Button>{' '}*/}
                {/*<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}*/}
                {/*<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}*/}
                {/*<Button variant="link">Link</Button>*/}


        </div>
    )
};

export default Login;