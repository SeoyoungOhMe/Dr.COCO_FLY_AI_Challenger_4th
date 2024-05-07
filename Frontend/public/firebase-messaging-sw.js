importScripts(
    "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
  );
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);
  
firebase.initializeApp({
  apiKey: "AIzaSyB20EDjG92vkOcIpYHoZOV6Ta4EJFBQuPM",
  authDomain: "flyai-push-test.firebaseapp.com",
  projectId: "flyai-push-test",
  storageBucket: "flyai-push-test.appspot.com",
  messagingSenderId: "540464874627",
  appId: "1:540464874627:web:e6c189885ac1fee103c7b6"
});

const messaging = firebase.messaging();

self.addEventListener("activate", (event) => {
  console.log("서비스 워커 활성화되었습니다.");
});

self.addEventListener('push', function(event) {

    console.log("클라이언트가 푸시 알림을 받았음");
    // 받은 푸시 데이터를 처리해 알림으로 띄우는 내용
    console.log( event )

    // Parse the received data from the push event
    const pushData = event.data.json().data;
    console.log("이게 푸시 데이터에요");
    console.log( pushData );

    // You can customize the notification options based on your data
    const options = {
      title : pushData.title,
      body: pushData.body || '알림에서 본문을 불러오지 못했어요.',
      icon: 'icon-512x512.png',
      // Add any other options you need
    };

    // Display a notification
    event.waitUntil(
      self.registration.showNotification(pushData.title, options)
    );


});

self.addEventListener('notificationclick', function(event){
    console.log("클라이언트가 알림 클릭함");
    // 띄운 알림창을 클릭했을 때 처리할 내용
    event.notification.close();
});
