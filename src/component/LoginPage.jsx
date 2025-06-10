import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [match, setMatch] = useState("");

  const userValue = "abcd";
  const userPassword = "1234";

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = (event) => {
    setInputValue(event.target.value);
  };

  const handlePassword = (e) => {
    setMatch(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === userValue && match === userPassword) {
      navigate("/Registration_Page");
    } else {
      alert("Username or password mismatch");
    }
  };

  return (
    <div className=" w-full  flex flex-col mt-20 items-center  px-4 sm:px-8">
       

      <div className="w-full max-w-6xl bg-white rounded-xl  grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 ">
        {/* Form Section */}
        <div className="flex flex-col justify-center px-4 ">
          <h2
            data-aos="zoom-in"
            className="text-md sm:text-2xl font-bold text-center mb-2"
          >
            Welcome
          </h2>
          <p
            data-aos="zoom-in"
            className="sm:text-3xl text-xl text-center font-bold text-black mb-6"
          >
            HelloUdyami
          </p>

          <form
            data-aos="zoom-in"
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Username */}
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                placeholder="Username"
                autoComplete="username"
                value={inputValue}
                onChange={handleLogin}
                className="w-full border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={match}
                  onChange={handlePassword}
                  className="w-full border-2 border-gray-400 rounded-lg px-4 py-2 pr-16 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button className="text-sm text-blue-600 mt-1 hover:underline float-right">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="bg-indigo-700 text-white py-2 rounded-xl hover:bg-indigo-800 transition"
            >
              Login
            </button>

            {/* Other Login Options */}
            {/* <div className="text-center mt-4">
              <p className="mb-3 text-gray-600">------ or continue with ------</p>
              <div className="flex justify-center gap-4">
                <img className="h-10 w-10 cursor-pointer" src="/google.png" alt="Google" />
                <img className="h-10 w-10 cursor-pointer" src="/apple.png" alt="Apple" />
                <img className="h-10 w-10 cursor-pointer" src="/facebook.png" alt="Facebook" />
              </div>
            </div> */}

            {/* Register Prompt */}
            <div className="text-center mt-4 text-sm">
              Not a member?{" "}
              <button className="text-blue-600 hover:underline">Register now</button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div
          data-aos="zoom-in"
          className="hidden lg:flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden h-[450px]"
        >
          <img
            src="/LoginPage_Image.png"
            alt="illustration"
            className="object-cover h-full w-full p-2 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
