import { useState, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passConfirmRef = useRef()

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const passConfirm = passConfirmRef.current.value;

    
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQICA6ovCbZscp1SQ8m_QhjVdHDBN7SoU';

    if ( enteredEmail === '' || enteredPassword === '' || passConfirmRef.current.value === ''){
      setMessage('All Fields are mandatory')
      return
    } 
    if (enteredPassword !== passConfirm) {
      setMessage('Passwords do not MATCH')
      return
    }
      setMessage('')
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
            console.log('User has successfully signed up')
            navigate('/login')
          } else {
            return res.json().then(() => {
              let errorMessage = 'Signup failed'

              throw new Error(errorMessage);
            });
          }
        })
        .catch((err) => {
          alert(err.message);
        });

  };

  return (
    <section className='auth'>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Your Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Your Password</Form.Label>
          <Form.Control type='password'
            required
            ref={passwordInputRef} placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId='passConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            required
            ref={passConfirmRef} placeholder="Confirm Password" />
        </Form.Group>
        {message !== '' ? <Form.Text className='me-4'>{message}</Form.Text> : ''}
        <Button variant="primary" type="submit" onClick={submitHandler}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <br />
        <Form.Text >Already have an account ? <Link to={'/login'}>Login...</Link></Form.Text>
      </Form>
    </section >
  );
};

export default Signup;