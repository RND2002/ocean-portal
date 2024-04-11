import React from 'react'
import AuthProvider, { useAuth } from '../authservice/AuthProvider'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginComponent from '../components/login/LoginComponent'
import UserDashboard from '../components/dashboard/UserDashboard'
import NavbarComponent from '../components/navbar/NavbarComponent'
import CourseCrudForm from '../components/CourseCreation/CourseCrudForm'
import SectionCrud from '../components/CourseCreation/SectionCrud'
import { CourseOfAuthor } from '../components/CourseCreation/CourseOfAuthor'
import SectionsComponent from '../components/CourseCreation/SectionsComponent'
import SectionList from '../components/CourseCreation/SectionList'
import Signup from '../components/Signup'
import AboutUs from '../components/AboutUs'

const Router = () => {
    function AuthenticatedRoute({children}) {
        const authContext = useAuth()
        
        if(authContext.isAuthenticated)
            return children
    
        return <Navigate to="/" />
    }
  return (
    <div>
        <AuthProvider>
            <BrowserRouter>
            <NavbarComponent/>
            <Routes>
         <Route path='users/registration' Component={Signup}/>
         <Route path='about-us' Component={AboutUs}/>
                
                <Route path='/' Component={LoginComponent}/>
               
                <Route path='/welcome' element={
                            <AuthenticatedRoute>
                                <UserDashboard />
                            </AuthenticatedRoute> 
                        } />
                  <Route path='/course/create' element={
                            <AuthenticatedRoute>
                                <CourseCrudForm />
                            </AuthenticatedRoute> 
                        } />
                    <Route path='/course/resources/:sectionId' element={
                        <AuthenticatedRoute>
                            <SectionCrud/>
                        </AuthenticatedRoute>
                    }/>
                      <Route path='/courses/author/all' element={
                        <AuthenticatedRoute>
                            <CourseOfAuthor/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path='/course/edit/:id' element={
                        <AuthenticatedRoute>
                            <SectionsComponent/>
                        </AuthenticatedRoute>
                    }/>
                     <Route path='/sections/:id' element={
                        <AuthenticatedRoute>
                            <SectionList/>
                        </AuthenticatedRoute>
                    }/>
            </Routes>
            </BrowserRouter>
            
        </AuthProvider>
    </div>
  )
}

export default Router

