import React, { useEffect } from 'react'
import { useState } from 'react'
import AuthNav from '../Auth/AuthNav'
import { useGlobalContext } from '../Function/Context'
import { auth } from '../Utils/Firebase'
import Sidebar from './Components/Sidebar'
import EditBlog from './EditBlog'
import AddBlog from './Pages/AddBlog'
import AddCourse from './Pages/AddCourses'
import AddStaffs from './Pages/AddStaffs'
import AddStudents from './Pages/AddStudent'
import AddUsers from './Pages/AddUsers'
import Dashboard from './Pages/Dashboard'
import Message from './Pages/Message'

export const Admin = () => {

    const { pageState, user, navigate, handleLogout } = useGlobalContext()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {

            } else {
                navigate('/auth')
            }
        });
    }, []);

    return (
        <div className='admin'>


            {
                user?.displayName === 'SuperAdmin' &&
                <Sidebar />

            }




            {



                pageState === 'blog' && user?.displayName === 'SuperAdmin' ? <AddBlog /> :
                    pageState === 'msg' && user?.displayName === 'SuperAdmin' ?
                        <Message /> :


                        pageState === 'course' && user?.displayName === 'SuperAdmin' ? <AddCourse /> :
                            pageState === 'staff' && user?.displayName === 'SuperAdmin' ? <AddStaffs /> :
                                pageState === 'settings' && user?.displayName === 'SuperAdmin' ?
                                    <AddUsers /> :
                                    pageState === 'student' && user?.displayName === 'SuperAdmin' ?
                                        <AddStudents /> :
                                        <Dashboard />

            }






        </div>
    )
}
