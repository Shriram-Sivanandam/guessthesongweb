/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAuth from '../customHooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from './Player';
import { songObject } from './songObject';

const spotifyApi = new SpotifyWebApi({
	clientId: 'c111d8cd377f4cf0946e51bf5470f005',
});

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [guessingSongs, setGuessingSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState(songObject);
	const [userGuess, setUserGuess] = useState();
	const [songNumber, setSongNumber] = useState(0);
	const [showAnswerTitle, setShowAnswerTitle] = useState(false);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!accessToken) return;

		spotifyApi.searchPlaylists('top 2010s english').then(
			function (data) {
				console.log('Found playlists are', data.body);

				spotifyApi.getPlaylist(data.body.playlists.items[0].id).then(
					function (data) {
						console.log('Some information about this playlist', data.body);
						setGuessingSongs(data.body.tracks.items);
					},
					function (err) {
						console.log('Something went wrong!', err);
					}
				);
			},
			function (err) {
				console.log('Something went wrong!', err);
			}
		);
	}, [accessToken]);

	useEffect(() => {
		if (!guessingSongs[0]) return;
		setCurrentSong(guessingSongs[0]);
	}, [guessingSongs]);

	const captureGuess = () => {
		if (userGuess.toUpperCase().trim() === currentSong.track.name.toUpperCase().split('(')[0].trim()) {
			setUserGuess('');
			setSongNumber(songNumber + 1);
			setCurrentSong(guessingSongs[songNumber]);
			setShowAnswerTitle(false);
			alert('Correct!');
		} else {
			alert('Wrong!');
		}
	};

	const goNextSong = () => {
		setUserGuess('');
		setSongNumber(songNumber + 1);
		setCurrentSong(guessingSongs[songNumber]);
		setShowAnswerTitle(false);
	};

	return (
		<div>
			<Player accessToken={accessToken} trackUri={currentSong.track.uri} />
			<input
				value={userGuess}
				onChange={(e) => {
					setUserGuess(e.target.value);
				}}
			></input>
			<button onClick={() => captureGuess()}>Guess!!</button>
			<button onClick={() => goNextSong()}>goNext</button>
			<button
				onClick={() => {
					setShowAnswerTitle(true);
				}}
			>
				showAnswer
			</button>

			{showAnswerTitle && <h1>{currentSong.track.name}</h1>}
		</div>
	);
};

export default Dashboard;
