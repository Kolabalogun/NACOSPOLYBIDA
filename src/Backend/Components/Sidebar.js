import React from 'react'
import { useGlobalContext } from '../../Function/Context'

const Sidebar = () => {

    const { pageState, pageStateF } = useGlobalContext()
    return (
        <div className='adminSidebar'>
            <h3>NASCOSPOLYBIDA</h3>

            <div className="menus">
                <div onClick={() => {
                    pageStateF('default')
                }} className={pageState === 'default' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/dash.svg" alt="" />
                    <p>Dashboard</p>
                </div>
                <div onClick={() => {
                    pageStateF('blog')
                }} className={pageState === 'blog' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/blog.svg" alt="" />
                    <p>Blog</p>
                </div>
                <div onClick={() => {
                    pageStateF('msg')
                }} className={pageState === 'msg' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/msg.svg" alt="" />
                    <p>Message</p>
                </div>
                <div onClick={() => {
                    pageStateF('course')
                }} className={pageState === 'course' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/buld.svg" alt="" />
                    <p>Courses</p>
                </div>
                <div onClick={() => {
                    pageStateF('staff')
                }} className={pageState === 'staff' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/people.svg" alt="" />
                    <p>Staffs</p>
                </div>
                <div onClick={() => {
                    pageStateF('settings')
                }} className={pageState === 'settings' ? 'activemenu eachmenu' : 'eachmenu'} >
                    <img src="svg/settings.svg" alt="" />
                    <p>Settings</p>
                </div>
            </div>

            <div className="foot">
                <div className="sidebarImg">
                    <img src="svg/w (1).svg" alt="" />
                </div>
                <button onClick={() => {
                    pageStateF('student')
                }}>Register Student</button>
            </div>



        </div>
    )
}

export default Sidebar