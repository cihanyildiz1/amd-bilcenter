/**
 * AMD Bilcenter AB - V2 JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            if (isVisible) {
                navLinks.style.display = 'none';
                mobileMenuToggle.innerHTML = '<i class="ph ph-list"></i>';
            } else {
                // Inline styles just for quick dropdown logic on mobile
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--white)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                
                mobileMenuToggle.innerHTML = '<i class="ph ph-x"></i>';
            }
        });
    }

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                    if(mobileMenuToggle) mobileMenuToggle.innerHTML = '<i class="ph ph-list"></i>';
                }

                // Scroll with offset for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active class
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // --- 3. Form Validation / Submission Simulation ---
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = feedbackForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Simulate sending state
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> SKICKAR...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            setTimeout(() => {
                // Success state
                btn.innerHTML = '<i class="ph-fill ph-check-circle"></i> TACK FÖR DIN FEEDBACK!';
                btn.style.backgroundColor = '#10B981'; // Green success color
                btn.style.color = '#FFFFFF';
                
                feedbackForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);

            }, 1000);
        });
    }
});
