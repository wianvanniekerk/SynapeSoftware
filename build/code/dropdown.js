document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    function toggleMenu() {
        if (isMenuOpen) {
            mobileMenu.classList.remove('fade-in');
            mobileMenu.classList.add('fade-out');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('fade-out');
            }, 300);
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('fade-in');
        }
        isMenuOpen = !isMenuOpen;
    }

    mobileMenuButton.addEventListener('click', toggleMenu);
    closeMenuButton.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});