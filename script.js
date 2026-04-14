/* ============================================
   PRANEETH VARMA — PORTFOLIO 2026 v2
   Orb, Particles, Tilt, GSAP, Counters, Radar
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
        document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.8 + 0.5;
                this.baseAlpha = Math.random() * 0.4 + 0.15;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                const dx = this.x - mouse.x, dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    this.x += (dx / dist) * force * 1.5;
                    this.y += (dy / dist) * force * 1.5;
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
            const count = Math.min(Math.floor((width * height) / 14000), 120);
            particles = Array.from({ length: count }, () => new Particle());
        }
        initParticles();

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - dist / 140) * 0.12})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function updateCanvasOpacity() {
            canvas.style.opacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.8));
        }
        window.addEventListener('scroll', updateCanvasOpacity, { passive: true });

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            animId = requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            cancelAnimationFrame(animId);
            initParticles();
            animateParticles();
        });
    }

    // ============================
    // 2. HERO ORB CANVAS
    // ============================
    const orbCanvas = document.getElementById('orb-canvas');
    if (orbCanvas) {
        const octx = orbCanvas.getContext('2d');
        let ow, oh, orbMouse = { x: 0.5, y: 0.5 };

        function resizeOrb() {
            const rect = orbCanvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            ow = rect.width;
            oh = rect.height;
            orbCanvas.width = ow * dpr;
            orbCanvas.height = oh * dpr;
            octx.scale(dpr, dpr);
        }
        resizeOrb();
        window.addEventListener('resize', resizeOrb);

        orbCanvas.style.pointerEvents = 'none';
        document.addEventListener('mousemove', (e) => {
            const rect = orbCanvas.getBoundingClientRect();
            orbMouse.x = (e.clientX - rect.left) / rect.width;
            orbMouse.y = (e.clientY - rect.top) / rect.height;
        });

        // Orbital rings with data points
        const rings = [
            { radius: 0.38, speed: 0.0004, dots: 12, dotSize: 2.5, color: [0, 212, 255], opacity: 0.6 },
            { radius: 0.32, speed: -0.0003, dots: 8, dotSize: 2, color: [124, 58, 237], opacity: 0.5 },
            { radius: 0.26, speed: 0.0005, dots: 6, dotSize: 3, color: [16, 185, 129], opacity: 0.45 },
            { radius: 0.44, speed: -0.00025, dots: 16, dotSize: 1.8, color: [0, 212, 255], opacity: 0.3 },
        ];

        // Floating data nodes
        const nodes = [];
        for (let i = 0; i < 30; i++) {
            nodes.push({
                angle: Math.random() * Math.PI * 2,
                dist: 0.08 + Math.random() * 0.35,
                speed: (Math.random() - 0.5) * 0.001,
                size: Math.random() * 2.5 + 0.8,
                alpha: Math.random() * 0.4 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.01 + Math.random() * 0.02,
            });
        }

        let orbTime = 0;
        function drawOrb() {
            octx.clearRect(0, 0, ow, oh);
            const cx = ow / 2;
            const cy = oh / 2;
            const maxR = Math.min(ow, oh) / 2;
            orbTime++;

            // Mouse offset for parallax feel
            const mx = (orbMouse.x - 0.5) * 15;
            const my = (orbMouse.y - 0.5) * 15;

            // Core glow
            const coreGrad = octx.createRadialGradient(cx + mx * 0.5, cy + my * 0.5, 0, cx, cy, maxR * 0.5);
            coreGrad.addColorStop(0, 'rgba(0, 212, 255, 0.12)');
            coreGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.06)');
            coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            octx.fillStyle = coreGrad;
            octx.beginPath();
            octx.arc(cx, cy, maxR * 0.5, 0, Math.PI * 2);
            octx.fill();

            // Outer halo pulse
            const haloSize = maxR * (0.48 + Math.sin(orbTime * 0.015) * 0.02);
            const haloGrad = octx.createRadialGradient(cx, cy, haloSize * 0.85, cx, cy, haloSize);
            haloGrad.addColorStop(0, 'rgba(0, 212, 255, 0)');
            haloGrad.addColorStop(0.7, 'rgba(0, 212, 255, 0.04)');
            haloGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');
            octx.fillStyle = haloGrad;
            octx.beginPath();
            octx.arc(cx, cy, haloSize, 0, Math.PI * 2);
            octx.fill();

            // Draw rings
            rings.forEach(ring => {
                const r = maxR * ring.radius;
                ring._angle = (ring._angle || 0) + ring.speed;

                // Ring line
                octx.beginPath();
                octx.arc(cx + mx * 0.3, cy + my * 0.3, r, 0, Math.PI * 2);
                octx.strokeStyle = `rgba(${ring.color.join(',')}, ${ring.opacity * 0.2})`;
                octx.lineWidth = 0.8;
                octx.stroke();

                // Dots on ring
                for (let i = 0; i < ring.dots; i++) {
                    const a = ring._angle + (i / ring.dots) * Math.PI * 2;
                    const px = cx + mx * 0.3 + Math.cos(a) * r;
                    const py = cy + my * 0.3 + Math.sin(a) * r;
                    const pulse = 0.6 + Math.sin(orbTime * 0.03 + i) * 0.4;

                    octx.beginPath();
                    octx.arc(px, py, ring.dotSize * pulse, 0, Math.PI * 2);
                    octx.fillStyle = `rgba(${ring.color.join(',')}, ${ring.opacity * pulse})`;
                    octx.fill();

                    // Glow on larger dots
                    if (ring.dotSize > 2) {
                        octx.beginPath();
                        octx.arc(px, py, ring.dotSize * 3, 0, Math.PI * 2);
                        const g = octx.createRadialGradient(px, py, 0, px, py, ring.dotSize * 3);
                        g.addColorStop(0, `rgba(${ring.color.join(',')}, ${ring.opacity * 0.3})`);
                        g.addColorStop(1, `rgba(${ring.color.join(',')}, 0)`);
                        octx.fillStyle = g;
                        octx.fill();
                    }
                }

                // Connections between adjacent dots on ring
                for (let i = 0; i < ring.dots; i++) {
                    const a1 = ring._angle + (i / ring.dots) * Math.PI * 2;
                    const a2 = ring._angle + ((i + 1) / ring.dots) * Math.PI * 2;
                    if (Math.random() > 0.7) {
                        const x1 = cx + mx * 0.3 + Math.cos(a1) * r;
                        const y1 = cy + my * 0.3 + Math.sin(a1) * r;
                        const x2 = cx + mx * 0.3 + Math.cos(a2) * r;
                        const y2 = cy + my * 0.3 + Math.sin(a2) * r;
                        octx.beginPath();
                        octx.moveTo(x1, y1);
                        octx.lineTo(x2, y2);
                        octx.strokeStyle = `rgba(${ring.color.join(',')}, ${ring.opacity * 0.1})`;
                        octx.lineWidth = 0.5;
                        octx.stroke();
                    }
                }
            });

            // Draw floating nodes
            nodes.forEach(node => {
                node.angle += node.speed;
                node.pulse += node.pulseSpeed;
                const r = maxR * node.dist;
                const nx = cx + mx * 0.2 + Math.cos(node.angle) * r;
                const ny = cy + my * 0.2 + Math.sin(node.angle) * r;
                const sz = node.size * (0.7 + Math.sin(node.pulse) * 0.3);

                octx.beginPath();
                octx.arc(nx, ny, sz, 0, Math.PI * 2);
                octx.fillStyle = `rgba(0, 212, 255, ${node.alpha * (0.5 + Math.sin(node.pulse) * 0.5)})`;
                octx.fill();
            });

            // Cross-ring connections (sparse, dynamic)
            if (orbTime % 3 === 0) {
                for (let i = 0; i < 3; i++) {
                    const r1 = rings[Math.floor(Math.random() * rings.length)];
                    const r2 = rings[Math.floor(Math.random() * rings.length)];
                    if (r1 === r2) continue;
                    const a1 = (r1._angle || 0) + Math.random() * Math.PI * 2;
                    const a2 = (r2._angle || 0) + Math.random() * Math.PI * 2;
                    const x1 = cx + Math.cos(a1) * maxR * r1.radius;
                    const y1 = cy + Math.sin(a1) * maxR * r1.radius;
                    const x2 = cx + Math.cos(a2) * maxR * r2.radius;
                    const y2 = cy + Math.sin(a2) * maxR * r2.radius;
                    octx.beginPath();
                    octx.moveTo(x1, y1);
                    octx.lineTo(x2, y2);
                    octx.strokeStyle = `rgba(0, 212, 255, 0.04)`;
                    octx.lineWidth = 0.5;
                    octx.stroke();
                }
            }

            requestAnimationFrame(drawOrb);
        }
        drawOrb();
    }

    // ============================
    // 3. LUCIDE ICONS
    // ============================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ============================
    // 4. ROTATING TAGLINE
    // ============================
    const rotatingEl = document.getElementById('rotating-text');
    if (rotatingEl) {
        const phrases = [
            'turn data into decisions.',
            'build products with AI.',
            'find the signal in the noise.',
            'design experiments that matter.',
            'drive strategy at scale.'
        ];
        let phraseIdx = 0, charIdx = 0, isDeleting = false, typingSpeed = 80;

        function typePhrase() {
            const currentPhrase = phrases[phraseIdx];
            if (isDeleting) { charIdx--; typingSpeed = 35; }
            else { charIdx++; typingSpeed = 70; }

            rotatingEl.textContent = currentPhrase.substring(0, charIdx);

            if (!isDeleting && charIdx === currentPhrase.length) {
                typingSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 400;
            }
            setTimeout(typePhrase, typingSpeed);
        }
        setTimeout(typePhrase, 800);
    }

    // ============================
    // 5. NAVBAR
    // ============================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================
    // 6. 3D TILT ENGINE
    // ============================
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
        });
    });

    // ============================
    // 7. GSAP SCROLL ANIMATIONS
    // ============================
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from('.eyebrow', { y: 20, opacity: 0, duration: 0.5 })
          .from('.hero-name', { y: 30, opacity: 0, duration: 0.7 }, '-=0.2')
          .from('.hero-tagline', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
          .from('.company-strip', { y: 15, opacity: 0, duration: 0.4 }, '-=0.2')
          .from('.hero-ctas', { y: 15, opacity: 0, duration: 0.4 }, '-=0.1')
          .from('#orb-canvas', { scale: 0.6, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0.4)
          .from('.float-card-1', { x: 60, opacity: 0, duration: 0.5 }, '-=0.6')
          .from('.float-card-2', { x: -60, opacity: 0, duration: 0.5 }, '-=0.4')
          .from('.float-card-3', { x: 60, opacity: 0, duration: 0.5 }, '-=0.3')
          .from('.float-card-4', { x: -60, opacity: 0, duration: 0.5 }, '-=0.3');

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: header, start: 'top 85%', once: true }
            });
        });

        // Staggered cards for each section
        const staggerSets = [
            { sel: '.impact-card', y: 50, delay: 0.08 },
            { sel: '.timeline-card', x: -40, delay: 0.1 },
            { sel: '.case-card', y: 60, delay: 0.12 },
            { sel: '.skill-group', y: 30, delay: 0.08 },
            { sel: '.venture-card', y: 50, delay: 0.12 },
            { sel: '.github-card', y: 40, delay: 0.1 },
            { sel: '.sidebar-card', y: 40, delay: 0.12 },
            { sel: '.cert-card', y: 30, delay: 0.08 },
        ];

        staggerSets.forEach(({ sel, y, x, delay }) => {
            gsap.utils.toArray(sel).forEach((el, i) => {
                gsap.from(el, {
                    y: y || 0, x: x || 0, opacity: 0,
                    duration: 0.6, delay: i * delay,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                });
            });
        });

        // About narrative
        const aboutNarrative = document.querySelector('.about-narrative');
        if (aboutNarrative) {
            gsap.from(aboutNarrative, {
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: aboutNarrative, start: 'top 85%', once: true }
            });
        }

        // Degree card
        const degreeCard = document.querySelector('.degree-card');
        if (degreeCard) {
            gsap.from(degreeCard, {
                y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: degreeCard, start: 'top 85%', once: true }
            });
        }

        // Contact
        const contactContent = document.querySelector('.contact-content');
        if (contactContent) {
            gsap.from(contactContent, {
                y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: contactContent, start: 'top 85%', once: true }
            });
        }
    }

    function waitForGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') initGSAP();
        else setTimeout(waitForGSAP, 100);
    }
    waitForGSAP();

    // ============================
    // 8. COUNTER ANIMATIONS
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
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.textContent = target + suffix;
                }
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.impact-number').forEach(el => counterObserver.observe(el));

    // ============================
    // 9. METRIC BARS
    // ============================
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.setProperty('--bar-width', bar.dataset.width);
                requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('animated')));
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.metric-bar').forEach(bar => barObserver.observe(bar));

    // ============================
    // 10. RADAR CHART
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

        function polarToCart(a, r) {
            return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
        }

        // Grid
        [0.25, 0.5, 0.75, 1].forEach(frac => {
            const pts = [];
            for (let i = 0; i < n; i++) pts.push(polarToCart(startAngle + i * angleStep, maxR * frac));
            const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute('points', pts.map(p => `${p.x},${p.y}`).join(' '));
            poly.setAttribute('fill', 'none');
            poly.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            poly.setAttribute('stroke-width', '1');
            radarSvg.appendChild(poly);
        });

        // Axes
        for (let i = 0; i < n; i++) {
            const p = polarToCart(startAngle + i * angleStep, maxR);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', cx); line.setAttribute('y1', cy);
            line.setAttribute('x2', p.x); line.setAttribute('y2', p.y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.06)');
            radarSvg.appendChild(line);
        }

        // Data
        const dataPoints = categories.map((cat, i) => polarToCart(startAngle + i * angleStep, maxR * cat.value));
        const dataPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        dataPoly.setAttribute('points', dataPoints.map(p => `${p.x},${p.y}`).join(' '));
        dataPoly.setAttribute('fill', 'rgba(0, 212, 255, 0.1)');
        dataPoly.setAttribute('stroke', 'rgba(0, 212, 255, 0.6)');
        dataPoly.setAttribute('stroke-width', '2');
        radarSvg.appendChild(dataPoly);

        const dots = dataPoints.map((p, i) => {
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('cx', p.x); c.setAttribute('cy', p.y);
            c.setAttribute('r', '4'); c.setAttribute('fill', categories[i].color);
            c.setAttribute('stroke', '#050510'); c.setAttribute('stroke-width', '2');
            radarSvg.appendChild(c);
            return c;
        });

        // Labels
        categories.forEach((cat, i) => {
            const p = polarToCart(startAngle + i * angleStep, maxR + 22);
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('x', p.x); t.setAttribute('y', p.y);
            t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'central');
            t.setAttribute('fill', '#8888aa'); t.setAttribute('font-size', '11');
            t.setAttribute('font-family', 'Space Grotesk, sans-serif');
            t.textContent = cat.name;
            radarSvg.appendChild(t);
        });

        // Animate
        function animateRadar() {
            const duration = 1200, start = performance.now();
            const center = categories.map(() => ({ x: cx, y: cy }));
            function easeOutBack(t) {
                return 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
            }
            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const e = easeOutBack(progress);
                const cur = center.map((c, i) => ({
                    x: c.x + (dataPoints[i].x - c.x) * e,
                    y: c.y + (dataPoints[i].y - c.y) * e
                }));
                dataPoly.setAttribute('points', cur.map(p => `${p.x},${p.y}`).join(' '));
                dots.forEach((d, i) => { d.setAttribute('cx', cur[i].x); d.setAttribute('cy', cur[i].y); });
                if (progress < 1) requestAnimationFrame(tick);
            }
            dataPoly.setAttribute('points', center.map(p => `${p.x},${p.y}`).join(' '));
            dots.forEach(d => { d.setAttribute('cx', cx); d.setAttribute('cy', cy); });
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
    // 11. ACTIVE NAV HIGHLIGHT
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    function highlightNav() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop, height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active-nav', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav, { passive: true });

});
