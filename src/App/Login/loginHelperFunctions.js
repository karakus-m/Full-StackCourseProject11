//In this part, ai was used for support because implicit grant that was expected to obtain the token was deprecated. Instead, Authorization code with PKCE was used. Since it is hard to understand, and includes several complex steps I didn't learn yet, I used AI. However, I also learned everything used here that I didn't know earlier including PKCE flow. 

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;  
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;


// A random string of a specified length is generated for the code verifier.
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// The code verifier is hashed using the SHA-256 algorithm.
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

// The resulting binary hash is transformed into a URL-safe Base64 string.
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};


// Event handler function to redirect the user to the 
const redirectToAuth = async () => {
  // A code verifier is generated and stored in the local storage for later validation.
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem('code_verifier', codeVerifier);

  // A code challenge is derived from the verifier to be sent to the authorization server.
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // Authorization parameters are constructed using URLSearchParams.
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private user-modify-playback-state user-read-playback-state user-read-recently-played user-read-currently-playing streaming',
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  // The browser is redirected to the Spotify Accounts Service.
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

const getAccessToken = async (code) => {
  // The previously stored code verifier is retrieved from local storage.
  const codeVerifier = window.localStorage.getItem('code_verifier');

  // A POST request is prepared with application/x-www-form-urlencoded content type.
  const payload = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };
  try{
    // The access token is fetched from the Spotify token endpoint.
    const response = await fetch('https://accounts.spotify.com/api/token', payload);
    if(response.ok) {
      const data = await response.json();
      return data.access_token;
    };
    console.error(`Api request failed in getAccessToken() function.\nApi responded error code ${response.status}.\n\n`); 
  }
  catch(e) {
    console.error(`There is an error in getAccessToken function call.\nApi request is rejected\n Error message is as follows: \n`);
    console.error(e.message);
    console.error(`\n\n`);
  }
};


export {redirectToAuth, getAccessToken };