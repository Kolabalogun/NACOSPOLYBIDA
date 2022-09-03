import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";




import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { useGlobalContext } from "../../Function/Context";
import AnimatedPage from "../../Utils/AnimatedPage";
import { db, storage } from "../../Utils/Firebase";


const initialState = {
    title: "",
    category: "",
    description: "",
};
const categoryOptions = ["Type-A", "Type-B", "Type-C", "Type-D"];

const AddBlog = () => {
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
    } = useGlobalContext();

    const { id } = useParams();

    const [form, setform] = useState(initialState);
    const [file, setfile] = useState(null);
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

    useEffect(() => {
        const uploadFile = () => {
            setloader(true);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.ceil(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    toast("Upload is " + progress + "% done");

                    setprogress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            toast("Upload is paused");
                            break;
                        case "running":
                            // toast("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.error(error);
                    notificationF(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        toast.info("Image Uploaded Successfully ");
                        setform((prev) => ({ ...prev, imgUrl: downloadUrl }));
                    });
                }
            );
            setloader(false);
        };

        file && uploadFile();
    }, [file]);

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (title && file && description) {
            // if we adding new blog
            setloader(true);
            try {
                await addDoc(collection(db, "blogs"), {
                    ...form,
                    timestamp: serverTimestamp(),
                    author: user.displayName,
                    userId: user.uid,
                    dateId: dateId,
                    comment: [],
                });
                setloader(false);
                toast.success("Blog successfully added");
            } catch (error) {
                console.log(error);
                notificationF(error);
            }
        } else {
            return toast.error("All fields must be filled");
        }
        navigate("/");
    };

    // for update Blog

    useEffect(() => {
        id && getBlogDetail();
    }, [id]);

    const getBlogDetail = async () => {
        const docRef = doc(db, "blogs", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setform({ ...snapshot.data() });
        }
    };
    const updateBlog = async (e) => {
        e.preventDefault();
        // console.log(form);

        if (title && file && description) {
            // if we adding new blog
            setloader(true);

            try {
                await updateDoc(doc(db, "blogs", id), {
                    ...form,
                    timestamp: serverTimestamp(),
                    // author: user.displayName,
                    // userId: user.uid,
                });
                toast.success("Blog successfully updated");
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


    return (
        <>
            {loader ? (
                <Loader notification={notification} />
            ) : (
                <div className="dashboard" style={{ width: '100%' }}>


                    <div className="topauthnav">
                        <div className="welo">
                            Hi, Welcome to your Blog Panel
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div onClick={() => {
                                navigate('/')
                            }} style={{ paddingRight: 20 }}>
                                <button style={{
                                    backgroundColor: '#1f98d1', border: 'none', padding: 10, borderRadius: '5', color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: '600', cursor: 'pointer'
                                }}>See Blog</button>
                            </div>
                            <div onClick={handleLogout} className="eng">
                                <img src="svg/enter.png" alt="" />
                                <p>Log Out</p>
                            </div>
                        </div>
                    </div>

                    <div className="bodey">

                        <div className="authform">
                            <form style={{ marginBottom: "30px" }}>
                                <div className="authTitle">
                                    <h3>{id ? "Update Bulletin" : "Create Bulletin"}</h3>
                                </div>

                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={title}
                                    required
                                    minLength={4}
                                    placeholder="Title"
                                    name="title"
                                />

                                <textarea
                                    type="text"
                                    onChange={handleChange}
                                    value={description}
                                    required
                                    rows={13}
                                    minLength={4}
                                    placeholder="Description"
                                    name="description"
                                />

                                <input
                                    type="file"
                                    name="file"
                                    onChange={(e) => setfile(e.target.files[0])}
                                />

                                {id ? (
                                    <button
                                        onClick={updateBlog}
                                        disabled={progress !== null && progress < 100}
                                    >
                                        Update Blog
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={progress !== null && progress < 100}
                                    >
                                        Add Blog
                                    </button>
                                )}
                            </form>

                        </div>
                    </div>
                </div>





            )}
        </>
    );
};

export default AddBlog;
