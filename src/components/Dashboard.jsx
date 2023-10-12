import useAuth from '../customHooks/useAuth';

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code);

	return (
		<div>
			<div>{code}</div>
		</div>
	);
};

export default Dashboard;
