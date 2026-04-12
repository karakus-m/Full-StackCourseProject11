import React, {useEffect} from 'react';
import {redirectToAuth, getAccessToken} from './loginHelperFunctions.js';
import LoginPresentational from './LoginPresentational.jsx';


function Login({onTokenReceiving, onSignIn}) {

    //Effect to run only in the first render. Whole code runs in there is a code key in the url of the site.
    useEffect(() => {
    // URL parameters are parsed to check for the presence of an authorization code.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // If a code is detected and no token exists, the exchange process is triggered.
    if (code) {
      //Data fetching is done in getAccessToken. All errors are handled inside it. No need for additional error handling here.
      getAccessToken(code).then(accessToken => {
        onTokenReceiving(accessToken);
        onSignIn(true);
      });
      // The URL is cleaned by removing the sensitive code parameter.
      window.history.replaceState({}, document.title, "/");
    }
    }, []);
    
    //Click event handler for sign in button
    const handleSignInClick = () => {
        redirectToAuth();
    };

    return (
      <LoginPresentational handleSignInClick={handleSignInClick}/>
    );
};

export default Login;