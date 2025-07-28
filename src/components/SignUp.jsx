import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authServices from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../store/features/authSlice";

function Signup() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    console.log(data);
    setError("");
    try {
      // reverse engenering of if else logic, instead of if the data is true do this; it's if the data is not true do this(better for error handling);
      const user = await authServices.createUser(data);
      if (!user.success) {
        throw new Error(user.error.message || "Failed to sign up user.");
      }

      const session = await authServices.loginUser(data);
      if (!session.success) {
        throw new Error(
          session.error.message || "Failed to log in user :: sign up user"
        );
      }

      const userData = await authServices.getUser();
      if (!userData.success) {
        throw new Error(
          userData.error.message || "Failed to get user Data :: sign up user."
        );
      }

      dispatch(login(userData.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-zinc-900 border border-zinc-700 shadow-[0_0_20px_-5px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.25)] transition-shadow duration-300 rounded-xl p-10">
        <div className=" mb-2 flex justify-center">
          <span className=" inline-block w-full max-w-[120px]">
            <Logo />
          </span>
        </div>
        <h2 className=" text-center font-bold text-2xl leading-tight text-white">
          sing up to create account
        </h2>
        <p className=" mt-2 text-center text-base  text-zinc-400">
          {" "}
          Already have an account?
          <Link
            to={"/login"}
            className=" font-medium text-amber-400 hover:text-amber-300 transition-all hover:underline duration-200"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className=" mt-8 text-red-600 text-sm text-center">{error}</p>
        )}
        <form
          onSubmit={handleSubmit(signUp, (errors) => {
            console.log("Validation errors:", errors);
          })}
        >
          <div className=" space-y-5">
            <Input
              label="Name"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
            <Input
              label="Email:"
              type="email"
              placeholder="Enter you Email"
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
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
            <Button className=" w-full " type="submit">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
