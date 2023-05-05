import { useState,useContext, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AppContext } from "../context/AppContext"
import EmailForm from "./EmailForm";
import Inbox from "./Inbox";
import Sidebar from "./Sidebar";


function Home() {
  // const [value, setValue] = useState('')
  // const {user} = useContext(AppContext)
  const [recievedMails, setRecievedMails] = useState([])
  const [show, setShow] = useState(false)
  const { user } = useContext(AppContext)


  const userEmail = user?.email?.replace(/\.|@/g, "")

  useEffect(() => {

    getMails()
  }, [])

  const getMails = async () => {
    const url = `https://mail-box-9be79-default-rtdb.firebaseio.com/${userEmail}/recieved-mails.json`

    try {

      const res = await fetch(url)
      const data = await res.json()
      const mails = []
      for (let key in data) {
        mails.push({
          id: key,
          content: data[key].content,
          sentBy: data[key].sentBy
        })
      }
      setRecievedMails(mails)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <main>
      <h1 className="mb-4">Welcome to your Mail Box</h1>
     <div>
        <Row className='vh-100'>
          <Col md={4} className=' shadow-lg bg-dark bg-gradient'>
            <Sidebar setShow={setShow} />
          </Col>
          <Col md={8}>
            <EmailForm setShow={setShow} show={show} />
            <Inbox mails={recievedMails}  />
          </Col>
        </Row>
        </div>
        
  </main>

  )
}

export default Home;