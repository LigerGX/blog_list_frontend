import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationContextProvider } from './components/NotificationContext';
import { UserContextProvider } from './components/UserContext';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<NotificationContextProvider>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</NotificationContextProvider>
	</QueryClientProvider>
);
