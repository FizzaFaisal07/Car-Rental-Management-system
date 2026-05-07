  // Scroll function for each row
function scrollRow(containerId, direction) {
    const container = document.getElementById(containerId);
    if (container) {
        // Get the width of one car card (300px + 25px gap = 325px)
        const scrollAmount = direction === 'left' ? -325 : 325;
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

    // Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('show'));
    });

    // Dark/Light Mode
    const modeBtn = document.getElementById('mode-toggle');
    modeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        modeBtn.innerHTML = document.body.classList.contains('light-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Modal Functions
    function openLoginModal() {
        document.getElementById('authModal').style.display = 'flex';
    }
    function closeLoginModal() {
        document.getElementById('authModal').style.display = 'none';
    }
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;

    function showAuthForm(formType) {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        if (formType === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            loginTab.classList.add('active-tab');
            signupTab.classList.remove('active-tab');
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            signupTab.classList.add('active-tab');
            loginTab.classList.remove('active-tab');
        }
    }
    window.showAuthForm = showAuthForm;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Login successful!');
        closeLoginModal();
    });
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('🎉 Account created! Please login.');
        showAuthForm('login');
    });

    // Booking Form
    document.getElementById('carBookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value.trim();
        const carModel = document.getElementById('carModel').value.trim();
        const pickup = document.getElementById('pickupDate').value;
        const returnDate = document.getElementById('returnDate').value;
        if (!fullName || !carModel || !pickup || !returnDate) {
            document.getElementById('bookingConfirmation').innerHTML = '❌ Please fill all fields.';
            document.getElementById('bookingConfirmation').style.color = '#ff6b6b';
            return;
        }
        if (new Date(pickup) > new Date(returnDate)) {
            document.getElementById('bookingConfirmation').innerHTML = '❌ Return date must be after pickup.';
            document.getElementById('bookingConfirmation').style.color = '#ff6b6b';
            return;
        }
        document.getElementById('bookingConfirmation').innerHTML = `✅ Thank you ${fullName}! Your ${carModel} is confirmed.`;
        document.getElementById('bookingConfirmation').style.color = '#51cf66';
        document.getElementById('carBookingForm').reset();
        setTimeout(() => document.getElementById('bookingConfirmation').innerHTML = '', 4000);
    });

    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        document.getElementById('contactMessage').innerHTML = `✅ Thanks ${name}! We'll get back to you soon.`;
        document.getElementById('contactMessage').style.color = '#51cf66';
        document.getElementById('contactForm').reset();
        setTimeout(() => document.getElementById('contactMessage').innerHTML = '', 4000);
    });

    // Auto-fill car model
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const carName = btn.getAttribute('data-car');
            document.getElementById('carModel').value = carName;
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('authModal');
        if (e.target === modal) closeLoginModal();
    });

    // FILTER FUNCTIONALITY
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            allCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-type') === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });