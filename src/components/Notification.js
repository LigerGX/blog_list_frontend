const Notification = ({ notification }) => {
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
