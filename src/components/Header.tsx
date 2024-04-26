import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    FaSearch,
    FaShoppingBag,
    FaSignInAlt,
    FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import Avatar from "./ui/Avatar";
import { deleteUser } from "../redux/reducer/user-slice";
import toast from "react-hot-toast";
import { getAuth, signOut } from "firebase/auth";
import { RootState } from "../redux/store";








const url = "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309_640.png";



const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.userSlice);

    const imageUrl = user?.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp';



    const [isOpen, setIsOpen] = useState<boolean>(false);

    const logoutHandler = async () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(deleteUser());
                navigate('/');
                toast.success('Logged out');
                localStorage.removeItem('user');
            })
            .catch((err) => {
                toast.error(err?.message || 'Loggeg out failed');
            }
            );
    };

    return (
        <nav className="flex justify-between px-8 py-4 w-full bg-primary-100">
            <div className="flex  justify-center items-center">
                <Link className="flex items-center gap-3" to={"/"}>
                    <img src={url} alt="logo" className="min-w-[30px] w-8" />
                    <h1 className="hidden sm:block title font-bold text-primary-txt">ToDo-App</h1>
                </Link>
            </div>
            <ul className="header flex justify-end items-center gap-4 xs:gap-7 sm:gap-10">
                <li>
                    <NavLink className={({ isActive }) => isActive ? "text-cyan-500" : "hover:text-cyan-200"} onClick={() => setIsOpen(false)} to={"/"}>
                        HOME
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "text-cyan-500" : "hover:text-cyan-200"} onClick={() => setIsOpen(false)} to={"/search"}>
                        <FaSearch />
                    </NavLink>
                </li>
                <li>
                    {user?._id ? (
                        <>
                            <Avatar
                                className="w-8 h-8"
                                src={imageUrl}
                                onAvatar={() => setIsOpen(prev => !prev)}
                            />

                        </>
                    ) : (
                        <Link to={"/signup"}>
                            <FaSignInAlt />
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Header;
