async function getCurrentDevices (token) {
    const url = `https://api.spotify.com/v1/me/player/devices`;
    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try{
        const response = await fetch(url, payload);
        if(response.ok) {
            console.log( `Current devices info is succesfully fetched` );
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        console.error(`Api request failed in getCurrentDevices function.\nApi responded error code ${response.status}.\n\n`); 
    } catch(e) {
        console.error(`There is an error in getCurrentDevices function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
}

export {getCurrentDevices}