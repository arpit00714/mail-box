import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Sidebar({ setShow, showSent }) {
  const { totalUnread, totalUnreadSent } = useContext(AppContext);

  return (
    <Stack gap={3} className="p-4">
      <Button variant="primary" onClick={() => setShow(true)}>
        Compose Email
      </Button>
      <ListGroup className="text-start">
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="link" onClick={() => showSent(false)}>
            Inbox
          </span>
          <Badge bg="dark">{totalUnread} unread</Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between">
          <span className="link" onClick={() => showSent(true)}>
            Sent
          </span>
          <Badge bg="dark">{totalUnreadSent} unread</Badge>
        </ListGroup.Item>
        <ListGroup.Item>Aspernatur</ListGroup.Item>
        <ListGroup.Item> Libero, nemo</ListGroup.Item>
      </ListGroup>
    </Stack>
  );
}

export default Sidebar;
