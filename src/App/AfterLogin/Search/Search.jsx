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
                artists: track.artists.map(artist => artist.name),
                album: track.album.name
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