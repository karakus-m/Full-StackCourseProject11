async function resumeSong(token, positionInMs) {
    const url = "https://api.spotify.com/v1/me/player/play";
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "position_ms": positionInMs
        })
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Resuming song from ${+(positionInMs/1000).toFixed(1)}s is successfull`;
        }
        console.error(`Api request failed in resumeSong function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in resumeSong function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
};

async function changeSong(token, songUri) {
    const url = "https://api.spotify.com/v1/me/player/play";
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "position_ms": 0,
            "uris": [songUri]
        })
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Song change is successfull`;
        }
        console.error(`Api request failed in changeSong function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeSong function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, `\n\n`);
    }
}
async function pauseSong(token) {
    const url = "https://api.spotify.com/v1/me/player/pause";
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Song pause is successfull`;
        }
        console.error(`Api request failed in pauseSong function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in pauseSong function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
}

export {resumeSong, changeSong, pauseSong};
