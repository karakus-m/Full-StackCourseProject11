async function getSearchResults(token, searchString) {
    const formattedSearchString = encodeURIComponent(searchString);
    const url = `https://api.spotify.com/v1/search?q=${formattedSearchString}&type=track&limit=10`;
    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try{
        const response = await fetch(url, payload); //response corresponds to resolve value
        if(response.ok) {
            const responseBody = await response.json(); //body section of the response from api is turned into js object here.
            return responseBody;
        }
        console.error(`Api request failed in getSearchResults function.\nApi responded error code ${response.status}.\n\n`); 
    }
    catch(e){
        console.error(`There is an error in getSearchResults function call.\nApi request is rejected\n Error message is as follows: \n`);
        console.error(e.message,`\n\n`);
    }
};

export {getSearchResults};