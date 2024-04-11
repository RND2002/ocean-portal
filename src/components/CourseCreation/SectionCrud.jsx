// import React, { useState } from 'react'

// const SectionCrud = () => {

//     const[text,setText]=useState('')
//     const[length,setLength]=useState('')
//     const[fileUrl,setFileUrl]=useState('')
//     const [name,setName]=useState('')


//     function handleLengthChange(e){
//         setLength(e.target.value)
//     }

//     function handleSubmit(e){
//         e.preventDefault()

//     }
//   return (
//     <>
//        <div>
//   <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Resource</label>
//   <div class="relative mt-2 rounded-md shadow-sm">
    
//     <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Resource-URL"/>
//     <div class="absolute inset-y-0 right-0 flex items-center">
//       <label for="currency" class="sr-only">Resource-name</label>
//       <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
//         <option>Text</option>
//         <option>File-URl</option>
//         <option>Video-URL</option>
//       </select>
//     </div>
//   </div>
// </div>
//         <div>
//         <label
//           for="price"
//           class="block text-sm font-medium leading-6 text-gray-900"
//         >
//           Length
//         </label>
//         <div class="relative mt-2 rounded-md shadow-sm">
//           <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={setLength}
//             onChange={handleLengthChange}
//             class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             placeholder="Paste Video Resource here"
//           />
          
//         </div>
//         </div>
//     </>
//   )
// }

// export default SectionCrud
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../authservice/AuthProvider';
import { createLectureApi } from '../../apis/courseApi';
import UnstyledButtonCustom from '../ButtonComponent';


const SectionCrud = () => {
    const navigate=useNavigate()
    const id=useParams().sectionId
    console.log(id)
    const [lectureData, setLectureData] = useState({
        name: '',
        
        resource: {
            name: '',
            size: 0,
            url: ''
        }
    });

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLectureData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleResourceChange = (e) => {
        const { name, value } = e.target;
        setLectureData(prevState => ({
            ...prevState,
            resource: {
                ...prevState.resource,
                [name]: value
            }
        }));
    };

    const authContext=useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(lectureData)
            const response = await createLectureApi(lectureData,id,authContext.token)
                
          
            
            if (response.status===201) {
                console.log('Lecture saved successfully');
                navigate('/welcome')
            } 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    return (
        <form onSubmit={handleSubmit} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <label htmlFor="lectureName" className="block text-sm font-medium leading-6 text-gray-900">
                    Lecture Name
                </label>
                <input
                    type="text"
                    id="lectureName"
                    name="name"
                    value={lectureData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    placeholder="Enter Lecture Name"
                />
            </div>

            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <label htmlFor="resourceName" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource Name
                </label>
                <input
                    type="text"
                    id="resourceName"
                    name="name"
                    value={lectureData.resource.name}
                    onChange={handleResourceChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    placeholder="Enter Resource Name"
                />
            </div>

            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <label htmlFor="resourceSize" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource Size
                </label>
                <input
                    type="number"
                    id="resourceSize"
                    name="size"
                    value={lectureData.resource.size}
                    onChange={handleResourceChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    placeholder="Enter Resource Size"
                />
            </div>

            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <label htmlFor="resourceUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource URL
                </label>
                <input
                    type="text"
                    id="resourceUrl"
                    name="url"
                    value={lectureData.resource.url}
                    onChange={handleResourceChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    placeholder="Enter Resource URL"
                />
            </div>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <label htmlFor="resourceUrl" className="block text-sm font-medium leading-6 text-gray-900">
                   
                </label>
                <input
                    type="text"
                    id="resourceUrl"
                    name="url"
                    hidden
                    value={lectureData.sectionId}
                    onChange={handleResourceChange}
                    

                    
                />
            </div>

            {/* <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Save Lecture
            </button> */}

           {/* <div className='flex justify-center mt-4'> <UnstyledButtonCustom name="Save Lecture"/></div> */}
        <div className='sm:mx-auto sm:w-full sm:max-w-sm m-6'>
        <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" type="submit">
    <div class="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span class="relative text-black group-hover:text-white">Save Lecture</span>
  </button>
        </div>
        </form>
    );
};

export default SectionCrud;
