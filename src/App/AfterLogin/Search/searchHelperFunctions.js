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
        throw new Error(`Api request failed in getSearchResults function.\nApi responded error code ${response.status}.`); 
    }
    catch(e){
        console.log(`There is an error in getSearchResults function call.\nApi request is rejected`);
        throw new Error(e.message);
    }
};

export {getSearchResults};