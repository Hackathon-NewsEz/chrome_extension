import React from 'react';

function NotificationComponent() {
  const handleNotificationRequest = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // 사용자가 알림 권한을 수락한 경우 처리할 로직 작성
          console.log('알림 권한이 허용되었습니다.');
        } else {
          // 사용자가 알림 권한을 거부한 경우 처리할 로직 작성
          console.log('알림 권한이 거부되었습니다.');
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handleNotificationRequest}>알림 권한 요청</button>
    </div>
  );
}

export default NotificationComponent;
