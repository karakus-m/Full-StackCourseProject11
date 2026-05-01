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
        console.error(`Api request failed in createPlaylist function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in createPlaylist function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, `\n\n`);
    }
};

export {createPlaylist};