import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import Input from "@ui/Input"
import { getSingleUser, useLoginUserMutation } from "@api/userApi";
import { ErrorResponse } from "@/Types/apiTypes";
import { saveToken, saveUser } from "@/redux/reducer/user-slice";
import { useDispatch } from "react-redux";



const logo = "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309_640.png";




const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loginUser] = useLoginUserMutation();






    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            email,
            password,
        }

        try {

            const response = await loginUser(user);


            if ('error' in response) {
                const error = response.error as ErrorResponse;
                throw new Error(error.data.message);
            }

            const { status, token } = response.data;
            if (status !== 'success') {
                throw new Error('Login failed');
            }

            dispatch(saveToken(token));


            const data = await getSingleUser(token?.userId, token?.access_token);

            if ('error' in data) throw new Error('User not found');
            const { status: userStatus, data: { user: mongoUser } } = data;

            if (userStatus !== 'success') {
                throw new Error('User not found');
            }

            toast.success('User logged in successfully');
            dispatch(saveUser(mongoUser));

            navigate(from, { replace: true });

            localStorage.setItem('user', JSON.stringify(token));
        }
        catch (err) {
            toast.error((err as Error).message || 'Log in failed');
        }
    };



    return (
        <div className="h-screen py-4 grid place-items-center
        px-8 md:px-20
        ">

            <main className="bg-red-200 rounded-lg w-full flex flex-col lg:flex-row xl:w-3/4">
                <aside className="login-cover  relative rounded-t-lg lg:rounded-l-lg bg-top min-h-[200px] xs:bg-no-repeat xs:bg-[center_top_-6rem] sm:bg-[center_top_-8rem] md:bg-[center_top_-12rem] lg:bg-center flex-1 ">
                    <div className="absolute inset-0 cover-gradient opacity-30"></div>
                </aside>

                <div className="grid place-items-center rounded-b-lg lg:rounded-r-lg flex-1 py-3 lg:py-10  bg-gray-200">
                    <div className="flex flex-col gap-3">

                        <form
                            onSubmit={submitHandler}
                            className="flex flex-col gap-2 sm:gap-4 lg:gap-4"
                        >
                            <div className="flex  justify-center items-center">
                                <img src={logo} alt="logo" className="w-12 lg:w-16 2xl:w-20" />
                            </div>
                            <h1 className="title lg:text-3xl mb-7">Welcome Back</h1>

                            <Input
                                type="email"
                                placeholder="test@email.com"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                type="Password"
                                placeholder="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="mx-auto text-xs">Already Logged in ? <Link className="text-blue-600 underline" to="/signup">Signup now</Link></p>
                            <div className="lg:pl-32 grid place-items-center mt-8">
                                <button className="bg-cyan-400 text-white font-semibold text-sm w-2/5 mx-auto py-1 rounded-md"
                                    type="submit">
                                    Login
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

            </main>

        </div>
    )
}
export default Login