import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../authservice/AuthProvider";
import { createSectionApi } from "../../apis/courseApi";
import { Button } from "@mui/material";
import UnstyledButtonCustom from "../ButtonComponent";

const SectionsComponent = () => {
  const [section, setSection] = useState({
    name: "",
    sectionOrder: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // useEffect(()=>{
  //   getAllSectionForCourse()
  // },[])

  const navigate = useNavigate();
  const courseId = useParams().id;
  console.log("courseId is" + courseId);
  const authContext = useAuth();
  async function createSectionCaller(e) {
    e.preventDefault();
    const response = await createSectionApi(
      authContext.token,
      courseId,
      section
    );
    if (response.status === 200) {
      console.log(response);
      navigate(`/sections/${courseId}`);
    } else {
      console.log("Error");
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2>Create section here</h2>

      <form method="post" onSubmit={createSectionCaller}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Section name
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="name"
              id="title"
              value={section.name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Section name"
            />
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Section Order
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="sectionOrder"
              id="sectionOrder"
              value={section.sectionOrder}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Section Order"
            />
          </div>
        </div>
        {/* <Button variant="contained" color="success" type="submit">
        Submit
        
      </Button> */}
        {/* <div className="m-3 flex justify-center">
      <UnstyledButtonCustom name="Submit"/>

      </div> */}
        <div className="m-4">
          <button
            class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
            type="submit"
          >
            <div class="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white">
              Submit
            </span>
          </button>
        </div>
      </form>
      <Link
        key={courseId}
        to={`/sections/${courseId}`}
        className="group relative"
      >
        {/* <Button variant="contained" color="success" type="submit">
        view sections
        
      </Button> */}
        {/* <div className='flex justify-center'><UnstyledButtonCustom name="View Section" /></div> */}
        <button
          class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
          type="submit"
        >
          <div class="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white">
            View Section
          </span>
        </button>
      </Link>
    </div>
  );
};

export default SectionsComponent;
