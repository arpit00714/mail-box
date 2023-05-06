import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useParams,useLocation} from 'react-router-dom';
import { useState, useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext"
import EmailForm from "./EmailForm";
import Sidebar from "./Sidebar";

function FullMail() {

  const [show, setShow] = useState(false)
  const [mail, setMail] = useState({})
  const {user} = useContext(AppContext)
  const location = useLocation()
  let params = useParams()

  useEffect(() => {

    // fetchMail(params.id)
    setMail(location.state.mail)
  },[])

//   const fetchMail = async (id) => {
//     const userEmail = user?.email?.replace(/\.|@/g, "")
//     const url = `https://mail-box-9be79-default-rtdb.firebaseio.com/${userEmail}/recieved-mails/${id}.json`

//     const res = await fetch(url)
//     const data = await res.json()
//     setMail(data)
//   }

  return (
    <Row className='vh-100'>
    <Col md={4} className=' shadow-lg bg-dark bg-gradient'>
      <Sidebar setShow={setShow} />
      <EmailForm setShow={setShow} show={show} />
    </Col>
    <Col md={8} className="d-flex justify-content-center align-items-center">
    <Card className="border-sm text-black" style={{height : 'fit-content', width: '600px'}}>
      <Card.Body>
        {/* <Card.Title className="border-bottom pb-2">{mail.sentBy}</Card.Title>
        <div className="border-bottom mb-2" dangerouslySetInnerHTML={{ __html: mail.content }}>

        </div> */}
         {mail?.sentBy && <Card.Title className="border-bottom pb-2">{mail.sentBy}</Card.Title> }
        {mail?.sendTo && <Card.Title className="border-bottom pb-2">{mail.sendTo}</Card.Title> }
        <div className="border-bottom mb-2" dangerouslySetInnerHTML={{ __html: mail?.content }} />
        
        <Link to='/home'><Button variant="primary">Back</Button></Link>
      </Card.Body>
    </Card>
    </Col>
  </Row>    

  )
}

export default FullMail;