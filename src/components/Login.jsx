import { Box, Button, Link } from '@mui/material';

const client_id = 'c111d8cd377f4cf0946e51bf5470f005';
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
			<Button variant="contained" color="success">
				<Link href={AUTH_URL} color="inherit" underline="none">
					Spotify Login
				</Link>
			</Button>
		</Box>
	);
};

export default Login;
