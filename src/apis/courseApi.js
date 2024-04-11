
import { apiClient } from "./apiClient";



// export const createQuizWithForm=(category,numQ,title,token)=>apiClient.post(`/quiz/create?category=${category}&numQ=${numQ}&title=${title}`,category,numQ,title,token)
// export const postCourseApi=(token,course)=>apiClient.post(`course/create`)
export const postCourseApi = (formData, token) => {
    return apiClient.post('course/create', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const createLectureApi=(lecture,sectionId,token)=>{
    return apiClient.post(`sections/${sectionId}/lectures`,lecture,{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
  }

  export const createSectionApi = (token, courseId, sectionData) => {
    return apiClient.post(`/courses/${courseId}/sections`, sectionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
export const getLecturesApi=(token,sectionId)=>{
  return apiClient.get(`/sections/${sectionId}/lectures`,{
    headers:{
      Authorization:`Bearer ${token}`
    },
  });
}  
  
  


export const getAllSectionsApi = (token, courseId) => {
  return apiClient.get(`/courses/${courseId}/sections`, {
    headers: {
      Authorization: `Bearer ${token}` // Assuming your token needs to be sent in the Authorization header
    }
  });
};

export const retrieveAllCourses=(token)=>apiClient.get(`/course/get/all`)
export const retrieveAllCoursesForAuthor=(token,username)=>apiClient.get(`/course/${username}`)
export const submitResponse=(id,responses,token)=>apiClient.post(`/quiz/submit/${id}`,responses,token)