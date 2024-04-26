import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import toast from "react-hot-toast";


import Input from "@ui/Input"
import { useRegisterUserMutation } from "@api/userApi";
import { ErrorResponse } from "@/Types/apiTypes";



const logo = "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309_640.png";




const Signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp';

    const [registerUser] = useRegisterUserMutation();


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const user = {
            _id: uuid() as string,
            name,
            email,
            password,
            image,
            gender,
            dob,
        }

        try {

            const response = await registerUser(user);


            if ('error' in response) {
                const error = response.error as ErrorResponse
                throw new Error(error.data.message);
            }

            const { status, message } = response.data;
            if (status === 'success') {
                toast.success(message);
                navigate('/login');
            }
            // console.log(status, message);


        }
        catch (err) {
            toast.error((err as Error).message || 'Signup failed');
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
                            <h1 className="title lg:text-3xl mb-7">Create New Account</h1>

                            <Input
                                type="text"
                                placeholder="John Doe"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

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
                            <Input
                                variant="DATE"
                                type="date"
                                label="DOB"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                            <Input
                                variant="SELECT"
                                type="gender"
                                label="Gender"
                                value={gender}
                                options={['male', 'female']}
                                onSelect={(e) => setGender(e.target.value)}
                            />
                            <p className="mx-auto text-xs">Already Signedup ? <Link className="text-blue-600 underline" to="/login">Login now</Link></p>
                            <div className="lg:pl-32 grid place-items-center mt-8">
                                <button className="bg-cyan-400 text-white font-semibold text-sm w-2/5 mx-auto py-1 rounded-md"
                                    type="submit">
                                    Signup
                                </button>
                            </div>
                        </form>


                    </div>
                </div>

            </main>

        </div>
    )
}
export default Signup