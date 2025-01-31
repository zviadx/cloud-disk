import {useDispatch} from "react-redux"
import {makeVisible} from "../../redux/uploadReducer";
import {getAvatar} from "../../tools/getAvatar"

const Profile = () => {
    const dispatch = useDispatch();

    async function imgUpload(event) {
        const upImage = event.target.files[0]
        await dispatch(getAvatar(upImage))
    }

    return (
        <div className="w-full h-full m-0 p-0">
            <div className="w-[250px] h-[200px] flex flex-col ml-[50px] mt-8 pt-2.5">
                <button className="border-0 rounded-md w-[70px] bg-[#566885] left-5">
                    Delete..
                </button>

                <label
                    htmlFor="imgUpload"
                    className="px-2.5 py-2.5 border-2 border-dashed border-teal-500 cursor-pointer mt-4 mr-5"
                    onClick={() => dispatch(makeVisible(true))}
                >
                    აირჩიეთ ფაილი
                </label>

                <input
                    type="file"
                    id="imgUpload"
                    className="hidden"
                    placeholder="ატვირთეთ ავატარი"
                    accept="image/*"
                    onChange={event => imgUpload(event)}
                />
            </div>
        </div>
    );
};

export default Profile;
