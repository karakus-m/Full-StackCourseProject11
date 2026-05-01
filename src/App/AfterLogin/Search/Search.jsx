import React, {useState} from 'react';
import {getSearchResults} from './searchHelperFunctions'
import SearchPresentational from './SearchPresentational';

function Search ({onSearch, token}) {
    const [searchString, setSearchString] = useState("");

    //Click event handler for search button
    const handleSearchClick = () => {
        //No need for additional error handling here, everything was handled in getSearchResults function.
        getSearchResults(token, searchString).then(unformattedResults => {
            const formattedResults = unformattedResults.tracks.items.map((track) => ({
                name: track.name,
                uri: track.uri,
                id: track.id,
                artists: track.artists,
                album: track.album.name,
                albumLink: track.album.external_urls.spotify,
                image: track.album.images[0].url,
                link: track.external_urls.spotify
            }));
            onSearch(formattedResults);
        });
    };

    //Change event handler for text input section
    const handleInputChange = (e) => {
        setSearchString(e.target.value);
    }

    return (
        <SearchPresentational searchString={searchString}
                              handleInputChange={handleInputChange}
                              handleSearchClick={handleSearchClick}/>
    );
};

export default Search;