let notes = [];
getNotes();

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  let data = e.target.elements;
  if (data[0].value === '') return;
  let elem = {};
  elem.text = data[0].value;
  elem.time = new Date().toLocaleTimeString();
  elem.category = data[1][data[1].options.selectedIndex].label;
  let datePattern = /\d+\/\d+\/\d+/;
  elem.dates = datePattern.exec(data[0].value) || '-';
  e.target.elements[0].value = '';
  console.log(elem);
  addNote(elem);
});

async function getNotes() {
  notes = await fetch('/api/notes').then((res) => res.json());
  updateList();
}

function updateList() {
  const list = document.querySelector('.note-list');
  let text = generateString();
  list.innerHTML = text;
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((item) => {
    const id = item.getAttribute('data-id');
    item.addEventListener('click', () => deleteNote(id));
  });
}

function generateString() {
  let string = '';
  notes.map(({ text, time, id, category, dates }) => {
    string += `<tr>
      <td>${time}</td><td class='text' >${text}</td><td>${category}</td><td>${dates}</td>
      <td><button data-id='${id}' class="btn btn-danger delete">delete note</button></td>
      </tr>`;
  });

  return string;
}

async function addNote(elem) {
  const data = { text: 'as', time: '1214', category: '', dates: '' };
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(elem),
  });
  getNotes();
}

async function deleteNote(id) {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });
  getNotes();
}
