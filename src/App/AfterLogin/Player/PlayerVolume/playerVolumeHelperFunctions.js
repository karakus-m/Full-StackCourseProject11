async function changeVolume (token, desiredVolumePercentage) {
    const url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${desiredVolumePercentage}`;
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Volume succesfully tried to changed to ${desiredVolumePercentage}`;
        }
        console.error(`Api request failed in changeVolume function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeVolume function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, `\n\n`);
    }
};

export {changeVolume};