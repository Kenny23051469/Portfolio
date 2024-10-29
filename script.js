document.addEventListener('DOMContentLoaded', function() {
  const toggleCheckbox = document.getElementById('toggle');
  const workExperience = document.querySelector('.work-experience');
  const education = document.querySelector('.education');

  // Function to toggle sections based on checkbox state
  function toggleSections() {
    if (toggleCheckbox.checked) {
      // If checked, show education and hide work
      workExperience.classList.remove('active');
      education.classList.add('active');
    } else {
      // If unchecked, show work and hide education
      workExperience.classList.add('active');
      education.classList.remove('active');
    }
  }

  // Initial setup: set the initial visibility based on checkbox state
  toggleSections();

  // Event listener for checkbox
  toggleCheckbox.addEventListener('change', toggleSections);
});


// Toggle Light/Dark Mode
document.getElementById('theme-toggle').addEventListener('click', function() {
  const body = document.body;
  const icon = this.querySelector('i');
  
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
      icon.classList.remove('bi-brightness-high');
      icon.classList.add('bi-moon-stars');
  } else {
      icon.classList.remove('bi-moon-stars');
      icon.classList.add('bi-brightness-high');
  }
});
