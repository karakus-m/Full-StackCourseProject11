import React from "react";
import styles from './SearchPresentational.module.css';

function SearchPresentational ({searchString, handleInputChange, handleSearchClick}) {
    
    return (
        <div className={styles.searchBox}>
            <input className={styles.searchInput} value={searchString} onChange={handleInputChange} placeholder="Write the track name here"/>
            <button className={styles.searchButton}onClick={handleSearchClick}></button>
        </div>    
    );
};

export default SearchPresentational;