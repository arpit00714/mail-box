import { useState, createContext, useEffect } from 'react';

export const AppContext = createContext()

const ContextProvider = (props) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [totalUnread, setTotalUnread] = useState(0)
  const [recievedMails, setRecievedMails] = useState([])

  useEffect(() => {

    getMails()
  }, [])

  const getMails = async () => {
    const userEmail = user?.email?.replace(/\.|@/g, "")
    const url = `https://mail-box-9be79-default-rtdb.firebaseio.com/${userEmail}/recieved-mails.json`

    try {

      const res = await fetch(url)
      const data = await res.json()
      const mails = []
      for (let key in data) {
        mails.push({
          id: key,
          content: data[key].content,
          sentBy: data[key].sentBy,
          read: data[key].read
        })
      }
      let totalUnreadMessages = 0
      mails.forEach(mail => {
        if (!mail.read) totalUnreadMessages += 1
      })
      setRecievedMails(mails)
      setTotalUnread(totalUnreadMessages)
    } catch (error) {
      alert(error.message)
    }
  }

  const loginHandler = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  };

  const authContext = {
    user,
    login: loginHandler,
    getMails,
    totalUnread,
    setTotalUnread,
    mails: recievedMails
  };

  
  return (
    <AppContext.Provider value={authContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;