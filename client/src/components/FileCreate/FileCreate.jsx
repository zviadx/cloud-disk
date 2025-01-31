import  {useState} from 'react';
import {useDispatch} from "react-redux";
import Input from "../Input/Input";
import {Button} from "react-bootstrap";
import {postFile} from "../../tools/postFile";
import {getDir} from "../../redux/fileReducer";

const FileCreate = () => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [parent, setParent] = useState("")
    const dispatch = useDispatch()
    // const dirId = useSelector(state => state.files.currentDir)

    return (
        <div className="w-[380px] h-[180px] bg-[#E9E6E6] flex flex-col rounded-[15px] mt-[100px] items-center justify-center">

            <Input
                className="relative mt-8 w-4/5"
                type="text"
                placeholder="Enter Name"
                setMail={setName}
                mail={name}
            />

            <Input
                className="relative mt-8 w-4/5"
                type="text"
                placeholder="Enter Password"
                setMail={setType}
                mail={type}

            />

            <Input
                className="relative mt-8 w-4/5"
                type="text"
                placeholder="Enter Parent Folder"
                setMail={setParent}
                mail={parent}
            />

            <Button
                className="mt-2.5 self-end mr-16 h-[33px]"
                variant='warning'
                onClick ={() => {
                    parent && dispatch(getDir(parent))
                    dispatch(postFile(name, type, parent)).then(r => console.log(r))
                    setName("")
                    setType("")
                    setParent("")
                }
                }
            >Create
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

export default FileCreate;