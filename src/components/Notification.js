import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const Notification = () => {
	const [notification, notificationDispatch] = useContext(NotificationContext);

	if (notification) {
		setTimeout(() => {
			notificationDispatch({ type: 'RESET' });
		}, 5000);
	}

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
