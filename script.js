document.addEventListener('DOMContentLoaded', () => {
    const greetingText = document.getElementById('greetingText');
    const changingText = document.getElementById('changing-text');
    const banner = document.querySelector('.top-greeting-banner');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    // Time-based greeting in CAT timezone (UTC+2)
    const now = new Date();
    const options = { timeZone: 'Africa/Lusaka', hour: 'numeric', hour12: false };
    const hour = parseInt(new Intl.DateTimeFormat('en-US', options).format(now));
    const greetingBase = hour < 12 ? 'Good Morning!' : hour < 18 ? 'Good Afternoon!' : 'Good Evening!';
    greetingText.textContent = greetingBase;

    // Text animation for greeting banner
    const phrases = ['Welcome!', 'Explore My Work!', 'Let’s Connect!'];
    let index = 0;

    function changeGreetingText() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            greetingText.textContent = `${greetingBase} ${phrases[index]}`;
            index = (index + 1) % phrases.length;
        } else {
            greetingText.style.opacity = 0;
            setTimeout(() => {
                greetingText.textContent = `${greetingBase} ${phrases[index]}`;
                greetingText.style.opacity = 1;
                index = (index + 1) % phrases.length;
            }, 500);
        }
    }

    // Run animation for 3 cycles (9 seconds) then hide banner
    const animationInterval = setInterval(changeGreetingText, 3000);
    setTimeout(() => {
        clearInterval(animationInterval);
        banner.classList.add('hidden');
        navbar.classList.add('banner-hidden');
        hero.classList.add('banner-hidden');
    }, 9000);

    // Hero section text animation
    const roles = ['Frontend Developer', 'UI/UX Designer', 'Graphic Designer', 'Backened Developer', 'Wordpress Website Developer'];
    let roleIndex = 0;

    function changeRoleText() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            changingText.textContent = roles[roleIndex];
            roleIndex = (roleIndex + 1) % roles.length;
        } else {
            changingText.style.opacity = 0;
            setTimeout(() => {
                changingText.textContent = roles[roleIndex];
                changingText.style.opacity = 1;
                roleIndex = (roleIndex + 1) % roles.length;
            }, 500);
        }
    }

    setInterval(changeRoleText, 3000);

    // Navbar scroll behavior
    let lastScrollTop = 0;
    let isHovering = false;

    navbar.addEventListener('pointerenter', () => {
        isHovering = true;
        navbar.classList.remove('hidden');
    });

    navbar.addEventListener('pointerleave', () => {
        isHovering = false;
    });

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY;
        if (currentScrollTop > lastScrollTop && !isHovering) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or hovering
            navbar.classList.remove('hidden');
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });

    // Set active link based on current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a:not(.connect-btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href').includes(current)) {
                link.setAttribute('aria-current', 'page');
            }
        });
    });

    // Disable transitions for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.social-links a, .nav-links li a, .connect-btn, .hamburger-icon span, .btn, .icon, .arrow, .flip-card-inner, #changing-text, #greetingText, .top-greeting-banner, .navbar, .nav-links.active')
            .forEach(el => el.style.transition = 'none');
    }
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    navLinks.classList.toggle('active');
    hamburgerIcon.classList.toggle('open');
    hamburgerIcon.setAttribute('aria-expanded', navLinks.classList.contains('active'));
}

//arrow
const backToTopContainer = document.getElementById('backToTopContainer');
const backToTopImage = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopContainer.style.display = 'block';
  } else {
    backToTopContainer.style.display = 'none';
  }
});

backToTopImage.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
