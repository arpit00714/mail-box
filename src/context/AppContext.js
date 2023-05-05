import { useState, createContext } from 'react';

export const AppContext = createContext()

const ContextProvider = (props) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const loginHandler = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  };

  const authContext = {
    user,
    login: loginHandler,
  };

  return (
    <AppContext.Provider value={authContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;