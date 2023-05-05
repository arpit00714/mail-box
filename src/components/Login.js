import { useState, useRef, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate,Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import { authActions } from '../../store/auth';
// import classes from './auth.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { AppContext } from '../context/AppContext';

const Login = () => {

    // const token = useSelector((state) => state.auth.token)
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const {login} = useContext(AppContext)

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // const [isLoading, setIsLoading] = useState(false);
    // const [show, setShow] = useState(false);

    // const sendEmail = async () => {
    //     setIsLoading(true)
    //     const email = emailInputRef.current.value
    //     const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBQICA6ovCbZscp1SQ8m_QhjVdHDBN7SoU"
    //     const options = {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         requestType: "PASSWORD_RESET",
    //         email,
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //     try {

    //       const res = await fetch(url, options)
    //       const data = await res.json()
    //       setIsLoading(false)
    //       navigate('/login')
    //     } catch (error) {
    //       console.error(error)
    //     }
    // }
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQICA6ovCbZscp1SQ8m_QhjVdHDBN7SoU';

        if (enteredEmail === '' && enteredPassword === '') {
            setMessage('All Fields are mandatory')
            return
        }

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
                    // dispatch(authActions.login(data.idToken))
                    // localStorage.setItem('token',data.idToken)
                    // navigate('/')
                    login(data)
                    navigate('/home')
                })
                .catch((err) => {
                    alert(err.message);
                });
        
    };

    return (
        <section className='auth'>
        <h1>Log In</h1>
        <Form>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Your Password</Form.Label>
            <Form.Control type='password'
              required
              ref={passwordInputRef} placeholder="Password" />
          </Form.Group>
          {message !== '' ? <Form.Text className='me-4'>{message}</Form.Text> : ''}
          <Button variant="primary" type="submit" onClick={submitHandler}>
          {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
          <br />
          <Form.Text>Or <Link to={'/signup'}>Signup...</Link></Form.Text>
        </Form>
      </section >
    );
};

export default Login;