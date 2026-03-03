// Services Data
const servicesData = {
    hair: [
        {
            name: "Hair Cut & Styling",
            price: "$45",
            description: "Professional haircut with personalized styling to suit your face shape and lifestyle.",
            duration: "60 mins",
            details: "Includes consultation, wash, cut, style, and finishing products. Our expert stylists will work with you to create the perfect look that complements your features and personal style."
        },
        {
            name: "Hair Color & Highlights",
            price: "$80",
            description: "Premium hair coloring services including full color, highlights, and balayage techniques.",
            duration: "120 mins",
            details: "Using top-quality color products, we offer full hair coloring, partial/full highlights, balayage, and color correction services. Includes color consultation and aftercare advice."
        },
        {
            name: "Hair Treatment & Spa",
            price: "$60",
            description: "Deep conditioning treatments to restore hair health and shine.",
            duration: "90 mins",
            details: "Intensive hair treatment including deep conditioning masks, protein treatments, and scalp massage. Perfect for damaged, dry, or chemically treated hair."
        },
        {
            name: "Bridal Hair Styling",
            price: "$120",
            description: "Elegant bridal hairstyles with trial session included.",
            duration: "150 mins",
            details: "Complete bridal hair package including consultation, trial styling session, and wedding day styling. Includes hair accessories and long-lasting finish."
        }
    ],
    facial: [
        {
            name: "Classic Facial",
            price: "$60",
            description: "Deep cleansing facial suitable for all skin types with relaxing massage.",
            duration: "75 mins",
            details: "Includes skin analysis, cleansing, exfoliation, extraction, face mask, moisturizing, and relaxing facial massage. Perfect for maintaining healthy, glowing skin."
        },
        {
            name: "Anti-Aging Facial",
            price: "$90",
            description: "Advanced anti-aging treatment with premium serums and techniques.",
            duration: "90 mins",
            details: "Specialized treatment targeting fine lines, wrinkles, and age spots using advanced techniques and premium anti-aging products. Includes collagen mask and lifting massage."
        },
        {
            name: "Acne Treatment",
            price: "$75",
            description: "Specialized treatment for acne-prone skin with deep pore cleansing.",
            duration: "85 mins",
            details: "Targeted treatment for acne and problematic skin including deep cleansing, professional extraction, antibacterial treatment, and healing mask."
        },
        {
            name: "Hydrating Facial",
            price: "$70",
            description: "Intensive hydration treatment for dry and dehydrated skin.",
            duration: "80 mins",
            details: "Deep hydrating treatment with hyaluronic acid serums, moisture masks, and intensive moisturizing techniques to restore skin's natural moisture balance."
        }
    ],
    makeup: [
        {
            name: "Special Occasion Makeup",
            price: "$50",
            description: "Professional makeup for parties, events, and special occasions.",
            duration: "60 mins",
            details: "Complete makeup application for special events including base makeup, eye makeup, contouring, and lip color. Long-lasting formula ensures you look perfect all day."
        },
        {
            name: "Bridal Makeup",
            price: "$100",
            description: "Complete bridal makeup package with trial session.",
            duration: "120 mins",
            details: "Comprehensive bridal makeup including trial session, wedding day application, touch-up kit, and assistant for the wedding day. Waterproof and long-lasting formulas."
        },
        {
            name: "Makeup Lesson",
            price: "$80",
            description: "Personal makeup tutorial to learn techniques for everyday beauty.",
            duration: "90 mins",
            details: "One-on-one makeup lesson where you learn professional techniques, product recommendations, and tips for everyday makeup application suited to your features."
        },
        {
            name: "Photoshoot Makeup",
            price: "$75",
            description: "Professional makeup specifically designed for photography and video.",
            duration: "75 mins",
            details: "Specialized makeup application for photography, considering lighting and camera requirements. Includes contouring, highlighting, and camera-ready finish."
        }
    ],
    nails: [
        {
            name: "Classic Manicure",
            price: "$25",
            description: "Traditional manicure with nail shaping, cuticle care, and polish.",
            duration: "45 mins",
            details: "Complete nail care including nail shaping, cuticle treatment, hand massage, base coat, color application, and top coat for long-lasting results."
        },
        {
            name: "Gel Manicure",
            price: "$40",
            description: "Long-lasting gel polish manicure that stays perfect for weeks.",
            duration: "60 mins",
            details: "Durable gel polish application with UV curing for chip-resistant, glossy finish lasting 2-3 weeks. Includes nail prep, base coat, color, and top coat."
        },
        {
            name: "Nail Art Design",
            price: "$55",
            description: "Creative nail art with custom designs and decorative elements.",
            duration: "75 mins",
            details: "Custom nail art creation including hand-painted designs, rhinestones, glitter, and other decorative elements. Each nail is a work of art tailored to your style."
        },
        {
            name: "Pedicure Deluxe",
            price: "$45",
            description: "Luxurious pedicure with foot spa treatment and massage.",
            duration: "70 mins",
            details: "Complete foot care including foot soak, exfoliation, callus removal, nail care, relaxing foot and leg massage, and polish application for beautiful, soft feet."
        }
    ]
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const servicesContainer = document.getElementById('services-container');
const modal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');
const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setMinDate();
    observeElements();
});

function initializeWebsite() {
    // Load initial services (hair)
    displayServices('hair');
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            switchCategory(category);
        });
    });
    
    // Modal close
    closeModal.addEventListener('click', closeServiceModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeServiceModal();
        }
    });
    
    // Forms
    bookingForm.addEventListener('submit', handleBookingSubmit);
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function switchCategory(category) {
    // Update active button
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Display services
    displayServices(category);
}

function displayServices(category) {
    const services = servicesData[category];
    servicesContainer.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesContainer.appendChild(serviceCard);
    });
    
    // Add fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in', 'visible');
            }, index * 100);
        });
    }, 50);
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.classList.add('service-card', 'fade-in');
    
    card.innerHTML = `
        <i class="fas fa-spa"></i>
        <h4>${service.name}</h4>
        <div class="price">${service.price}</div>
        <p>${service.description}</p>
        <button class="btn btn-primary" onclick="openServiceModal('${service.name}')">View Details</button>
    `;
    
    return card;
}

function openServiceModal(serviceName) {
    // Find service in all categories
    let service = null;
    for (const category in servicesData) {
        service = servicesData[category].find(s => s.name === serviceName);
        if (service) break;
    }
    
    if (service) {
        modalBody.innerHTML = `
            <h2>${service.name}</h2>
            <div class="service-details">
                <div class="detail-item">
                    <strong>Price:</strong> ${service.price}
                </div>
                <div class="detail-item">
                    <strong>Duration:</strong> ${service.duration}
                </div>
                <div class="detail-item">
                    <strong>Description:</strong>
                    <p>${service.details}</p>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="bookAppointment('${service.name}')">Book This Service</button>
                <button class="btn btn-secondary" onclick="closeServiceModal()">Close</button>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function bookAppointment(serviceName) {
    // Close modal
    closeServiceModal();
    
    // Scroll to appointment section
    document.getElementById('appointment').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Pre-select the service
    setTimeout(() => {
        const serviceSelect = document.getElementById('service');
        for (let option of serviceSelect.options) {
            if (option.text.includes(serviceName)) {
                option.selected = true;
                break;
            }
        }
    }, 500);
}

function setMinDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const appointmentData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateBookingForm(appointmentData)) {
        return;
    }
    
    // Simulate booking process
    showNotification('Processing your appointment request...', 'info');
    
    setTimeout(() => {
        // Simulate successful booking
        showNotification('Appointment booked successfully! We will contact you shortly to confirm.', 'success');
        bookingForm.reset();
        setMinDate(); // Reset min date
    }, 2000);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contactData = Object.fromEntries(formData);
    
    // Simulate sending message
    showNotification('Sending your message...', 'info');
    
    setTimeout(() => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
    }, 1500);
}

function validateBookingForm(data) {
    if (!data.fullName || !data.phone || !data.email || !data.service || !data.date || !data.time) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Validate date (not in the past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date.', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function setupSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function observeElements() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to elements
    setTimeout(() => {
        document.querySelectorAll('.about-text, .feature').forEach((el, index) => {
            el.classList.add('fade-in');
            setTimeout(() => observer.observe(el), index * 200);
        });
        
        document.querySelectorAll('.offer-card').forEach((el, index) => {
            el.classList.add('slide-in-left');
            setTimeout(() => observer.observe(el), index * 300);
        });
    }, 500);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Add loading effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.type === 'submit') {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Preload service icons based on category
function updateServiceIcons() {
    const iconMap = {
        hair: 'fa-cut',
        facial: 'fa-spa',
        makeup: 'fa-paint-brush',
        nails: 'fa-hand-sparkles'
    };
    
    document.querySelectorAll('.service-card i').forEach(icon => {
        const category = document.querySelector('.category-btn.active').dataset.category;
        icon.className = `fas ${iconMap[category] || 'fa-spa'}`;
    });
}

// Update icons when category changes
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(updateServiceIcons, 100);
    });
});

// Initialize icons
setTimeout(updateServiceIcons, 500);

// Add hover effects to cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.service-card')) {
        e.target.closest('.service-card').style.transform = 'translateY(-5px)';
    }
    if (e.target.closest('.offer-card')) {
        e.target.closest('.offer-card').style.transform = 'translateY(-10px)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.service-card')) {
        e.target.closest('.service-card').style.transform = 'translateY(0)';
    }
    if (e.target.closest('.offer-card:not(.featured)')) {
        e.target.closest('.offer-card').style.transform = 'translateY(0)';
    }
});

// Modal open/close
document.querySelector('.open-modal-btn').addEventListener('click', () => {
  document.getElementById('appointmentModal').style.display = 'flex';
});
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('appointmentModal').style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target.id === 'appointmentModal') {
    document.getElementById('appointmentModal').style.display = 'none';
  }
});

// Load subservices
document.getElementById('service').addEventListener('change', async function () {
  const service = this.value;
  const subserviceContainer = document.getElementById('subservice-container');
  const checkboxContainer = document.getElementById('subservice-checkboxes');

  if (!service) {
    subserviceContainer.style.display = 'none';
    checkboxContainer.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`/api/services/${service}/subservices`);
    if (!response.ok) throw new Error('Failed to fetch subservices');

    const subservices = await response.json();
    checkboxContainer.innerHTML = '';

    subservices.forEach(sub => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('checkbox-wrapper');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `sub-${sub.id}`;
      checkbox.name = 'subservices';
      checkbox.value = sub.name;

      const label = document.createElement('label');
      label.setAttribute('for', `sub-${sub.id}`);
      label.textContent = sub.name;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      checkboxContainer.appendChild(wrapper);
    });

    subserviceContainer.style.display = 'block';
  } catch (error) {
    console.error(error);
    subserviceContainer.style.display = 'none';
  }
});

// Form submit handler
document.getElementById("appointment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedServices = [];
  document.querySelectorAll('input[name="subservices"]:checked').forEach(cb => {
    selectedServices.push(cb.value);
  });

  localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
  window.location.href = "payment.html";
});

// Gallery functionality
        let visibleItems = 9; // Initially show 9 items (3 rows of 3)
        const itemsPerLoad = 6; // Load 6 more items each time
        
        // Load More functionality
        function loadMoreImages() {
            const galleryItems = document.querySelectorAll('.gallery-item.hidden');
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            
            // Show next batch of hidden items
            for (let i = 0; i < Math.min(itemsPerLoad, galleryItems.length); i++) {
                galleryItems[i].classList.remove('hidden');
                galleryItems[i].classList.add('visible');
            }
            
            // Hide load more button if no more items
            const remainingHidden = document.querySelectorAll('.gallery-item.hidden');
            if (remainingHidden.length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        //gallery 
  const scrollWrapper = document.querySelector('.scroll-wrapper');

  setInterval(() => {
    scrollWrapper.scrollBy({
      left: 310,
      behavior: 'smooth'
    });

    if (
      scrollWrapper.scrollLeft + scrollWrapper.clientWidth >=
      scrollWrapper.scrollWidth
    ) {
      scrollWrapper.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 3000);

