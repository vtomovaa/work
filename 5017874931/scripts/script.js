document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', function () {
    const siblings = this.parentElement.querySelectorAll('.option');
    siblings.forEach(sib => sib.classList.remove('selected'));
    this.classList.add('selected');
  });
});

document.getElementById('submitBtn').addEventListener('click', function () {
  const selected = document.querySelector('#q3 .option.selected');
  if (!selected) {
    alert('الرجاء اختيار نوع الاستثمار المفضل');
    return;
  }

  const link = selected.getAttribute('data-link');
  if (link) {
    window.location.href = link;
  }
});