async function createPlaylist(token, playlistName) {
    const url = `https://api.spotify.com/v1/me/playlists`;
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: playlistName,
            description: playlistName,
            public: false
        })
    };
    
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            const responseBody = await  response.json();
            return responseBody
        }
        throw new Error(`Api request failed in createPlaylist function.\nApi responded error code ${response.status}.`); 
    } catch(e) {
        console.log(`There is an error in createPlaylist function call.\nApi request is rejected`);
        throw new Error(e.message);
    }
};

export {createPlaylist};