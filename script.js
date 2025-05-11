const form = document.getElementById('manga-form');
const mangaList = document.getElementById('manga-list');
const searchInput = document.getElementById('search');
const sortBtn = document.getElementById('sort-btn');

let mangaData = [];
let sortAsc = true;

function saveData() {
  localStorage.setItem('myManga', JSON.stringify(mangaData));
}

function loadData() {
  const stored = localStorage.getItem('myManga');
  if (stored) {
    mangaData = JSON.parse(stored);
    renderList();
  }
}

function renderList() {
  const keyword = searchInput.value.toLowerCase();
  mangaList.innerHTML = '';

  const filtered = mangaData.filter(m => m.title.toLowerCase().includes(keyword));
  const sorted = filtered.sort((a, b) => sortAsc ? a.chapter - b.chapter : b.chapter - a.chapter);

  sorted.forEach((manga, index) => {
    const card = document.createElement('div');
    card.className = 'manga-card';

    const img = document.createElement('img');
    img.src = manga.cover;

    const info = document.createElement('div');
    info.innerHTML = `
      <h3><a href="${manga.link}" target="_blank">${manga.title}</a></h3>
      <p>ตอนล่าสุด: ${manga.chapter}</p>
      <p>วันที่อ่าน: ${manga.date}</p>
      <button onclick="editManga(${index})">แก้ไข</button>
      <button onclick="deleteManga(${index})">ลบ</button>
    `;

    card.appendChild(img);
    card.appendChild(info);

    mangaList.appendChild(card);
  });
}

function deleteManga(index) {
  mangaData.splice(index, 1);
  saveData();
  renderList();
}

function editManga(index) {
  const manga = mangaData[index];
  const newChapter = prompt("แก้ไขตอนล่าสุด", manga.chapter);
  if (newChapter) {
    mangaData[index].chapter = Number(newChapter);
    saveData();
    renderList();
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const chapter = Number(document.getElementById('chapter').value);
  const date = document.getElementById('date').value;
  const link = document.getElementById('link').value;
  const coverFile = document.getElementById('cover-file').files[0];
  const coverUrl = document.getElementById('cover-url').value;

  function addManga(cover) {
    const manga = { title, chapter, date, link, cover };
    mangaData.push(manga);
    saveData();
    renderList();
    form.reset();
  }

  if (coverFile) {
    const reader = new FileReader();
    reader.onload = () => addManga(reader.result);
    reader.readAsDataURL(coverFile);
  } else if (coverUrl) {
    addManga(coverUrl);
  } else {
    alert("กรุณาเลือกรูปปกหรือใส่ URL รูปภาพ");
  }
});

searchInput.addEventListener('keyup', renderList);
sortBtn.addEventListener('click', () => {
  sortAsc = !sortAsc;
  sortBtn.textContent = sortAsc ? 'เรียงตามตอนล่าสุด ↑' : 'เรียงตามตอนล่าสุด ↓';
  renderList();
});

loadData();




loadData();
