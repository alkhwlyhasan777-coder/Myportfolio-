// ==================== DARK MODE TOGGLE ==================== 
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeToggle.setAttribute('title', 'Enable Light Mode');
    localStorage.setItem('darkMode', 'enabled');
    updateDarkModeIcon();
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeToggle.setAttribute('title', 'Enable Dark Mode');
    localStorage.setItem('darkMode', 'disabled');
    updateDarkModeIcon();
}

// Function to update the icon
function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// Check for saved dark mode preference or system preference
function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'enabled') {
        enableDarkMode();
    } else if (savedDarkMode === 'disabled') {
        disableDarkMode();
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        }
    }
    updateDarkModeIcon();
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
}

// Initialize dark mode on page load
initializeDarkMode();