import React, { createContext } from 'react';

const UserContext = createContext({
    User: null,
    setUser: () => {},
});

export default UserContext;