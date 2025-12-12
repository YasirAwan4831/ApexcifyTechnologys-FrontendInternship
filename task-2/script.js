// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursor = document.querySelector(".cursor");

//  INITIALIZATION 
function initAllSections() {
    initNavigation();
    initCustomCursor();
    initAboutSection();
    initProjectsSection();
    initEducationSection();
    initExperienceSection();
    initSkillsSection();
    initServicesSection(); // Added this line
    initContactSection();
    initFooter();
    initTypingAnimation();
}

//  NAVIGATION 
function initNavigation() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default only for hash links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
                navbar.style.padding = '10px 0';
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
                navbar.style.padding = '15px 0';
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

//  CUSTOM CURSOR 
function initCustomCursor() {
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
        
        // Fix cursor z-index
        cursor.style.zIndex = '10000';
    }
}

//  TYPING ANIMATION 
function initTypingAnimation() {
    const title = document.querySelector('.home-title');
    if (title) {
        const originalText = title.textContent;
        let charIndex = 0;
        let isTyping = true;
        
        function typeWriter() {
            if (isTyping) {
                if (charIndex < originalText.length) {
                    title.textContent = originalText.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeWriter, 100);
                } else {
                    isTyping = false;
                    setTimeout(() => {
                        isTyping = true;
                        charIndex = 0;
                        title.textContent = '';
                        typeWriter();
                    }, 3000);
                }
            }
        }
        
        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }
}

//  ABOUT SECTION 
function initAboutSection() {
    const aboutSection = document.getElementById('about');
    const statItems = document.querySelectorAll('.stat-item');
    const contactItems = document.querySelectorAll('.contact-info .contact-item');
    
    if (!aboutSection) return;
    
    // Create intersection observer for about section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stat items with delay
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                // Animate contact items with delay
                contactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 150 + 600);
                });
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(aboutSection);
    
    // Set initial styles for animation
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add hover effect to about image
    const aboutImg = document.querySelector('.about-img');
    if (aboutImg) {
        aboutImg.addEventListener('mouseenter', () => {
            aboutImg.style.transform = 'scale(1.02)';
            aboutImg.style.boxShadow = '0 20px 50px rgba(46, 204, 113, 0.3)';
        });
        
        aboutImg.addEventListener('mouseleave', () => {
            aboutImg.style.transform = 'scale(1)';
            aboutImg.style.boxShadow = 'var(--shadow)';
        });
    }
}

//  PROJECTS SECTION 
function initProjectsSection() {
    const projectsSection = document.getElementById('projects');
    const projectCards = document.querySelectorAll('.project-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!projectsSection) return;
    
    // Array for additional projects (initially hidden)
    const additionalProjects = [
        {
            title: 'To-Do List App',
            description: 'A clean and interactive to-do list web application that allows users to add, edit, delete & mark tasks as completed. The UI is simple, responsive & optimized for fast performance.',
            tools: ['HTML', 'CSS', 'JavaScript', 'Local Storage', 'Responsive Design'],
            liveLink: 'https://github.com/YasirAwan4831/todo-list-js-app',
            githubLink: 'https://github.com/YasirAwan4831/todo-list-js-app',
            image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFSBUwsvETu9g/profile-treasury-image-shrink_800_800/B4DZk8lRNaHYAY-/0/1757658027582?e=1766178000&v=beta&t=UT3KUffHwcCPBm-fa4huQXpIzZxGKv12XjIxe_dwdek'
        },
        {
            title: 'YARIS AI Smart Chat Bot',
            description: 'An interactive AI-powered chatbot built with React & JavaScript, designed to manage tasks efficiently, deliver smart context-aware responses & enhance the overall user interaction experience.',
            tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Typescript', 'AI Intergration', 'API'],
            liveLink: 'https://github.com/YasirAwan4831/YARIS-AI-Smart-Chat-Bot',
            githubLink: 'https://github.com/YasirAwan4831/YARIS-AI-Smart-Chat-Bot',
            image: 'https://github.com/YasirAwan4831/YARIS-AI-Smart-Chat-Bot/blob/main/screenshort/ofter-login.jpeg?raw=true'
        },
        {
            title: 'Web Development Quiz App',
            description: 'An interactive quiz app with 300+ web-development MCQs, personalized login, timed questions and a secure anti-cheating system to improve learning.',
            tools: ['HTML', 'CSS', 'JavaScript', 'UX/UI', 'Responsive Design', 'Local Storage'],
            liveLink: 'https://yasirawan4831.github.io/webdev-quiz-app/',
            githubLink: 'https://github.com/YasirAwan4831/webdev-quiz-app',
            image: 'https://github.com/YasirAwan4831/webdev-quiz-app/blob/main/docu/images/login_flow.jpg?raw=true'
        },
        {
            title: 'Modern Login & Signup System',
            description: 'A responsive login/signup interface built with HTML, CSS, and JavaScript, featuring smooth animations, form validation and a secure, user-friendly layout for web authentication.',
            tools: ['HTML', 'CSS', 'JavaScript', 'UX/UI', 'Responsive Design', 'Form Validation'],
            liveLink: 'https://github.com/YasirAwan4831/modern-login-singup-page/blob/main/README.md',
            githubLink: 'https://github.com/YasirAwan4831/modern-login-singup-page',
            image: 'https://media.licdn.com/dms/image/v2/D4D2DAQEt_iGVrVjbeg/profile-treasury-image-shrink_800_800/B4DZlRJ4IOG8AY-/0/1758003168448?e=1766178000&v=beta&t=Euu1jtW5zq37JYqsmBXL-KJA4FUhEYvu7cjFdWFSl7w'
        },
        {
            title: 'Final Year Diploma Web Project',
            description: 'A multi-page web application built as a FYP, featuring a structured UI, dynamic content, animations, a responsive layout & modules highlighting key front-end skills.',
            tools: ['HTML', 'CSS', 'JavaScript', 'UX/UI', 'Animations', 'DOM Manipulation'],
            liveLink: 'https://github.com/YasirAwan4831/Final-Year-Diploma-Web-Project/blob/main/README.md',
            githubLink: 'https://github.com/YasirAwan4831/Final-Year-Diploma-Web-Project',
            image: './assets/project/FYP-1.jpeg'
        },
        {
            title: 'Marketing Agency Website (WordPress)',
            description: 'A WordPress-based marketing agency website featuring service pages, a portfolio section, contact forms, optimized UI/UX, mobile responsiveness and an SEO-friendly layout.',
            tools: ['WordPress', 'Elementor', 'Themes', 'SEO', 'Design', 'Content Management'],
            liveLink: 'https://yasirawaninfo.lovestoblog.com/',
            githubLink: 'https://github.com/YasirAwan4831',
            image: './assets/project/wpproject.jpeg'
        }
    ];
    
    // Create intersection observer for project cards animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each project card with animation
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });
    
    // Load more projects functionality - FIXED VERSION
    if (loadMoreBtn) {
        let projectsLoaded = 3; 
        let currentIndex = 0;
        
        loadMoreBtn.addEventListener('click', function() {
            const projectsGrid = document.querySelector('.projects-grid');
            
            // Add loading animation
            const originalText = this.innerHTML;
            this.innerHTML = 'Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
    
                for (let i = 0; i < 3; i++) {
                    if (currentIndex >= additionalProjects.length) {
                        break;
                    }
                    
                    const project = additionalProjects[currentIndex];
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    
                    projectCard.innerHTML = `
                        <div class="project-image">
                            <div class="img-container">
                                <img src="${project.image}" alt="${project.title}" class="project-photo">
                            </div>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-tools">
                                ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                            </div>
                            <div class="project-buttons">
                                <a href="${project.liveLink}" target="_blank" class="btn btn-live">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                                <a href="${project.githubLink}" target="_blank" class="btn btn-github">
                                    <i class="fab fa-github"></i> Source Code
                                </a>
                            </div>
                        </div>
                    `;
                    
                    // Add to grid
                    projectsGrid.appendChild(projectCard);
                    
                    // Animate new card
                    setTimeout(() => {
                        projectCard.style.opacity = '1';
                        projectCard.style.transform = 'translateY(0)';
                        observer.observe(projectCard);
                    }, i * 200);
                    
                    currentIndex++;
                    projectsLoaded++;
                }
                
                // Update button state
                this.disabled = false;
                
               
                if (currentIndex >= additionalProjects.length) {
                    this.innerHTML = 'No More Projects';
                    this.style.background = 'linear-gradient(135deg, #666, #555)';
                    this.style.cursor = 'default';
                    this.disabled = true;
                    
                    // Hide button after 3 seconds
                    setTimeout(() => {
                        this.style.opacity = '0';
                        this.style.pointerEvents = 'none';
                    }, 3000);
                } else {
                    this.innerHTML = originalText;
                }
                
            }, 800);
        });
    }
    
    // Add button hover effects
    const projectButtons = document.querySelectorAll('.btn-live, .btn-github');
    projectButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to project buttons
    const buttons = document.querySelectorAll('.project-buttons .btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
}

//  EDUCATION SECTION 
function initEducationSection() {
    const educationSection = document.getElementById('education');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!educationSection) return;
    
    // Create intersection observer for timeline items animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay to each item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 300);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each timeline item
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
    
    // Add hover effects to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(46, 204, 113, 0.3)';
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
            this.style.transform = 'translateX(0)';
        });
    });
}

//  EXPERIENCE SECTION 
function initExperienceSection() {
    const experienceSection = document.getElementById('experience');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    if (!experienceSection) return;
    
    // Create intersection observer for experience items animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay to each item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 300);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each experience item
    experienceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
    
    // Add hover effects to experience items
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add glow effect to date
            const date = this.querySelector('.experience-date');
            if (date) {
                date.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.5)';
                date.style.transform = 'scale(1.05)';
            }
            
            // Pulse animation for tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.animation = 'pulse 0.5s ease';
                    setTimeout(() => {
                        tag.style.animation = '';
                    }, 500);
                }, index * 100);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset date
            const date = this.querySelector('.experience-date');
            if (date) {
                date.style.boxShadow = '0 5px 20px rgba(46, 204, 113, 0.4)';
                date.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add CSS for animations
    if (!document.querySelector('#experience-animation')) {
        const style = document.createElement('style');
        style.id = 'experience-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

//  SKILLS SECTION 
function initSkillsSection() {
    const skillsSection = document.getElementById('skills');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (!skillsSection) return;
    
    // Set animation delays for each skill item
    skillItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover rotation effect
    skillItems.forEach(item => {
        const icon = item.querySelector('.skill-icon');
        
        item.addEventListener('mouseenter', () => {
            // Random rotation on hover
            const rotation = Math.random() * 20 - 10;
            if (icon) {
                icon.style.transform = `scale(1.3) rotate(${rotation}deg)`;
            }
            
            // Add pulse effect
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `float 8s ease-in-out infinite`;
                item.style.animationDelay = `${Math.random() * 2}s`;
            }, 100);
        });
        
        item.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add intersection observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach(item => {
                    item.style.animationPlayState = 'running';
                });
            } else {
                skillItems.forEach(item => {
                    item.style.animationPlayState = 'paused';
                });
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

//  SERVICES SECTION 
function initServicesSection() {

    const servicesSection = document.getElementById('service'); // CHANGED HERE
    
    if (!servicesSection) {
        console.error('Services section not found! Looking for #service');
        return;
    }
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    console.log('Found services section:', servicesSection);
    console.log('Found service cards:', serviceCards.length);
    
    // Fix text selection visibility
    const style = document.createElement('style');
    style.id = 'service-selection-fix';
    style.textContent = `
        /* Service text selection highlight */
        .service-card *::selection {
            background: rgba(46, 204, 113, 0.7) !important;
            color: #000 !important;
            text-shadow: none !important;
        }
        
        .service-card *::-moz-selection {
            background: rgba(46, 204, 113, 0.7) !important;
            color: #000 !important;
            text-shadow: none !important;
        }
        
        /* Remove any conflicting styles */
        .service-card {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
            opacity: 1 !important; /* Force visibility */
            transform: translateY(0) !important; /* Force position */
        }
        
        /* Show service cards immediately */
        .services-grid .service-card {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        }
    `;
    document.head.appendChild(style);
    
    // Force show service cards (emergency fix)
    serviceCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.display = 'block';
        card.style.transform = 'translateY(0)';
        
        // Make all text elements inside card selectable
        const textElements = card.querySelectorAll('h3, p, li, span, a');
        textElements.forEach(el => {
            el.style.userSelect = 'text';
            el.style.webkitUserSelect = 'text';
            el.style.mozUserSelect = 'text';
            el.style.msUserSelect = 'text';
            el.style.cursor = 'text';
            el.style.pointerEvents = 'auto';
        });
    });
    
    // Create intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    console.log('Service card animated:', index);
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each service card
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 200}ms`;
        observer.observe(card);
    });
    
    // Add button hover effects
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 
    const emergencyStyle = document.createElement('style');
    emergencyStyle.textContent = `
        /* EMERGENCY: Force show service cards */
        #service .service-card {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            transform: translateY(0) !important;
            animation: none !important;
        }
        
        /* Make sure grid is visible */
        .services-grid {
            display: grid !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        /* Debug borders to see elements */
        .service-card {
            border: 1px solid rgba(46, 204, 113, 0.3) !important;
        }
    `;
    document.head.appendChild(emergencyStyle);
    
    console.log('Services section initialized successfully');
}

//  CONTACT SECTION 
function initContactSection() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                
                // Hide status after 5 seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.className = 'form-status';
                        formStatus.textContent = '';
                    }
                }, 5000);
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form status function
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            
            // Scroll to status
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Add hover effects to social links
    socialLinks.forEach(link => {
        // Add ripple effect on click (WITHOUT preventing default)
        link.addEventListener('click', function(e) {
            
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show platform name in console
            const platform = this.querySelector('span').textContent;
            console.log(`Opening ${platform}...`);
            
          
            const href = this.getAttribute('href');
            if (href.startsWith('mailto:')) {
                return;
            }
            
        
            if (!this.getAttribute('target')) {
                this.setAttribute('target', '_blank');
            }
        });
        
        // Hover effects
        link.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Fix for social links to open properly */
            .social-link {
                position: relative;
                overflow: hidden;
                cursor: pointer;
            }
            
            .social-link a {
                position: relative;
                z-index: 10;
            }
        `;
        document.head.appendChild(style);
    }
}

//  FOOTER 
function initFooter() {
    const footer = document.querySelector('.footer');
    
    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: #000;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to scroll button
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
        scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.5)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
        scrollToTopBtn.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    });
}

//  EVENT LISTENERS 
document.addEventListener('DOMContentLoaded', () => {
    initAllSections();
});

//  INITIALIZATION 
function initAllSections() {
    initNavigation();
    initCustomCursor();
    initAboutSection();
    initProjectsSection();
    initEducationSection();
    initExperienceSection();
    initSkillsSection();
    initServicesSection();
    initContactSection();
    initFooter();
    initTypingAnimation();
}


//  GLOBAL EXPORTS 
window.initAllSections = initAllSections;
window.initAboutSection = initAboutSection;
window.initProjectsSection = initProjectsSection;
window.initEducationSection = initEducationSection;
window.initExperienceSection = initExperienceSection;
window.initSkillsSection = initSkillsSection;
window.initServicesSection = initServicesSection;
window.initContactSection = initContactSection;
window.initFooter = initFooter;

