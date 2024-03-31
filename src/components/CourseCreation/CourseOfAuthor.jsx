import React, { useEffect, useState } from 'react'
import { retrieveAllCoursesForAuthor } from '../../apis/courseApi'
import { useAuth } from '../../authservice/AuthProvider'
import { Link, useParams } from 'react-router-dom'

export const CourseOfAuthor = () => {
    const [coursesForAuthor,setCoursesForAuthor]=useState([])
    const authContext=useAuth()
    async function getAllCoursesForAuthor(){
       const response=await retrieveAllCoursesForAuthor(authContext.token,"john@example.com");
       if(response.status===200){
        setCoursesForAuthor(response.data);
        console.log("done")
       }else{
        console.log("error fetching data");
       }
    }
   
    useEffect(()=>{
        getAllCoursesForAuthor()
    },[])
  return (
    <>
         <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Browse Courses of your interest</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {coursesForAuthor.map((course) => (
                        <Link key={course.id} to={`/course/edit/${course.id}`} className="group relative">
                        {/* <div key={course.id} className="group relative"> */}
                            
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
                            <div className="mt-4"> <p className="text-sm font-medium text-gray-900">{course.tags}</p></div>
                        {/* </div> */}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}
