const form = document.getElementById('manga-form');
const mangaList = document.getElementById('manga-list');

let mangaData = [];

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
// แสดง manga ทั้งหมดใน localStorage
function showManga(manga, index) {
    const card = document.createElement('div');
    card.className = 'manga-card';
  
    const img = document.createElement('img');
    img.src = manga.cover;
  
    const info = document.createElement('div');
  
    const title = document.createElement('h3');
    title.textContent = manga.title;
  
    const chapterText = document.createElement('p');
    chapterText.textContent = `ตอนล่าสุด: ${manga.chapter}`;
    chapterText.id = `chapter-text-${index}`;
  
    const editButton = document.createElement('button');
    editButton.textContent = 'แก้ไข';
    editButton.onclick = () => editManga(index);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'ลบ';
    deleteButton.style.marginLeft = '10px';
    deleteButton.onclick = () => deleteManga(index);
  
    info.appendChild(title);
    info.appendChild(chapterText);
    info.appendChild(editButton);
    info.appendChild(deleteButton);
  
    card.appendChild(img);
    card.appendChild(info);
  
    mangaList.appendChild(card);
  }
// ฟังก์ชันแก้ไข manga
  function editManga(index) {
    const manga = mangaData[index];
  
    // เปลี่ยน p ตอนล่าสุด ให้กลายเป็น input
    const chapterText = document.getElementById(`chapter-text-${index}`);
    const input = document.createElement('input');
    input.type = 'number';
    input.value = manga.chapter;
    input.style.marginTop = '5px';
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'บันทึก';
    saveButton.style.marginLeft = '10px';
    saveButton.style.backgroundColor = '#4CAF50';
    saveButton.style.color = 'white';
    saveButton.onclick = () => {
      const newChapter = input.value;
      mangaData[index].chapter = newChapter;
      saveData();
      renderList();
    };
  
    // ล้าง node เดิมแล้วแทนที่ด้วย input + ปุ่มบันทึก
    chapterText.innerHTML = '';
    chapterText.appendChild(document.createTextNode('ตอนล่าสุด: '));
    chapterText.appendChild(input);
    chapterText.appendChild(saveButton);
  }
    // แสดง manga ทั้งหมดใน localStorage  

function renderList() {
  mangaList.innerHTML = '';
  mangaData.forEach((manga, i) => showManga(manga, i));
}
// ฟังก์ชันลบ manga
function deleteManga(index) {
  mangaData.splice(index, 1);
  saveData();
  renderList();
}
// ฟังก์ชันเพิ่ม manga
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const chapter = document.getElementById('chapter').value;
  const coverFile = document.getElementById('cover').files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const coverURL = reader.result;

    const manga = {
      title: title,
      chapter: chapter,
      cover: coverURL
    };

    mangaData.push(manga);
    saveData();
    renderList();
    form.reset();
  };

  if (coverFile) {
    reader.readAsDataURL(coverFile);
  }
});



loadData();
