import React, { useEffect, useState } from "react";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../Function/Context";
import AnimatedPage from "../../Utils/AnimatedPage";
import Loader from "../../Components/Loader";
import AuthTopBar from "../../Auth/AuthTopBar";
import Footer from "../../Components/Footer";
import { db } from "../../Utils/Firebase";



const initialState = {
    title: "",
    category: "",
    description: "",
};
const categoryOptions = ["Type-A", "Type-B", "Type-C", "Type-D"];

const AddCourse = () => {
    const {
        user,
        handleLogout,
        pageType,
        pageTypeF,
        navigate,
        loader,
        setloader,
        notification,
        notificationF,
        pageStateF
    } = useGlobalContext();

    const { id } = useParams();

    const [form, setform] = useState(initialState);

    const [progress, setprogress] = useState(null);
    const [dateId, setdateId] = useState("");

    const { title, category, description } = form;

    function handleCategory(e) {
        setform({ ...form, category: e.target.value });
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        setdateId(dateId);
    }, []);

    // to see the type of page
    useEffect(() => {
        pageTypeF("editBlog");
    }, []);



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (title && description) {
            // if we adding new blog
            setloader(true);
            try {
                await addDoc(collection(db, "courses"), {
                    ...form,
                    timestamp: serverTimestamp(),
                    author: user.displayName,
                    userId: user.uid,
                    dateId: dateId,

                });
                setloader(false);
                toast.success("Course successfully added");
            } catch (error) {
                console.log(error);
                notificationF(error);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        navigate("/admin");
    };

    // for update Blog

    useEffect(() => {
        id && getBlogDetail();
        id && pageStateF('course');
    }, [id]);

    const getBlogDetail = async () => {
        const docRef = doc(db, "courses", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setform({ ...snapshot.data() });
        }
    };
    const updateBlog = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (title && description) {
            // if we adding new blog
            setloader(true);

            try {
                await updateDoc(doc(db, "courses", id), {
                    ...form,
                    timestamp: serverTimestamp(),
                    // author: user.displayName,
                    // userId: user.uid,
                });
                toast.success("Course successfully updated");
                setloader(false);
            } catch (err) {
                console.log(err);
                notificationF(err);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        navigate("/");
        // console.log(form);
    };


    // get coursefrom DB 


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


    // to delete course
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {

                await deleteDoc(doc(db, "courses", id));

                toast.error("Course successfully deleted");
            } catch (error) {
                console.log(error);
            }
        }
    };




    return (
        <>
            {loader ? (
                <Loader notification={notification} />
            ) : (

                <div className="dashboard">

                    <div className="topauthnav">
                        <div className="welo">
                            Hi, Add new Courses
                        </div>
                        <div className="eng">
                            <img src="svg/enter.png" alt="" />
                            <p>Log Out</p>
                        </div>
                    </div>


                    <div className="courseDiv">

                        <div className="leftCourse">
                            {courses.map((course, index) => <div className="eachCourse " style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} key={index}>
                                <div className="courselogo">
                                    <img src="svg/book.svg" alt="" />
                                </div>
                                <div className="courseName">
                                    <p>{course.title}</p>

                                </div>


                                {/* <Link to={`/admin/updatecourse/${course.id}`} className="vc">Edit </Link> */}
                                <button className='vc deletedash' onClick={() => handleDelete(course.id)} >Delete Course</button>

                            </div>


                            )}
                        </div>

                        <div className="authBody bbv" id="blog">
                            <div className="authform">
                                <form style={{ marginBottom: "30px" }}>
                                    <div className="authTitle">
                                        <h3>{id ? "Update Course" : "Create Course"}</h3>
                                    </div>

                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={title}
                                        required
                                        minLength={4}
                                        placeholder="Course Title"
                                        name="title"
                                    />

                                    <textarea
                                        type="text"
                                        onChange={handleChange}
                                        value={description}
                                        required
                                        rows={17}
                                        minLength={4}
                                        placeholder=" Course Description"
                                        name="description"
                                    />



                                    {id ? (
                                        <button
                                            onClick={updateBlog}

                                        >
                                            Update Course
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}

                                        >
                                            Add Course
                                        </button>
                                    )}
                                </form>


                            </div>
                        </div>

                    </div>



                </div>

            )}
        </>
    );
};

export default AddCourse;
