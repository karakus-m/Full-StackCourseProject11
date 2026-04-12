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
        throw new Error(`Api request failed in getTracklist function.\nApi responded error code ${response.status}.`);
    } catch (e) {
        console.log(`There is an error in getTracklist function call.\nApi request is rejected`);
        throw new Error(e.message);   
    }
};

export {getTracklist};