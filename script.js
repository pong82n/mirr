/**
 * MIRR Construction & Engineering Services - Neumorphic Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSlideshow();
    initCounters();
    initEstimator();
    initPortfolioFilter();
    initBeforeAfterSlider();
    initForms();
});

/* -------------------------------------------------------------
 * 1. NAVIGATION & SCROLL TRACKING
 * ------------------------------------------------------------- */
function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const mainNav = document.getElementById('main-nav');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isOpened = !mobileMenu.classList.contains('hidden');
            menuIcon.className = isOpened ? 'fa-solid fa-xmark text-lg' : 'fa-solid fa-bars text-lg';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-lg';
            });
        });
    }

    // Header subtle elevation on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            mainNav.classList.add('shadow-lg');
        } else {
            mainNav.classList.remove('shadow-lg');
        }
        updateActiveNavSection();
    });
}

function updateActiveNavSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentId = '';

    const scrollY = window.pageYOffset + 220;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('text-amber-600', 'active');
            link.classList.remove('text-slate-700');
        } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('text-amber-600', 'active');
            link.classList.add('text-slate-700');
        }
    });
}

/* -------------------------------------------------------------
 * 1.5. AUTOMATED HERO BACKGROUND SLIDESHOW
 * ------------------------------------------------------------- */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.fixed-bg-slide, .hero-bg-slide');
    const dots = document.querySelectorAll('#hero-slide-dots .hero-slide-dot');
    const prevBtn = document.getElementById('hero-slide-prev');
    const nextBtn = document.getElementById('hero-slide-next');
    const playPauseBtn = document.getElementById('hero-slide-playpause');
    const playPauseIcon = document.getElementById('hero-playpause-icon');
    const captionEl = document.getElementById('hero-slide-caption');

    if (!slides.length) return;

    const captions = [
        '01 / 04 • High-Rise Commercial Hub & Structural Steel Frame',
        '02 / 04 • Heavy Foundation Works & Reinforced Substructure',
        '03 / 04 • Multi-Storey Framing & Precision Rebar Engineering',
        '04 / 04 • Modern Commercial Complex & Turnkey Facade Handover'
    ];

    let currentIndex = 0;
    let timer = null;
    let isPlaying = true;
    const intervalTime = 5000;

    function showSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (captionEl && captions[index]) {
            captionEl.style.opacity = '0';
            setTimeout(() => {
                captionEl.textContent = captions[index];
                captionEl.style.opacity = '1';
            }, 200);
        }

        currentIndex = index;
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            showSlide(currentIndex + 1);
        }, intervalTime);
        isPlaying = true;
        if (playPauseIcon) {
            playPauseIcon.className = 'fa-solid fa-pause text-[11px]';
        }
        if (playPauseBtn) {
            playPauseBtn.setAttribute('title', 'Pause Slideshow');
        }
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        isPlaying = false;
        if (playPauseIcon) {
            playPauseIcon.className = 'fa-solid fa-play text-[11px]';
        }
        if (playPauseBtn) {
            playPauseBtn.setAttribute('title', 'Resume Slideshow');
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            if (isPlaying) startTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            if (isPlaying) startTimer();
        });
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                stopTimer();
            } else {
                startTimer();
            }
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            if (isPlaying) startTimer();
        });
    });

    if (captionEl) {
        captionEl.style.transition = 'opacity 0.25s ease';
    }

    // Keyboard navigation (ArrowLeft / ArrowRight)
    window.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
        if (e.key === 'ArrowLeft') {
            showSlide(currentIndex - 1);
            if (isPlaying) startTimer();
        } else if (e.key === 'ArrowRight') {
            showSlide(currentIndex + 1);
            if (isPlaying) startTimer();
        }
    });

    // Start automated cycle
    startTimer();
}

/* -------------------------------------------------------------
 * 2. STAT COUNTERS
 * ------------------------------------------------------------- */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    let animated = false;

    function runCounters() {
        if (animated) return;
        const triggerPos = window.innerHeight * 0.9;

        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top <= triggerPos) {
                animated = true;
                const target = parseFloat(counter.getAttribute('data-counter'));
                const decimals = parseInt(counter.getAttribute('data-decimals') || 0);
                const suffix = counter.innerText.replace(/[0-9.]/g, '') || '+';
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 4);
                    const currentVal = (start + (target - start) * ease).toFixed(decimals);

                    counter.innerText = currentVal + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target.toFixed(decimals) + suffix;
                    }
                }
                requestAnimationFrame(update);
            }
        });
    }

    window.addEventListener('scroll', runCounters);
    runCounters();
}

/* -------------------------------------------------------------
 * 3. TACTILE NEUMORPHIC COST ESTIMATOR
 * ------------------------------------------------------------- */
let estimatorState = {
    baseRate: 12000, // PHP ₱ per sq ft
    typeName: 'Commercial Office',
    area: 15000,
    multiplier: 1.25,
    addons: 4200000 // LEED checked initially (₱4.2M)
};

function initEstimator() {
    const typeButtons = document.querySelectorAll('.estimator-type-btn');
    const areaSlider = document.getElementById('area-slider');
    const areaDisplay = document.getElementById('area-display');
    const qualityButtons = document.querySelectorAll('.quality-btn');
    const addonCheckboxes = document.querySelectorAll('.estimator-addon');

    // Construction Type Selector
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => {
                b.classList.remove('active');
                const icon = b.querySelector('i');
                if (icon) icon.className = icon.className.replace('text-amber-600', 'text-slate-500');
            });
            btn.classList.add('active');
            const activeIcon = btn.querySelector('i');
            if (activeIcon) activeIcon.className = activeIcon.className.replace('text-slate-500', 'text-amber-600');

            estimatorState.baseRate = parseFloat(btn.getAttribute('data-rate'));
            const nameEl = btn.querySelector('.font-bold');
            if (nameEl) estimatorState.typeName = nameEl.innerText;
            recalculateEstimate();
        });
    });

    // Area Range Slider
    if (areaSlider && areaDisplay) {
        areaSlider.addEventListener('input', (e) => {
            const sqft = parseInt(e.target.value);
            estimatorState.area = sqft;
            areaDisplay.innerText = Number(sqft).toLocaleString() + ' sq ft';
            recalculateEstimate();
        });
    }

    // Quality Spec Level
    qualityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            qualityButtons.forEach(b => {
                b.classList.remove('active');
                const heading = b.querySelector('div');
                if (heading) {
                    heading.classList.remove('text-amber-600');
                    heading.classList.add('text-slate-900');
                }
            });
            btn.classList.add('active');
            const activeHeading = btn.querySelector('div');
            if (activeHeading) {
                activeHeading.classList.remove('text-slate-900');
                activeHeading.classList.add('text-amber-600');
            }

            estimatorState.multiplier = parseFloat(btn.getAttribute('data-multiplier'));
            recalculateEstimate();
        });
    });

    // Addons
    addonCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            let sumAddons = 0;
            addonCheckboxes.forEach(item => {
                if (item.checked) sumAddons += parseFloat(item.value);
            });
            estimatorState.addons = sumAddons;
            recalculateEstimate();
        });
    });

    recalculateEstimate();
}

function recalculateEstimate() {
    const rawBuildCost = estimatorState.area * estimatorState.baseRate * estimatorState.multiplier;
    const total = Math.round(rawBuildCost + estimatorState.addons);

    const structural = Math.round(total * 0.45);
    const mep = Math.round(total * 0.25);
    const finishes = Math.round(total * 0.20);
    const softCosts = Math.round(total * 0.10);

    let monthsMin = Math.max(6, Math.round(Math.sqrt(estimatorState.area / 100)));
    let monthsMax = Math.round(monthsMin * 1.25);
    if (estimatorState.multiplier > 1.4) {
        monthsMin += 2;
        monthsMax += 3;
    }

    const totalPriceDisplay = document.getElementById('total-price-display');
    const timelineDisplay = document.getElementById('timeline-display');
    const structDisplay = document.getElementById('breakdown-structural');
    const mepDisplay = document.getElementById('breakdown-mep');
    const finishDisplay = document.getElementById('breakdown-finishes');
    const softDisplay = document.getElementById('breakdown-soft');

    if (totalPriceDisplay) totalPriceDisplay.innerText = '₱' + total.toLocaleString();
    if (timelineDisplay) timelineDisplay.innerText = `${monthsMin} - ${monthsMax} Months`;
    if (structDisplay) structDisplay.innerText = '₱' + structural.toLocaleString();
    if (mepDisplay) mepDisplay.innerText = '₱' + mep.toLocaleString();
    if (finishDisplay) finishDisplay.innerText = '₱' + finishes.toLocaleString();
    if (softDisplay) softDisplay.innerText = '₱' + softCosts.toLocaleString();
}

window.transferEstimateToQuote = function() {
    const messageField = document.getElementById('contact-message');
    const totalPriceDisplay = document.getElementById('total-price-display');

    if (messageField && totalPriceDisplay) {
        messageField.value = `[Generated Estimate: ${estimatorState.typeName} | ${estimatorState.area.toLocaleString()} sq.ft | Estimated Valuation: ${totalPriceDisplay.innerText}]\n\nWe require an engineering consultation, soil test coordination, and formal schedule of values for this project.`;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast('Estimate Transferred', 'Your project estimate parameters have been locked into the proposal form below.');
};

/* -------------------------------------------------------------
 * 4. PORTFOLIO FILTERING
 * ------------------------------------------------------------- */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'text-amber-600');
            });
            btn.classList.add('active', 'text-amber-600');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* -------------------------------------------------------------
 * 5. BEFORE / AFTER COMPARISON SLIDER
 * ------------------------------------------------------------- */
function initBeforeAfterSlider() {
    const container = document.getElementById('ba-container');
    const beforeWrap = document.getElementById('ba-before-wrap');
    const handle = document.getElementById('ba-handle');
    const beforeImg = document.getElementById('ba-before-img');

    if (!container || !beforeWrap || !handle || !beforeImg) return;

    let isSliding = false;

    function syncImageWidth() {
        const width = container.offsetWidth;
        beforeImg.style.width = width + 'px';
    }

    window.addEventListener('resize', syncImageWidth);
    syncImageWidth();

    function moveSlider(e) {
        const rect = container.getBoundingClientRect();
        let clientX = e.clientX;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        }

        let position = ((clientX - rect.left) / rect.width) * 100;
        if (position < 0) position = 0;
        if (position > 100) position = 100;

        beforeWrap.style.width = position + '%';
        handle.style.left = position + '%';
    }

    container.addEventListener('mousedown', (e) => {
        isSliding = true;
        moveSlider(e);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        moveSlider(e);
    });

    window.addEventListener('mouseup', () => {
        isSliding = false;
    });

    container.addEventListener('touchstart', (e) => {
        isSliding = true;
        moveSlider(e);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isSliding) return;
        moveSlider(e);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isSliding = false;
    });
}

/* -------------------------------------------------------------
 * 6. SERVICE DETAILS MODAL (NEUMORPHIC)
 * ------------------------------------------------------------- */
const serviceData = {
    commercial: {
        title: "Commercial High-Rises & Corporate HQs",
        icon: "fa-city",
        lead: "Engineering towering architectural statements with structural longevity and LEED Platinum standards.",
        details: [
            "Cast-in-place post-tensioned slabs and core shear wall engineering.",
            "Unitized structural silicone glazed (SSG) curtain wall installations.",
            "Smart BMS with automated chilled water systems and dual-feed redundancy.",
            "Complete tenant-fitout turnkey capability for Fortune 500 tenants."
        ],
        stats: "Over 8.2M sq.ft of Grade-A commercial space delivered."
    },
    industrial: {
        title: "Industrial Plants & Robotics Logistics Hubs",
        icon: "fa-industry",
        lead: "Ultra-heavy capacity fulfillment centers and automated manufacturing infrastructure.",
        details: [
            "FF/FL 50+ super-flat laser screed floor slabs suited for robotic AGV fleets.",
            "Clear span structural steel trusses up to 180 feet without interior columns.",
            "Early Suppression Fast Response (ESFR) automated fire safety networks.",
            "Heavy 3-phase high voltage transformer substations and battery bays."
        ],
        stats: "Completed fulfillment centers for premier global logistics providers."
    },
    residential: {
        title: "Bespoke Luxury Residential Architecture",
        icon: "fa-house-chimney-window",
        lead: "Architectural residences built to museum-quality standards of precision craftsmanship.",
        details: [
            "Post-tensioned cantilevered concrete roofs spanning over 60 feet.",
            "Floor-to-ceiling motorized thermal break glass facades.",
            "Geothermal heating, smart microgrid battery storage, and acoustic isolation.",
            "Artisan millwork, Italian bookmatched travertine stone, and steel framing."
        ],
        stats: "Winner of 7 Architectural MasterPrize design awards."
    },
    civil: {
        title: "Civil Infrastructure & Highway Works",
        icon: "fa-bridge-water",
        lead: "Critical municipal transportation, stormwater management, and heavy foundation works.",
        details: [
            "Cast-in-place drilled shafts (CIDH) up to 120-foot depths into bedrock.",
            "Reinforced segmental retaining walls (MSE) and slope stabilization.",
            "Prestressed concrete girder bridge erection with mobile straddle carriers.",
            "Underground utility relocations and dual-line high-pressure water mains."
        ],
        stats: "Fully bonded for state and federal DOT civil infrastructure contracts."
    },
    bim: {
        title: "Pre-Construction & 4D/5D BIM Modeling",
        icon: "fa-ruler-combined",
        lead: "Virtually constructing every millimeter of the building before breaking ground.",
        details: [
            "Comprehensive federated clash detection between structural and MEP trades.",
            "4D time-sequenced site logistics animations for crane coordination.",
            "5D cost loaded models tied to dynamic bills of quantities (BOQ).",
            "LiDAR point-cloud scanning to verify as-built tolerances against BIM design."
        ],
        stats: "Reduces unexpected field change orders by an average of 92%."
    },
    retrofit: {
        title: "Adaptive Reuse & Seismic Retrofit",
        icon: "fa-screwdriver-wrench",
        lead: "Revitalizing historic structures to exceed modern seismic resilience codes.",
        details: [
            "Carbon Fiber Reinforced Polymer (CFRP) composite column wrapping.",
            "Steel moment frame additions and hydraulic viscous damper installations.",
            "Deep foundation micropile underpinning and pressure grouting.",
            "Envelope weatherproofing, historic masonry repointing, and decarbonization."
        ],
        stats: "Extends structural life expectancy by 50+ years with full code compliance."
    }
};

window.openServiceDetail = function(key) {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('service-modal-content');
    const data = serviceData[key];

    if (!modal || !content || !data) return;

    content.innerHTML = `
        <div class="flex items-center gap-4 mb-4">
            <div class="w-14 h-14 neu-inset flex items-center justify-center text-2xl text-amber-600">
                <i class="fa-solid ${data.icon}"></i>
            </div>
            <div>
                <h3 class="text-xl font-black font-heading text-slate-900 leading-tight">${data.title}</h3>
                <span class="text-xs text-amber-700 font-bold uppercase tracking-wider">Engineering Discipline</span>
            </div>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed mb-6">${data.lead}</p>
        <h4 class="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">Key Technical Scope & Capabilities:</h4>
        <ul class="space-y-2.5 text-xs text-slate-700 mb-6 neu-inset p-4">
            ${data.details.map(d => `<li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-amber-600 mt-0.5"></i><span>${d}</span></li>`).join('')}
        </ul>
        <div class="p-3 neu-flat-sm text-amber-700 text-xs font-bold mb-6">
            <i class="fa-solid fa-trophy mr-1.5 text-amber-600"></i> ${data.stats}
        </div>
        <div class="flex gap-3">
            <a href="#contact" onclick="closeServiceModal()" class="neu-btn-primary flex-1 py-3 text-center text-xs uppercase tracking-wider">
                Inquire For This Service
            </a>
            <button onclick="closeServiceModal()" class="neu-btn px-5 py-3 text-slate-700 text-xs font-bold uppercase tracking-wider">
                Close
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

/* -------------------------------------------------------------
 * 7. VIDEO SHOWCASE MODAL
 * ------------------------------------------------------------- */
window.openVideoModal = function() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    if (modal && iframe) {
        iframe.src = "https://www.youtube-nocookie.com/embed/zoxU4ZpndnU?autoplay=1&mute=0";
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.closeVideoModal = function() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    if (modal && iframe) {
        iframe.src = "";
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

/* -------------------------------------------------------------
 * 8. FORM SUBMISSIONS & TOASTS
 * ------------------------------------------------------------- */
function initForms() {
    const rfqForm = document.getElementById('hero-rfq-form');
    const contactForm = document.getElementById('main-contact-form');

    if (rfqForm) {
        rfqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            rfqForm.reset();
            showToast('Tender Bid Dispatched', 'Our executive engineering board has received your specifications.');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Tender Submission...`;
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showToast('Proposal Request Submitted', 'Thank you! A senior project estimator has been assigned and will reply within 24 hours.');
            }, 1000);
        });
    }
}

window.handleNewsletter = function(e) {
    e.preventDefault();
    e.target.reset();
    showToast('Subscribed Successfully', 'You will receive our quarterly commercial construction index report.');
};

function showToast(title, message) {
    const toast = document.getElementById('toast');
    const titleEl = document.getElementById('toast-title');
    const msgEl = document.getElementById('toast-msg');

    if (!toast) return;

    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerText = message;

    toast.classList.remove('translate-y-32', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
    const serviceModal = document.getElementById('service-modal');
    const videoModal = document.getElementById('video-modal');
    if (e.target === serviceModal) closeServiceModal();
    if (e.target === videoModal) closeVideoModal();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeServiceModal();
        closeVideoModal();
    }
});
