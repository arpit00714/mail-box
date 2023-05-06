import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

import { useState,useRef,useContext } from 'react';
import { AppContext } from "../context/AppContext"

function EmailForm({show,setShow}) {

    const { user } = useContext(AppContext)
    const emailRef = useRef()
    const [value, setValue] = useState('')
    const userEmail = user?.email?.replace(/\.|@/g, "")
    const sendTo = emailRef.current?.value?.replace(/\.|@/g, "")

    const url = `https://mail-box-9be79-default-rtdb.firebaseio.com/${userEmail}/sent-mails.json`
    const url2 = `https://mail-box-9be79-default-rtdb.firebaseio.com/${sendTo}/recieved-mails.json`

    const handleClose = () => setShow(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      const options = {
        method: 'POST',
        body: JSON.stringify({
          content: value,
          sendTo
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const options2 = {
        method: 'POST',
        body: JSON.stringify({
          content: value,
          sentBy : user.email,
          read: false
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      try {
        const res = await fetch(url, options)
        const res2 = await fetch(url2, options2)

        await res.json()
        await res2.json()
        setShow(false)
        alert('Email Sent Succesfully')
      } catch (error) {
        console.error(error)
      }

    }
  return (
    <Modal show={show} onHide={handleClose} className='text-black'>
    <Modal.Header closeButton>
      <Modal.Title >Send an Email</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit} className="mt-2">
          <Form.Group controlId="sendToEmail" >
            <Form.Label>Send To :</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required name="email" />
          </Form.Group>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <Button variant="primary" className="mt-3" type="submit">
            Send
          </Button>
        </Form>
    </Modal.Body>
  </Modal>

  )
}

export default EmailForm;