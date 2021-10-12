let notes = [];
getNotes();
getStats();

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
  addNote(elem);
});

async function getNotes() {
  notes = await fetch('/notes').then((res) => res.json());
  updateList();
}

async function getStats() {
  stats = await fetch('/notes/stats').then((res) => res.json());
  const { tasks, rnd, ideas } = stats;
  const statsBlock = document.querySelector('.stats');
  statsBlock.innerHTML = `<h2>tasks: ${tasks}, rnd: ${rnd}, ideas: ${ideas}</h2>`;
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
  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach((item) => {
    const id = item.getAttribute('data-id');
    item.addEventListener('click', () => editNote(id));
  });
}

function generateString() {
  let string = '';
  notes.map(({ text, time, id, category, dates }) => {
    string += `<tr>
      <td>${time}</td><td class='text' >${text} id:${id}</td><td>${category}</td><td>${dates}</td>
      <td>
      <button data-id='${id}' class="btn btn-danger delete">delete note</button>
      <button data-id='${id}' class="btn btn-secondary edit">edit note</button>
      </td>
      </tr>`;
  });

  return string;
}
document.querySelector('.retrieve-item-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  let id = +e.target.elements[0].value;
  if (!Number.isInteger(id)) {
    alert('Enter only integer');
  } else {
    let elem = await fetch(`/notes/${id}`).then((res) => res.text());
    alert(`Note - ${elem}`);
    e.target.elements[0].value = '';
  }
});

async function addNote(elem) {
  const data = { text: 'as', time: '1214', category: '', dates: '' };
  const res = await fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(elem),
  });
  getNotes();
  getStats();
}

async function deleteNote(id) {
  const res = await fetch(`/notes/${id}`, {
    method: 'DELETE',
  });
  getNotes();
  getStats();
}

async function editNote(id) {
  let text = prompt('new text');
  let obj = {
    text,
  };
  console.log(text);
  await fetch(`/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  getNotes();
}
