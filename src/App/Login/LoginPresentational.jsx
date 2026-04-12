import styles from './LoginPresentational.module.css';

function LoginPresentational ({handleSignInClick}) {

    return (
        <div className={styles.content}>
          <button onClick={handleSignInClick}>Connect to Spotify</button>
        </div>
    );
};

export default LoginPresentational;