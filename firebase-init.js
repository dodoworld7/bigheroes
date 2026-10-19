// Firebase 초기화 스크립트 (BIG HEROES 클라우드 백엔드)
const firebaseConfig = {
  apiKey: "AIzaSyAd-M2giA3oE-OcPsvd53FsbFtVLEBlHdc",
  authDomain: "bigheroes-62da3.firebaseapp.com",
  projectId: "bigheroes-62da3",
  storageBucket: "bigheroes-62da3.firebasestorage.app",
  messagingSenderId: "579858362103",
  appId: "1:579858362103:web:4179c95ac580ee1d962df2",
  measurementId: "G-EHRJCGN5XC"
};

// Firebase 초기화
if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  window.db = firebase.firestore();
  console.log("Firebase Firestore 클라우드 백엔드 연결 성공!");
} else {
  console.warn("Firebase SDK를 로드하지 못했습니다.");
}
