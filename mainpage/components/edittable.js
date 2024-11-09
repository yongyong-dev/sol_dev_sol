// editTable.js
document.addEventListener("DOMContentLoaded", function () {
    console.log('Edit table page loaded');
    const itemList = document.getElementById("itemList");
    const tableView = document.getElementById("tableView");
    const tableBody = document.getElementById("tableBody");
    const tableHeaderRow = document.getElementById("tableHeaderRow");
    const backToListBtn = document.getElementById("backToListBtn");

    // 목록 불러오기
    fetch("/api/items")
        .then(response => response.json())
        .then(data => {
            itemList.innerHTML = ""; // 리스트 초기화
            data.forEach(folder => {
                const folderElement = document.createElement("li");
                folderElement.textContent = folder.folder;

                // JSON 파일 목록 추가
                const fileList = document.createElement("ul");
                folder.files.forEach(file => {
                    const fileElement = document.createElement("li");
                    fileElement.textContent = file;
                    fileElement.addEventListener("click", () => loadJsonFile(folder.folder, file));
                    fileList.appendChild(fileElement);
                });

                folderElement.appendChild(fileList);
                itemList.appendChild(folderElement);
            });
        })
        .catch(error => console.error("Failed to load items:", error));

    // JSON 파일 내용 로드 및 테이블 표시
    function loadJsonFile(folder, file) {
        fetch(`/api/items/${folder}/${file}`)
            .then(response => response.json())
            .then(data => {
                tableHeaderRow.innerHTML = ""; // 헤더 초기화
                tableBody.innerHTML = ""; // 본문 초기화

                // 테이블 헤더 생성
                const headers = Object.keys(data[0]);
                headers.forEach(header => {
                    const th = document.createElement("th");
                    th.textContent = header;
                    tableHeaderRow.appendChild(th);
                });

                // 테이블 본문 생성
                data.forEach(row => {
                    const tr = document.createElement("tr");
                    headers.forEach(header => {
                        const td = document.createElement("td");
                        td.textContent = row[header];
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                });

                tableView.classList.remove("hidden");
                itemList.parentNode.classList.add("hidden");
            })
            .catch(error => console.error("Failed to load JSON file:", error));
    }

    // 뒤로 가기 버튼 클릭 시 리스트 뷰로 돌아가기
    backToListBtn.addEventListener("click", () => {
        tableView.classList.add("hidden");
        itemList.parentNode.classList.remove("hidden");
    });
});
