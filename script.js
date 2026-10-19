/**
 * BIG HEROES | 학교교육력 제고 연구소개 웹사이트 스크립트
 * 제작: 서울윤중초등학교 김도현
 */

// ==========================================================================
// 1. 디폴트 데이터 세트 (초기 로딩용)
// ==========================================================================
const DEFAULT_DRIVE_URL = "https://drive.google.com/drive/folders/19chuLwdxRB8cpoxmXIoeWlzEubEHQZ0P";

// 기본 활동 사진 데이터 (보고서에 등장한 실제 활동 기반의 사진 및 활동)
const DEFAULT_PHOTOS = [
  {
    id: "p_robot_5th",
    title: "[5학년] 언플러그드 로봇 활용 수업",
    grade: "5학년",
    desc: "코보블록을 이용하여 프로그래밍 이해하기",
    imageUrl: "images/class_5th_robot.jpg"
  },
  {
    id: "p1",
    title: "[2학년] 달라지는 검색창 & 나만의 검색어 규칙",
    grade: "2학년",
    desc: "디벗을 활용하여 넓은 검색어와 구체적인 검색어의 결과를 직접 대조실험하고 '반려동물 안전수첩'을 만드는 모습",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p2",
    title: "[3학년] 정보 신호등 & 출처 보물찾기 탐정단",
    grade: "3학년",
    desc: "교과서와 인터넷 누리집에서 출처를 찾아내고, 정보 신호등(초록/노랑/빨강)으로 신뢰성을 검증하며 세시풍속 카드를 제작",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p3",
    title: "[4학년] 저작권을 지키며 나의 특징을 담은 자화상",
    grade: "4학년",
    desc: "명화의 이용허락 조건을 확인하고, 남의 것을 단순 복사하지 않고 내 생각을 담아 새롭게 재창작하는 캔바 실습",
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p4",
    title: "[5학년] 생성형 AI 답변과 과학 지식 비판적 비교",
    grade: "5학년",
    desc: "우리 몸의 건강 정보에 대한 생성형 AI의 답변 오류를 과학 교과서와 대조하여 사람과 AI의 건강한 관계 원칙을 정립",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p5",
    title: "[전교생] 업스탠더 실천 「작은 시민, 큰 변화」 캠페인",
    grade: "학교행사",
    desc: "학생 자치회가 주도하여 복도 게시판과 패들렛 온라인 갤러리를 연계하고 전교생 실천 인증 챌린지를 운영",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p6",
    title: "[교외 나눔] 마곡 AI·디지털 러닝 콘페스타 성과 발표",
    grade: "교과연계",
    desc: "서울시 교육공동체 및 타교 교원들에게 BIG-HEROES 탐구 모형과 학생들의 실제 성장 사례를 발표하고 공유",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  }
];

// 소통과 나눔 기본 응원 피드백 데이터 (총 5개 샘플 글: 대영초, 영신초, 윤중초 2명, 영동초)
const DEFAULT_FEEDBACKS = [
  {
    id: "fb_sample_daeyoung",
    author: "양OO",
    affiliation: "서울대영초등학교",
    content: "BIG HEROES의 다양한 실천 사례를 통해 AI·디지털 리터러시 교육이 학생들의 일상과 자연스럽게 연결될 수 있음을 느꼈습니다. 특히 학생들이 디지털 기술을 올바르게 활용하는 것을 넘어, 타인을 존중하고 책임 있게 행동하는 디지털 시민으로 성장할 수 있도록 돕는 교육의 중요성을 다시 한번 생각하게 되었습니다. 현장의 생생한 사례와 유익한 자료를 공유해 주셔서 감사합니다!",
    date: "2026. 10. 19",
    timeOrder: 500
  },
  {
    id: "fb_sample_3",
    author: "김OO",
    affiliation: "서울영신초등학교",
    content: "인근 영신초에서도 BIG HEROES의 선도적인 AI·디지털 리터러시 실천 모델을 관심 있게 지켜보고 있었습니다. 학교 울타리를 넘어 씨앗교사 워크숍과 나눔 축제로 인근 학교에도 긍정적인 교육력을 확산해주셔서 큰 배움이 되었습니다. 교육공동체의 따뜻한 성장을 이끌어주셔서 감사합니다.",
    date: "2026. 10. 19",
    timeOrder: 400
  },
  {
    id: "fb_sample_2",
    author: "최OO",
    affiliation: "서울윤중초등학교",
    content: "학년별로 알기 쉽게 정리된 활동 자료와 수업 지도안 덕분에 반 아이들과 교실에서 바로 해볼 수 있었습니다. 수업 내내 아이들이 너무 재미있어하고, 스스로 올바른 인터넷 예절을 지키려는 모습이 눈에 띄게 늘어 무척 뿌듯했습니다. 훌륭한 연구 자료를 나눠주셔서 감사합니다!",
    date: "2026. 10. 19",
    timeOrder: 300
  },
  {
    id: "fb_sample_1",
    author: "박OO",
    affiliation: "서울윤중초등학교",
    content: "교내에서 동학년 선생님들과 함께 BIG HEROES 실천 사례를 접하며 많은 영감을 받았습니다. 특히 학생들이 AI 도구를 단순 소비하는 데 그치지 않고, 윤리적 창작과 탐구 활동을 통해 비판적 미디어 리터러시를 체득해가는 모습이 무척 인상 깊었습니다. 연구팀의 헌신적인 실천을 진심으로 응원합니다!",
    date: "2026. 10. 19",
    timeOrder: 200
  },
  {
    id: "fb_sample_youngdong",
    author: "이OO",
    affiliation: "서울영동초등학교",
    content: "학생들이 디지털 시민으로서 주체적이고 책임감 있게 성장해가는 모습에 깊은 감명을 받았습니다. 학년별 연계가 돋보이는 훌륭한 실천 모델을 아낌없이 공유해주셔서 진심으로 감사드립니다!",
    date: "2026. 10. 19",
    timeOrder: 100
  }
];

// 롤링페이퍼 정렬 유틸 (사용자 신규 작성글 최신순 우선 + 기본 5개 샘플 글 순서 보장)
function sortFeedbacks(list) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const isSampleA = String(a.id || "").startsWith("fb_sample_");
    const isSampleB = String(b.id || "").startsWith("fb_sample_");

    // 1. 사용자가 새로 등록한 글은 샘플 글보다 항상 최우선 (상단 1페이지 노출)
    if (!isSampleA && isSampleB) return -1;
    if (isSampleA && !isSampleB) return 1;

    // 2. 둘 다 사용자가 등록한 글인 경우: 최신 타임스탬프 순
    if (!isSampleA && !isSampleB) {
      let timeA = 0, timeB = 0;
      if (a.createdAt && a.createdAt.toMillis) timeA = a.createdAt.toMillis();
      else if (a.createdAt && typeof a.createdAt === "string") timeA = new Date(a.createdAt).getTime();
      else if (a.date) timeA = new Date(a.date.replace(/\. /g, "-").replace(/\./g, "-")).getTime();

      if (b.createdAt && b.createdAt.toMillis) timeB = b.createdAt.toMillis();
      else if (b.createdAt && typeof b.createdAt === "string") timeB = new Date(b.createdAt).getTime();
      else if (b.date) timeB = new Date(b.date.replace(/\. /g, "-").replace(/\./g, "-")).getTime();

      if (timeA !== timeB) return timeB - timeA;
      return String(b.id || "").localeCompare(String(a.id || ""));
    }

    // 3. 둘 다 샘플 글인 경우: timeOrder 순서 (대영초 500 -> 영신초 400 -> 윤중초 300 -> 윤중초 200 -> 영동초 100)
    const orderA = a.timeOrder || (a.id === "fb_sample_daeyoung" ? 500 : a.id === "fb_sample_3" ? 400 : a.id === "fb_sample_2" ? 300 : a.id === "fb_sample_1" ? 200 : 100);
    const orderB = b.timeOrder || (b.id === "fb_sample_daeyoung" ? 500 : b.id === "fb_sample_3" ? 400 : b.id === "fb_sample_2" ? 300 : b.id === "fb_sample_1" ? 200 : 100);
    return orderB - orderA;
  });
}

// 고용량 사진 웹 최적화 압축 함수 (Canvas 기반 스마트 리사이징 & 압축)
function compressImageFile(file, maxWidth = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      return reject(new Error("유효한 이미지 파일이 아닙니다."));
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("이미지를 불러올 수 없습니다."));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 긴 쪽을 기준으로 최대 크기 이하로 비율 축소
        if (width > maxWidth || height > maxWidth) {
          if (width >= height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG 82% 압축으로 100~200KB 수준의 가볍고 선명한 이미지 생성
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ==========================================================================
// 2. 상태 관리 (Firebase Firestore 클라우드 백엔드 + LocalStorage 하이브리드)
// ==========================================================================
class AppState {
  static cachedPhotos = null;

  static getPhotos() {
    if (this.cachedPhotos && this.cachedPhotos.length > 0) {
      return this.cachedPhotos;
    }
    const stored = localStorage.getItem("big_heroes_photos");
    if (!stored) {
      return DEFAULT_PHOTOS;
    }
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PHOTOS;
    } catch (e) {
      return DEFAULT_PHOTOS;
    }
  }

  static savePhotos(photos) {
    this.cachedPhotos = photos;
    try {
      localStorage.setItem("big_heroes_photos", JSON.stringify(photos));
    } catch (e) {
      console.warn("로컬 스토리지 캐시 저장 경고:", e);
    }
  }

  // Firestore 실시간 리스너 연결
  static initFirestoreSync(onUpdate) {
    if (typeof firebase === "undefined" || !window.db) {
      console.log("로컬 모드로 동작 중 (Firebase 미로드)");
      return;
    }

    try {
      window.db.collection("photos")
        .orderBy("createdAt", "desc")
        .onSnapshot(async (snapshot) => {
          if (snapshot.empty) {
            console.log("Firestore 컬렉션이 비어있어 기본 사진을 클라우드에 초기 등록합니다.");
            // 기본 사진 자동 시드
            for (let i = 0; i < DEFAULT_PHOTOS.length; i++) {
              const p = DEFAULT_PHOTOS[i];
              await window.db.collection("photos").doc(p.id).set({
                ...p,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              }).catch(() => {});
            }
            return;
          }

          const photos = [];
          snapshot.forEach((doc) => {
            photos.push(doc.data());
          });

          AppState.savePhotos(photos);
          if (typeof onUpdate === "function") {
            onUpdate(photos);
          }
        }, (error) => {
          console.warn("Firestore 동기화 오류 (오프라인 모드로 표시):", error);
        });
    } catch (err) {
      console.warn("Firestore 초기화 예외:", err);
    }
  }

  // 클라우드 사진 추가
  static async addPhotoCloud(photo) {
    if (window.db && typeof firebase !== "undefined") {
      await window.db.collection("photos").doc(photo.id).set({
        ...photo,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    const current = AppState.getPhotos();
    current.unshift(photo);
    AppState.savePhotos(current);
  }

  // 클라우드 사진 삭제
  static async deletePhotoCloud(id) {
    if (window.db && typeof firebase !== "undefined") {
      await window.db.collection("photos").doc(id).delete();
    }
    let current = AppState.getPhotos();
    current = current.filter(p => p.id !== id);
    AppState.savePhotos(current);
  }

  // 클라우드 기본 사진으로 복원
  static async resetPhotosCloud() {
    if (window.db && typeof firebase !== "undefined") {
      const snap = await window.db.collection("photos").get();
      const batch = window.db.batch();
      snap.forEach(doc => batch.delete(doc.ref));
      await batch.commit();

      for (const p of DEFAULT_PHOTOS) {
        await window.db.collection("photos").doc(p.id).set({
          ...p,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    }
    AppState.savePhotos(DEFAULT_PHOTOS);
  }

  static getDriveUrl() {
    const stored = localStorage.getItem("big_heroes_drive_url");
    if (!stored || stored.includes("1abcDEfgHIjklMNop")) {
      localStorage.setItem("big_heroes_drive_url", DEFAULT_DRIVE_URL);
      return DEFAULT_DRIVE_URL;
    }
    return stored;
  }

  static saveDriveUrl(url) {
    localStorage.setItem("big_heroes_drive_url", url);
  }

  static getFeedbacks() {
    let list = [];
    const stored = localStorage.getItem("big_heroes_feedbacks_user_only");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      } catch (e) {}
    }
    // 기본 5개 글은 항상 보장
    DEFAULT_FEEDBACKS.forEach(def => {
      if (!list.some(item => item.id === def.id || (item.author === def.author && item.affiliation === def.affiliation))) {
        list.push(def);
      }
    });
    return sortFeedbacks(list);
  }

  static saveFeedbacks(feedbacks) {
    localStorage.setItem("big_heroes_feedbacks_user_only", JSON.stringify(feedbacks));
  }

  // Firestore 한마디(롤링페이퍼) 실시간 리스너 연결
  static initFirestoreFeedbackSync(onUpdate) {
    if (typeof firebase === "undefined" || !window.db) {
      console.log("한마디 로컬 모드로 동작 중 (Firebase 미로드)");
      return;
    }

    const handleSnapshot = async (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          ...data
        });
      });
      // 기본 5개 글 항상 보장
      DEFAULT_FEEDBACKS.forEach(def => {
        if (!list.some(item => item.id === def.id || (item.author === def.author && item.affiliation === def.affiliation))) {
          list.push(def);
        }
      });
      
      const sorted = sortFeedbacks(list);
      AppState.saveFeedbacks(sorted);
      if (typeof onUpdate === "function") {
        onUpdate(sorted);
      }
    };

    try {
      window.db.collection("feedbacks")
        .orderBy("createdAt", "desc")
        .onSnapshot(handleSnapshot, (error) => {
          console.warn("한마디 orderBy 정렬 구독 중 오류 발생, 기본 컬렉션 구독으로 전환합니다:", error);
          window.db.collection("feedbacks").onSnapshot(handleSnapshot, (fallbackErr) => {
            console.warn("한마디 Firestore 최종 동기화 오류 (오프라인 모드 유지):", fallbackErr);
          });
        });
    } catch (err) {
      console.warn("한마디 Firestore 초기화 예외:", err);
    }
  }

  // 클라우드 한마디 추가
  static async addFeedbackCloud(feedback) {
    if (window.db && typeof firebase !== "undefined") {
      await window.db.collection("feedbacks").doc(feedback.id).set({
        ...feedback,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    const current = AppState.getFeedbacks();
    if (!current.some(f => f.id === feedback.id)) {
      current.unshift(feedback);
      AppState.saveFeedbacks(current);
    }
  }

  // 클라우드 한마디 삭제
  static async deleteFeedbackCloud(id) {
    if (window.db && typeof firebase !== "undefined") {
      await window.db.collection("feedbacks").doc(id).delete();
    }
    let current = AppState.getFeedbacks();
    current = current.filter(f => f.id !== id);
    AppState.saveFeedbacks(current);
  }
}

// ==========================================================================
// 3. UI 렌더링 및 인터랙션 컨트롤러
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initDriveLink();
  renderHeroPhotos();
  AppState.initFirestoreSync(() => {
    renderHeroPhotos();
  });
  initPhotoManagement();
  initFrameworkTabs();
  initCaseFilters();
  initFeedbacks();
  AppState.initFirestoreFeedbackSync(() => {
    renderFeedbacks();
  });
  initModals();
  initScrollSpy();
});

// 3.1 네비게이션 및 모바일 탭 화면 전환 컨트롤러
let currentMobileTabId = "#home";

function isMobileView() {
  return window.innerWidth <= 768;
}

function initNavigation() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileTabBtns = document.querySelectorAll(".mobile-tab-btn");
  const mobileTabsScroll = document.getElementById("mobileTabsScroll");

  // 초기 URL 해시 확인
  if (window.location.hash && document.querySelector(window.location.hash)) {
    currentMobileTabId = window.location.hash;
  }

  // 반응형 모드 설정
  updateResponsiveMode();

  window.addEventListener("resize", () => {
    updateResponsiveMode();
  });

  window.addEventListener("hashchange", () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      if (isMobileView()) {
        switchMobileTab(window.location.hash, false);
      }
    }
  });

  // 햄버거 메뉴 토글
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // 상단 네비게이션 링크 클릭
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetHash = link.getAttribute("href");
      if (navMenu) navMenu.classList.remove("active");

      if (isMobileView() && targetHash && targetHash.startsWith("#")) {
        e.preventDefault();
        switchMobileTab(targetHash);
      }
    });
  });

  // 모바일 상단 탭 버튼 클릭
  mobileTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) {
        switchMobileTab(target);
      }
    });
  });

  // 브랜드 로고 클릭 시 홈으로 이동
  const brandLogo = document.querySelector(".brand-logo");
  if (brandLogo) {
    brandLogo.addEventListener("click", (e) => {
      if (isMobileView()) {
        e.preventDefault();
        switchMobileTab("#home");
      }
    });
  }

  // 헤더 우측 '자료 드라이브' 버튼 (누르면 구글 드라이브로 바로 연결)
  const btnHeaderDrive = document.querySelector(".btn-header-drive");
  if (btnHeaderDrive) {
    btnHeaderDrive.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(AppState.getDriveUrl(), "_blank");
    });
  }

  // 본문 내 모든 해시 앵커 버튼들 (예: 히어로 CTA 버튼, 브리핑 모달 내 링크 등)
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[href^='#']");
    if (anchor && isMobileView()) {
      const hash = anchor.getAttribute("href");
      if (hash && hash.length > 1 && document.querySelector(hash)) {
        // 내부 탭 전환용 링크는 탭 전환 실행
        e.preventDefault();
        switchMobileTab(hash);
      }
    }

    // 모바일 섹션 하단 페이저 버튼 (다음/이전)
    const nextBtn = e.target.closest(".btn-mobile-next");
    if (nextBtn) {
      const nextTarget = nextBtn.getAttribute("data-next");
      if (nextTarget) switchMobileTab(nextTarget);
    }

    const prevBtn = e.target.closest(".btn-mobile-prev");
    if (prevBtn) {
      const prevTarget = prevBtn.getAttribute("data-prev");
      if (prevTarget) switchMobileTab(prevTarget);
    }
  });
}

// 모바일 탭 화면 전환 함수 (아래로 길어지지 않고 독립된 페이지처럼 열림)
function switchMobileTab(targetId, updateHash = true) {
  if (!targetId || !targetId.startsWith("#")) return;
  const targetSection = document.querySelector(targetId);
  if (!targetSection) return;

  currentMobileTabId = targetId;

  // 1. 모든 섹션 비활성화 후 대상 섹션만 활성화
  const allSections = document.querySelectorAll("main > section");
  allSections.forEach(sec => sec.classList.remove("mobile-active-section"));
  targetSection.classList.add("mobile-active-section");

  // 2. 모바일 가로 스크롤 탭 버튼 active 갱신 및 스크롤 포커스
  const mobileTabBtns = document.querySelectorAll(".mobile-tab-btn");
  mobileTabBtns.forEach(btn => {
    if (btn.getAttribute("data-target") === targetId) {
      btn.classList.add("active");
      try {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } catch (err) {}
    } else {
      btn.classList.remove("active");
    }
  });

  // 3. 상단 네비게이션 메뉴 active 상태 동기화
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === targetId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 4. 햄버거 메뉴 닫기
  const navMenu = document.getElementById("navMenu");
  if (navMenu) navMenu.classList.remove("active");

  // 5. 모바일 화면 최상단으로 스크롤 (헤더 높이 고려)
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 6. URL 해시 갱신
  if (updateHash) {
    try {
      history.replaceState(null, "", targetId);
    } catch (e) {
      window.location.hash = targetId;
    }
  }
}

// 화면 너비에 따른 모바일/데스크톱 모드 전환
function updateResponsiveMode() {
  const allSections = document.querySelectorAll("main > section");

  if (isMobileView()) {
    document.body.classList.add("mobile-mode");
    // 모바일 모드: 현재 선택된 탭만 표시
    switchMobileTab(currentMobileTabId, false);
  } else {
    document.body.classList.remove("mobile-mode");
    // 데스크톱 모드: 모든 섹션 표시
    allSections.forEach(sec => sec.classList.remove("mobile-active-section"));
  }
}

// 스크롤 시 네비게이션 활성화 (데스크톱 전용)
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    // 모바일 모드일 때는 독립 탭 페이지이므로 스크롤 스파이 중단
    if (isMobileView()) return;

    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
          targetNav.classList.add("active");
        }
      }
    });
  });
}

// 3.2 구글 드라이브 주소 관리 (요구사항 3)
function initDriveLink() {
  const currentUrl = AppState.getDriveUrl();
  updateDriveElements(currentUrl);

  const editDriveLinkBtn = document.getElementById("editDriveLinkBtn");
  const driveSettingsModal = document.getElementById("driveSettingsModal");
  const closeDriveSettingsBtn = document.getElementById("closeDriveSettingsBtn");
  const driveSettingsForm = document.getElementById("driveSettingsForm");
  const driveUrlInput = document.getElementById("driveUrlInput");
  const resetDriveUrlBtn = document.getElementById("resetDriveUrlBtn");
  const quickDriveBtn = document.getElementById("quickDriveBtn");

  if (editDriveLinkBtn && driveSettingsModal) {
    editDriveLinkBtn.addEventListener("click", () => {
      driveUrlInput.value = AppState.getDriveUrl();
      driveSettingsModal.classList.add("active");
    });
  }

  if (quickDriveBtn) {
    quickDriveBtn.addEventListener("click", () => {
      window.open(AppState.getDriveUrl(), "_blank");
    });
  }

  if (closeDriveSettingsBtn && driveSettingsModal) {
    closeDriveSettingsBtn.addEventListener("click", () => {
      driveSettingsModal.classList.remove("active");
    });
  }

  if (driveSettingsForm) {
    driveSettingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newUrl = driveUrlInput.value.trim();
      if (newUrl) {
        AppState.saveDriveUrl(newUrl);
        updateDriveElements(newUrl);
        driveSettingsModal.classList.remove("active");
        showToast("구글 드라이브 주소가 성공적으로 저장 및 적용되었습니다!");
      }
    });
  }

  if (resetDriveUrlBtn && driveUrlInput) {
    resetDriveUrlBtn.addEventListener("click", () => {
      driveUrlInput.value = DEFAULT_DRIVE_URL;
    });
  }
}

function updateDriveElements(url) {
  const mainDriveLinkBtn = document.getElementById("mainDriveLinkBtn");
  const currentDriveLinkText = document.getElementById("currentDriveLinkText");
  const btnHeaderDrive = document.querySelector(".btn-header-drive");

  if (mainDriveLinkBtn) {
    mainDriveLinkBtn.href = url;
  }
  if (currentDriveLinkText) {
    currentDriveLinkText.textContent = url;
  }
  if (btnHeaderDrive) {
    btnHeaderDrive.href = url;
  }
}

// 3.3 첫 화면 활동 사진 갤러리 렌더링 (요구사항 1)
function renderHeroPhotos() {
  const photoSliderTrack = document.getElementById("photoSliderTrack");
  if (!photoSliderTrack) return;

  const photos = AppState.getPhotos();
  photoSliderTrack.innerHTML = "";

  if (photos.length === 0) {
    photoSliderTrack.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94A3B8;">
        <i class="fa-regular fa-image" style="font-size: 2.5rem; margin-bottom: 10px; display: block;"></i>
        등록된 활동사진이 없습니다. [활동사진 관리] 버튼을 눌러 사진을 등록해 보세요!
      </div>
    `;
    return;
  }

  photos.forEach(photo => {
    const card = document.createElement("div");
    card.className = "photo-card-item";
    card.innerHTML = `
      <div class="photo-card-img-wrap">
        <img src="${photo.imageUrl}" alt="${photo.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'">
        <span class="photo-card-badge">${photo.grade || '활동'}</span>
      </div>
      <div class="photo-card-info">
        <h4>${escapeHtml(photo.title)}</h4>
        <p>${escapeHtml(photo.desc)}</p>
      </div>
    `;
    photoSliderTrack.appendChild(card);
  });
}

// 3.4 활동 사진 관리 모달 로직 (추가/삭제/복원 - 요구사항 1)
function initPhotoManagement() {
  const openBtns = [
    document.getElementById("openPhotoModalBtn"),
    document.getElementById("openPhotoModalBtn2"),
    document.getElementById("openPhotoModalBtn3")
  ];
  const photoManageModal = document.getElementById("photoManageModal");
  const closePhotoModalBtn = document.getElementById("closePhotoModalBtn");
  const saveAndClosePhotoModalBtn = document.getElementById("saveAndClosePhotoModalBtn");

  const addPhotoForm = document.getElementById("addPhotoForm");
  const photoFileInput = document.getElementById("photoFileInput");
  const newPhotoUrl = document.getElementById("newPhotoUrl");
  const newPhotoPreview = document.getElementById("newPhotoPreview");
  const resetDefaultPhotosBtn = document.getElementById("resetDefaultPhotosBtn");

  let currentPreviewSrc = "";

  openBtns.forEach(btn => {
    if (btn && photoManageModal) {
      btn.addEventListener("click", () => {
        renderManagePhotoGrid();
        photoManageModal.classList.add("active");
      });
    }
  });

  const closeModal = () => {
    if (photoManageModal) photoManageModal.classList.remove("active");
    renderHeroPhotos();
  };

  if (closePhotoModalBtn) closePhotoModalBtn.addEventListener("click", closeModal);
  if (saveAndClosePhotoModalBtn) saveAndClosePhotoModalBtn.addEventListener("click", closeModal);

  // 파일 업로드 시 스마트 압축 및 미리보기
  if (photoFileInput) {
    photoFileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (newPhotoPreview) {
          newPhotoPreview.innerHTML = `<span class="preview-placeholder"><i class="fa-solid fa-spinner fa-spin"></i> 사진을 웹 최적화 압축 중...</span>`;
        }
        try {
          currentPreviewSrc = await compressImageFile(file);
          if (newPhotoPreview) {
            newPhotoPreview.innerHTML = `<img src="${currentPreviewSrc}" alt="미리보기">`;
          }
        } catch (err) {
          showToast(err.message || "이미지 처리 중 오류가 발생했습니다.");
          if (newPhotoPreview) {
            newPhotoPreview.innerHTML = `<span class="preview-placeholder"><i class="fa-solid fa-circle-exclamation" style="color:var(--coral-primary);"></i> 이미지 로딩 실패</span>`;
          }
        }
      }
    });
  }

  // URL 입력 시 미리보기
  if (newPhotoUrl) {
    newPhotoUrl.addEventListener("input", (e) => {
      const url = e.target.value.trim();
      if (url) {
        currentPreviewSrc = url;
        if (newPhotoPreview) {
          newPhotoPreview.innerHTML = `<img src="${currentPreviewSrc}" alt="미리보기" onerror="this.src='https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'">`;
        }
      }
    });
  }

  // 사진 추가 제출
  if (addPhotoForm) {
    addPhotoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("newPhotoTitle").value.trim();
      const grade = document.getElementById("newPhotoGrade").value;
      const desc = document.getElementById("newPhotoDesc").value.trim();

      const imageSource = currentPreviewSrc || newPhotoUrl.value.trim();

      if (!imageSource) {
        showToast("사진 파일이나 이미지 URL을 등록해 주세요.");
        return;
      }

      const newPhoto = {
        id: "p_" + Date.now(),
        title,
        grade,
        desc,
        imageUrl: imageSource
      };

      const photos = AppState.getPhotos();
      photos.unshift(newPhoto); // 맨 앞에 추가
      AppState.savePhotos(photos);

      // 폼 초기화
      addPhotoForm.reset();
      currentPreviewSrc = "";
      if (newPhotoPreview) {
        newPhotoPreview.innerHTML = `<span class="preview-placeholder"><i class="fa-regular fa-image"></i> 사진을 선택하거나 URL을 입력하면 미리보기가 표시됩니다.</span>`;
      }

      renderManagePhotoGrid();
      showToast("새 활동사진이 첫 화면에 추가되었습니다!");
    });
  }

  // 기본 사진 세트로 복원
  if (resetDefaultPhotosBtn) {
    resetDefaultPhotosBtn.addEventListener("click", () => {
      if (confirm("등록된 사진을 초기 추천 사진 목록으로 복원하시겠습니까?")) {
        AppState.savePhotos(DEFAULT_PHOTOS);
        renderManagePhotoGrid();
        showToast("기본 사진 세트로 복원되었습니다.");
      }
    });
  }
}

// 관리 모달 내부 사진 목록 렌더링
function renderManagePhotoGrid() {
  const currentPhotoGrid = document.getElementById("currentPhotoGrid");
  const totalPhotoCount = document.getElementById("totalPhotoCount");
  if (!currentPhotoGrid) return;

  const photos = AppState.getPhotos();
  if (totalPhotoCount) totalPhotoCount.textContent = photos.length;
  currentPhotoGrid.innerHTML = "";

  photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "curr-photo-item";
    item.innerHTML = `
      <img src="${photo.imageUrl}" alt="${photo.title}" onerror="this.src='https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'">
      <div class="curr-photo-meta">
        <strong>${escapeHtml(photo.title)}</strong>
        <span>${photo.grade} | ${escapeHtml(photo.desc.slice(0, 30))}...</span>
      </div>
      <button class="btn-delete-photo" onclick="deletePhoto('${photo.id}')">
        <i class="fa-solid fa-trash-can"></i> 삭제하기
      </button>
    `;
    currentPhotoGrid.appendChild(item);
  });
}

// 전역 사진 삭제 함수
window.deletePhoto = function(id) {
  if (confirm("이 활동 사진을 삭제하시겠습니까?")) {
    let photos = AppState.getPhotos();
    photos = photos.filter(p => p.id !== id);
    AppState.savePhotos(photos);
    renderManagePhotoGrid();
    renderHeroPhotos();
    showToast("사진이 삭제되었습니다.");
  }
};

// 3.5 BIG vs HEROES 프레임워크 탭 전환 (요구사항 2)
function initFrameworkTabs() {
  const tabBtns = document.querySelectorAll(".fw-tab-btn");
  const tabViews = document.querySelectorAll(".framework-content-view");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");

      tabBtns.forEach(b => b.classList.remove("active"));
      tabViews.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add("active");
    });
  });
}

// 3.6 학년별 실천 사례 필터링
function initCaseFilters() {
  const filterBtns = document.querySelectorAll(".grade-btn");
  const caseCards = document.querySelectorAll(".case-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-grade");

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      caseCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// 3.7 소통과 나눔 한마디 롤링페이퍼 (클라우드 백엔드 연동)
function initFeedbacks() {
  renderFeedbacks();

  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const author = document.getElementById("fbAuthor").value.trim();
      const affiliation = document.getElementById("fbAffiliation").value.trim();
      const content = document.getElementById("fbContent").value.trim();
      const submitBtn = feedbackForm.querySelector("button[type='submit']");

      if (!author || !affiliation || !content) {
        alert("작성자 성함, 소속, 내용을 모두 입력해 주세요.");
        return;
      }

      const today = new Date();
      const dateStr = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

      const newFeedback = {
        id: "fb-" + Date.now(),
        author,
        affiliation,
        content,
        date: dateStr
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 클라우드 등록 중...`;
      }

      try {
        await AppState.addFeedbackCloud(newFeedback);
        feedbackForm.reset();
        currentFeedbackPage = 1;
        renderFeedbacks();
        showToast("소중한 응원과 나눔의 한마디가 성공적으로 등록되었습니다. 감사합니다!");
      } catch (err) {
        console.error("한마디 클라우드 저장 실패:", err);
        // 에러 시 로컬 저장으로 폴백
        const feedbacks = AppState.getFeedbacks();
        if (!feedbacks.some(f => f.id === newFeedback.id)) {
          feedbacks.unshift(newFeedback);
          AppState.saveFeedbacks(feedbacks);
        }
        feedbackForm.reset();
        currentFeedbackPage = 1;
        renderFeedbacks();
        showToast("한마디가 등록되었습니다!");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> 한마디 등록하기`;
        }
      }
    });
  }
}

let currentFeedbackPage = 1;
const FEEDBACKS_PER_PAGE = 3;

function renderFeedbacks() {
  const container = document.getElementById("feedbackCardsContainer");
  const countEl = document.getElementById("feedbackCount");
  const paginationEl = document.getElementById("feedbackPagination");
  if (!container) return;

  let feedbacks = AppState.getFeedbacks();
  if (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0) {
    feedbacks = DEFAULT_FEEDBACKS;
  }

  if (countEl) countEl.textContent = feedbacks.length;
  container.innerHTML = "";

  const totalPages = Math.ceil(feedbacks.length / FEEDBACKS_PER_PAGE);
  if (currentFeedbackPage > totalPages) {
    currentFeedbackPage = totalPages;
  }
  if (currentFeedbackPage < 1) {
    currentFeedbackPage = 1;
  }

  // 3개까지만 자르기
  let startIndex = (currentFeedbackPage - 1) * FEEDBACKS_PER_PAGE;
  let pageItems = feedbacks.slice(startIndex, startIndex + FEEDBACKS_PER_PAGE);

  // 만약 현재 페이지에 표시할 글이 없다면 1페이지로 자동 복귀하여 빈 화면 방지
  if (pageItems.length === 0 && feedbacks.length > 0) {
    currentFeedbackPage = 1;
    startIndex = 0;
    pageItems = feedbacks.slice(0, FEEDBACKS_PER_PAGE);
  }

  pageItems.forEach(item => {
    let dateStr = item.date;
    if (!dateStr && item.createdAt && item.createdAt.toDate) {
      const d = item.createdAt.toDate();
      dateStr = `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
    } else if (!dateStr) {
      dateStr = "2026. 10. 19";
    }

    const card = document.createElement("div");
    card.className = "fb-card-item";
    card.innerHTML = `
      <div class="fb-card-top">
        <div class="fb-author-box">
          <span class="fb-name"><i class="fa-solid fa-user-check" style="color: #FF6B4A; margin-right: 4px;"></i> ${escapeHtml(item.author || "방문자")}</span>
          <span class="fb-affil">${escapeHtml(item.affiliation || "")}</span>
        </div>
        <span class="fb-time">${dateStr}</span>
      </div>
      <p class="fb-text">${escapeHtml(item.content || "")}</p>
    `;
    container.appendChild(card);
  });

  // 3개 초과 시 페이지 넘김 버튼 렌더링
  if (paginationEl) {
    if (totalPages <= 1) {
      paginationEl.innerHTML = "";
    } else {
      let pageHtml = `
        <button type="button" class="fb-page-btn" ${currentFeedbackPage === 1 ? 'disabled' : ''} onclick="changeFeedbackPage(${currentFeedbackPage - 1})" aria-label="이전 페이지">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      `;

      for (let p = 1; p <= totalPages; p++) {
        pageHtml += `
          <button type="button" class="fb-page-btn ${p === currentFeedbackPage ? 'active' : ''}" onclick="changeFeedbackPage(${p})" aria-label="${p} 페이지">
            ${p}
          </button>
        `;
      }

      pageHtml += `
        <button type="button" class="fb-page-btn ${currentFeedbackPage === totalPages ? 'disabled' : ''} onclick="changeFeedbackPage(${currentFeedbackPage + 1})" aria-label="다음 페이지">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      `;

      paginationEl.innerHTML = pageHtml;
    }
  }
}

window.changeFeedbackPage = function(page) {
  if (typeof page !== "number" || isNaN(page)) return;
  currentFeedbackPage = page;
  renderFeedbacks();
  const feedbackContainer = document.getElementById("feedbackCardsContainer");
  if (feedbackContainer) {
    feedbackContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

// 3.8 심사위원 3분 핵심 브리핑 모달
function initModals() {
  const openBriefingBtn = document.getElementById("openBriefingBtn");
  const briefingModal = document.getElementById("briefingModal");
  const closeBriefingBtn = document.getElementById("closeBriefingBtn");
  const confirmBriefingBtn = document.getElementById("confirmBriefingBtn");
  const briefingGoArchiveBtn = document.getElementById("briefingGoArchiveBtn");

  if (openBriefingBtn && briefingModal) {
    openBriefingBtn.addEventListener("click", () => {
      briefingModal.classList.add("active");
    });
  }

  const closeBriefing = () => {
    if (briefingModal) briefingModal.classList.remove("active");
  };

  if (closeBriefingBtn) closeBriefingBtn.addEventListener("click", closeBriefing);
  if (confirmBriefingBtn) confirmBriefingBtn.addEventListener("click", closeBriefing);
  if (briefingGoArchiveBtn) {
    briefingGoArchiveBtn.addEventListener("click", () => {
      closeBriefing();
    });
  }

  // 모달 바깥 배경 클릭 시 닫기
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
      renderHeroPhotos();
    }
  });
}

// 3.9 토스트 알림 메시지 유틸
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// 가상 다운로드 핸들러
window.handleMockDownload = function(filename) {
  const driveUrl = AppState.getDriveUrl();
  showToast(`[${filename}] 구글 드라이브 자료실로 연결됩니다.`);
  setTimeout(() => {
    window.open(driveUrl, "_blank");
  }, 700);
};

// XSS 방지 유틸
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
