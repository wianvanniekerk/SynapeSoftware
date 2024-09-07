document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitButton.disabled = true;
        buttonText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname: document.getElementById('uname').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            })
        })
        .then(response => response.json())
        .then(data => {
            showPopup(data.status, data.message);
            if (data.status === 'success') {
                contactForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showPopup('error', 'An error occurred. Please try again later.');
        })
        .finally(() => {
            submitButton.disabled = false;
            buttonText.classList.remove('hidden');
            loadingSpinner.classList.add('hidden');
        });
    });

    function showPopup(status, message) {
        popup.className = 'fixed top-0 left-1/2 transform -translate-x-1/2 p-4 rounded-b-lg shadow-lg transition-all duration-300 ease-in-out';
        popup.classList.add(status === 'success' ? 'bg-green-500' : 'bg-red-500', 'text-white');
        popupMessage.textContent = message;

        setTimeout(() => popup.classList.add('translate-y-0', 'opacity-100'), 10);

        setTimeout(() => {
            popup.classList.remove('translate-y-0', 'opacity-100');
            popup.classList.add('-translate-y-full', 'opacity-0');
        }, 3000);
    }
});