
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import Badge from "react-bootstrap/Badge";
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Sidebar({ setShow }) {

  const {totalUnread} = useContext(AppContext)

  return (
    <Stack gap={3} className='p-4'>
      <Button variant="primary" onClick={() => setShow(true)}>Compose Email</Button>
      <ListGroup className="text-start">
      <ListGroup.Item className="d-flex justify-content-between"> Inbox 
         <Badge bg="dark">{totalUnread} unread</Badge>  
      </ListGroup.Item>
      <ListGroup.Item>Dapibus lorem</ListGroup.Item>
      <ListGroup.Item>Aspernatur, reiciendis</ListGroup.Item>
      <ListGroup.Item>  Libero, nemo</ListGroup.Item>
    </ListGroup>
    </Stack>
  )
}

export default Sidebar;