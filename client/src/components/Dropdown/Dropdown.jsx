import {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import "./Dropdown.css";
import {NavLink} from "react-router-dom";

const Dropdown = ({ trigger, items }) => {
    Dropdown.propTypes = {
        trigger: PropTypes.element.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                icon: PropTypes.node,
                link: PropTypes.string,
                onClick: PropTypes.func.isRequired,
            })
        ).isRequired,
    };

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log(dropdownRef.current)
                console.log(event.target)
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={toggleDropdown}>
                {trigger}
            </div>

            {isOpen && (
                <ul className="absolute top-[100%] w-max shadow-lg py-2 ml-[-100px] mr-auto
                border-2 border-black rounded-md bg-white">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                        >
                            {item.icon && <img src={item.icon} alt={item.text} className="w-5 h-5 mr-2"/>}
                            <NavLink className={"no-underline text-black"} to={item.link}>
                                {item.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
