import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../authservice/AuthProvider";
import { postCourseApi } from "../../apis/courseApi";
import Button from '@mui/material/Button';

const CourseCrudForm = () => {

  

  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [tags,settags]=useState('')
  const[file,setFile]=useState(null)
  const[authors,setAuthors]=useState([])

  function handleTitleChange(e){
    setTitle(e.target.value)
  }

  function handleDescriptionChange(e){
    setDescription(e.target.value)
  }

  function handleTagsChange(e){
    settags(e.target.value)
  }

  function handleImageChange(e){
    const file = e.target.files[0];
    setFile(file);
  }
  // function handleAuthorsChange(e){
  //   const authorsArray = e.target.value.split(','); // Convert string to array
  //   console.log(authorsArray)
  // setAuthors(authorsArray);
  // }
//   const handleAuthorsChange = (e) => {
//     const authorsString = e.target.value;
//     const authorsArray = authorsString.split(',').map(author => author.trim());
//     setAuthors(authorsArray);
// }
const handleAuthorsChange = (e) => {
  const authorString = e.target.value.trim(); // Trim leading/trailing whitespace

  // Check if the input is empty
  if (!authorString) {
    setAuthors([]);
    return;
  }

  const authorsArray = authorString.split(',').map(author => author.trim());
  setAuthors(authorsArray);
}


  

  const authContext=useAuth()

  const navigate=useNavigate()
  //const {username}=useParams()
  //console.log(username);
  



    async function handleCourseSubmit(e) {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('data', file); 
        formData.append('authors', authors);
        // Assuming 'file' is the file object you want to upload
        
        await postCourseApi(formData, authContext.token);
        // navigate('/welcome');
        navigate('/course/resources')
      } catch (error) {
        console.error('Error uploading course:', error);
      }
    }
  return (
    <div>
     <form method="post" onSubmit={handleCourseSubmit} enctype="multipart/form-data">
     <div>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Course Title
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Course Title"
          />
          
        </div>
        <div>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Description"
          />
          
        </div>
      </div>
      </div>
      <div>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Tags
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            onChange={handleTagsChange}
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Tags"
          />
          
        </div>
      </div>
      <div>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Course Display Image 
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="file"
            name="image"
            id="image"
            
            onChange={handleImageChange}
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Image"
          />
          
        </div>
      </div>
      <div>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Course Associated Authors 
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="authors"
            id="authors"
            value={authors}
            onChange={handleAuthorsChange}
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Authors"
          />
          
        </div>
      </div>
      <div className="mt-4">
      <Button variant="contained" color="success" type="submit">
        Submit-Course and Add Resources
        
      </Button>
      
      </div>
      </form> 
    </div>
  );
};

export default CourseCrudForm;

