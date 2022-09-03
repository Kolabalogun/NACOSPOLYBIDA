import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../Function/Context';
import { db } from '../../Utils/Firebase';

const Dashboard = () => {

    const { user, handleLogout } = useGlobalContext()

    // Get Couse from Firebase

    const [courses, coursesF] = useState([]);

    useEffect(() => {
        // setloader(true);
        const unsub = onSnapshot(
            collection(db, "courses"),

            (snapshot) => {
                let list = [];

                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                coursesF(list);
                // setloader(false);

                // console.log("ghghffd");
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const itemsToRenderCourse = courses.slice(0, 5);


    // Get Staff from Firebase

    const [staffs, staffsF] = useState([]);

    useEffect(() => {
        // setloader(true);
        const unsub = onSnapshot(
            collection(db, "staffs"),

            (snapshot) => {
                let list = [];

                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                staffsF(list);
                // setloader(false);

                // console.log("ghghffd");
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);
    const itemsToRenderstaffs = staffs.slice(0, 5);
    // Get Admin from Firebase


    // to delete students
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff?")) {
            try {

                await deleteDoc(doc(db, "staffs", id));

                toast.error("Staff successfully deleted");
            } catch (error) {
                console.log(error);
            }
        }
    };



    const [admin, adminF] = useState([]);

    useEffect(() => {
        // setloader(true);
        const unsub = onSnapshot(
            collection(db, "admin"),

            (snapshot) => {
                let list = [];

                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                adminF(list);
                // setloader(false);

                // console.log("ghghffd");
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);




    return (
        <div className='dashboard'>
            <div className="topauthnav">
                <div className="welo">
                    Hi, Welcome to your Dashboard
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ paddingRight: 20 }}>
                        {user?.displayName === 'SuperAdmin' ? 'Super Admin' : 'Sub Admin'}
                    </div>
                    <div onClick={handleLogout} className="eng">
                        <img src="svg/enter.png" alt="" />
                        <p>Log Out</p>
                    </div>
                </div>
            </div>

            <div className="overview">
                <h2>Analytics Overview</h2>
                <div className="boxx">
                    <div className="leftboxx">
                        <h1>The Federal Polytechnic Bida, Niger State</h1>
                        <p>Here is where we produce excellence for better tomorrow</p>

                        <div className="bb">
                            <div className="eachbb">
                                <img src="svg/student.png" alt="" />
                                <div className="conbb"> <p>Students</p>
                                    <span>15000+</span>
                                </div>
                            </div>
                            <div className="eachbb">
                                <img src="svg/tutor.png" alt="" />
                                <div className="conbb"> <p>Lecturers</p>
                                    <span>300+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightboxx">
                        <img src="svg/gg.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="dashfooter">
                <div className="popularcourse">
                    <h2>Top Courses</h2>

                    {itemsToRenderCourse.map((course, index) => <div className="eachCourse" key={index}>
                        <div className="courselogo">
                            <img src="svg/c.png" alt="" />
                        </div>
                        <div className="courseName">
                            <p>{course.title}</p>
                            <span>2000+ Students</span>
                        </div>

                        <button className="vc">View Course</button>

                    </div>)}
                </div>
                <div className="popularcourse lecturer">
                    <h2>Lecturers</h2>



                    {itemsToRenderstaffs.map((staff, index) => <div className="eachCourse" key={index}>
                        <div className="courselogo">
                            <img src="svg/businessman.png" alt="" />
                        </div>
                        <div className="courseName">
                            <p>{staff.title}</p>
                            <span>{staff.description}</span>
                        </div>
                        <div className="courseName">
                            <p>{staff.category}</p>

                        </div>

                        <button className='vc deletedash' onClick={() => handleDelete(staff.id)} >Delete Staff</button>

                    </div>)}




                </div>
            </div>
        </div>
    )
}

export default Dashboard