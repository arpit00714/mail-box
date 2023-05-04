import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth';
import classes from './auth.module.css';

const Login = () => {

    // const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const sendEmail = async () => {
        setIsLoading(true)
        const email = emailInputRef.current.value
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBLAZfI3knkbyxNuEyi2t-QrjiOXbPCZVc"
        const options = {
          method: 'POST',
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
        try {

          const res = await fetch(url, options)
          const data = await res.json()
          setIsLoading(false)
          navigate('/login')
        } catch (error) {
          console.error(error)
        }
    }


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLAZfI3knkbyxNuEyi2t-QrjiOXbPCZVc';

        if (enteredEmail != '' && enteredPassword != '') {

            setIsLoading(true);

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    setIsLoading(false);
                    if (res.ok) {
                        return res.json()
                    } else {
                        return res.json().then(() => {
                            let errorMessage = 'Login failed, Check your Credentials'

                            throw new Error(errorMessage);
                        });
                    }
                })
                .then(data => {
                    dispatch(authActions.login(data.idToken))
                    localStorage.setItem('token',data.idToken)
                    navigate('/')
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    return (
        <section className={classes.auth}>
            <h1>Log In</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                {
                    !show && (
                    <>
                    <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                <p><a href="#" onClick={() => setShow(show => !show)}> Forgot your Password ?</a></p>

                {isLoading && <p>Sending request...</p>}
                <button
                    type='submit'
                    className={classes.toggle}
                >
                    Login
                </button>
                <p>Or <Link to={'/signup'}>Signup...</Link></p>

            </div>
            </>
            )
                }
                {
                    show && 
                <div className={classes.actions}>

                    {isLoading && <p>Sending request...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={sendEmail}
                    >
                        Send Link
                    </button>

                </div>
                }

            </form>
        </section>
    );
};

export default Login;