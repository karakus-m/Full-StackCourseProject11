async function changeTrack (token, songPositionInPlaylist, playlistUri) {
    const url = "https://api.spotify.com/v1/me/player/play";
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "context_uri": playlistUri,
            "offset": {
              "position": songPositionInPlaylist
            },
            "position_ms": 0,
        })
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Track change is successfull`;
        }
        console.error(`Api request failed in changeTrack function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeTrack function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, `\n\n`);
    }
}

export {changeTrack}