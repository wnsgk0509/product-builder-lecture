
document.getElementById('generate-btn').addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach((el, index) => {
        el.textContent = sortedNumbers[index];
    });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = 'Light Mode';
    } else {
        themeToggleBtn.textContent = 'Dark Mode';
    }
});

// Initialize button text on load
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = 'Light Mode';
    } else {
        themeToggleBtn.textContent = 'Dark Mode';
    }

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    const formMessages = document.getElementById('form-messages');

    if (contactForm && formMessages) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);
            const formEndpoint = contactForm.action;

            // Display a loading message
            formMessages.textContent = 'Sending message...';
            formMessages.className = 'message loading';

            try {
                const response = await fetch(formEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessages.textContent = 'Message sent successfully! We will get back to you soon.';
                    formMessages.className = 'message success';
                    contactForm.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formMessages.textContent = data.errors.map(err => err.message).join(', ');
                    } else {
                        formMessages.textContent = 'Oops! There was a problem sending your message.';
                    }
                    formMessages.className = 'message error';
                }
            } catch (error) {
                formMessages.textContent = 'Oops! Network error. Please try again later.';
                formMessages.className = 'message error';
            } finally {
                // Clear the message after 5 seconds
                setTimeout(() => {
                    formMessages.textContent = '';
                    formMessages.className = '';
                }, 5000);
            }
        });
    }
});
