
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useContext,useEffect } from 'react';
import FullMail from './FullMail';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Inbox({ mails }) {
    const navigate = useNavigate()
    const { user,setTotalUnread,getMails } = useContext(AppContext)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        getMails()
    },[])

    const changeReadStatus = async (mail) => {
        const userEmail = user?.email?.replace(/\.|@/g, "")
        const url = `https://mail-box-9be79-default-rtdb.firebaseio.com/${userEmail}/recieved-mails/${mail.id}.json`

        const options = {
            method: 'PATCH',
            body: JSON.stringify({
                read: true
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        navigate(`/full-mail/${mail.id}`)
        try {
            if (!mail.read) {

                const res = await fetch(url, options)
                const data = await res.json()
                setTotalUnread(prev => prev > 0 ? prev - 1 : prev)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <ListGroup>
            {
                mails.map(mail => (

                    <ListGroup.Item key={mail.id} className='d-flex justify-content-between'>
                            <p>
                                <span style={{width: '1rem', height: '1rem' }} className={`bg-primary me-2 ${mail.read ? 'd-none' : 'd-inline-block'} rounded-circle`} /> 
                                <span className="link text-primary" onClick={() => changeReadStatus(mail)}>{mail.sentBy}</span> 
                            </p>
                            <div className='html' dangerouslySetInnerHTML={{ __html: mail.content }} ></div>
 
                            </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default Inbox;