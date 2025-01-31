import {useState} from 'react';
import {useDispatch} from "react-redux";
import {getCurrUser} from "../../tools/login";
import Input from "../Input/Input"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import {formCardStyle} from "../../styles/formStyles.js"

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={formCardStyle}>
            <Input
                className="relative mt-8 w-4/5"
                type="text"
                placeholder="Enter Email"
                setMail={setEmail}
                mail={email}
            />

            <Input
                className="relative mt-8 w-4/5"
                type="text"
                placeholder="Enter Password"
                setMail={setPassword}
                mail={password}
            />

            <Button
                className="mt-2.5 self-end mr-16 h-[33px]"
                variant='secondary'
                onClick={() => {
                    dispatch(getCurrUser(email, password)).then(() => console.log("User logged in"))
                    setEmail("")
                    setPassword("")
                }}
            >
                LOG IN
            </Button>
        </div>
    )
};

export default Login;
