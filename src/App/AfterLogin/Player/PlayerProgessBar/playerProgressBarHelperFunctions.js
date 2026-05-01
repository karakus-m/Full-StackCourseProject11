async function changeSongPosition(token, position) {
    const url = `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`;
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Position is succesfully changed to ${position}ms`;
        }
        console.error(`Api request failed in changeSongPosition function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeSongPosition function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, '\n\n');
    }
};

export {changeSongPosition}