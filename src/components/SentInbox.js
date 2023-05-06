import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


function SentInbox() {

  const { sentMails,changeReadStatus } = useContext(AppContext)
  const navigate = useNavigate()
 console.log(sentMails);
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
                                <span className="link text-primary" onClick={() => onClick(mail)}>{mail.sendTo}</span> 
                            </p>
                            <div className='html' dangerouslySetInnerHTML={{ __html: mail.content }} ></div>
                        </ListGroup.Item>
                ))
            }

        </ListGroup>
    </>
  )
}

export default SentInbox;