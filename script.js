/**
 * Tire Pressure Predictor - Landing Page JavaScript
 * Form validation, smooth scroll, mobile menu
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

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

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

    // ==================== DOWNLOAD BUTTON ====================
    const downloadBtn = document.getElementById('downloadBtn');
    const DOWNLOAD_URL = 'https://github.com/lucavilla91/TirePressurePredictor/releases/download/v2.5.3/Tire.Pressure.Predictor.Setup.2.5.3.exe';

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const emailField = document.getElementById('email');
            const emailValue = emailField.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate email
            if (!emailValue) {
                alert('Please enter your email address to download the app.');
                emailField.focus();
                emailField.style.borderColor = '#DC0000';
                return;
            }

            if (!emailRegex.test(emailValue)) {
                alert('Please enter a valid email address.');
                emailField.focus();
                emailField.style.borderColor = '#DC0000';
                return;
            }

            // Clear error styling
            emailField.style.borderColor = '';

            // Get optional fields
            const nameField = document.getElementById('name');
            const orgField = document.getElementById('organization');

            // Send license request to Supabase Edge Function
            const requestData = {
                email: emailValue,
                name: nameField ? nameField.value : '',
                organization: orgField ? orgField.value : ''
            };

            fetch('https://ivvxbkpkefryyiiqqbxt.supabase.co/functions/v1/hyper-responder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            }).catch(err => console.log('License request error:', err));

            // Start download - open GitHub release URL directly
            window.open(DOWNLOAD_URL, '_blank');

            // Show confirmation
            showDownloadMessage(emailValue);
        });
    }

    function showDownloadMessage(email) {
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 10001;
            max-width: 450px;
        `;

        msgDiv.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" style="margin-bottom: 20px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <h3 style="font-size: 24px; color: #1a202c; margin-bottom: 12px;">Download Started!</h3>
            <p style="color: #4a5568; margin-bottom: 16px;">Your download should begin automatically.</p>
            <p style="color: #718096; font-size: 14px; margin-bottom: 24px;">A license key will be sent to <strong>${email}</strong> after verification.</p>
            <button onclick="this.parentElement.remove(); document.getElementById('downloadOverlay').remove();"
                style="background: #DC0000; color: white; border: none; padding: 12px 32px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;">
                Close
            </button>
        `;

        const overlay = document.createElement('div');
        overlay.id = 'downloadOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(msgDiv);
    }

    // ==================== FORM VALIDATION ====================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const errors = [];

            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            // Clear previous error styles
            [nameField, emailField, messageField].forEach(field => {
                field.style.borderColor = '';
            });

            // Validate name
            if (!nameField.value.trim()) {
                isValid = false;
                errors.push('Please enter your name');
                nameField.style.borderColor = '#DC0000';
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim()) {
                isValid = false;
                errors.push('Please enter your email');
                emailField.style.borderColor = '#DC0000';
            } else if (!emailRegex.test(emailField.value)) {
                isValid = false;
                errors.push('Please enter a valid email address');
                emailField.style.borderColor = '#DC0000';
            }

            // Validate message
            if (!messageField.value.trim()) {
                isValid = false;
                errors.push('Please enter a message');
                messageField.style.borderColor = '#DC0000';
            }

            // Show errors or submit
            if (!isValid) {
                e.preventDefault();
                alert('Please correct the following errors:\n\n' + errors.join('\n'));
            }
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                // Remove error styling when user starts typing
                this.style.borderColor = '';
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();

        if (field.hasAttribute('required') && !value) {
            field.style.borderColor = '#DC0000';
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#DC0000';
                return false;
            }
        }

        field.style.borderColor = '';
        return true;
    }

    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ==================== CHECK FOR SUCCESS PARAMETER ====================
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Show success message
        showSuccessMessage();
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 10001;
            max-width: 400px;
        `;

        successDiv.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" style="margin-bottom: 20px;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3 style="font-size: 24px; color: #1a202c; margin-bottom: 12px;">Thank You!</h3>
            <p style="color: #4a5568; margin-bottom: 24px;">Your demo request has been received. We'll be in touch soon.</p>
            <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();"
                style="background: #DC0000; color: white; border: none; padding: 12px 32px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;">
                Close
            </button>
        `;

        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(successDiv);
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

    // ==================== LIGHTBOX FOR SCREENSHOTS ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Check if lightbox elements exist
    if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
        console.log('[Lightbox] Initialized successfully');

        // Add click event to all clickable screenshots
        const screenshots = document.querySelectorAll('.screenshot-clickable');
        console.log('[Lightbox] Found', screenshots.length, 'clickable screenshots');

        screenshots.forEach((img, index) => {
            console.log('[Lightbox] Adding click handler to screenshot', index + 1);
            img.addEventListener('click', function(e) {
                console.log('[Lightbox] Screenshot clicked!', this.src);
                e.preventDefault();
                lightbox.classList.add('active');
                lightboxImg.src = this.src;
                lightboxCaption.textContent = this.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox on X click
        lightboxClose.addEventListener('click', closeLightbox);

        // Close lightbox on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close lightbox on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            console.log('[Lightbox] Closing');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    } else {
        console.error('[Lightbox] ERROR: Missing lightbox elements!');
        console.error('lightbox:', lightbox);
        console.error('lightboxImg:', lightboxImg);
        console.error('lightboxCaption:', lightboxCaption);
        console.error('lightboxClose:', lightboxClose);
    }
});
