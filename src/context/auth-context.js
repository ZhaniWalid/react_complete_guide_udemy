import React from 'react';

// We are creating a JS File to use it for the 'Context API' for the 'Login'
const authContext = React.createContext({
    authenticated: false,
    login: () => {}
});

export default authContext;