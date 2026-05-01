import React, {useState, useEffect} from 'react';
import {changeSongPosition} from './playerProgressBarHelperFunctions';
import PlayerProgressBarPresentational from './PlayerProgressBarPresentational';

function ProgressBar ({currentDuration, currentPosition, token, onUpdateRequirement, playingSongUri, onBlockingStateChange, blocking, playingPlaylistUri, isPlaying}) {
    const [shownPosition, setShownPosition] = useState(0); //seconds
    const [shownPositionInMinutes, setShownPositionInMinutes] = useState(`00:00:00`);
    const [shownDurationInMinutes, setShownDurationInMinutes] = useState(`00:00:00`);
    const [mouseDown, setMouseDown] = useState(false);
    const [songWhenMouseDownHit, setSongWhenMouseDownHit] = useState('');
    const [playlistWhenMouseDownHit, setPlaylistWhenMouseDownHit] = useState('');
    const [trigger, setTrigger] = useState(0);

    const timeInMs = (timeInMs) => {
        const totalSeconds = Math.round(timeInMs/1000);
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        if(hours === 0) {
            if(minutes === 0) {
                if([0,1,2,3,4,5,6,7,8,9].includes(seconds)){
                    return `00:0${seconds}`;
                } else{
                    return `00:${seconds}`;
                }
            } else {
                if([0,1,2,3,4,5,6,7,8,9].includes(minutes)){
                    if([0,1,2,3,4,5,6,7,8,9].includes(seconds)){
                        return `0${minutes}:0${seconds}`;
                    } else{
                        return `0${minutes}:${seconds}`;
                    }
                } else {
                    if([0,1,2,3,4,5,6,7,8,9].includes(seconds)){
                        return `${minutes}:0${seconds}`;
                    } else{
                        return `${minutes}:${seconds}`;
                    }
                }
            }
        } else {
            if([0,1,2,3,4,5,6,7,8,9].includes(minutes)){
                if([0,1,2,3,4,5,6,7,8,9].includes(seconds)){
                    return `${hours}:0${minutes}:0${seconds}`;
                } else{
                    return `${hours}:0${minutes}:${seconds}`;
                }
            } else {
                if([0,1,2,3,4,5,6,7,8,9].includes(seconds)){
                    return `${hours}:${minutes}:0${seconds}`;
                } else{
                    return `${hours}:${minutes}:${seconds}`;
                }
            }
        }
    };
    
    useEffect(()=>{
        if(mouseDown === false) {
            setShownDurationInMinutes(prev => timeInMs(currentDuration)); //string
            setShownPositionInMinutes(prev => timeInMs(currentPosition)); //string
            setShownPosition(prev => Math.round(currentPosition/1000));  //seconds
        }
    }, [currentDuration, currentPosition,])

    useEffect(()=> {
        let currentTimeout;
        if(mouseDown === false && isPlaying === true) {
            currentTimeout = setTimeout(() => {
                setShownPositionInMinutes(prev => timeInMs(shownPosition*1000 + 1000));
                setShownPosition(prev => prev + 1);  //seconds
            }, 1000);
        } else {
            currentTimeout = setTimeout(()=>{
                console.log(`Position update is stopped till mouse up or until playing song`)
            }, 1000)
        }

        return () => {
            clearTimeout(currentTimeout);
        }
    },[mouseDown, shownPosition, isPlaying])

    //After updating server, it will wait for some time before sending new update because server does not return new value when requested directly after change in this case. It is better to wait for 1 second.

    useEffect(() => {
        const waitingTimeout = setTimeout(()=>{
            onUpdateRequirement();
            setMouseDown(false);
        }, 1000)

        return () => {
            clearTimeout(waitingTimeout);
        }
    }, [trigger])


    //handler for mousedown
    const handleMouseDown = () => {
        setMouseDown(true);
        setSongWhenMouseDownHit(playingSongUri);
        setPlaylistWhenMouseDownHit(playingPlaylistUri);
    };

    //handler for mousedup
    const handleMouseUp = () => {
        onBlockingStateChange(true);
        setTimeout(()=>{onBlockingStateChange(false)}, 1000);
        if(playingSongUri === songWhenMouseDownHit && playingPlaylistUri === playlistWhenMouseDownHit) {
            changeSongPosition(token, shownPosition*1000).then(response => {
                console.log(response);
                setTrigger(prev => prev + 1)
            }).catch(response => {
                setMouseDown(false);
            });
        } else{
            onUpdateRequirement();
            setMouseDown(false);
        }
    }

    //handler for input change
    const handlePositionChange = (e) => {
        setShownPosition(prev => Number(e.target.value));
        const positionInMs = Number(e.target.value)*1000;
        setShownPositionInMinutes(prev => timeInMs(positionInMs))
    }

    return (
        <>
            <PlayerProgressBarPresentational blocking={blocking}
                                             currentDuration={currentDuration}
                                             handleMouseDown={handleMouseDown}
                                             handleMouseUp={handleMouseUp}
                                             handlePositionChange={handlePositionChange}
                                             shownDurationInMinutes={shownDurationInMinutes}
                                             shownPosition={shownPosition}
                                             shownPositionInMinutes={shownPositionInMinutes} />
        </>
    )
};

export default ProgressBar;