import { useState,useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

import {AppContext} from "../context/AppContext"

function Home() {
  const [value, setValue] = useState('')
  const {user} = useContext(AppContext)

  const userEmail = user?.email?.replace(/\.|@/g, "")

  const url = `https://mail-box-9be79-default-rtdb.firebaseio.com/${userEmail}/sent-mails.json`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify({
        content : value
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  }
  try {

    const res = await fetch(url,options)
    const data = await res.json()
    alert('Email Sent Succesfully')
    setValue('')
  } catch (error) {
    console.error( error)
  }

  }

  return (
    <main>
    <h1>Welcome to your Mail Box</h1>
    <h3 className="mb-4">Write an Email</h3>
      <div className="container">

        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Form onSubmit={handleSubmit} className="mt-2">
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </div>
  </main>

  )
}

export default Home;