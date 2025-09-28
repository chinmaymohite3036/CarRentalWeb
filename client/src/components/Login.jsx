// client/src/components/Login.jsx
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setShowLogin, registerUser, loginUser } = useAppContext();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "Sign Up") {
      await registerUser(name, email, password);
    } else {
      await loginUser(email, password);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-80 sm:w-[360px] text-gray-600 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-semibold m-auto text-gray-800">
          {state}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p className="font-medium">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your Name"
              className="border border-gray-300 rounded w-full p-2.5 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p className="font-medium">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="your.email@example.com"
            className="border border-gray-300 rounded w-full p-2.5 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p className="font-medium">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="********"
            className="border border-gray-300 rounded w-full p-2.5 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        <button className="bg-primary hover:bg-primary-dull transition-colors text-white w-full py-2.5 rounded-md cursor-pointer font-semibold mt-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        
        {state === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary cursor-pointer font-semibold"
            >
              Sign up here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary cursor-pointer font-semibold"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;