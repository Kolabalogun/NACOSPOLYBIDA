import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../Function/Context';
import { db } from '../../Utils/Firebase';



const initialState = {
    fullName: "",
    phoneNumber: "",
    userAddress: "",
    City: "",
    State: "",
    PostalCode: "",


};

const AddStudents = () => {

    const {
        user,
        pageStateF,
        navigate,
        handleLogout,
        notificationF,
        setloader,

    } = useGlobalContext();

    const { id } = useParams();

    const [form, setform] = useState(initialState);



    const [dateId, setdateId] = useState("");

    const { fullName,
        phoneNumber,
        userAddress,
        City,
        State,
        PostalCode, } = form;







    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        setdateId(dateId);
    }, []);





    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (fullName &&
            phoneNumber &&
            userAddress &&
            City &&
            State) {
            // if we adding new blog
            setloader(true);
            try {
                await addDoc(collection(db, "students"), {
                    ...form,
                    timestamp: serverTimestamp(),
                    user: user.displayName,
                    userEmail: user.email,
                    userId: user.uid,
                    dateId: dateId,

                });
                setloader(false);
                toast.success("Student successfully added");
            } catch (error) {
                console.log(error);
                notificationF(error);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        navigate("/admin");
    };

    // for update Address





    const [students, studentsF] = useState([]);

    useEffect(() => {
        // setloader(true);
        const unsub = onSnapshot(
            collection(db, "students"),

            (snapshot) => {
                let list = [];

                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                studentsF(list);
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


    const [AddstudentPage, AddstudentPageF] = useState(false)



    // for update Student

    useEffect(() => {
        id && getStudentDetail();
        id && AddstudentPageF(true);
        id && pageStateF('student');
    }, [id]);

    const getStudentDetail = async () => {
        const docRef = doc(db, "students", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setform({ ...snapshot.data() });
        }
    };
    const updateStudent = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (fullName &&
            phoneNumber &&
            userAddress &&
            City &&
            State) {
            // if we adding new Staff



            setloader(true)
            try {
                await updateDoc(doc(db, "students", id), {
                    ...form,
                    timestamp: serverTimestamp(),
                    // author: user.displayName,
                    // userId: user.uid,
                });
                setloader(false)
                toast.success("Student Data updated");
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




    // to delete students
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {

                await deleteDoc(doc(db, "students", id));

                toast.error("Student successfully deleted");
            } catch (error) {
                console.log(error);
            }
        }
    };










    return (



        <div className='dashboard'>

            <div className="topauthnav">
                <div className="welo">
                    Hi, Welcome to your Panel
                </div>
                <div style={{ display: 'flex' }}>
                    {AddstudentPage ? <div onClick={() => {
                        AddstudentPageF(false)
                    }} style={{ paddingRight: 20 }}>
                        <button style={{
                            backgroundColor: '#1f98d1', border: 'none', padding: 10, borderRadius: '5', color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: '600', cursor: 'pointer'
                        }}>See students</button>
                    </div> :
                        <div onClick={() => {
                            AddstudentPageF(true)
                        }} style={{ paddingRight: 20 }}>
                            <button style={{
                                backgroundColor: '#1f98d1', border: 'none', padding: 10, borderRadius: '5', color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: '600', cursor: 'pointer'
                            }}>Add New students</button>
                        </div>}
                    <div onClick={handleLogout} className="eng">
                        <img src="svg/enter.png" alt="" />
                        <p>Log Out</p>
                    </div>
                </div>
            </div>







            {AddstudentPage ?
                <div className='cartForm'>
                    <div className="horizonBox">
                        <div className="leftHorizonBox">
                            <div className="logoCart">
                                <img src='svg/house.svg' alt="" />
                            </div>
                            <div className="cartContent">
                                <div className="topCartContent">

                                    <p style={{ color: 'BLACK', }}>{id ? "UPDATE STUDENT'S DATA" : "REGISTER STUDENT"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inputrow">
                        <div className="cartInput">
                            <label htmlFor="fn">Full Name *</label>
                            <input required onChange={handleChange} value={fullName} minLength={4} name='fullName' type="text" id='fn' />
                        </div>
                        <div className="cartInput pn">
                            <label htmlFor="pn">Phone Number *</label>
                            <input required onChange={handleChange} value={phoneNumber} minLength={4} name='phoneNumber' type="text" id='pn' />
                        </div>
                    </div>
                    <div className="inputrow">
                        <div className="cartInput">
                            <label htmlFor="add">Address *</label>
                            <input required onChange={handleChange} value={userAddress} minLength={4} name='userAddress' type="text" id='add' />
                        </div>

                    </div>
                    <div className="inputrow">
                        <div className="cartInput">
                            <label htmlFor="ci">Age *</label>
                            <input required onChange={handleChange} value={City} minLength={4} name='City' type="number" id='ci' />
                        </div>
                        <div className="cartInput pn">
                            <label htmlFor="st">Course Enrolled *</label>
                            <input required onChange={handleChange} value={State} minLength={4} name='State' type="text" id='st' />
                        </div>
                        <div className="cartInput pn">
                            <label htmlFor="pc">Matric Number*</label>
                            <input required type="text" id='pc' onChange={handleChange} value={PostalCode} minLength={4} name='PostalCode' />
                        </div>

                    </div>




                    {id ? (
                        <div
                            onClick={updateStudent}
                            className="storeBtn"
                        >
                            Update Student Data
                        </div>
                    ) : (
                        <div onClick={handleSubmit} className="storeBtn">

                            Save Student Data
                        </div>
                    )}
                </div>
                :
                <div style={{ marginTop: 40 }}>

                    {students.map((student, index) => <div className="eachCourse " style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} key={index}>
                        <div className="courselogo">
                            <img src="svg/businessman.png" alt="" />
                        </div>
                        <div className="courseName">
                            <p>{student.fullName}</p>
                            <span>{student.phoneNumber}</span>
                        </div>
                        <div className="courseName">
                            <p>{student.State}</p>

                        </div>

                        <Link to={`/admin/updatestudent/${student.id}`} className="vc">Edit Profile</Link>
                        <button className='vc deletedash' onClick={() => handleDelete(student.id)} >Delete Student</button>

                    </div>


                    )}
                </div>
            }





        </div >













    )
}

export default AddStudents