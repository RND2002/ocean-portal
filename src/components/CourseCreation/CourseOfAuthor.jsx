// import React, { useEffect, useState } from 'react'
// import { retrieveAllCoursesForAuthor } from '../../apis/courseApi'
// import { useAuth } from '../../authservice/AuthProvider'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import LinearColor from '../Loader'
// import { fetchUserDataApi, makeUserAuthor } from '../../apis/LoginApi'

// export const CourseOfAuthor = () => {
//     const [coursesForAuthor,setCoursesForAuthor]=useState([])
//     const [isLoading,setLoading]=useState(true)
//     const [isAuthor,setisAuthor]=useState('')
//     const [isUserAuthor,setUserAuthor]=useState(true)
    
//     const authContext=useAuth()
//     async function getAllCoursesForAuthor(){
        
//        const response=await retrieveAllCoursesForAuthor(authContext.token,authContext.username);
//        if(response.status===200){
//         setCoursesForAuthor(response.data);
//         setLoading(false)
//         console.log("done")
//        }else{
//         console.log("error fetching data");
//        }
//     }

//     async function checkUserForAuthor(){
//         const response=await fetchUserDataApi(authContext.token,authContext.username)
//       if(response.status===200){
//         //console.log(response.data.roles[0].name)
//        for(let i=0;i<response.data.roles.length;i++){
//         let role=response.data.roles[i]
//         if( role==="ROLE_AUTHOR"){
//             setisAuthor(response.data.roles[i])
//         }
//        }
//         //console.log(response.data);
//       }else{
//         console.log("Error loading data")
//       }
//       }
      

      
      
   
//     useEffect(()=>{
//         checkUserForAuthor()
//         if(!isAuthor.match("ROLE_AUTHOR")){
//             getAllCoursesForAuthor()
//         }else{
//             setUserAuthor(false)
//             clickedForAuthor()
//         }
        
//     },[])

//     function clickedForAuthor(){
//         makeUserAuthor()
//     }

//     const authorObject={
        
//         role:"ROLE_AUTHOR"
//     }
//     const navigate=useNavigate()
    

//     async function makeUserAuthor(){
//         const response=await makeUserAuthor(authContext.token,authorObject)
//         if(response.status===200){
//             navigate(`/welcome`)
//         }else{
//             console.log("error")
//         }
//     }
//   return (
//     <>
//      {isUserAuthor &&<div>You are not Author yet register yourself as Author<button className='rounded-lg border-black m-2' onClick={()=>clickedForAuthor()}>Register as author</button></div>}
//          <div className="bg-white">
         
        
//          {isLoading && <LinearColor/>}
//          {setCoursesForAuthor.length==0 &&<div>You haven't created course yet</div>}
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Browse Courses of your interest</h2>

//                 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                     {coursesForAuthor.map((course) => (
//                         <Link key={course.id} to={`/course/edit/${course.id}`} className="group relative">
//                         {/* <div key={course.id} className="group relative"> */}
                            
//                             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                                 <img
//                                     src={`data:image/jpeg;base64,${course.image}`} // Set the image source using base64 data
//                                     alt={course.title}
//                                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                                 />
//                             </div>
                            
//                             <div className="mt-4 flex justify-between">
//                                 <div>
//                                     <h3 className="text-sm text-gray-700">
//                                         <a href={course.href}>
//                                             <span aria-hidden="true" className="absolute inset-0" />
//                                             {course.title}
//                                         </a>
//                                     </h3>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-900">{course.tags}</p>
//                             </div>
//                             <div className="mt-4"> <p className="text-sm font-medium text-gray-900">{course.tags}</p></div>
//                         {/* </div> */}
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }
import React, { useEffect, useState } from 'react'
import { retrieveAllCoursesForAuthor } from '../../apis/courseApi'
import { useAuth } from '../../authservice/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import LinearColor from '../Loader'
import { fetchUserDataApi, makeUserAuthor } from '../../apis/LoginApi'

export const CourseOfAuthor = () => {
    const [coursesForAuthor, setCoursesForAuthor] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isAuthor, setIsAuthor] = useState('')
    const [isUserAuthor, setUserAuthor] = useState(true)
    
    const authContext = useAuth()
    
    async function getAllCoursesForAuthor() {
        const response = await retrieveAllCoursesForAuthor(authContext.token, authContext.username);
        if (response.status === 200) {
            setCoursesForAuthor(response.data);
            setLoading(false);
            console.log("done");
        } else {
            console.log("error fetching data");
        }
    }

    async function checkUserForAuthor() {
        const response = await fetchUserDataApi(authContext.token, authContext.username);
        if (response.status === 200) {
            for (let i = 0; i < response.data.roles.length; i++) {
                let role = response.data.roles[i];
                if (role === "ROLE_AUTHOR") {
                    setIsAuthor(response.data.roles[i]);
                }
            }
        } else {
            console.log("Error loading data");
        }
    }
      
    useEffect(() => {
        checkUserForAuthor();
    }, []); // Dependency array should be empty to run once when component mounts

    useEffect(() => {
        if (!isAuthor.match("ROLE_AUTHOR")) {
            getAllCoursesForAuthor();
        } else {
            setUserAuthor(false);
        }
    }, [isAuthor]); // Dependency array should include isAuthor

    const authorObject = {
        role: "ROLE_AUTHOR"
    };

    const navigate = useNavigate();

    async function clickedForAuthor() {
        const response = await makeUserAuthor(authContext.token,authContext.username, authorObject);
        if (response.status === 200) {
            navigate(`/welcome`);
        } else {
            console.log("error");
        }
    }

    return (
        <>
            {isUserAuthor && <div>You are not an Author yet. Register yourself as an Author<button className='rounded-lg border-black m-2' onClick={clickedForAuthor}>Register as author</button></div>}
            <div className="bg-white">
                {isLoading && <LinearColor />}
                {coursesForAuthor.length === 0 && <div>You haven't created any courses yet.</div>}
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Browse Courses of your interest</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {coursesForAuthor.map((course) => (
                            <Link key={course.id} to={`/course/edit/${course.id}`} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`data:image/jpeg;base64,${course.image}`} // Set the image source using base64 data
                                        alt={course.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={course.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {course.title}
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{course.tags}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-900">{course.tags}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
