const modal = document.getElementById('modal');
const toast = document.getElementById('toast');
const sidebar = document.getElementById('sidebar');

function showToast(message) {
  toast.firstChild.textContent = message + ' ';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function setView(view) {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.view === view);
  });
  if (view !== 'overview') showToast(`${view[0].toUpperCase()}${view.slice(1)} view selected`);
  sidebar.classList.remove('open');
}

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => setView(item.dataset.view));
});

document.querySelectorAll('[data-view-target]').forEach((item) => {
  item.addEventListener('click', () => setView(item.dataset.viewTarget));
});

document.getElementById('mobile-menu').addEventListener('click', () => sidebar.classList.toggle('open'));
document.getElementById('open-modal').addEventListener('click', () => modal.classList.add('open'));
document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.classList.remove('open');
});

document.getElementById('assignment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  modal.classList.remove('open');
  event.target.reset();
  showToast('Assignment created ✓');
});

document.getElementById('student-search').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  document.querySelectorAll('#student-table tr').forEach((row) => {
    row.classList.toggle('hidden', !row.textContent.toLowerCase().includes(query));
  });
});

document.getElementById('filter-button').addEventListener('click', (event) => {
  const showingCheckIns = event.currentTarget.dataset.filtered === 'true';
  document.querySelectorAll('#student-table tr').forEach((row) => {
    row.classList.toggle('hidden', !showingCheckIns && !row.querySelector('.check-in'));
  });
  event.currentTarget.dataset.filtered = String(!showingCheckIns);
  event.currentTarget.innerHTML = showingCheckIns ? 'Filter <span>⌄</span>' : 'Check-ins <span>×</span>';
});

document.getElementById('export-button').addEventListener('click', () => {
  const csv = 'Student,Email,Progress,Last active,Status\nMaya Chen,maya.chen@university.edu,92%,Just now,On track\nAlex Lee,alex.lee@university.edu,84%,2 hrs ago,On track\nKim Rivera,kim.rivera@university.edu,68%,Yesterday,Check in\nJordan Taylor,jordan.t@university.edu,61%,Oct 11,Check in';
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bsan-250-roster.csv';
  link.click();
  URL.revokeObjectURL(url);
  showToast('Roster exported ✓');
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    document.getElementById('student-search').focus();
  }
  if (event.key === 'Escape') modal.classList.remove('open');
});
