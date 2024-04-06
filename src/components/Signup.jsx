

// export default Signup;
import React, { useState } from "react";
import { sendUserRegistrationData } from "../apis/LoginApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role:[{
      id: 0,
      name: "ROLE_USER"
    }]
  });

  //const [role,setRole]=useState({})

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prevState => ({
        ...prevState,
        [name]: value
    }));
};

// const handleRoleChange=()=>{
//   setRole("ROLE_USER")
// }
  

 async function handleUserForm(e) {
  e.preventDefault();
  try {
    console.log(userForm)
    const response = await sendUserRegistrationData(userForm);
    if (response.status === 200) {
      setMessage("Form submission successful");
    goToLoginPage();
    } else {
      setMessage("Issues on the server: " + response.status);
    }
  } catch (error) {
    console.log(error);
    setMessage("Error occurred while submitting the form");
  }
}

  
  const navigate=useNavigate()
 function goToLoginPage(){
  navigate('/')
 }
  return (
    <div className="flex flex-col justify-center align items-center">
      <div>
        <form method="post" onSubmit={handleUserForm} className="w-full max-w-sm">
          <div>
            <br />
          </div>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter firstname"
            maxLength="50"
            pattern="[A-Za-z]{1,50}"
            title="Name can not contain numbers"
            value={userForm.firstName}
            onChange={handleInputChange}
          />
          <div>
            <br />
          </div>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter lastname"
            maxLength="50"
            pattern="[A-Za-z]{1,50}"
            title="Lastname can not contain numbers"
            value={userForm.lastName}
            onChange={handleInputChange}
          />
          <div>
            <br />
          </div>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            maxLength="50"
            value={userForm.email}
            onChange={handleInputChange}
          />
          <div>
            <br />
          </div>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={userForm.password}
            onChange={handleInputChange}
          />
          <div>
            <br />
          </div>
          <div>
            <br />
          </div>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="role"
            name="role"
            type="role"
            placeholder="Enter password"
            value={userForm.role}
            onChange={handleInputChange}
          />
          <div>
            <br />
          </div>
          {/* <div>
            <span className="flex justify-between">
              Author
              <input
  type="checkbox"
  name="roles"
  value="ROLE_AUTHOR"
  checked={userForm.roles.includes("ROLE_AUTHOR")}
  onChange={handleInputChange}
/>
<input
  type="checkbox"
  name="roles"
  value="ROLE_USER"
  checked={userForm.roles.includes("ROLE_USER")}
  onChange={handleInputChange}
/>

            </span>
          </div> */}
          <div className="flex justify-center align items-center mt-5">
            <button 
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
