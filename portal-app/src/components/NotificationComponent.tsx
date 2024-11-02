import React, { useEffect, useState } from 'react';
import SocketService from '../common/sockets/SocketService';

const NotificationComponent: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>([]);
    const socket = SocketService.getInstance().getSocket();

    useEffect(() => {
        // Listen for notifications from the server
        socket.on('notification', (message: string) => {
            setNotifications((prev) => [...prev, message]);
        });

        // Cleanup the listener on unmount
        return () => {
            socket.off('notification');
        };
    }, [socket]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
