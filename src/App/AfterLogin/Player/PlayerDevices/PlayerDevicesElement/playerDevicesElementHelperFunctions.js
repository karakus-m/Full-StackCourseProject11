async function changeDevice (token, deviceId, currentDeviceId)  {
    if(currentDeviceId === deviceId) {
        return 'Devices are same, no request sent'
    }
    const url = `https://api.spotify.com/v1/me/player`;
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "device_ids": [
                deviceId
            ]
        })
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            return `Device change request succesfull`;
        }
        console.error(`Api request failed in changeDevice function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in changeDevice function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message, `\n\n`);
    }
};

export {changeDevice};