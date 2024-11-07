// Main Page
/////////////////////////////////////////////////////////////////////////////////////////////////
// 사이드바 보이기 숨기기 관련
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");
// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  // If the sidebar is not locked
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.src = "assets/bx-dots-vertical.svg"
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.src = "assets/bx-menu.svg"
  }
};
// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
};
// Function to show the sidebar when the mouse enter
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
};
// Function to show and hide the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
};
// If the window width is less than 800px, close the sidebar and remove hoverability and lock
if (window.innerWidth < 800) {
  sidebar.classList.add("close");
  sidebar.classList.remove("locked");
  sidebar.classList.remove("hoverable");
}
// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

// Excel Data
/////////////////////////////////////////////////////////////////////////////////////////////////
const editTableBtn = document.getElementById('editTableBtn');
const editTablePage = document.getElementById('editTablePage');
const itemList = document.getElementById('itemList');
const tableView = document.getElementById('tableView');
const tableBody = document.getElementById('tableBody');
const backToListBtn = document.getElementById('backToListBtn');

// Edit Table 버튼 클릭 시 페이지 전환
editTableBtn.addEventListener('click', (event) => {
    event.preventDefault(); // 기본 링크 동작 방지
    editTablePage.classList.remove('hidden'); // Edit Table 페이지 표시
    loadItems(); // 서버에서 항목 로드
});

// 서버에서 항목 로드 함수
function loadItems() {
    fetch('../excel_data/items.json') // '/sfr/items'는 서버의 API 엔드포인트 (예시)
        .then(response => response.json())
        .then(data => {
            populateItemList(data); // 목록에 항목 추가
        })
        .catch(error => console.error('Error loading items:', error));
}

// 항목 목록에 추가하는 함수
function populateItemList(items) {
    itemList.innerHTML = ''; // 기존 항목 초기화
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.textContent = item.name; // JSON 항목에서 이름을 가져옴
        li.setAttribute('data-id', item.id); // 항목 ID를 data-id 속성에 저장

        li.addEventListener('click', () => {
            showTableView(item.id); // 클릭 시 테이블 뷰로 전환
        });

        itemList.appendChild(li);
    });
}

// 테이블 뷰로 전환하는 함수
function showTableView(itemId) {
    // 리스트 뷰 숨기기
    document.querySelector('.list-view').classList.add('hidden');
    // 테이블 뷰 표시
    tableView.classList.remove('hidden');

    // 테이블 내용 업데이트
    updateTableContent(itemId);
}

// 테이블 내용 업데이트
function updateTableContent(itemId) {
    fetch(`../excel_data/items/${itemId}`) // 해당 ID로 서버에서 데이터 가져오기
        .then(response => response.json())
        .then(data => {
            // 기존 내용 삭제
            tableBody.innerHTML = '';

            // JSON 데이터를 기반으로 테이블 행 추가
            data.details.forEach(detail => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${detail.col1}</td><td>${detail.col2}</td><td>${detail.col3}</td>`;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading item details:', error));
}

// 리스트로 돌아가기 버튼 클릭 시 리스트 뷰로 돌아가기
backToListBtn.addEventListener('click', () => {
    tableView.classList.add('hidden'); // 테이블 뷰 숨기기
    document.querySelector('.list-view').classList.remove('hidden'); // 리스트 뷰 표시
});