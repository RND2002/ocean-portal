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


const SectionCrud = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    const [lectureData, setLectureData] = useState({
        name: '',
        sectionId: id,
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
            const response = await createLectureApi(lectureData,authContext.token)
                
          
            
            if (response.status===201) {
                console.log('Lecture saved successfully');
                navigate('/welcome')
            } 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lectureName" className="block text-sm font-medium leading-6 text-gray-900">
                    Lecture Name
                </label>
                <input
                    type="text"
                    id="lectureName"
                    name="name"
                    value={lectureData.name}
                    onChange={handleInputChange}
                    className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Lecture Name"
                />
            </div>

            <div>
                <label htmlFor="resourceName" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource Name
                </label>
                <input
                    type="text"
                    id="resourceName"
                    name="name"
                    value={lectureData.resource.name}
                    onChange={handleResourceChange}
                    className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Resource Name"
                />
            </div>

            <div>
                <label htmlFor="resourceSize" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource Size
                </label>
                <input
                    type="number"
                    id="resourceSize"
                    name="size"
                    value={lectureData.resource.size}
                    onChange={handleResourceChange}
                    className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Resource Size"
                />
            </div>

            <div>
                <label htmlFor="resourceUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource URL
                </label>
                <input
                    type="text"
                    id="resourceUrl"
                    name="url"
                    value={lectureData.resource.url}
                    onChange={handleResourceChange}
                    className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Resource URL"
                />
            </div>
            <div>
                <label htmlFor="resourceUrl" className="block text-sm font-medium leading-6 text-gray-900">
                    Resource URL
                </label>
                <input
                    type="text"
                    id="resourceUrl"
                    name="url"
                    value={lectureData.sectionId}
                    onChange={handleResourceChange}
                    className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter Resource URL"
                />
            </div>

            <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Save Lecture
            </button>
        </form>
    );
};

export default SectionCrud;
