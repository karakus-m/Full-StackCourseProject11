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
        console.error(`Api request failed in getPlaylists function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in getPlaylists function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
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
        console.error(`Api request failed in getUserInfo function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in getUserInfo function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
};

export {getPlaylists, getUserInfo};