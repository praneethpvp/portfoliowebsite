/* ============================================
   PRANEETH VARMA — PORTFOLIO 2026
   Interactive Script: Particles, Animations, Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. PARTICLE NETWORK CANVAS
    // ============================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles, mouse, animId;

        mouse = { x: -1000, y: -1000 };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 0.5;
                this.baseAlpha = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse repulsion
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.x += (dx / dist) * force * 2;
                    this.y += (dy / dist) * force * 2;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${this.baseAlpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            const count = Math.min(Math.floor((width * height) / 12000), 150);
            particles = Array.from({ length: count }, () => new Particle());
        }
        initParticles();

        function drawConnections() {
            const maxDist = 150;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        // Fade particles based on scroll
        let canvasOpacity = 1;
        function updateCanvasOpacity() {
            const scrollY = window.scrollY;
            canvasOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.8));
            canvas.style.opacity = canvasOpacity;
        }
        window.addEventListener('scroll', updateCanvasOpacity, { passive: true });

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            animId = requestAnimationFrame(animate);
        }
        animate();

        // Reinit particles on resize
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animId);
            initParticles();
            animate();
        });
    }

    // ============================
    // 2. LUCIDE ICONS
    // ============================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ============================
    // 3. ROTATING TAGLINE
    // ============================
    const rotatingEl = document.getElementById('rotating-text');
    if (rotatingEl) {
        const phrases = [
            'turn data into decisions.',
            'build products with AI.',
            'find the signal in the noise.',
            'drive strategy at scale.'
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typePhrase() {
            const currentPhrase = phrases[phraseIdx];
            if (isDeleting) {
                charIdx--;
                typingSpeed = 40;
            } else {
                charIdx++;
                typingSpeed = 80;
            }

            rotatingEl.textContent = currentPhrase.substring(0, charIdx);

            if (!isDeleting && charIdx === currentPhrase.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 300; // Pause before next
            }

            setTimeout(typePhrase, typingSpeed);
        }
        setTimeout(typePhrase, 1000);
    }

    // ============================
    // 4. NAVBAR
    // ============================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================
    // 5. GSAP SCROLL ANIMATIONS
    // ============================
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Impact cards — stagger
        gsap.utils.toArray('.impact-card').forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    once: true
                }
            });
        });

        // Timeline cards — slide in from left
        gsap.utils.toArray('.timeline-card').forEach((card, i) => {
            gsap.from(card, {
                x: -40,
                opacity: 0,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Case study cards
        gsap.utils.toArray('.case-card').forEach((card, i) => {
            gsap.from(card, {
                y: 60,
                opacity: 0,
                duration: 0.7,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Skill groups
        gsap.utils.toArray('.skill-group').forEach((group, i) => {
            gsap.from(group, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: group,
                    start: 'top 90%',
                    once: true
                }
            });
        });

        // Venture cards
        gsap.utils.toArray('.venture-card').forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // GitHub cards
        gsap.utils.toArray('.github-card').forEach((card, i) => {
            gsap.from(card, {
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    once: true
                }
            });
        });

        // About section
        const aboutNarrative = document.querySelector('.about-narrative');
        if (aboutNarrative) {
            gsap.from(aboutNarrative, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: aboutNarrative, start: 'top 85%', once: true }
            });
        }
        gsap.utils.toArray('.sidebar-card').forEach((card, i) => {
            gsap.from(card, {
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            });
        });

        // Degree + certs
        const degreeCard = document.querySelector('.degree-card');
        if (degreeCard) {
            gsap.from(degreeCard, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: degreeCard, start: 'top 85%', once: true }
            });
        }
        gsap.utils.toArray('.cert-card').forEach((card, i) => {
            gsap.from(card, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            });
        });

        // Contact section
        const contactContent = document.querySelector('.contact-content');
        if (contactContent) {
            gsap.from(contactContent, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: contactContent, start: 'top 85%', once: true }
            });
        }

        // Hero entrance
        gsap.from('.eyebrow', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
        gsap.from('.hero-name', { y: 30, opacity: 0, duration: 0.8, delay: 0.4 });
        gsap.from('.hero-tagline', { y: 20, opacity: 0, duration: 0.6, delay: 0.7 });
        gsap.from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, delay: 0.9 });
        gsap.from('.company-strip', { y: 20, opacity: 0, duration: 0.6, delay: 1.0 });
        gsap.from('.hero-ctas', { y: 20, opacity: 0, duration: 0.6, delay: 1.1 });
        gsap.from('.profile-photo-wrapper', { scale: 0.8, opacity: 0, duration: 1, delay: 0.5, ease: 'back.out(1.5)' });
        gsap.from('.float-card-1', { x: 50, opacity: 0, duration: 0.6, delay: 1.2 });
        gsap.from('.float-card-2', { x: -50, opacity: 0, duration: 0.6, delay: 1.3 });
        gsap.from('.float-card-3', { x: 50, opacity: 0, duration: 0.6, delay: 1.4 });
    }

    // Wait for GSAP to load (deferred)
    function waitForGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initGSAP();
        } else {
            setTimeout(waitForGSAP, 100);
        }
    }
    waitForGSAP();

    // ============================
    // 6. COUNTER ANIMATIONS
    // ============================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = current + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.impact-number').forEach(el => {
        counterObserver.observe(el);
    });

    // ============================
    // 7. METRIC BARS ANIMATION
    // ============================
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.width;
                bar.style.setProperty('--bar-width', targetWidth);
                // Ensure browser paints width:0 before triggering transition
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        bar.classList.add('animated');
                    });
                });
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.metric-bar').forEach(bar => {
        barObserver.observe(bar);
    });

    // ============================
    // 8. RADAR CHART
    // ============================
    const radarSvg = document.getElementById('radar-chart');
    if (radarSvg) {
        const cx = 150, cy = 150, maxR = 110;
        const categories = [
            { name: 'Analytics', value: 0.92, color: '#00d4ff' },
            { name: 'Languages', value: 0.85, color: '#7c3aed' },
            { name: 'BI & Viz', value: 0.95, color: '#10b981' },
            { name: 'Cloud', value: 0.80, color: '#f59e0b' },
            { name: 'AI / ML', value: 0.75, color: '#ef4444' }
        ];
        const n = categories.length;
        const angleStep = (2 * Math.PI) / n;
        const startAngle = -Math.PI / 2;

        function polarToCart(angle, radius) {
            return {
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle)
            };
        }

        // Draw grid rings
        [0.25, 0.5, 0.75, 1].forEach(frac => {
            const r = maxR * frac;
            const points = [];
            for (let i = 0; i < n; i++) {
                const a = startAngle + i * angleStep;
                const p = polarToCart(a, r);
                points.push(`${p.x},${p.y}`);
            }
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', points.join(' '));
            polygon.setAttribute('fill', 'none');
            polygon.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            polygon.setAttribute('stroke-width', '1');
            radarSvg.appendChild(polygon);
        });

        // Draw axes
        for (let i = 0; i < n; i++) {
            const a = startAngle + i * angleStep;
            const p = polarToCart(a, maxR);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', cx);
            line.setAttribute('y1', cy);
            line.setAttribute('x2', p.x);
            line.setAttribute('y2', p.y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            line.setAttribute('stroke-width', '1');
            radarSvg.appendChild(line);
        }

        // Draw data polygon
        const dataPoints = categories.map((cat, i) => {
            const a = startAngle + i * angleStep;
            return polarToCart(a, maxR * cat.value);
        });
        const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        dataPolygon.setAttribute('points', dataPoints.map(p => `${p.x},${p.y}`).join(' '));
        dataPolygon.setAttribute('fill', 'rgba(0, 212, 255, 0.1)');
        dataPolygon.setAttribute('stroke', 'rgba(0, 212, 255, 0.6)');
        dataPolygon.setAttribute('stroke-width', '2');
        dataPolygon.classList.add('radar-data');
        radarSvg.appendChild(dataPolygon);

        // Draw data points
        dataPoints.forEach((p, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', categories[i].color);
            circle.setAttribute('stroke', '#050510');
            circle.setAttribute('stroke-width', '2');
            radarSvg.appendChild(circle);
        });

        // Labels
        categories.forEach((cat, i) => {
            const a = startAngle + i * angleStep;
            const labelR = maxR + 22;
            const p = polarToCart(a, labelR);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', p.x);
            text.setAttribute('y', p.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'central');
            text.setAttribute('fill', '#8888aa');
            text.setAttribute('font-size', '11');
            text.setAttribute('font-family', 'Space Grotesk, sans-serif');
            text.textContent = cat.name;
            radarSvg.appendChild(text);
        });

        // Animate radar on scroll — JS interpolation since SVG points can't CSS-transition
        function animateRadar() {
            const duration = 1200;
            const start = performance.now();
            const centerPoints = categories.map(() => ({ x: cx, y: cy }));
            const targetPoints = dataPoints;

            // Ease out back
            function easeOutBack(t) {
                const c1 = 1.70158;
                const c3 = c1 + 1;
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
            }

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutBack(progress);

                const currentPoints = centerPoints.map((cp, i) => ({
                    x: cp.x + (targetPoints[i].x - cp.x) * eased,
                    y: cp.y + (targetPoints[i].y - cp.y) * eased
                }));

                dataPolygon.setAttribute('points',
                    currentPoints.map(p => `${p.x},${p.y}`).join(' ')
                );

                // Also animate dot circles
                const dots = radarSvg.querySelectorAll('circle');
                dots.forEach((dot, i) => {
                    if (i < currentPoints.length) {
                        dot.setAttribute('cx', currentPoints[i].x);
                        dot.setAttribute('cy', currentPoints[i].y);
                    }
                });

                if (progress < 1) requestAnimationFrame(tick);
            }

            // Start from center
            dataPolygon.setAttribute('points', centerPoints.map(p => `${p.x},${p.y}`).join(' '));
            radarSvg.querySelectorAll('circle').forEach(dot => {
                dot.setAttribute('cx', cx);
                dot.setAttribute('cy', cy);
            });

            requestAnimationFrame(tick);
        }

        const radarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateRadar, 300);
                    radarObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        radarObserver.observe(radarSvg);
    }

    // ============================
    // 9. ACTIVE NAV HIGHLIGHT
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNav() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active-nav');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active-nav');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav, { passive: true });

});
