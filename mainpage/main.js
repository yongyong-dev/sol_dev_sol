// Main Page
/////////////////////////////////////////////////////////////////////////////////////////////////
// 사이드바
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

document.getElementById('toggleButton').onclick = function () {
    document.getElementById('app').classList.toggle('hidden');
  };

  function loadPage(pageName) {
    fetch(`components/${pageName}.html`)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content-area').innerHTML = data;
        const script = document.createElement('script');
        script.src = `components/${pageName}.js`;
        document.body.appendChild(script);
      })
      .catch(error => console.error(`Error loading page: ${error}`));
  }

// Load 'overview' page by default
window.onload = function () {
    loadPage('overview');
  };
