async function getTracklist(token, selectedPlaylistId) {
    const url = `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/items`;
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
        console.error(`Api request failed in getTracklist function.\nApi responded error code ${response.status}.\n\n`);
    } catch (e) {
        console.error(`There is an error in getTracklist function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);   
    }
};

export {getTracklist};