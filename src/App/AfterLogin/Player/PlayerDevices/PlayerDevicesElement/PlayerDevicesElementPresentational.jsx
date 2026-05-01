import React from "react";
import styles from './PlayerDevicesElementPresentational.module.css';

function PlayerDevicesElementPresentational({currentDeviceId, device, blocking, isPlaying, handleSelectDeviceClick, }) {
    
    const stylingCondition = () => {
        if (currentDeviceId === device.id) {
            return 'currentDevice';
        } else {
            return '';
        }
    } 

    //Stling condition for blocking
    const stylingCondition2 = () => {
        if(blocking === true){
            return 'blocked';
        }
        else if(blocking === false){
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in PlaylistDevicesElement.jsx \ has found to be neither true nor false \ find the error. \ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    }

    //Stling condition for blocking
    const stylingCondition3 = () => {
        if(currentDeviceId === device.id && isPlaying === true){
            return 'currentDevicePlaying';
        }
        else if(currentDeviceId === device.id && isPlaying === false){
            return 'currentDevicePaused';
        } else {
            return '';
        }
    }


    return (
        <li disabled={blocking} onClick={handleSelectDeviceClick} className={`${styles[stylingCondition()]} ${stylingCondition2()} ${device.type} ${styles[stylingCondition3()]} ${styles.device}`}>
            <p>{device.name}</p>
        </li>
    );
};

export default PlayerDevicesElementPresentational;