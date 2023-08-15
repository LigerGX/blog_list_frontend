import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector((state) => state.notification);
	return (
		<div
			data-cy="notification"
			className={notification.error ? 'notification error' : 'notification'}
		>
			<p>{notification.message}</p>
		</div>
	);
};

export default Notification;
