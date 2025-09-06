/** @format */

// Simple and reliable theme toggle functionality
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // Set initial theme
  if (savedTheme) {
    html.classList.toggle('dark', savedTheme === 'dark');
  } else {
    html.classList.toggle('dark', systemPrefersDark);
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Project viewer functionality
  const projectViewer = document.getElementById('projectViewer');
  const projectFrame = document.getElementById('projectFrame');
  const viewerTitle = document.getElementById('viewerTitle');
  const closeViewer = document.getElementById('closeViewer');
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingText = document.getElementById('loadingText');

  // Function to open project in viewer
  function openProjectInViewer(projectUrl, projectName) {
    // Show loading screen
    loadingScreen.classList.add('active');
    loadingText.textContent = `Loading ${projectName}...`;

    // Set iframe source after a short delay to allow loading screen to show
    setTimeout(() => {
      viewerTitle.textContent = projectName;
      projectFrame.src = projectUrl;

      // Show the project viewer by removing hidden class and adding active
      projectViewer.classList.remove('hidden');
      projectViewer.classList.add('active');

      // Scroll to the viewer
      setTimeout(() => {
        projectViewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      // Hide loading screen when iframe loads
      projectFrame.onload = function () {
        setTimeout(() => {
          loadingScreen.classList.remove('active');
        }, 500);
      };

      // Handle iframe errors
      projectFrame.onerror = function () {
        loadingScreen.classList.remove('active');
        alert(
          'Failed to load the project. Please check if the project files exist at: ' +
            projectUrl
        );
        closeProjectViewer();
      };
    }, 500);
  }

  // Function to close project viewer
  function closeProjectViewer() {
    projectViewer.classList.remove('active');
    projectViewer.classList.add('hidden');
    projectFrame.src = ''; // Unload the iframe
    viewerTitle.textContent = 'Project Viewer';
  }

  // Add click event listeners to all project links
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const projectUrl = link.getAttribute('href');
      const projectName = link.getAttribute('data-project');

      // Log for debugging
      console.log('Opening project:', projectName, 'at URL:', projectUrl);

      openProjectInViewer(projectUrl, projectName);
    });
  });

  // Close viewer when close button is clicked
  closeViewer.addEventListener('click', closeProjectViewer);

  // Also allow ESC key to close the viewer
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !projectViewer.classList.contains('hidden')) {
      closeProjectViewer();
    }
  });

  // Handle form submission (prevent actual submission for demo)
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert(
        'Thank you for your message! This is a demo form, but in a real application, your message would be sent.'
      );
      contactForm.reset();
    });
  }
});
// Replace your existing updateTime function with this corrected version:

function updateTime() {
  const now = new Date();

  // Format time (24-hour format with seconds)
  const timeString = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Update only the time display (remove dateDisplay line)
  const timeElement = document.getElementById('timeDisplay');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Start the clock
updateTime();
setInterval(updateTime, 1000);
