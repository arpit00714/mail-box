import { useState } from 'react'
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';

function Sidebar({setShow}) {
  return (
    <Stack gap={3} className='p-4'>
      <Button variant="primary" onClick={() => setShow(true)}>Compose Email</Button>
      <p>lorem5</p>
      <p>lorem5</p>
      <p>lorem5</p>
      <p>lorem5</p>
      <p>lorem5</p>
    </Stack>
  )
}

export default Sidebar;