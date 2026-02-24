
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
    
    // 테마에 따라 버튼 텍스트 변경
    const themeToggleBtn = document.getElementById('theme-toggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';

    // Disqus 리로드하여 테마 동기화
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.url = 'https://product-builder-lecture-a7r.pages.dev/';
                this.page.identifier = 'product-builder-lecture-main';
            }
        });
    }
});

// Initialize button text on load
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '라이트 모드';
    } else {
        themeToggleBtn.textContent = '다크 모드';
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
            formMessages.textContent = '메시지를 보내는 중...';
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
                    formMessages.textContent = '메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.';
                    formMessages.className = 'message success';
                    contactForm.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formMessages.textContent = data.errors.map(err => err.message).join(', ');
                    } else {
                        formMessages.textContent = '죄송합니다! 메시지를 보내는 데 문제가 발생했습니다.';
                    }
                    formMessages.className = 'message error';
                }
            } catch (error) {
                formMessages.textContent = '죄송합니다! 네트워크 오류가 발생했습니다. 나중에 다시 시도해 주세요.';
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
