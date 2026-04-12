import { useState, useEffect} from 'react';
import AppPresentational from './AppPresentational';

function App() {
  //States
  const [token, setToken] = useState("");
  const [signedInJammming, setSignedInJammming] = useState(false);

  // Handler for state change
  const handleSignedInState = (val) => {
    setSignedInJammming(val); //val is either true or false
  };

  // Handler for state change
  const handleTokenState = (accessToken) => {
    setToken(accessToken);
  };

  return (
    <AppPresentational signedInJammming={signedInJammming}
                       token={token}
                       onSignIn={handleSignedInState}
                       onTokenReceiving={handleTokenState} />
  );
};

export default App;
