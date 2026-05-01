import React, {useEffect} from 'react';
import {changeRepeatState, changeShuffleState, skipToNextSong, skipToPreviousSong} from './playerHelperFunctions';
import {pauseSong, resumeSong} from '../Results/ResultsSong/ResultsSongHelperFunctions';
import PlayerPresentational from './PlayerPresentational';


function Player({playingSongImage, playingSongName, isPlaying, currentRepeatState, currentShuffleState, currentSmartShuffleState, token, currentPosition, onBlockingStateChange, blocking, playingSongDetails, onUpdateRequirement, playingPlaylistUri, currentDeviceId, currentDeviceName, currentVolume, playingSongUri, playingSongDuration, handleSettingPlayerReady}) {

    //Adding the SDK player
    useEffect(() => {
        const playerLibrary = document.createElement('script');
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.id = "spotify-player-script";
        script.async = true;

        if (!document.getElementById("spotify-player-script")) {
            document.body.appendChild(script);
        }
        
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Jammming',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                handleSettingPlayerReady(true, device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });
/*            
            player.addListener('player_state_changed', (
            object) => {
              console.log(object);
            });
*/            
            player.connect();
        }
        return () => {
            delete window.onSpotifyWebPlaybackSDKReady
        }
    }, [])

    //Skip to previous click handler
    const handleSkipToPreviousClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);
        skipToPreviousSong(token).then(response => {
            console.log(response);
            onUpdateRequirement();
        });
    };

    //Skip to next click handler
    const handleSkipToNextClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        skipToNextSong(token).then(response => {
            console.log(response);
            onUpdateRequirement();
        });
    };

    //Pause click handler
    const handlePauseClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        pauseSong(token).then(response => {
            console.log(response);
            onUpdateRequirement();
        });
    };

    //Resume click handler
    const handleResumeClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        resumeSong(token, currentPosition).then(response => {
            console.log(response);
            onUpdateRequirement();
        });
    };

    //Repeat click handler
    const handleRepeatClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        changeRepeatState(token, currentRepeatState, playingPlaylistUri).then(response => {
            console.log(response);
            onUpdateRequirement();
        });
    };

    //Shuffle click handler
    const handleShuffleClick = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);    
        changeShuffleState(token, currentShuffleState, currentSmartShuffleState).then(response => {
            console.log(response);
            onUpdateRequirement();
        });
    };
    

    return (
        <>
            <PlayerPresentational blocking={blocking}
                                  currentDeviceId={currentDeviceId}
                                  currentDeviceName={currentDeviceName}
                                  currentPosition={currentPosition}
                                  currentRepeatState={currentRepeatState}
                                  currentShuffleState={currentShuffleState}
                                  currentSmartShuffleState={currentSmartShuffleState}
                                  currentVolume={currentVolume}
                                  handlePauseClick={handlePauseClick}
                                  handleRepeatClick={handleRepeatClick}
                                  handleResumeClick={handleResumeClick}
                                  handleShuffleClick={handleShuffleClick}
                                  handleSkipToNextClick={handleSkipToNextClick}
                                  handleSkipToPreviousClick={handleSkipToPreviousClick}
                                  isPlaying={isPlaying}
                                  onBlockingStateChange={onBlockingStateChange}
                                  onUpdateRequirement={onUpdateRequirement}
                                  playingPlaylistUri={playingPlaylistUri}
                                  playingSongDetails={playingSongDetails}
                                  playingSongDuration={playingSongDuration}
                                  playingSongImage={playingSongImage}
                                  playingSongName={playingSongName}
                                  playingSongUri={playingSongUri}
                                  token={token}/>
        </>
    )
};

export default Player;