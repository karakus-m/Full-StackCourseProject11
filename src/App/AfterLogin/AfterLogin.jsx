import React, {useEffect, useState, useCallback } from 'react'
import AfterLoginPresentational from './AfterLoginPresentational';
import {getCurrentState} from './afterLoginHelperFunctions'
import {changeDevice} from './Player/PlayerDevices/PlayerDevicesElement/playerDevicesElementHelperFunctions'

function AfterLogin({ token }) {
    const [results, setResults] = useState([]);
    const [playlistSelected, setPlaylistSelected] = useState(true);
    const [modifiedTracklist, setModifiedTracklist] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [playerReady, setPlayerReady] = useState(false);  //Make it initial false
    const [playingPlaylistUri, setPlayingPlaylistUri] = useState(null); // make it initial null
    const [playingSongUri, setPlayingSongUri] = useState(null); // make it initial null
    const [playingSongPaused, setPlayingSongPaused] = useState(true); //make it initial true
    const [currentPosition, setCurrentPosition] = useState(0);
    const [playingSongName, setPlayingSongName] = useState('Waiting player to get ready');
    const [playingSongDuration, setPlayingSongDuration] = useState(0);
    const [currentRepeatState, setCurrentRepeatState] = useState('off'); // Can be 'off', 'context', or 'track'
    const [currentShuffleState, setCurrentShuffleState] = useState(false); // Can be true or false 
    const [currentSmartShuffleState, setCurrentSmartShuffleState] = useState(false) //Can be true or false
    const [currentVolume, setCurrentVolume] = useState(null);
    const [updateTriggerCount, setUpdateTriggerCount] = useState(0);
    const [blocking, setBlocking] = useState(false);
    const [playingSongImage, setPLayingSongImage] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    //A function that will be used in effect and needs to get defined only once.
    const [playingSongDetails, setPlayingSongDetails] = useState('');
    const [currentDeviceId, setCurrentDeviceId] = useState('');
    const [currentDeviceName, setCurrentDeviceName] = useState('');
    const [waiterTrigger, setWaiterTrigger] = useState(0);
    const [initialDeviceId, setInitialDeviceId] = useState(0);

    const updateStates = () => {
        if(currentDeviceId !== '')
            getCurrentState(token).then(response => {
                response.context === null ? setPlayingPlaylistUri(null) : setPlayingPlaylistUri(response.context.uri);
                response.item === null ? setPlayingSongUri(null) : setPlayingSongUri(response.item.uri);
                setPlayingSongPaused(!response.is_playing);
                response.progress_ms === null ? setCurrentPosition(0) : setCurrentPosition(response.progress_ms);
                response.item === null ? setPlayingSongName('No song selected') : setPlayingSongName(response.item.name);
                response.item === null ? setPlayingSongDuration(0) : setPlayingSongDuration(response.item.duration_ms);
                setCurrentRepeatState(response.repeat_state);
                setCurrentShuffleState(response.shuffle_state);
                setCurrentSmartShuffleState(response.smart_shuffle);
                response.device === null ? 0 : setCurrentVolume(prev => {
                    return Math.round(Number(response.device.volume_percent));
                });
                response.item === null ? setPLayingSongImage("../../../assets/images/playerImages/noPlayingSongImage.svg") : setPLayingSongImage(response.item.album.images[0].url);
                setIsPlaying(response.is_playing);
                response.item === null ? setPlayingSongDetails('') : setPlayingSongDetails(response.item);
                setCurrentDeviceId(response.device.id);
                setCurrentDeviceName(response.device.name);
            });
    }

    useEffect(()=>{
        updateStates();
        const interval = setInterval(() => {
            updateStates();
        }, 3000);
        return () => {
            clearInterval(interval);
        }
    },[updateTriggerCount, currentDeviceId]);

    //When server first takes the device id, even if it responds with success, it still requires time to properly respond to the get playback state call. Hence we include delay here, for the currentDeviceId setting that will trigger getCurrentState function otherwise returns error. This effect can also be removed when the errors are carefully handled. In this case, using a waiter is preferred.
    useEffect(()=> {
        const waiterTimoeout = setTimeout(()=>{
            setCurrentDeviceId(initialDeviceId);
        },6000)
        return () => {
            clearTimeout(waiterTimoeout)
        }
    },[waiterTrigger])

    //Function for setting new value of updateTriggerCount
    const onUpdateRequirement = () => {
        setUpdateTriggerCount((prev) => prev + 1);
    }

    const handleSearch = (resultArray) => {
        setResults(resultArray);
    };

    const handleAddToTrackList = (song) => {
        setModifiedTracklist((prev) => [song, ...prev]);
    };

    const handleRemoveFromTracklist = (song) => {
        setModifiedTracklist((prev) => prev.filter((track) => song.uri !== track.uri));
    };

    const handlePlaylistSelection = (playlistId) => {
        setPlaylistSelected(true);
        setSelectedPlaylist(playlistId);
    };

    const handlePlaylistRerender = (newPlaylists) => {
        if(!newPlaylists.map(item => item.id).includes(selectedPlaylist)){
            setPlaylistSelected(false);
            setSelectedPlaylist('');
        }
    }

    const handleModifiedTracklistUpdate = (updatedTracklist) => {
        setModifiedTracklist(updatedTracklist);
    };

    const onBlockingStateChange = (value) => {
        setBlocking(value);
    }

    const handleSettingPlayerReady = (value, device_id) => {
        setPlayerReady(value);
        changeDevice(token, device_id, currentDeviceId).then((response)=>{
            console.log(response);
            setWaiterTrigger(prev => prev + 1);
            setInitialDeviceId(device_id);
        });
    }

    return (
        <AfterLoginPresentational handleSearch={handleSearch}
                                  token={token}
                                  results={results}
                                  modifiedTracklist={modifiedTracklist}
                                  playlistSelected={playlistSelected}
                                  handleAddToTrackList={handleAddToTrackList}
                                  handleRemoveFromTracklist={handleRemoveFromTracklist}
                                  handlePlaylistSelection={handlePlaylistSelection}
                                  handlePlaylistRerender={handlePlaylistRerender}
                                  selectedPlaylist={selectedPlaylist}
                                  handleModifiedTracklistUpdate={handleModifiedTracklistUpdate}
                                  currentPosition={currentPosition}
                                  playerReady={playerReady}
                                  playingPlaylistUri={playingPlaylistUri}
                                  playingSongPaused={playingSongPaused}
                                  playingSongUri={playingSongUri}
                                  onUpdateRequirement={onUpdateRequirement}
                                  onBlockingStateChange={onBlockingStateChange}
                                  blocking={blocking}
                                  currentRepeatState={currentRepeatState}
                                  currentShuffleState={currentShuffleState}
                                  currentSmartShuffleState={currentSmartShuffleState}
                                  isPlaying={isPlaying}
                                  playingSongDetails={playingSongDetails}
                                  playingSongImage={playingSongImage}
                                  playingSongName={playingSongName}
                                  currentDeviceId={currentDeviceId}
                                  currentDeviceName={currentDeviceName}
                                  currentVolume={currentVolume}
                                  playingSongDuration={playingSongDuration}
                                  handleSettingPlayerReady={handleSettingPlayerReady} />
    );
};

export default AfterLogin;