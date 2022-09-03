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
const categoryOptions = ["Computer Science", "Computer Software", "Information Communication", "Computer Engineering", 'Cyber Security'];

const AddStaffs = () => {
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
        pageTypeF("editStaff");
    }, []);



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (title && description) {
            // if we adding new Staff
            setloader(true)
            try {
                await addDoc(collection(db, "staffs"), {
                    ...form,
                    timestamp: serverTimestamp(),
                    author: user.displayName,
                    userId: user.uid,
                    dateId: dateId,

                });

                setloader(false)
                toast.success("Staff successfully added");
            } catch (error) {
                console.log(error);
                notificationF(error);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        navigate("/admin");
    };

    // for update Staff

    useEffect(() => {
        id && getStaffDetail();
        id && AddStaffPageF(true);
        id && pageStateF('staff');
    }, [id]);

    const getStaffDetail = async () => {
        const docRef = doc(db, "staffs", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setform({ ...snapshot.data() });
        }
    };
    const updateStaff = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (title && description) {
            // if we adding new Staff

            setloader(true)
            try {
                await updateDoc(doc(db, "staffs", id), {
                    ...form,
                    timestamp: serverTimestamp(),
                    // author: user.displayName,
                    // userId: user.uid,
                });
                setloader(false)
                toast.success("Staff successfully updated");

            } catch (err) {
                console.log(err);
                notificationF(err);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        navigate("/admin");
        // console.log(form);
    };



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


    const [AddStaffPage, AddStaffPageF] = useState(false)



    // to delete staffs
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff?")) {
            try {

                await deleteDoc(doc(db, "staffs", id));

                navigate('/admin')
                toast.error("Staff successfully deleted");
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
                            Hi, Welcome to your Panel
                        </div>
                        <div style={{ display: 'flex' }}>
                            {AddStaffPage ? <div onClick={() => {
                                AddStaffPageF(false)
                            }} style={{ paddingRight: 20 }}>
                                <button style={{
                                    backgroundColor: '#1f98d1', border: 'none', padding: 10, borderRadius: '5', color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: '600', cursor: 'pointer'
                                }}>See Staffs</button>
                            </div> :
                                <div onClick={() => {
                                    AddStaffPageF(true)
                                }} style={{ paddingRight: 20 }}>
                                    <button style={{
                                        backgroundColor: '#1f98d1', border: 'none', padding: 10, borderRadius: '5', color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: '600', cursor: 'pointer'
                                    }}>Add New Staffs</button>
                                </div>}
                            <div onClick={handleLogout} className="eng">
                                <img src="svg/enter.png" alt="" />
                                <p>Log Out</p>
                            </div>
                        </div>
                    </div>


                    {AddStaffPage ?
                        <div className="authBody bbv" id="Staff">
                            <div className="authform">
                                <form style={{ marginBottom: "30px" }}>
                                    <div className="authTitle">
                                        <h3>{id ? "Update Staff" : "Add Staff"}</h3>
                                    </div>

                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={title}
                                        required
                                        minLength={4}
                                        placeholder="Lecturer's Name"
                                        name="title"
                                    />

                                    <input
                                        type="email"
                                        onChange={handleChange}
                                        value={description}
                                        required

                                        placeholder="Lecturer's Email"
                                        name="description"
                                    />
                                    <select value={category} onChange={handleCategory}>
                                        <option>Please select course</option>
                                        {categoryOptions.map((opt, index) => (
                                            <option value={opt} key={index}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>




                                    {id ? (
                                        <button
                                            onClick={updateStaff}

                                        >
                                            Update Staff
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}

                                        >
                                            Register Staff
                                        </button>
                                    )}
                                </form>


                            </div>
                        </div>
                        :
                        <div style={{ marginTop: 40 }}>

                            {staffs.map((staff, index) => <div className="eachCourse" key={index}>
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

                                <Link to={`/admin/updatestaff/${staff.id}`} className="vc">Edit Profile</Link>
                                <button className='vc deletedash' onClick={() => handleDelete(staff.id)} >Delete Staff</button>

                            </div>


                            )}
                        </div>
                    }







                </div>
            )}
        </>
    );
};

export default AddStaffs;
