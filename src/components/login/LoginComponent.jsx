import React, { useState } from "react";
import { useAuth } from "../../authservice/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleUserNameChange = (e) => {
    setusername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const authContext = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault()
    if(await authContext.login(username,password)){
      navigate(`/welcome`)

    }else{
      setShowErrorMessage(true)
    }
  }

  function goToSignupPage(){
    navigate(`users/registration`)
  }
  return (
    <>
     {showErrorMessage && <div className="errorMessage">Authentication Failed. 
                                                            Please check your credentials.</div>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your Udemy Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="email"
                  autoComplete="email"
                  onChange={handleUserNameChange}
                  value={username}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New User
          </p>
          <button onClick={goToSignupPage} type="button" className="bg-blue">Sign-up here</button>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
