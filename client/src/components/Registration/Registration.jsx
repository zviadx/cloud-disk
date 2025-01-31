import  {useState} from 'react';
import Input from "../Input/Input";
import {Button} from "react-bootstrap";
import {setUser} from "../../tools/registration"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch} from "react-redux"
import {formCardStyle} from "../../styles/formStyles.js"


const Registration = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const clickHandler = async () => {
        await dispatch(setUser(email, password))
    }

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
                variant='primary'
                onClick ={() => (
                    clickHandler().then(() => { console.log("User registered")})
                )}
            >REGISTRATION
            </Button>


        </div>
    );
};

export default Registration;