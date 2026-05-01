import React from 'react';
import Login from './Login/Login';
import AfterLogin from './AfterLogin/AfterLogin';
import styles from './AppPresentational.module.css';

function AppPresentational({signedInJammming, token, onSignIn, onTokenReceiving}) {
    
    return (
        <div className = {styles.app}>
          <h1 className={styles.pageName}>Jammming</h1>
          <p className={`${styles.spotifyLogo}`}><div></div>Data provided by Spotify</p>
          {
            signedInJammming ? 
              <AfterLogin token={token} /> : 
              <Login onSignIn= {onSignIn}
                     onTokenReceiving={onTokenReceiving} />
          }
        </div>
  );
};

export default AppPresentational;