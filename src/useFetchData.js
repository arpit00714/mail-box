import { useEffect, useState } from "react"

const getData = async function(url) {
  try {

    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error.message)
  }

}

const useFetchData = (url) => {

    const [totalUnread, setTotalUnread] = useState(0)
    const [totalUnreadSent, setTotalUnreadSent] = useState(0)
    const [recievedMails, setRecievedMails] = useState([])
    const [sentMails, setSentMails] = useState([])

    const data = getData(url)

        const mails = []
        for (let key in data) {

            if (data[key].sentBy) {

                mails.push({
                  id: key,
                  content: data[key].content,
                  sentBy: data[key].sentBy,
                  read: data[key].read
                })
                setRecievedMails(mails)
                if (!data[key].read) setTotalUnread(prev => prev + 1)

                return [
                  totalUnread,recievedMails,setRecievedMails
                ]

            } else {
                mails.push({
                    id: key,
                    content: data[key].content,
                    sendTo: data[key].sendTo,
                    read: data[key].read
                  })
                setSentMails(mails)
                if (!data[key].read) setTotalUnreadSent(prev => prev + 1)

                return [
                  totalUnreadSent,sentMails,setTotalUnreadSent
                ]
                }
        }

}

export default useFetchData;