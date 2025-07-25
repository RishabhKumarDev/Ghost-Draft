import { useState } from "react";
import { Button, Input, Logo } from "./index";
import authServices from "../appwrite/auth";
import { login } from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");

  const navitage = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authServices.loginUser(data); // after login it return a session not the user data;
      if (session.success) {
        const user = await authServices.getUser(); // this will return the data or user;
        if (user.success) {
          dispatch(login(user.data));
          navitage("/");
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className=" flex items-center justify-center w-full">
      <div className=" mx-auto w-full max-w-lg bg-gray-100 border border-black/10 rounded-xl p-10">
        <div className=" mb-2 flex justify-center">
          <span className=" inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className=" text-center font-bold text-2xl leading-tight">
          sing in to your account
        </h2>
        <p className=" mt-2 text-center text-base text-black/60">
          {" "}
          Don't have an account?
          <Link
            to={"/signup"}
            className=" font-medium text-primary transition-all hover:underline duration-200"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className=" mt-8 text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className=" mt-8">
          <div className=" space-y-5">
            <Input
              label="Email:"
              type="email"
              placeholder="Enter your email.."
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(
                      value
                    ) || "Email address must be an valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: (value) =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    value
                  ) || " Please Enter a Strong Password",
              })}
            />
            <Button 
            children="LogIn"
            type="submit"
            className=" w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
