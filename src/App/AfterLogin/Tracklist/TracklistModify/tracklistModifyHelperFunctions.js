async function removeTracks(token, playlistId, originalTracklist, modifiedTracklist) {
    
    // Compares original tracklist and modified tracklist, returns an array of tracks removed from the original traclist.
    const removedTracks = originalTracklist.filter((oTTrack) => {
        let removed = true;
        modifiedTracklist.every((mTTrack) => {
            if(mTTrack.uri === oTTrack.uri) {
                removed = false;
            }
            return removed;
        })
        return removed;
    });

    if(removedTracks.length !== 0) {
        // Returns the removedTracks in the format expected by the api.
        const removedTrackUris = removedTracks.map((track) => ({uri: track.uri}))
        
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/items`;
        const payload = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: removedTrackUris
            })
        };

        try{
            const response = await fetch(url, payload);
            if(response.ok) {
                return null;
            }
            console.error(`Api request failed in removeTracks function.\nApi responded error code ${response. status}.\n\n`);
        } catch (e) {
            console.error(`There is an error in removeTracks function call.\nApi request is rejected\n Error message is as follows: \n`);
            console.error(e.message,`\n\n`);   
        }
    } else {
        console.log('No tracks removed from the playlist');
    }
};

async function addTracks(token, playlistId, originalTracklist, modifiedTracklist) {
    
    // Compares modified tracklist with original tracklist, returns an array of tracks add to  the original traclist.
    const addedTracks = modifiedTracklist.filter((mTTrack) => {
        let added = true;
        originalTracklist.every((oTTrack) => {
            if(mTTrack.uri === oTTrack.uri) {
                added = false;
            }
            return added;
        })
        return added;
    });

    if (addedTracks.length !== 0) {
        // Returns the addedTracks in the format expected by the api.
        const addedTrackUris = addedTracks.map((track) => track.uri)
        
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/items`;
        const payload = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: addedTrackUris,
                position: 0
            })
        };

        try{
            const response = await fetch(url, payload);
            if(response.ok) {
                return null;
            }
            console.error(`Api request failed in addTracks function.\nApi responded error code ${response.status}.\n\n`);
        } catch (e) {
            console.error(`There is an error in addTracks function call.\nApi request is rejected\n Error message is as follows: \n`);
            console.error(e.message, `\n\n`);   
        }
    } else {
        console.log('No tracks added to the playlist');
    }
};

export {addTracks, removeTracks};