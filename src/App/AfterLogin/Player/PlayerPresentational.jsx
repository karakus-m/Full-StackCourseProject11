import React from "react";
import PlayerDevices from './PlayerDevices/PlayerDevices';
import PlayerVolume from './PlayerVolume/PlayerVolume';
import PlayerProgressBar from './PlayerProgessBar/PlayerProgressBar';
import styles from './PlayerPresentational.module.css';
import fallBackImage from '../../../assets/images/playerImages/noPlayingSongImage.svg';

function PlayerPresentational ({blocking, playingSongDetails, playingSongImage, playingSongName, handleSkipToPreviousClick, handleSkipToNextClick, isPlaying, handlePauseClick, handleResumeClick, token, onUpdateRequirement, currentVolume, onBlockingStateChange, currentRepeatState, handleRepeatClick, currentShuffleState, currentSmartShuffleState, handleShuffleClick, currentDeviceId, currentDeviceName, playingPlaylistUri, playingSongUri, playingSongDuration, currentPosition}) {

    //Stling condition for blocking
    const stylingCondition = () => {
        if(blocking === true){
            return 'blocked';
        }
        else if(blocking === false){
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in ResultsSongPresentational.jsx \ has found to be neither true nor false \ find the error. \ Possible error location: \ ResultsSong.jsx \ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    } 

    return (
        <div className={styles.playerContainer}>
            <div className={`${styles.songImageContainer}`}>
                <a href={playingSongDetails === '' ? '' : playingSongDetails.external_urls.spotify} target='_blank'><img className={`${styles.songImage}`} src={playingSongImage !== '' ? playingSongImage : fallBackImage} alt="Song Image" /></a>
            </div>
            <div className={`${styles.songDetailsSection}`}>
                <p className={`${styles.playingSongName}`}>{playingSongName}</p>
                <p className={`${styles.playingSongArtist}`}>
                    {
                        playingSongDetails === '' ? '' :
                            playingSongDetails.artists.map((item, index) => (
                                <span key={item.href}><a href={item.external_urls.spotify} target='_blank'>{item.name}</a> { index < (playingSongDetails.artists.length - 1) ? ", " : ""}</span>
                            ))
                    }
                </p>
            </div>
            <div className={`${styles.mainButtons}`}>
                <button disabled={blocking} className={`${stylingCondition()} ${styles.togglingButton} ${styles.previousSongButton}`} onClick={handleSkipToPreviousClick}></button>
                <button disabled={blocking} className={`${stylingCondition()} ${styles. togglingButton} ${styles.nextSongButton}`} onClick={handleSkipToNextClick}   ></button>
                {
                    isPlaying === true ?
                        (
                            <button disabled={blocking} className={`${stylingCondition()} ${styles.togglingButton} ${styles.pauseButton} ${styles.pausePlayButton}`} onClick= {handlePauseClick}></button> 
                        ) :
                        (
                            <button disabled={blocking} className={`${stylingCondition()} ${styles.togglingButton} ${styles.resumeButton} ${styles.pausePlayButton}`} onClick=    {handleResumeClick}></button>    
                        )
                }
            </div>
            <div className={`${styles.extraButtons}`}>           
                <PlayerVolume token={token}
                              onUpdateRequirement={onUpdateRequirement}
                              currentVolume={currentVolume}
                              blocking={blocking}
                              onBlockingStateChange={onBlockingStateChange} />
                {
                    (currentRepeatState === 'context') ? 
                        (
                            <button disabled={blocking} className={`${stylingCondition()} ${styles.otherButton} ${styles.repeatContextButton} ${styles.commonRepeatButton}`} onClick=    {handleRepeatClick}></button> 
                        ) : (currentRepeatState === 'track') ? 
                            (
                                <button disabled={blocking} className={`${stylingCondition()}   ${styles.otherButton} ${styles.repeatTrackButton} ${styles.commonRepeatButton}`} onClick=  {handleRepeatClick}></button> 
                            ) : 
                            (
                                <button disabled={blocking} className={`${stylingCondition()}   ${styles.otherButton} ${styles.repeatOffButton} ${styles.commonRepeatButton}`} onClick=    {handleRepeatClick}></button>
                            )
                }
                {
                    (currentShuffleState === true && currentSmartShuffleState === false) ?
                        (
                            <button disabled={blocking} className={`${stylingCondition()} ${styles.otherButton} ${styles.regularShuffleButton} ${styles.commonShuffleButton}`} onClick=   {handleShuffleClick}></button> 
                        ) : (currentSmartShuffleState === true) ?
                            (
                                <button disabled={blocking} className={`${stylingCondition()}   ${styles.otherButton} ${styles.smartShuffleButton} ${styles.commonShuffleButton}`} onClick= {handleShuffleClick}></button> 
                            ) : 
                            (
                                <button disabled={blocking} className={`${stylingCondition()}   ${styles.otherButton} ${styles.shuffleOffButton} ${styles.commonShuffleButton}`} onClick=   {handleShuffleClick}></button> 
                            )
                }          
                <PlayerDevices  currentDeviceId={currentDeviceId}
                                currentDeviceName={currentDeviceName}
                                onUpdateRequirement={onUpdateRequirement}
                                token={token}
                                onBlockingStateChange={onBlockingStateChange}
                                blocking={blocking}
                                isPlaying={isPlaying} />
            </div>

            <PlayerProgressBar currentDuration={playingSongDuration}
                               currentPosition={currentPosition}
                               onUpdateRequirement={onUpdateRequirement}
                               playingSongUri={playingSongUri}
                               token={token}
                               blocking={blocking}
                               onBlockingStateChange={onBlockingStateChange}
                               playingPlaylistUri={playingPlaylistUri}
                               isPlaying={isPlaying} />

        </div>
    );
}

export default PlayerPresentational;