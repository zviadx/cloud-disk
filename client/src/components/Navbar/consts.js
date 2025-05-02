import SelectIcon from "../../assets/img/selectcol.svg";
import LogOut from "../../assets/img/logoutcol.svg";
import {logOut} from "../../redux/userReducer.js";


export const dropdownItems = (dispatch) => {
    return ( [
        {
            text: "Choose Avatar",
            icon: SelectIcon,
            link: "/Profile",
            onClick: () => console.log("Option Avatar clicked")
        },
        {
            text: "Sign Out",
            icon: LogOut,
            link: undefined,
            onClick: () => {
                dispatch(logOut())
                localStorage.removeItem("token")
            }
        }
    ]
) }