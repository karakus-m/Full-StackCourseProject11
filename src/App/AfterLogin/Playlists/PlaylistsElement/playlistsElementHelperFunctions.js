async function renamePlaylist(token, name, playlistId) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const payload = {
        method:'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name" : name
        })
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return null; //Returns nothing in the function body. Hence we can return null for further operations. Do not try to apply .json() method because nothing is returned. If you try, you get error because null does not have .json() method.
        }
        console.error(`Api request failed in renamePlaylists function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in renamePlaylists function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);        
    }
};

async function playPlaylist(token, playlistUri){
    const url = "https://api.spotify.com/v1/me/player/play";
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "context_uri": playlistUri,
            "position_ms": 0,
        })
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Playlist change is successfull`;
        }
        console.error(`Api request failed in playPlaylist function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in playPlaylist function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
};


export {renamePlaylist, playPlaylist};