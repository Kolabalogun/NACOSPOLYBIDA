import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../Components/Loader'
import { useGlobalContext } from '../../Function/Context'
import { db } from '../../Utils/Firebase'


const inistate = {
    recipient: '',
    textmessage: ''
}

const Message = () => {

    const { loader, setloader, navigate, pageStateF } = useGlobalContext()

    const [text, textF] = useState(inistate)

    const { recipient, textmessage } = text

    const handleChange = (e) => {
        textF({ ...text, [e.target.name]: e.target.value });
    };


    // const sendText = () => {
    //     // e.preventDefault()
    //     const { recipient, textmessage } = text
    //     //pass text message GET variables via query string

    //     setloader(true)
    //     fetch(`http://localhost:4000/send-text?recipient=${course}&textmessage=${textmessage}`, {
    //         method: 'GET',

    //     })
    //         .catch(err => toast.error(err)

    //         )
    //     setloader(false)

    //     navigate('/admin')
    //     pageStateF('msg')


    // }


    async function sendText(e) {

        e.preventDefault()

        const res = await fetch(`http://localhost:4000/send-text?recipient=${course}&textmessage=${textmessage}`)

        console.log(res);

    }




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


    const [category, categoryF] = useState('All')


    function handleCategory(e) {
        categoryF(e.target.value);
    }





    const phoneNumbers = students.map((student, index) => <option value={student.phoneNumber} key={index}>
        {student.phoneNumber}
    </option>)


    const course = '+2348073374150'

    const [cou, couF] = useState(true)
    const [data, dataF] = useState([])



    useEffect(() => {
        cll()
    }, [category])


    function cll(params) {
        if (cou) {
            const newData = students.filter((p) => p.State === category);

            dataF(newData);


        }
    }

    const [real, realF] = useState([])
    const [dreal, drealF] = useState([])


    useEffect(() => {

        const nn = data.map((student, index) => student.phoneNumber)


        realF([nn])

        var myArray = real;

        var myArrayQry = myArray.map(function (el, idx) {
            return `[${el}]`;
        }).join('&');

        drealF(myArrayQry);

    }, [data])

    console.log(dreal);



























    return (

        <>

            {

                loader ?

                    <Loader /> :

                    <div className='dashboard'><div className="topauthnav">
                        <div className="welo">
                            Hi, Welcome to your Mail
                        </div>
                        <div className="eng">
                            <img src="svg/enter.png" alt="" />
                            <p onClick={cll}>Log Out</p>
                        </div>
                    </div>

                        <div className="msgBody">
                            <div className="Inbox">
                                <h2>Message</h2>
                            </div>


                            <div className="ppp">
                                <div className="popularcourse  ddd">
                                    <div style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} className="eachCourse">
                                        <div className="courselogo msglogo">
                                            <img src="svg/msg.svg" alt="" />
                                        </div>
                                        <div className="courseName">
                                            <p style={{ fontSize: 19, marginLeft: 10 }}>Inbox</p>

                                        </div>


                                    </div>
                                    <div style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} className="eachCourse">
                                        <div className="courselogo msglogo">
                                            <img src="svg/msg.svg" alt="" />
                                        </div>
                                        <div className="courseName">
                                            <p style={{ fontSize: 19, marginLeft: 10 }}>Sent Messages</p>

                                        </div>


                                    </div>

                                    <select value={category} onChange={handleCategory}>
                                        <option>Please select course</option>

                                        <option value='Cybersecurity' >
                                            Cybersecurity
                                        </option>
                                        <option value='IntroTex' >
                                            Computer Science
                                        </option>
                                        <option value='Computer Engineering' >
                                            Computer Engineering
                                        </option>

                                    </select>

                                    <div style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} className="eachCourse">
                                        <div className="courselogo msglogo">
                                            <img src="svg/star.svg" alt="" />
                                        </div>
                                        <div className="courseName">
                                            <p style={{ fontSize: 19, marginLeft: 10 }}>Important</p>

                                        </div>


                                    </div>
                                    <div style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} className="eachCourse">
                                        <div className="courselogo msglogo">
                                            <img src="svg/delete.svg" alt="" />
                                        </div>
                                        <div className="courseName">
                                            <p style={{ fontSize: 19, marginLeft: 10 }}>Trash</p>

                                        </div>


                                    </div>
                                </div>
                                <div className="popularcourse fff">

                                    <div style={{ backgroundColor: 'rgb(230, 230,230)', padding: 10, cursor: 'pointer' }} className="eachCourse ddfg">
                                        <div className="courselogo msglogo">
                                            <img src="svg/msg.svg" alt="" />
                                        </div>
                                        <div className="courseName">
                                            <p style={{ fontSize: 19, marginLeft: 10 }}>Compose New Message</p>
                                        </div>
                                    </div>

                                    <div className="context">
                                        <div className="eachCourse ddfg">

                                            <div className="courseName">
                                                <p style={{ fontSize: 15, color: 'white', backgroundColor: 'rgb(24, 41, 60)', padding: 10 }}>Please fill in the box to send a New Message!</p>
                                            </div>

                                            <select
                                            //  value={category} onChange={handleCategory}
                                            >


                                                {phoneNumbers}
                                            </select>

                                        </div>

                                        <div className="authform cccs">
                                            <form>
                                                <input
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={[real]}

                                                    readOnly
                                                    minLength={4}
                                                    placeholder={`${[real]}`}
                                                    name="recipient"
                                                />



                                                <textarea
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={textmessage}
                                                    required
                                                    rows={10}
                                                    minLength={4}
                                                    placeholder="Enter your Message here..."
                                                    name="textmessage"
                                                />



                                                <button onClick={sendText}>Send Message</button>

                                            </form>


                                        </div>


                                    </div>


                                </div>
                            </div>
                        </div>



                    </div>
            }
        </>
    )


}

export default Message