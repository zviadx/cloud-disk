import { useDispatch } from "react-redux"
import { removeItem } from "../../redux/uploadReducer";

import PropTypes from 'prop-types';


const UpFile = ({ file }) => {
    const dispatch = useDispatch()
    return (
        <div className="bg-[#E9E6E6] rounded-lg my-[5px] py-[10px]">
            <div className="flex mx-2 my-[3px] justify-between">
                <div>{file.name}</div>
                <button
                    className="mr-[5px] w-[25px] h-[25px] relative font-['Open_Sans'] no-underline text-white border border-[#831212] bg-gradient-to-b from-[#d43333] to-[#ab1b1b] rounded-[5px] active:pt-[11px] active:px-[10px] active:pb-[9px] active:top-[1px] before:bg-[#ccd0d5] before:content-[''] before:block before:cursor-pointer before:absolute before:w-full before:h-full before:p-2 before:-left-2 before:-top-2 before:-z-10 before:rounded-[5px] before:shadow-[inset_0_1px_1px_#909193,0_1px_0_#fff]"
                    onClick={() => {
                        dispatch(removeItem(file))
                    }}
                >X</button>
            </div>

            <div className="h-[1.2rem] rounded-lg bg-[#566885] text-[#E9E6E6] flex mx-2 my-[3px]">
                <div
                    className="bg-green-500 rounded-lg"
                    style={{ 'width': `${file.progress}%` }}
                >
                    <div className="text-[#E9E6E6] left-1/2 absolute">{file.progress}%</div>
                </div>
            </div>
        </div>
    );
};

UpFile.propTypes = {
    file: PropTypes.shape({
        name: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
    }).isRequired,
};

export default UpFile;
