// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');

    // A11y state
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('no-scroll', isOpen);

    // Animate hamburger
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.transform = isOpen
            ? `rotate(${index === 0 ? 45 : index === 2 ? -45 : 0}deg) translate(${index === 1 ? '100px' : '0'}, ${index === 0 ? '6px' : index === 2 ? '-6px' : '0'})`
            : 'none';
        bar.style.opacity = isOpen && index === 1 ? '0' : '1';
    });
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animated counters for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
            
            // Add animation classes
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
            
            if (entry.target.classList.contains('advantage-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-30px)';
                entry.target.style.transition = 'all 0.6s ease';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-number, .feature-card, .advantage-card').forEach(el => {
    observer.observe(el);
});

// Typewriter effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blinking cursor handled purely by CSS (cursor-blink)
        }
    }
    type();
}

// Initialize typewriter effect
window.addEventListener('load', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = 'Endless Possibilities';
        if (prefersReducedMotion) {
            typewriterElement.textContent = text;
        } else {
            // Remove any existing content and start typing
            setTimeout(() => {
                typeWriter(typewriterElement, text, 150);
            }, 1000);
        }
    }
});

// Demo chat animation
function animateDemo() {
    const demoChat = document.querySelector('.demo-chat');
    const typingMessage = document.querySelector('.demo-message.ai.typing');
    
    if (!demoChat || !typingMessage) return;
    
    setTimeout(() => {
        typingMessage.innerHTML = `
            <span style="background: #f8fafc; color: #1f2937; padding: 0.75rem 1rem; border-radius: 20px; border-bottom-left-radius: 5px; display: inline-block; border: 1px solid #e5e7eb;">
                I'd be happy to help you explore our pricing options! We offer flexible plans for businesses of all sizes, from startups to enterprise. Would you like me to show you our most popular plan or do you have specific requirements in mind?
            </span>
        `;
        
        // Add more messages after delay
        setTimeout(() => {
            const newMessage = document.createElement('div');
            newMessage.className = 'demo-message user';
            newMessage.innerHTML = '<span>That sounds great! What\'s included in the startup plan?</span>';
            demoChat.appendChild(newMessage);
            
            setTimeout(() => {
                const aiResponse = document.createElement('div');
                aiResponse.className = 'demo-message ai';
                aiResponse.innerHTML = `
                    <span style="background: #f8fafc; color: #1f2937; padding: 0.75rem 1rem; border-radius: 20px; border-bottom-left-radius: 5px; display: inline-block; border: 1px solid #e5e7eb;">
                        Our startup plan includes up to 1,000 conversations per month, web chat integration, basic analytics, and email support. It's perfect for growing businesses looking to enhance customer engagement!
                    </span>
                `;
                demoChat.appendChild(aiResponse);
            }, 1500);
        }, 2000);
    }, 3000);
}

// Start demo animation when section comes into view
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateDemo();
            demoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const demoSection = document.querySelector('.demo');
if (demoSection) {
    demoObserver.observe(demoSection);
}

// Button click handlers
document.querySelectorAll('#demo-btn, #main-demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Simulate demo launch
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Demo...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-play"></i> Try Demo';
            btn.disabled = false;
            
            // Show demo modal or redirect
            alert('Demo would launch here! This is a demonstration of the AI assistant interface.');
        }, 2000);
    });
});

document.querySelectorAll('#beta-btn, #main-beta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Simulate beta signup
        const email = prompt('Enter your email to join the beta program:');
        if (email && email.includes('@')) {
            btn.innerHTML = '<i class="fas fa-check"></i> Joined Beta!';
            btn.style.background = '#10b981';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-rocket"></i> Join Beta';
                btn.style.background = '';
            }, 3000);
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    });
});

// Parallax effect for hero background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-circle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, { passive: true });

// Add loading animation to feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Interactive hover effects for floating cards
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced neural network animation
function createNeuralConnections() {
    const brainCore = document.querySelector('.brain-core');
    const neurons = document.querySelectorAll('.neuron');
    
    if (!brainCore || neurons.length === 0) return;
    
    neurons.forEach((neuron, index) => {
        // Create connection lines
        const connection = document.createElement('div');
        connection.style.position = 'absolute';
        connection.style.height = '2px';
        connection.style.background = 'rgba(255, 255, 255, 0.3)';
        connection.style.transformOrigin = 'left center';
        connection.style.opacity = '0';
        connection.style.transition = 'opacity 0.5s ease';
        
        // Calculate connection to center
        const rect = neuron.getBoundingClientRect();
        const brainRect = brainCore.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(rect.left - brainRect.left, 2) + 
            Math.pow(rect.top - brainRect.top, 2)
        );
        
        connection.style.width = distance + 'px';
        brainCore.appendChild(connection);
        
        // Animate connections
        setInterval(() => {
            connection.style.opacity = Math.random() > 0.5 ? '0.6' : '0';
        }, 1000 + (index * 500));
    });
}

// Initialize neural connections
setTimeout(createNeuralConnections, 1000);

// Dynamic particle system for CTA section
function createParticles() {
    const particleContainer = document.querySelector('.cta-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animation = 'float-particle 15s infinite linear';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Advanced scroll animations
const scrollAnimations = {
    fadeInUp: (elements) => {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
        });
    },
    
    slideInLeft: (elements) => {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
        });
    }
};

// Apply scroll animations
window.addEventListener('load', () => {
    scrollAnimations.fadeInUp(document.querySelectorAll('.overview-text > *, .demo-text > *'));
    scrollAnimations.slideInLeft(document.querySelectorAll('.advantage-card'));
});

// Interactive demo window
function enhanceDemoWindow() {
    const demoWindow = document.querySelector('.demo-window');
    if (!demoWindow) return;
    
    // Add resize cursor to window
    demoWindow.style.cursor = 'default';
    
    // Add interactive controls
    const controls = document.querySelectorAll('.control');
    controls.forEach((control, index) => {
        control.style.cursor = 'pointer';
        control.addEventListener('click', () => {
            if (index === 0) { // Red - close
                demoWindow.style.transform = 'scale(0.8)';
                demoWindow.style.opacity = '0.5';
                setTimeout(() => {
                    demoWindow.style.transform = 'scale(1)';
                    demoWindow.style.opacity = '1';
                }, 500);
            } else if (index === 1) { // Yellow - minimize
                demoWindow.style.transform = 'scaleY(0.1)';
                setTimeout(() => {
                    demoWindow.style.transform = 'scaleY(1)';
                }, 500);
            } else { // Green - maximize
                demoWindow.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    demoWindow.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
}

enhanceDemoWindow();

// Dynamic typing effect for demo
function enhanceTypingEffect() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (!typingIndicator) return;
    
    const spans = typingIndicator.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.addEventListener('animationiteration', () => {
            // Change color occasionally
            if (Math.random() > 0.8) {
                span.style.background = ['#6366f1', '#f59e0b', '#06b6d4'][Math.floor(Math.random() * 3)];
                setTimeout(() => {
                    span.style.background = '#6366f1';
                }, 500);
            }
        });
    });
}

enhanceTypingEffect();

// Performance optimization - Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized parallax effect
const optimizedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-circle');
    
    requestAnimationFrame(() => {
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
    });
}, 10);

if (!prefersReducedMotion) {
    window.addEventListener('scroll', optimizedParallax, { passive: true });
}

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
    
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'translateY(0) scale(0.98)';
    });
    
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'translateY(-2px) scale(1)';
    });
});

// Feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    const icon = card.querySelector('.feature-icon');
    
    card.addEventListener('mouseenter', () => {
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add subtle animations to advantage numbers
document.querySelectorAll('.advantage-number').forEach(number => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(number);
});

// Social media links hover effects
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
        link.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
        link.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Initialize all animations on page load
window.addEventListener('load', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Start hero animations
    setTimeout(() => {
        document.querySelectorAll('.hero-text > *').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Error handling for missing elements
const requiredElements = ['.navbar', '.hero', '.features', '.cta'];
requiredElements.forEach(selector => {
    if (!document.querySelector(selector)) {
        console.warn(`Required element ${selector} not found`);
    }
});

console.log('AI Assistant Landing Page JavaScript loaded successfully!');