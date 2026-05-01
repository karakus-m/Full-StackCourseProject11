async function skipToPreviousSong(token) {
    const url = "https://api.spotify.com/v1/me/player/previous";
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Skipped to previous`;
        }
        console.error(`Api request failed in skipToPreviousSong function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in skipToPreviousSong function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, `\n\n`);
    }
};

async function skipToNextSong(token) {
    const url = "https://api.spotify.com/v1/me/player/next";
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Skipped to next`;
        }
        console.error(`Api request failed in skipToNextSong function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in skipToNextSong function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
};

async function changeShuffleState(token, shuffleState, smartShuffleState) {
    const nextShuffleState = (shuffleState === true || smartShuffleState === true) ? 'false' : 'true';
    const url = `https://api.spotify.com/v1/me/player/shuffle?state=${nextShuffleState}`;
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Shuffle state is changed to shuffle: ${nextShuffleState}`;
        }
        console.error(`Api request failed in changeShuffleState function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeShuffleState function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message);
    }
};

async function changeRepeatState(token, repeatState, currentPlaylistUri) {
    const nextRepeatState = (repeatState === 'track' && currentPlaylistUri !== null ) ? 'context' : (repeatState === 'context') ? 'off' : (repeatState === 'track') ? 'off' : 'track';
    const url = `https://api.spotify.com/v1/me/player/repeat?state=${nextRepeatState}`;
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Repeat state is changed to repeat: ${nextRepeatState}`;
        }
        console.error(`Api request failed in changeRepeatState function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeRepeatState function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
};


export {changeRepeatState, changeShuffleState, skipToNextSong, skipToPreviousSong}