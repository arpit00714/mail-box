import { useState,useContext, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AppContext } from "../context/AppContext"
import EmailForm from "./EmailForm";
import Inbox from "./Inbox";
import Sidebar from "./Sidebar";


function Home() {
  // const [value, setValue] = useState('')
  // const {user} = useContext(AppContext)
  // const [recievedMails, setRecievedMails] = useState([])
  const [show, setShow] = useState(false)
  
  const { mails,getMails } = useContext(AppContext)

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
            <Inbox mails={mails}  />
          </Col>
        </Row>
        </div>
        
  </main>

  )
}

export default Home;