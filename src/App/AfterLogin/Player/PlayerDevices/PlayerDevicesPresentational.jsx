import React from "react";
import PlayerDevicesElement from "./PlayerDevicesElement/PlayerDevicesElement"
import styles from "./PlayerDevicesPresentational.module.css";

function PlayerDevicesPresentational ({blocking, handleShowDevicesClick, handleCloseDevicesMenuClick, handleReloadDevicesClick, token, currentDeviceId, handleSelectDeviceClick, onBlockingStateChange, isPlaying, showDevicesClicked, availableDevices}) {
    //Stling condition for blocking
    const stylingCondition = () => {
        if (blocking === true) {
            return 'blocked';
        }
        else if (blocking === false) {
            return '';
        } else {
            console.error(`This is an non blocking error. \ Blocking state in PlayerDevices.jsx \ has found to be neither true nor false \ find the error.\ If not debugged, server might get too many requests, resulting in a temporary fetch ban.`);
        }
    }

    const beforeClick = (
        <button className={`${styles.devicesButton} ${styles.otherButton}`} onClick={handleShowDevicesClick}></button>
    );

    const afterClick = (
        <div className={`${styles.devicesSection}`}>
            <div className={`${styles.closeAndReload}`} >
                <button onClick={handleCloseDevicesMenuClick} className={`${styles.closeButton} ${styles.devicesInnerButton}`}></button>
                <button disabled={blocking} className={`${stylingCondition()} ${styles.reloadButton} ${styles.devicesInnerButton}`} onClick={handleReloadDevicesClick}></button>
            </div>
            <p className={`${styles.title}`}>Devices</p>
            <ul className={`${styles.devicesList}`}>
                {
                    availableDevices.map(device => <PlayerDevicesElement key={device.id}
                        token={token}
                        currentDeviceId={currentDeviceId}
                        device={device}
                        onSelectDeviceClick={handleSelectDeviceClick}
                        blocking={blocking}
                        onBlockingStateChange={onBlockingStateChange}
                        isPlaying={isPlaying} />)
                }
            </ul>
        </div>
    );



    return (
        <>   
            {
                (showDevicesClicked === true) ? afterClick : beforeClick
            }
        </>

    );
}

export default PlayerDevicesPresentational;