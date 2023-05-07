import ListGroup from 'react-bootstrap/ListGroup';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../useFetchData';


function SentInbox() {

  const { sentMails,changeReadStatus,getSentMails  } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      getSentMails()
    }, 2000);

    return () => {
      clearInterval(interval)
    }
   }, [])

  const onClick = (mail) => {
    const sent = true
    changeReadStatus(mail,sent)
    navigate(`/full-mail/${mail.id}`,{state :{mail}})
}

  return (
    <>
    <h1>Your Mails</h1>
    <ListGroup>
            {
                sentMails.map(mail => (
                        <ListGroup.Item key={mail.id} className='d-flex justify-content-between'>
                            <p>
                                <span style={{width: '1rem', height: '1rem' }} className={`bg-primary me-2 ${mail.read ? 'd-none' : 'd-inline-block'} rounded-circle`}></span> 
                                <span className="link text-primary" onClick={() => onClick(mail)}>{mail.sentBy}</span> 
                            </p>
                            {/* <div className='html' dangerouslySetInnerHTML={{ __html: mail.content }} ></div> */}
                            <div className="subject">{mail.subject.substring(0, 30)}...</div>
                        </ListGroup.Item>
                ))
            }

        </ListGroup>
    </>
  )
}

export default SentInbox;