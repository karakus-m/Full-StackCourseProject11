async function getCurrentState(token) {
    const url = "https://api.spotify.com/v1/me/player";
    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }
        console.error(`Api request failed in getCurrentState function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in getCurrentState function call.\nApi request is rejected. \n Error message is as follows: \n`);
        console.error(e.message);
    }
};

export {getCurrentState};