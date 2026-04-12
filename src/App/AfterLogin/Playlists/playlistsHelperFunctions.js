async function getPlaylists(token) {
    const url = "https://api.spotify.com/v1/me/playlists";
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
        throw new Error(`Api request failed in getPlaylists function.\nApi responded error code ${response.status}.`); 
    } catch(e) {
        console.log(`There is an error in getPlaylists function call.\nApi request is rejected`);
        throw new Error(e.message);
    }
};

async function getUserInfo(token) {
    const url = "https://api.spotify.com/v1/me";
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
        throw new Error(`Api request failed in getUserInfo function.\nApi responded error code ${response.status}.`); 
    } catch(e) {
        console.log(`There is an error in getUserInfo function call.\nApi request is rejected`);
        throw new Error(e.message);
    }
};

export {getPlaylists, getUserInfo};