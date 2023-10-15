/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useAuth from '../customHooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
	clientId: 'c111d8cd377f4cf0946e51bf5470f005',
});

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);
	const [guessingSongs, setGuessingSongs] = useState([]);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!accessToken) return;

		spotifyApi.searchPlaylists('best of 2000s').then(
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

	console.log('hello there', guessingSongs);

	return (
		<div>
			<Player accessToken={accessToken} trackUri="afdsf" />
		</div>
	);
};

export default Dashboard;
