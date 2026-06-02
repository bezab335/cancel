// ---------- Navigation ----------
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.dataset.page;
    navLinks.forEach((l) => l.classList.toggle('is-active', l === link));
    pages.forEach((p) => p.classList.toggle('is-active', p.id === `page-${target}`));
  });
});

// ---------- Checklist ----------
const clForm = document.getElementById('checklist-form');
const clInput = document.getElementById('checklist-input');
const clList = document.getElementById('checklist-list');
const clEmpty = document.getElementById('checklist-empty');

function refreshChecklistEmpty() {
  clEmpty.classList.toggle('hidden', clList.children.length > 0);
}

clForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = clInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    li.classList.toggle('done', checkbox.checked);
  });

  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = text;

  const remove = document.createElement('button');
  remove.className = 'remove';
  remove.type = 'button';
  remove.innerHTML = '&times;';
  remove.addEventListener('click', () => {
    li.remove();
    refreshChecklistEmpty();
  });

  li.append(checkbox, label, remove);
  clList.appendChild(li);

  clInput.value = '';
  refreshChecklistEmpty();
});

// ---------- Files ----------
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const filesEmpty = document.getElementById('files-empty');

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function refreshFilesEmpty() {
  filesEmpty.classList.toggle('hidden', fileList.children.length > 0);
}

function addFiles(files) {
  Array.from(files).forEach((file) => {
    const li = document.createElement('li');

    const name = document.createElement('span');
    name.className = 'file-name';
    name.textContent = file.name;

    const size = document.createElement('span');
    size.className = 'file-size';
    size.textContent = formatSize(file.size);

    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.type = 'button';
    remove.innerHTML = '&times;';
    remove.addEventListener('click', () => {
      li.remove();
      refreshFilesEmpty();
    });

    li.append(name, size, remove);
    fileList.appendChild(li);
  });
  refreshFilesEmpty();
}

fileInput.addEventListener('change', () => addFiles(fileInput.files));

['dragenter', 'dragover'].forEach((evt) => {
  dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach((evt) => {
  dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
  });
});

dropzone.addEventListener('drop', (e) => {
  if (e.dataTransfer && e.dataTransfer.files.length) {
    addFiles(e.dataTransfer.files);
  }
});
