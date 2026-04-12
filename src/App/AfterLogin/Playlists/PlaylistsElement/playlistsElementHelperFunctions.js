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
        throw new Error(`Api request failed in renamePlaylists function.\nApi responded error code ${response.status}.`); 
    } catch(e) {
        console.log(`There is an error in renamePlaylists function call.\nApi request is rejected`);
        throw new Error(e.message);        
    }
};

export {renamePlaylist};