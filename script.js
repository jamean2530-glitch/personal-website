/* ========================================
   Particle Background
======================================== */
(function () {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(162, 155, 254, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
})();

/* ========================================
   Typewriter Effect
======================================== */
(function () {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const texts = [
        'เด็กหนุ่มวัย 19 🧑‍💻',
        'คนรักไข่เจียวตัวยง 🍳',
        'ชอบเรียนรู้สิ่งใหม่ๆ 🚀',
        'กินไข่เจียวได้ทุกมื้อ! 😋',
        'นักพัฒนาตัวน้อย 💻'
    ];
    let textIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const current = texts[textIdx];
        if (!isDeleting) {
            // Use Array.from to handle emoji / multi-byte chars correctly
            el.textContent = Array.from(current).slice(0, charIdx + 1).join('');
            charIdx++;
            if (charIdx >= Array.from(current).length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 80);
        } else {
            el.textContent = Array.from(current).slice(0, charIdx).join('');
            charIdx--;
            if (charIdx < 0) {
                isDeleting = false;
                charIdx = 0;
                textIdx = (textIdx + 1) % texts.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 40);
        }
    }
    setTimeout(type, 1200);
})();

/* ========================================
   Navbar Scroll & Mobile Toggle
======================================== */
(function () {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (toggle) {
        toggle.addEventListener('click', () => menu.classList.toggle('open'));
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        links.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + current) l.classList.add('active');
        });
    });
})();

/* ========================================
   Scroll Reveal Animation
======================================== */
(function () {
    const revealElements = document.querySelectorAll(
        '.about-card, .about-details, .hobby-card, .skill-card, .contact-card, .timeline-item'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), idx * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
})();

/* ========================================
   Skill Bar Animation
======================================== */
(function () {
    const fills = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const w = entry.target.getAttribute('data-width');
                entry.target.style.width = w + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(f => observer.observe(f));
})();
