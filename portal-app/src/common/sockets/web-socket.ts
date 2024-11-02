import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust URL as needed

function useWebSocket(userId: any, role: any, handleStatusUpdate: any, isRequesting: any) {
    const socketRef: any = useRef(null);

    useEffect(() => {
      if (isRequesting && !socketRef.current) {
        socketRef.current = io('ws://localhost:3000');
        
        socketRef.current.on('connect', () => {
          console.log('Connected to WebSocket server');
          socketRef.current.emit('joinRoom', { userId, role });
        });
  
        socketRef.current.on('statusUpdate', (data: any) => {
          handleStatusUpdate(data.requestId, data.newStatus);
        });
      }
  
      // Cleanup function
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }, [userId, role, handleStatusUpdate, isRequesting]);
  }
  
  export default useWebSocket;
