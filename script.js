/**
 * BIG HEROES | 학교교육력 제고 연구소개 웹사이트 스크립트
 * 제작: 서울윤중초등학교 김도현
 */

// ==========================================================================
// 1. 디폴트 데이터 세트 (초기 로딩용)
// ==========================================================================
const DEFAULT_DRIVE_URL = "https://drive.google.com/drive/folders/19chuLwdxRB8cpoxmXIoeWlzEubEHQZ0P";

// 기본 활동 사진 데이터 (보고서에 등장한 실제 활동 기반의 감성 일러스트/사진)
const DEFAULT_PHOTOS = [
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

// 소통과 나눔 피드백 데이터 (직접 작성할 수 있도록 초기 상태는 빈 배열로 설정)
const DEFAULT_FEEDBACKS = [];

// ==========================================================================
// 2. 상태 관리 (LocalStorage 연동)
// ==========================================================================
class AppState {
  static getPhotos() {
    const stored = localStorage.getItem("big_heroes_photos");
    if (!stored) {
      localStorage.setItem("big_heroes_photos", JSON.stringify(DEFAULT_PHOTOS));
      return DEFAULT_PHOTOS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_PHOTOS;
    }
  }

  static savePhotos(photos) {
    localStorage.setItem("big_heroes_photos", JSON.stringify(photos));
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
    const stored = localStorage.getItem("big_heroes_feedbacks_user_only");
    if (!stored) {
      return [];
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }

  static saveFeedbacks(feedbacks) {
    localStorage.setItem("big_heroes_feedbacks_user_only", JSON.stringify(feedbacks));
  }
}

// ==========================================================================
// 3. UI 렌더링 및 인터랙션 컨트롤러
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initDriveLink();
  renderHeroPhotos();
  initPhotoManagement();
  initFrameworkTabs();
  initCaseFilters();
  initFeedbacks();
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

  // 파일 업로드 시 미리보기 및 Base64 변환
  if (photoFileInput) {
    photoFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentPreviewSrc = event.target.result;
          if (newPhotoPreview) {
            newPhotoPreview.innerHTML = `<img src="${currentPreviewSrc}" alt="미리보기">`;
          }
        };
        reader.readAsDataURL(file);
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

// 3.7 심사위원 피드백 방명록 (요구사항 4 추가 기능)
function initFeedbacks() {
  renderFeedbacks();

  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("fbAuthor").value.trim();
      const affiliation = document.getElementById("fbAffiliation").value.trim();
      const content = document.getElementById("fbContent").value.trim();

      const today = new Date();
      const dateStr = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

      const newFeedback = {
        id: "fb-" + Date.now(),
        author,
        affiliation,
        content,
        date: dateStr
      };

      const feedbacks = AppState.getFeedbacks();
      feedbacks.unshift(newFeedback);
      AppState.saveFeedbacks(feedbacks);

      feedbackForm.reset();
      renderFeedbacks();
      showToast("소중한 심사 피드백이 성공적으로 등록되었습니다. 감사합니다!");
    });
  }
}

function renderFeedbacks() {
  const container = document.getElementById("feedbackCardsContainer");
  const countEl = document.getElementById("feedbackCount");
  if (!container) return;

  const feedbacks = AppState.getFeedbacks();
  if (countEl) countEl.textContent = feedbacks.length;
  container.innerHTML = "";

  if (feedbacks.length === 0) {
    container.innerHTML = `
      <div style="background: white; border: 1.5px dashed #CBD5E1; border-radius: var(--radius-md); padding: 48px 20px; text-align: center; color: #64748B;">
        <i class="fa-regular fa-comment-dots" style="font-size: 2.2rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
        <strong style="font-size: 1.05rem; color: #334155; display: block; margin-bottom: 6px;">아직 등록된 한마디가 없습니다.</strong>
        <p style="font-size: 0.92rem; color: #94A3B8; margin: 0;">왼쪽 폼에서 첫 번째 따뜻한 응원과 나눔의 메시지를 남겨주세요!</p>
      </div>
    `;
    return;
  }

  feedbacks.forEach(item => {
    const card = document.createElement("div");
    card.className = "fb-card-item";
    card.innerHTML = `
      <div class="fb-card-top">
        <div class="fb-author-box">
          <span class="fb-name"><i class="fa-solid fa-user-check" style="color: #FF6B4A; margin-right: 4px;"></i> ${escapeHtml(item.author)}</span>
          <span class="fb-affil">${escapeHtml(item.affiliation)}</span>
        </div>
        <span class="fb-time">${item.date}</span>
      </div>
      <p class="fb-text">${escapeHtml(item.content)}</p>
    `;
    container.appendChild(card);
  });
}

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
