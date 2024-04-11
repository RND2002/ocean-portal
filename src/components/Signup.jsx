

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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <center><h3 className="font-bold text-3xl">Register Yourself</h3></center>
      <div>
        <form method="post" onSubmit={handleUserForm} className="w-full max-w-sm">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            
         
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
           </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           
         
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
           </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            
         
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
           </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
          
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={userForm.password}
            onChange={handleInputChange}
          />
          </div>
          <div>
            
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           
          
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="role"
            name="role"
            type="role"
            hidden
            placeholder="Enter password"
            value={userForm.role}
            onChange={handleInputChange}
          />
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
          <div className='sm:mx-auto sm:w-full sm:max-w-sm m-6'>
        <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" type="submit">
    <div class="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span class="relative text-black group-hover:text-white">Register Yourself</span>
  </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
