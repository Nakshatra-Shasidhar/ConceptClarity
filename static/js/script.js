class AdvancedUI {
    constructor() {
        this.init();
    }
    init() {
        this.setupFormInteractions();
        this.setupButtonEffects();
        this.setupParallaxEffects();
        this.setup3DTilt();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        this.initializeTheme();
        this.setupIntersectionObserver();
    }
    initializeTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, observerOptions);
        document.querySelectorAll('.query-card, .result-card, .floating-orb').forEach(el => {
            observer.observe(el);
        });
    }
    setupFormInteractions() {
        const form = document.getElementById('queryForm');
        const input = document.getElementById('query');
        const submitBtn = document.getElementById('submitBtn');
        if (!form || !input || !submitBtn) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!input.value.trim()) {
                this.shakeElement(form);
                return;
            }
            this.showLoadingState(submitBtn);

            // Simulate processing
            setTimeout(() => {
                const resultCard = document.getElementById('resultCard');
                if (resultCard) {
                    resultCard.style.display = 'block';
                    // Trigger animation
                    resultCard.classList.remove('animate-in');
                    void resultCard.offsetWidth; // Trigger reflow
                    resultCard.classList.add('animate-in');
                    
                    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Reset button
                submitBtn.innerHTML = '<span class="btn-text">Analyze Query</span><span class="btn-icon">→</span><div class="btn-ripple"></div>';
                submitBtn.classList.remove('loading');
                submitBtn.style.pointerEvents = '';
            }, 1500);
        });
        input.addEventListener('input', (e) => {
            this.handleInputChange(e.target);
        });
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    }
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.submit-btn, .action-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            button.addEventListener('mouseenter', () => {
                this.enhance3DHover(button);
            });
            button.addEventListener('mouseleave', () => {
                this.reset3DHover(button);
            });
        });
    }
    setupParallaxEffects() {
        const floatingOrbs = document.querySelectorAll('.floating-orb');
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const moveX = (clientX - centerX) * 0.01;
                const moveY = (clientY - centerY) * 0.01;
                floatingOrbs.forEach((orb, index) => {
                    const multiplier = (index + 1) * 0.2;
                    orb.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px)`;
                });
            });
        });
    }
    setup3DTilt() {
        const cards = document.querySelectorAll('.query-card, .result-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
    createRippleEffect(e, button) {
        const ripple = document.createElement('div');
        ripple.classList.add('btn-ripple');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        const existingRipple = button.querySelector('.btn-ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        button.appendChild(ripple);
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    showLoadingState(button) {
        const width = button.offsetWidth;
        button.style.width = `${width}px`;
        button.innerHTML = '<div class="spinner"></div>';
        button.classList.add('loading');
        button.style.pointerEvents = 'none';
    }
    shakeElement(element) {
        element.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }
    handleInputChange(input) {
        const label = input.closest('.input-group').querySelector('.input-label');
        if (input.value.trim().length > 0) {
            input.classList.add('has-content');
            if(label) label.style.color = 'var(--primary-color)';
        } else {
            input.classList.remove('has-content');
            if(label) label.style.color = '';
        }
    }
    enhance3DHover(element) {
        element.style.transform = 'translateY(-2px) translateZ(10px)';
    }
    reset3DHover(element) {
        element.style.transform = '';
    }
    setupPerformanceOptimizations() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
            }, 250);
        });
        this.optimizeForDevice();
    }
    optimizeForDevice() {
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
        if (isLowEndDevice) {
            document.body.classList.add('low-end-device');
        }
    }
    setupAccessibility() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedUI();
});
window.copyResult = function() {
    const text = document.querySelector('.result-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('button[onclick="copyResult()"] span');
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    });
};
window.shareResult = function() {
    if (navigator.share) {
        navigator.share({
            title: 'ConceptClarity Analysis',
            text: document.querySelector('.result-text').innerText,
            url: window.location.href
        }).catch(console.error);
    } else {
        copyResult();
        showNotification('Result copied for sharing!', 'info');
    }
};
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        color: var(--text-primary);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(20px);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
window.addEventListener('error', (e) => {
    console.error('UI Error:', e.error);
    showNotification('Something went wrong. Please try again.', 'error');
});
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData && perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                document.body.classList.add('slow-connection');
            }
        }, 0);
    });
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/js/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
const additionalStyles = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    .low-end-device .floating-orb,
    .low-end-device .background-animation {
        display: none;
    }
    .low-end-device * {
        animation: none !important;
        transition-duration: 0.1s !important;
    }
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    .has-content .input-label {
        color: var(--primary-color);
        transform: translateY(-2px);
    }
    .notification {
        font-weight: 500;
        font-size: 0.9rem;
    }
    .notification-success {
        border-left: 4px solid var(--accent-color);
    }
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    .notification-error {
        border-left: 4px solid var(--secondary-color);
    }
    .query-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
        border-radius: 24px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .query-card:hover::before {
        opacity: 1;
    }
    .result-card::after {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        background: var(--gradient-1);
        border-radius: 25px;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .result-card:hover::after {
        opacity: 0.3;
    }
    .submit-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
    }
    .submit-btn:hover::before {
        left: 100%;
    }
    .loading .submit-btn {
        pointer-events: none;
        opacity: 0.8;
    }
    .loading .submit-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
