import React, { useEffect, useState, useRef, useCallback } from 'react';
import { query, collection, getDocs, where } from "firebase/firestore";
import {
    SearchOutlined, MailOutlined, EyeInvisibleOutlined, EyeOutlined, UserOutlined, UploadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import axios from 'axios';
import { Menu } from '@headlessui/react';
import { useForceUpdate } from 'framer-motion';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { ActionType, useParentContext } from '../../utils/context'
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../../feature/models/auth';
import { getRegister } from '../../feature/models/authRegister';
import { auth, db, logInWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword, logout } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const Navbar = (props) => {
    function checkEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);

    // auth edit
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const inputFileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [editFirstName, setEditFirstName] = useState(undefined);
    const [editLastName, setEditLastName] = useState(undefined);
    const [editEmail, setEditEmail] = useState(undefined);

    // dataRegis ={
    //     firstName: "",
    //     lastName: "",
    // }

    // password click
    // const [password, setPassword] = useState('password');
    const [password1, setPassword1] = useState('password');
    const [password2, setPassword2] = useState('password');


    // const [loginEmail, setLoginEmail] = useState(undefined);
    // const [loginPassword, setLoginPassword] = useState(undefined);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: ""
    });
    const [user, loading, error] = useAuthState(auth);
    const [authUser, setAuthUser] = useState({})

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          console.log("Data Doc", user);
          localStorage.setItem("user", JSON.stringify(data));
          setAuthUser(data);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (!user) {
            return navigate("/");
        };
        fetchUserName();
      }, [user, loading]);

    //   register
    const [name, setName] = useState("");
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
      };

    // provider
    const [state, parentDispatch] = useParentContext();
    // login
    const loginSelector = useSelector((state) => state.auth)
    // const dispatch = useDispatch()
    // const auth = localStorage.getItem("auth");

    // useEffect(() => {
    //     if (auth) {
    //         setIsModalOpen(false);
    //     }
    // }, [auth])

    // const SignIn = () => {
    //     dispatch(getLogin({
    //         email: loginEmail, 
    //         password: loginPassword,
    //     }));
    // }

    // auth register
    // const [registerFirstName, setRegisterFirstName] = useState(undefined);
    // const [registerLastName, setRegisterLastName] = useState(undefined);
    // const [registerEmail, setRegisterEmail] = useState(undefined);
    // const [registerPassword, setRegisterPassword] = useState(undefined);
    // const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState(undefined);

    // const signUp = () => {
    //     // dispatch(getRegister({
    //     //     first_name: registerFirstName,
    //     //     last_name: registerLastName,
    //     //     email: registerEmail,
    //     //     password: registerPassword,
    //     //     password_confirmation: registerPasswordConfirm
    //     // }))
    //     setIsModalRegisterOpen(false)
    // }

    const logOut = () => {
        if (state.authType === 'google') {
            googleLogout()
            parentDispatch({ type: ActionType.AuthType, payload: undefined })
        }

        parentDispatch({ type: ActionType.AuthStatus, payload: false })
        localStorage.removeItem('auth')
    }

    const login = () => {
        logInWithEmailAndPassword(dataLogin.email, dataLogin.password);
        navigate('/movie');
    }

    // update
    const update = () => {
        const data = new FormData()
        const idUser = localStorage.getItem('auth')
        const token = JSON.parse(idUser).token
        data.append('image', (file), { type: 'image/tiff' })
        data.append('first_name', editFirstName)
        data.append('last_name', editLastName)
        console.log(data.append('email', 'editEmail'))
        const updateUrl = 'https://notflixtv.herokuapp.com/api/v1/users';
        axios.put(updateUrl, {
            data: data,
            headers: { 'Content-Type': `multipart/form-data; boundary=${data}`, Authorization: `Bearer ${token}` },
        }).then((res) => {
            parentDispatch({ type: ActionType.AuthStatus, payload: true })
            parentDispatch({ type: ActionType.AuthData, payload: res.data })
            localStorage.setItem('auth', JSON.stringify({ id: res.data.data._id, token: res.data.data.token }))
            setIsModalEditOpen(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    // delete
    const deleteUsers = () => {
        const idUser = localStorage.getItem('auth')
        const token = JSON.parse(idUser).token
        const deleteUrl = `https://notflixtv.herokuapp.com/api/v1/users/me`

        axios.delete(deleteUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.status) {
                parentDispatch({ type: ActionType.AuthStatus, payload: false })
                setIsModalEditOpen(false)
                localStorage.removeItem('auth')
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const [preview, setPreview] = useState(false)

    useEffect(() => {
        if (!file) {
            setPreview(false)
            return
        }

        const url = URL.createObjectURL(file)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [file])

    return (
        <>
            <header className='flex flex-row justify-center py-4 absolute z-50 w-full'>
                <div className='container flex justify-between items-center'>
                    <div className='flex-1'>
                        <a className='text-4xl text-red-700 font-bold' href="/">
                            <svg width="198" height="32" viewBox="0 0 99 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M50.9948 15.7635H47.251V3.94089H50.9948V15.7635ZM51.0933 2.75862H47.1524V0H51.0933V2.75862ZM27.3136 6.6601C29.3432 6.6601 29.5599 6.97537 29.5599 9.85222C29.5599 12.7291 29.3432 13.0443 27.3136 13.0443C25.2841 13.0443 25.0673 12.7291 25.0673 9.85222C25.0673 6.97537 25.2841 6.6601 27.3136 6.6601ZM21.1264 9.85222C21.1264 14.7783 22.3678 16 27.3136 16C32.2594 16 33.5008 14.7783 33.5008 9.85222C33.5008 4.92611 32.2594 3.70443 27.3136 3.70443C22.3678 3.70443 21.1264 4.92611 21.1264 9.85222ZM46.456 3.94089H42.7319L40.1506 13.0049H40.0324L37.6875 3.94089H33.8058L37.0767 15.7635H42.8501L46.456 3.94089ZM64.1929 12H60.252C60.252 12.9852 59.858 13.2414 58.3013 13.2414C56.6855 13.2414 56.3112 12.9852 56.2323 10.9163H64.2915V9.08374C64.1929 4.78818 62.9516 3.70443 58.2816 3.70443C53.4737 3.70443 52.2717 4.92611 52.2717 9.85222C52.2717 14.7783 53.4737 16 58.2816 16C62.9318 16 64.1141 15.1921 64.1929 12ZM56.252 8.15764C56.39 6.6601 56.8432 6.46305 58.3013 6.46305C60.0353 6.46305 60.3112 6.64039 60.3506 8.15764H56.252ZM69.216 11.4089C69.216 12.3153 69.3736 12.4138 70.7727 12.4138V15.7635H68.6249C66.083 15.7635 65.4525 15.1133 65.4722 12.532V0H69.216V11.4089ZM72.0462 15.7635H75.7901V3.94089H72.0462V15.7635ZM71.9477 2.75862H75.8886V0H71.9477V2.75862ZM80.8108 11.803V12.0591C80.8108 13.1232 81.0276 13.2414 83.0374 13.2414C84.9488 13.2414 85.1655 13.1429 85.1655 12.335C85.1655 11.7438 84.6138 11.4877 82.3675 11.0739C78.3478 10.2857 77.3429 9.53695 77.3429 7.27094C77.3429 4.41379 78.5054 3.70443 83.136 3.70443C87.668 3.70443 88.8109 4.51232 88.8109 7.70443V8.05911H85.067V7.70443C85.067 6.58128 84.87 6.46305 83.136 6.46305C81.4611 6.46305 81.2838 6.56158 81.2838 7.38916C81.2838 7.94089 81.6187 8.11823 82.9192 8.31527C87.865 9.12315 89.1064 9.99015 89.1064 12.6108C89.1064 15.33 87.9044 16 83.136 16C78.2887 16 77.067 15.2118 77.067 12.0591V11.803H80.8108ZM98.3655 12.4138H96.3754C95.1537 12.4138 95.0157 12.2562 95.0157 10.8177V7.0936H98.1685V3.94089H95.0157V1.41872H91.4689V3.94089H90.0896V7.0936H91.2719V11.7833C91.2719 14.9754 92.2177 15.7635 96.001 15.7635H98.3655V12.4138ZM6.96294 15.7635L4.65752 4.33497V0.394088H7.88905L10.1945 11.8227H10.3521L12.6772 0.394088H19.9482V15.7635H15.8102V4.33497H15.692L13.3669 15.7635H6.96294ZM0 0.392189H1.37798V1.03291H2.75586V0.392284H4.13384V1.03291H4.13395V2.31381H4.13384V3.59502H4.13395V4.87592H4.13384V6.1583H4.13395V7.43921H4.13384V8.71963H4.13395V10.0005H4.13384V11.2821H4.13395V12.563H4.13384V13.8446H4.13395V15.1255H4.13384V15.7663H2.75586V15.1255H1.37798V15.7662H0V15.1255V13.8446V12.563V11.2821V10.0005V8.71963V7.43921V6.1583V4.87592V3.59502V2.31381V1.03291V0.392189ZM1.37798 3.59502V2.31381H2.75586V3.59502H1.37798ZM1.37798 4.87592V6.1583H2.75586V4.87592H1.37798ZM1.37798 8.71963V7.43921H2.75586V8.71963H1.37798ZM1.37798 10.0005V11.2821H2.75586V10.0005H1.37798ZM1.37798 13.8446V12.563H2.75586V13.8446H1.37798Z" fill="#F33F3F" />
                            </svg>
                        </a>
                    </div>
                    <div className='w-1/3 flex justify-center'>
                        <div className='flex border-2 border-white rounded-full py-1 px-2 w-full justify-between items-center'>
                            <input onKeyDown={(events) => {
                                if (events.key === 'Enter') {
                                    navigate(`/search/${events.target.value}`)
                                }
                            }} className='text-white placeholder:text-white bg-transparent flex-1 focus:outline-none' placeholder='What do you want to watch ?' />
                            <SearchOutlined style={{ fontSize: 15, color: '#FFFFFF' }} />
                        </div>
                    </div>
                    <div className='flex justify-end flex-1 h-full'>
                        {user ? 
                            <nav className='flex flex-row gap-x-6 justify-end h-full'>
                                <button onClick={logout} className='flex justify-center items-center px-8 h-full border-2 border-red-600 rounded-full text-red-600'>Logout</button>
                            </nav> : <nav className='flex flex-row gap-x-6 justify-end h-full'>
                                <button onClick={showModal} className='flex justify-center items-center px-8 h-full border-2 border-red-600 rounded-full text-red-600'>Login</button>
                                <button onClick={() => setIsModalRegisterOpen(!isModalRegisterOpen)} className='flex justify-center items-center px-8 h-full bg-red-600 rounded-full text-white'>Register</button>
                            </nav>}
                        {/* {user ? <>
                            <Menu as={'div'} className={'relative w-fit'}>
                                <Menu.Button className={'flex justify-center items-center gap-x-2 text-white'}>
                                    {
                                        state.authType === 'google' ? <>
                                            <span className='text-lg'>Google User</span>
                                        </> : <>
                                            {
                                                state.authData.data.image !== null ? <img src={state.authData.data.image} className='rounded-full w-10'></img> : <div>
                                                    {state.authData.data.first_name.charAt(0).toUpperCase()}</div>
                                            }
                                            <span className='text-lg'>{state.authData.data.first_name} {state.authData.data.last_name}</span>
                                        </>
                                    }
                                </Menu.Button>
                                <Menu.Items as={'div'} className='absolute flex flex-col right-0 bg-white mt-4 w-full rounded-sm'>
                                    {
                                        state.authType === 'google' ? <>

                                        </> : <>
                                            <Menu.Item>
                                                <button onClick={() => setIsModalEditOpen(!isModalEditOpen)} className='text-left bg-transparent hover:bg-gray-200 px-2 py-1 duration-200'>Edit Profile</button>
                                            </Menu.Item>
                                        </>
                                    }
                                    <Menu.Item>
                                        <button onClick={() => {
                                            logOut()
                                        }} className='text-left bg-transparent hover:bg-gray-200 px-2 py-1 duration-200'>Log Out</button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu></> : <>
                            <nav className='flex flex-row gap-x-6 justify-end h-full'>
                                <button onClick={showModal} className='flex justify-center items-center px-8 h-full border-2 border-red-600 rounded-full text-red-600'>Login</button>
                                <button onClick={() => setIsModalRegisterOpen(!isModalRegisterOpen)} className='flex justify-center items-center px-8 h-full bg-red-600 rounded-full text-white'>Register</button>
                            </nav>
                        </>} */}
                    </div>
                </div>
            </header>

            {/* Login */}
            <Modal title="Log In to Your Account" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(!isModalOpen)} >
                <div className='w-full'>
                    <Input
                        icon={<MailOutlined />}
                        placeholder={'Email Address'}
                        alert={'Email Salah'}
                        callback={(value) => { setDataLogin({...dataLogin, email: value}) }}
                    ></Input>
                </div>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setDataLogin({...dataLogin, password: event.target.value});
                    }} className='flex-1 focus:outline-none' type={password} placeholder='Password' />
                    <button onClick={() => { password === 'password' ? setPassword('text') : setPassword('password') }}>
                        {
                            password === 'password' ? <EyeInvisibleOutlined /> : <EyeOutlined />
                        }
                    </button>
                </div>
                <button onClick={login} className='flex justify-center items-center px-8 py-2 mt-6 h-full bg-red-600 rounded-full text-white'>Login</button>
                <button onClick={signInWithGoogle} className='flex justify-center items-center px-8 py-2 mt-6 h-full bg-red-600 rounded-full text-white'>Login With Google</button>
                {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                        dispatch({ type: ActionType.AuthType, payload: 'google' })
                        dispatch({ type: ActionType.AuthStatus, payload: true })
                        localStorage.setItem('auth', JSON.stringify({ id: credentialResponse.clientId, token: credentialResponse.credential }))
                        setIsModalOpen(false)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                /> */}
            </Modal>

            {/* Register */}
            <Modal title="Create Account" open={isModalRegisterOpen} footer={null} onCancel={() => setIsModalRegisterOpen(!isModalRegisterOpen)}>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setName(event.target.value)
                    }} className='flex-1 focus:outline-none' type="text" placeholder='Name' />
                    <UserOutlined />
                </div>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setEmail(event.target.value)
                    }} className='flex-1 focus:outline-none' type="email" placeholder='Email Address' />
                    <MailOutlined />
                </div>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setPassword(event.target.value)
                    }} className='flex-1 focus:outline-none' type={password1} placeholder='Password' />
                    <button onClick={() => { password1 === 'password' ? setPassword1('text') : setPassword1('password') }}>
                        {
                            password1 === 'password' ? <EyeInvisibleOutlined /> : <EyeOutlined />
                        }
                    </button>
                </div>
                <button onClick={register} className='flex justify-center items-center px-8 py-2 mt-6 h-full bg-red-600 rounded-full text-white'>Register</button>
            </Modal>

            {/* edit profile */}
            <Modal title="Edit Profile" open={isModalEditOpen} footer={null} onCancel={() => setIsModalEditOpen(!isModalOpen)} >
                <div className='flex flex-col justify-center items-center w-full'>
                    <div>
                        <img className='rounded-full w-36' src={preview}></img>
                    </div>
                    <input onChange={(event) => {
                        setFile(event.target.files[0])
                    }} ref={inputFileRef} type='file' className='hidden'></input>
                    <button onClick={() => { inputFileRef.current.click() }} className='flex justify-center items-center px-4 py-1 mt-6 h-full rounded-full gap-2 border border-black hover:border-red-600 hover:text-red-600 duration-300'><UploadOutlined />Update Profile Picture</button>
                </div>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setEditFirstName(event.target.value)
                    }} className='flex-1 focus:outline-none' type="text" placeholder='First Name' />
                    <UserOutlined />
                </div>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setEditLastName(event.target.value)
                    }} className='flex-1 focus:outline-none' type='text' placeholder='Last Name' />
                    <UserOutlined />
                </div>
                <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                    <input onChange={(event) => {
                        setEditEmail(event.target.value)
                    }} className='flex-1 focus:outline-none' type='text' placeholder='Email' />
                    <MailOutlined />
                </div>
                <button onClick={() => {
                    update()
                }} className='flex justify-center items-center px-8 py-2 mt-6 h-full bg-red-600 rounded-full text-white w-full hover:bg-red-500'>Update Profile</button>
                <button onClick={() => {
                    deleteUsers()
                }} className='flex justify-center items-center px-8 py-2 mt-2 h-full border border-red-600 rounded-full text-red-600 w-full hover:border-red-500'>Delete Account</button>
            </Modal>
        </>
    )
}

const Input = (props) => {
    const [value, setValue] = useState(undefined);
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        if (props.callback) {
            if (props.validate) setIsValid(props.validate(value));

            props.callback(value)
        }
    }, [value])

    return (
        <div className='block'>
            <div className='flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-full mt-6 focus-within:border-red-600 hover:border-red-600 duration-300'>
                <input onChange={(event) => setValue(event.target.value)} className='flex-1 focus:outline-none' type="text" placeholder={props.placeholder} />
                {props.icon}
            </div>
            {
                !isValid && props.validate ? <span className='mt-2'>{props.alert}</span> : <></>
            }
        </div>
    )
}

export { Navbar }