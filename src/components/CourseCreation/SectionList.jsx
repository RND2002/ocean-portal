// import React, { useEffect, useState } from 'react'
// import { getAllSectionsApi } from '../../apis/courseApi'
// import { useAuth } from '../../authservice/AuthProvider'
// import { useParams } from 'react-router-dom'

// const SectionList = () => {
//     const [sections,setSections]=useState([])
//     const authContext=useAuth()
//     const courseId=useParams().id
//     console.log(courseId)
//     async function getAllSectionForCourse(){
//         const response=await getAllSectionsApi(authContext.token,courseId)
//         if(response.status===200){
//           setSections(response.data)
//           console.log(response.data)
//         }else{
          
//          console.log("error")
//         }
//       }
//       useEffect(()=>{
//         getAllSectionForCourse()
//       },[])
//   return (
//     <div class="max-w-screen-lg mx-auto mt-4">
//     <ul role="list" class="divide-y divide-gray-100">
//       {sections.map((section) => (
//         <li class="py-5">
//           <div class="flex items-center gap-4">
//             <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
//               <span class="font-bold text-lg text-gray-700">{section.sectionOrder}</span> 
//             </div>
//             <div>
//               <p class="text-sm font-semibold leading-6 text-gray-900">{section.name}</p>
//               <p class="mt-1 truncate text-xs leading-5 text-gray-500">{section.sectionOrder}</p>
//             </div>
//           </div>
//           <div class="hidden sm:flex sm:flex-col sm:items-end -mt-14">
//           <button
//                 type="submit"
//                 className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//                 View Lecture
//             </button>
//             <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
  
//   )
// }

// export default SectionList
// import React, { useEffect, useState } from 'react'
// import { getAllSectionsApi, getLecturesApi } from '../../apis/courseApi'
// import { useAuth } from '../../authservice/AuthProvider'
// import { useParams } from 'react-router-dom'

// const SectionList = () => {
//   const [sections, setSections] = useState([])
//   const [sectionId,setSectionId]=useState(0)
//   const [showLectures, setShowLectures] = useState(false) // State variable to track whether lectures are visible
//   const authContext = useAuth()
//   const courseId = useParams().id

//   async function getAllSectionForCourse() {
//     const response = await getAllSectionsApi(authContext.token, courseId)
//     if (response.status === 200) {
//       setSections(response.data)
//       console.log(response.data)
//     } else {
//       console.log("error")
//     }
//   }

//   useEffect(() => {
//     getAllSectionForCourse()
//   }, [])

//   async function getLectures(){
    
//   }

//   // Function to toggle visibility of lectures
//   const toggleLectures = () => {
//     setShowLectures(!showLectures)
//   }

//   async function fetchLectures(){
//     const response=await getLecturesApi(authContext.token,sectionId)
//     if(response.status===200){
//       console.log(response.data)
//     }else{
//       console.log("error")
//     }
//   }



//   return (
//     <div class="max-w-screen-lg mx-auto mt-4">
//       <ul role="list" class="divide-y divide-gray-100">
//         <div><h1>Take care of nested lectures with all courses</h1></div>
//         {sections.map((section) => (
//           <li class="py-5">
//             <div class="flex items-center gap-4">
//               <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
//                 <span class="font-bold text-lg text-gray-700">{section.sectionOrder}</span>
//               </div>
//               <div>
//                 <p class="text-sm font-semibold leading-6 text-gray-900">{section.name}</p>
//                 <p class="mt-1 truncate text-xs leading-5 text-gray-500">{section.sectionOrder}</p>
//               </div>
//             </div>
//             {showLectures && (
//               <div class="hidden sm:flex sm:flex-col sm:items-end -mt-14">
//                 <button
//                   type="button"
//                   onClick={toggleLectures}
//                   className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Hide Lecture
//                 </button>
//                 {/* Render lectures here */}
//                 {/* For example: */}
//                 {/* {const response=retreiveAllLectures(authContext.token,sectionId)} */}
//                 <ul>
//                   {section.lectures.map((lecture, index) => (
//                     <li key={index}>{lecture.name}</li>
//                   ))}
//                 </ul>
//                 <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
//               </div>
//             )}
//             {!showLectures && (
//               <div class="hidden sm:flex sm:flex-col sm:items-end -mt-14">
//                 <button
//                   type="button"
//                   onClick={toggleLectures}
//                   className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   View Lecture
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default SectionList
// import React, { useEffect, useState } from 'react';
// import { getAllSectionsApi, getLecturesApi } from '../../apis/courseApi';
// import { useAuth } from '../../authservice/AuthProvider';
// import { useParams } from 'react-router-dom';

// const SectionList = () => {
//   const [sections, setSections] = useState([]);
//   const [lectures, setLectures] = useState([]);
//   const authContext = useAuth();
//   const courseId = useParams().id;

//   async function getAllSectionForCourse() {
//     try {
//       const response = await getAllSectionsApi(authContext.token, courseId);
//       if (response.status === 200) {
//         setSections(response.data);
//       } else {
//         console.log('Error fetching sections');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   useEffect(() => {
//     getAllSectionForCourse();
//   }, []);

//   async function fetchLectures(sectionId) {
//     try {
//       const response = await getLecturesApi(authContext.token, sectionId);
//       if (response.status === 200) {
//         setLectures(response.data);
//       } else {
//         console.log('Error fetching lectures');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   return (
//     <div className="max-w-screen-lg mx-auto mt-4">
//       <ul role="list" className="divide-y divide-gray-100">
//         {sections.map((section) => (
//           <li className="py-5" key={section.id}>
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
//                 <span className="font-bold text-lg text-gray-700">{section.sectionOrder}</span>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold leading-6 text-gray-900">{section.name}</p>
//                 <p className="mt-1 truncate text-xs leading-5 text-gray-500">{section.sectionOrder}</p>
//               </div>
//             </div>
//             <div className="hidden sm:flex sm:flex-col sm:items-end -mt-14">
//               <button
//                 type="button"
//                 onClick={() => fetchLectures(section.sectionId)}
//                 className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 View Lecture
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Render lectures */}
//       <div>
//         <h2>Lectures</h2>
//         <ul>
//           {lectures.map((lecture) => (
//             <li key={lecture.id}>
//               <p>{lecture.name}</p>
//               <p>Resource Name: {lecture.resource.name}</p>
//               <p>Resource Size: {lecture.resource.size}</p>
//               <a href={lecture.resource.url} target="_blank" rel="noopener noreferrer">
//                 View Resource
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SectionList;
import React, { useEffect, useState } from 'react'
import { getAllSectionsApi, getLecturesApi } from '../../apis/courseApi'
import { useAuth } from '../../authservice/AuthProvider'
import { Link, useParams } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinearColor from '../Loader';
import { Button } from '@mui/material';

const SectionList = () => {
  const [sections, setSections] = useState([])
  const [selectedSectionId, setSelectedSectionId] = useState(null); // State variable to track the selected section ID
  const [lectures, setLectures] = useState([]); // State variable to store lectures
  const [isLoading,setLoading]=useState(true)
  const authContext = useAuth()
  const courseId = useParams().id

  async function getAllSectionForCourse() {
    const response = await getAllSectionsApi(authContext.token, courseId)
    if (response.status === 200) {
      setSections(response.data)
    } else {
      console.log("error")
    }
  }

  useEffect(() => {
    getAllSectionForCourse()
  }, [])

  // Function to toggle visibility of lectures
  const toggleLectures = async (sectionId) => {
    
    const response = await getLecturesApi(authContext.token, sectionId); // Fetch lectures for the selected section ID
    if (response.status === 200) {
      console.log(response.data)
      setLectures(response.data);
      setLoading(false)
    } else {
      console.log("error")
    }
  }

  //const sectionId=useParams()

  return (
    
    <div>
      {sections.map((section) => (
        <React.Fragment key={section.sectionId}>
          <Accordion onChange={(event, expanded) => expanded && toggleLectures(section.sectionId)}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography><div className='flex-auto'><h5>Section name</h5>{section.name}</div></Typography>
              <Button component={Link} to={`/course/resources/${section.sectionId}`} variant="contained" color="primary">Add Lecture</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Section description will be displayed here in near future */}
                  <ul>
                {isLoading && <LinearColor/>}
                  {lectures.map((lecture) => (
                    <li key={lecture.id}>
                       
                      <p>{lecture.name}</p>
                      <p>Resource Name: {lecture.resource.name}</p>
                      <p>Resource Size: {lecture.resource.size}</p>
                      <a href={lecture.resource.url} target="_blank" rel="noopener noreferrer">View Resource</a>
                    </li>
                  ))}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
         
        </React.Fragment>
      ))}
    </div>
  
  )
}

export default SectionList



