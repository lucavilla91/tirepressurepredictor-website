/**
 * Tire Pressure Predictor - Landing Page JavaScript
 * Form validation, smooth scroll, mobile menu, parallax hero
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== MOBILE MENU ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            mobileMenuBtn.classList.toggle('menu-open');
        });
    }

    // ==================== PARALLAX HERO ====================
    const hero = document.getElementById('hero');

    if (hero && hero.classList.contains('hero')) {
        // Only apply parallax on the main page (hero is position: fixed)
        const isFixed = getComputedStyle(hero).position === 'fixed';

        if (isFixed) {
            window.addEventListener('scroll', function() {
                const scrollY = window.scrollY;
                const windowH = window.innerHeight;
                const progress = Math.min(scrollY / windowH, 1);

                hero.style.opacity = 1 - progress;
                hero.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 - progress * 0.1})`;
            }, { passive: true });
        }
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    mobileMenuBtn.classList.remove('menu-open');
                }
            }
        });
    });

    // ==================== DOWNLOAD / FORM ====================
    const RELEASE_FALLBACK = 'https://github.com/lucavilla91/TirePressurePredictor/releases/latest';

    // Resolve latest .exe download URL from GitHub API (cached for the session)
    let resolvedDownloadUrl = null;
    fetch('https://api.github.com/repos/lucavilla91/TirePressurePredictor/releases/latest')
        .then(function(r) { return r.json(); })
        .then(function(release) {
            var exe = release.assets.find(function(a) { return a.name.endsWith('.exe') && a.name.includes('Setup'); });
            if (exe) {
                resolvedDownloadUrl = exe.browser_download_url;
            }
        })
        .catch(function() { /* fallback to releases/latest */ });

    // Toggle telemetry type dropdown based on radio selection
    const telemetryRadios = document.querySelectorAll('input[name="hasTelemetry"]');
    const telemetryTypeGroup = document.getElementById('telemetryTypeGroup');
    const telemetryTypeSelect = document.getElementById('telemetryType');
    const telemetryOtherGroup = document.getElementById('telemetryOtherGroup');
    const telemetryOtherInput = document.getElementById('telemetryOther');

    telemetryRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                telemetryTypeGroup.style.display = '';
                telemetryTypeSelect.setAttribute('required', '');
            } else {
                telemetryTypeGroup.style.display = 'none';
                telemetryOtherGroup.style.display = 'none';
                telemetryTypeSelect.removeAttribute('required');
                telemetryOtherInput.removeAttribute('required');
                telemetryTypeSelect.value = '';
                telemetryOtherInput.value = '';
            }
        });
    });

    // Toggle "Other" text field based on select value
    if (telemetryTypeSelect) {
        telemetryTypeSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                telemetryOtherGroup.style.display = '';
                telemetryOtherInput.setAttribute('required', '');
            } else {
                telemetryOtherGroup.style.display = 'none';
                telemetryOtherInput.removeAttribute('required');
                telemetryOtherInput.value = '';
            }
        });
    }

    // Send to Supabase (Telegram notification)
    function sendSupabaseRequest(data) {
        fetch('https://ivvxbkpkefryyiiqqbxt.supabase.co/functions/v1/hyper-responder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(function(err) { console.log('Supabase error:', err); });
    }

    // Send to FormSubmit (email notification)
    function sendFormSubmitRequest(data) {
        var formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('organization', data.organization);
        formData.append('message',
            'Series/Vehicle: ' + data.series +
            '\nTelemetry Software: ' + data.hasTelemetry +
            (data.telemetryType ? ' (' + data.telemetryType + ')' : '')
        );
        formData.append('_captcha', 'false');

        fetch('https://formsubmit.co/ajax/lvillaengineering@gmail.com', {
            method: 'POST',
            body: formData
        }).catch(function(err) { console.log('FormSubmit error:', err); });
    }

    // Form submit handler
    const contactForm = document.getElementById('contactForm');
    const downloadBtn = document.getElementById('downloadBtn');

    if (contactForm && downloadBtn) {
        var nameField = document.getElementById('name');
        var emailField = document.getElementById('email');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Enable/disable button based on Name + Email
        function updateDownloadBtn() {
            var nameOk = nameField.value.trim().length > 0;
            var emailOk = emailRegex.test(emailField.value.trim());
            downloadBtn.disabled = !(nameOk && emailOk);
        }

        // Initial state: disabled
        downloadBtn.disabled = true;

        [nameField, emailField].forEach(function(f) {
            f.addEventListener('input', updateDownloadBtn);
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var orgField = document.getElementById('organization');
            var seriesField = document.getElementById('series');
            var telemetryChecked = document.querySelector('input[name="hasTelemetry"]:checked');

            // Collect data
            var data = {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                organization: orgField.value.trim(),
                series: seriesField.value.trim(),
                hasTelemetry: telemetryChecked ? telemetryChecked.value : '',
                telemetryType: telemetryTypeSelect.value === 'Other'
                    ? 'Other: ' + telemetryOtherInput.value.trim()
                    : (telemetryTypeSelect.value || '')
            };

            // Send to both channels
            sendSupabaseRequest(data);
            sendFormSubmitRequest(data);

            // Start download
            window.open(resolvedDownloadUrl || RELEASE_FALLBACK, '_blank');

            // Show confirmation
            showDownloadMessage(data.email);
        });

        // Real-time: clear error styling on input
        contactForm.querySelectorAll('input, select').forEach(function(input) {
            input.addEventListener('input', function() { this.style.borderColor = ''; });
        });
    }

    function showDownloadMessage(email) {
        var msgDiv = document.createElement('div');
        msgDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#111;border:1px solid #333;padding:40px;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.6);text-align:center;z-index:10001;max-width:450px;';

        msgDiv.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" style="margin-bottom:20px;">' +
            '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
            '<h3 style="font-size:24px;color:#e5e5e5;margin-bottom:12px;">Download Started!</h3>' +
            '<p style="color:#888;margin-bottom:16px;">Your download should begin automatically.</p>' +
            '<p style="color:#666;font-size:14px;margin-bottom:24px;">A license key will be sent to <strong style="color:#e5e5e5;">' + email + '</strong> after verification.<br>Includes a 6-month free trial.</p>' +
            '<button onclick="this.parentElement.remove();document.getElementById(\'downloadOverlay\').remove();" ' +
            'style="background:#DC0000;color:white;border:none;padding:12px 32px;border-radius:8px;cursor:pointer;font-size:16px;font-weight:600;">Close</button>';

        var overlay = document.createElement('div');
        overlay.id = 'downloadOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:10000;';

        document.body.appendChild(overlay);
        document.body.appendChild(msgDiv);
    }

    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add subtle glow on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
            header.style.borderBottomColor = 'rgba(255,255,255,0.1)';
        } else {
            header.style.boxShadow = 'none';
            header.style.borderBottomColor = 'rgba(255,255,255,0.06)';
        }

        lastScroll = currentScroll;
    });

    // ==================== CHECK FOR SUCCESS PARAMETER ====================
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showDownloadMessage('your email');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // ==================== WORKFLOW TOOLTIPS ====================
    const workflowSteps = document.querySelectorAll('.hoverable-step');
    const workflowTooltips = document.querySelectorAll('.workflow-tooltip');

    workflowSteps.forEach(step => {
        const stepNumber = step.getAttribute('data-step');
        const tooltip = document.querySelector(`.workflow-tooltip[data-tooltip="${stepNumber}"]`);

        if (tooltip) {
            step.addEventListener('mouseenter', function() {
                // Hide all other tooltips
                workflowTooltips.forEach(t => t.classList.remove('active'));

                // Position tooltip below the step
                const stepRect = step.getBoundingClientRect();
                const containerRect = step.closest('.workflow-steps-container').getBoundingClientRect();

                // Calculate position relative to container
                const leftPosition = stepRect.left - containerRect.left;
                tooltip.style.left = `${leftPosition}px`;

                // Show tooltip
                tooltip.classList.add('active');
            });

            step.addEventListener('mouseleave', function() {
                // Small delay before hiding to allow moving to tooltip
                setTimeout(() => {
                    if (!tooltip.matches(':hover')) {
                        tooltip.classList.remove('active');
                    }
                }, 100);
            });

            // Keep tooltip visible when hovering over it
            tooltip.addEventListener('mouseenter', function() {
                tooltip.classList.add('active');
            });

            tooltip.addEventListener('mouseleave', function() {
                tooltip.classList.remove('active');
            });
        }
    });

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and audience cards
    document.querySelectorAll('.feature-card, .audience-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // ==================== SCREENSHOT DARK/LIGHT TOGGLE ====================
    const themeBtns = document.querySelectorAll('.theme-btn');

    themeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var theme = this.getAttribute('data-theme');

            // Update active button
            themeBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            // Toggle screenshot visibility
            var darkImgs = document.querySelectorAll('.screenshot-dark');
            var lightImgs = document.querySelectorAll('.screenshot-light');

            if (theme === 'dark') {
                darkImgs.forEach(function(img) { img.style.display = ''; });
                lightImgs.forEach(function(img) { img.style.display = 'none'; });
            } else {
                darkImgs.forEach(function(img) { img.style.display = 'none'; });
                lightImgs.forEach(function(img) { img.style.display = ''; });
            }
        });
    });

    // ==================== LIGHTBOX FOR SCREENSHOTS ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Check if lightbox elements exist
    if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
        // Add zoom hint element
        var zoomHint = document.createElement('div');
        zoomHint.className = 'lightbox-zoom-hint';
        zoomHint.textContent = 'Click image to zoom in';
        lightbox.appendChild(zoomHint);

        // Add click event to all visible clickable screenshots (use event delegation)
        document.addEventListener('click', function(e) {
            var img = e.target.closest('.screenshot-clickable');
            if (img && img.style.display !== 'none') {
                e.preventDefault();
                lightbox.classList.add('active');
                lightbox.classList.remove('zoomed');
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            }
        });

        // Toggle zoom on image click
        lightboxImg.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.classList.toggle('zoomed');
        });

        // Close lightbox on X click
        lightboxClose.addEventListener('click', closeLightbox);

        // Close lightbox on background click (only when not zoomed, or clicking outside image when zoomed)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                if (lightbox.classList.contains('zoomed')) {
                    lightbox.classList.remove('zoomed');
                } else {
                    closeLightbox();
                }
            }
        });

        // Close lightbox on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                if (lightbox.classList.contains('zoomed')) {
                    lightbox.classList.remove('zoomed');
                } else {
                    closeLightbox();
                }
            }
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.classList.remove('zoomed');
            document.body.style.overflow = '';
        }
    }
});
