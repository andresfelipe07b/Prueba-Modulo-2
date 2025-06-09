/**
 * Object containing all CSS selectors used in the application
 * @type {Object.<string, string>}
 */
const SELECTORS = {
    hamburger: '.hamburger',
    navLinks: '.nav-links',
    themeToggle: '.theme-toggle',
    themeIcon: '.theme-toggle i'
};

/**
 * Object containing CSS classes used for state management
 * @type {Object.<string, string>}
 */
const CLASSES = {
    active: 'active',
    menuOpen: 'menu-open'
};

/**
 * Class responsible for managing portfolio website functionality
 * @class
 */
class PortfolioManager {
    /**
     * Creates an instance of PortfolioManager
     * Initializes DOM elements and sets up the application
     * @constructor
     */
    constructor() {
        this.hamburger = document.querySelector(SELECTORS.hamburger);
        this.navbarOptions = document.querySelector(SELECTORS.navLinks);
        this.themeToggle = document.querySelector(SELECTORS.themeToggle);

        this.initializeEventListeners();
        this.initializeTheme();
    }

    /**
     * Initializes all event listeners for the application
     * @private
     * @returns {void}
     */
    initializeEventListeners() {
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());

        document.querySelectorAll(`${SELECTORS.navLinks} a`).forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    /**
     * Toggles the mobile menu state
     * @public
     * @returns {void}
     */
    toggleMobileMenu() {
        this.hamburger.classList.toggle(CLASSES.active);
        this.navbarOptions.classList.toggle(CLASSES.active);
        document.body.classList.toggle(CLASSES.menuOpen);
    }

    /**
     * Closes the mobile menu
     * @public
     * @returns {void}
     */
    closeMobileMenu() {
        this.hamburger.classList.remove(CLASSES.active);
        this.navbarOptions.classList.remove(CLASSES.active);
        document.body.classList.remove(CLASSES.menuOpen);
    }

    /**
     * Initializes theme based on user's saved preference
     * @private
     * @returns {void}
     */
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            this.setTheme('light');
        }
    }

    /**
     * Toggles between light and dark themes
     * @public
     * @returns {void}
     */
    toggleTheme() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        this.setTheme(isLight ? 'dark' : 'light');
    }

    /**
     * Sets the specified theme and updates UI accordingly
     * @param {string} theme - The theme to set ('light' or 'dark')
     * @public
     * @returns {void}
     */
    setTheme(theme) {
        const themeIcon = document.querySelector(SELECTORS.themeIcon);

        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }

        localStorage.setItem('theme', theme);
    }
}

/**
 * Initialize the PortfolioManager when DOM is fully loaded
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});