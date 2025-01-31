import {useSelector, useDispatch} from "react-redux"
import {makeVisible} from "../../redux/uploadReducer";
import UpFile from "../UpFile/UpFile";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Uploader = () => {
    const isVisible = useSelector(state => state.upload.isVisible)
    const upFiles = useSelector(state => state.upload.files)
    const dispatch = useDispatch()

    return (
        isVisible
        &&
        <div className="fixed w-[400px] h-[300px] bottom-0 right-0 bg-[#566885] rounded-xl p-5 overflow-y-auto">
            <div className="flex justify-between">
                <div className="text-white">Uploads...</div>
                <button
                    className="uploader__close"
                    onClick={() => dispatch(makeVisible(false))}
                >X</button>
            </div>

            <TransitionGroup>
                {upFiles.map(upFile =>
                    <CSSTransition
                        key={upFile.id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <UpFile file={upFile}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default Uploader;
