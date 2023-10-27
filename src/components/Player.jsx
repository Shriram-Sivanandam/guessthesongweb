/* eslint-disable react/prop-types */
import SpotifyPlayer from 'react-spotify-web-playback';
import './PlayerStyles.css';

const Player = ({ accessToken, trackUri }) => {
	if (!accessToken) return null;
	return (
		<SpotifyPlayer
			token={accessToken}
			showSaveIcon
			uris={trackUri ? [trackUri] : []}
			styles={{
				bgColor: '#333',
				color: '#fff',
				loaderColor: '#fff',
				sliderColor: '#1cb954',
				savedColor: '#fff',
				trackArtistColor: '#333',
				trackNameColor: '#333',
			}}
		/>
	);
};

export default Player;
