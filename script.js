/**
 * MIRR Construction & Engineering Services - Neumorphic Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeaderDateTime();
    initHeroSlideshow();
    initCounters();
    initEstimator();
    initPortfolioFilter();
    initBeforeAfterSlider();
    initPromoVideoPresentation();
    initCareersPortal();
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
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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

        // Close mobile drawer when tapping outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-lg';
            }
        });
    }

    // Header subtle elevation on scroll
    window.addEventListener('scroll', () => {
        if (mainNav) {
            if (window.scrollY > 30) {
                mainNav.classList.add('shadow-lg');
            } else {
                mainNav.classList.remove('shadow-lg');
            }
        }
        updateActiveNavSection();
    });
}

function updateActiveNavSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

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
        const href = link.getAttribute('href');
        if (!href) return;
        if (href === `#${currentId}`) {
            link.classList.add('text-amber-600', 'active');
            link.classList.remove('text-slate-700');
        } else if (href.startsWith('#')) {
            link.classList.remove('text-amber-600', 'active');
            link.classList.add('text-slate-700');
        }
    });
}

/* -------------------------------------------------------------
 * 1.2. LIVE DATE & TIME IN HEADER UTILITY ROW
 * ------------------------------------------------------------- */
function initHeaderDateTime() {
    const dateElements = document.querySelectorAll('#header-live-date, .header-live-date');
    const timeElements = document.querySelectorAll('#header-live-time, .header-live-time');
    if (!dateElements.length && !timeElements.length) return;

    function refreshClock() {
        const now = new Date();
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

        dateElements.forEach(el => {
            el.innerText = formattedDate;
        });

        timeElements.forEach(el => {
            el.innerText = `Mon - Sat: 7AM - 6PM • ${formattedTime}`;
        });
    }

    refreshClock();
    setInterval(refreshClock, 1000);
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
        '01 / 10 • Night Heavy Structural Concrete Pour & Illuminated Scaffolding',
        '02 / 10 • Structural Steel Framing & Reinforced Slab Rebar Grid',
        '03 / 10 • Tower Crane & Multi-Tier Structural Steel Erection',
        '04 / 10 • High-Rise Commercial Deck Reinforcement & Concrete Topping',
        '05 / 10 • Site Engineering Oversight & Rigging Safety Protocol',
        '06 / 10 • Pre-Engineered Steel Girder Framing & Assembly',
        '07 / 10 • Substructure Foundations & Structural Framing Phase',
        '08 / 10 • Modern Architectural Finish & Luxury Interior Handover',
        '09 / 10 • The Horizon Waterfront Cantilevered Structural Architecture',
        '10 / 10 • Heavy Civil Infrastructure & Multimodal Viaduct'
    ];

    let currentIndex = 0;
    let timer = null;
    let isPlaying = true;
    const intervalTime = 5000;

    function showSlide(index, direction = 'next') {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        const prevIndex = currentIndex;
        currentIndex = index;

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'slide-from-right', 'slide-from-left', 'slide-to-left', 'slide-to-right');
            if (i === currentIndex) {
                slide.classList.add('active');
                if (direction === 'next') {
                    slide.classList.add('slide-from-right');
                } else if (direction === 'prev') {
                    slide.classList.add('slide-from-left');
                }
            } else if (i === prevIndex && direction !== 'none') {
                if (direction === 'next') {
                    slide.classList.add('slide-to-left');
                } else if (direction === 'prev') {
                    slide.classList.add('slide-to-right');
                }
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (captionEl && captions[currentIndex]) {
            captionEl.style.opacity = '0';
            setTimeout(() => {
                captionEl.textContent = captions[currentIndex];
                captionEl.style.opacity = '1';
            }, 200);
        }
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            showSlide(currentIndex + 1, 'next');
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
            showSlide(currentIndex - 1, 'prev');
            if (isPlaying) startTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1, 'next');
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
            const dir = i >= currentIndex ? 'next' : 'prev';
            showSlide(i, dir);
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
            showSlide(currentIndex - 1, 'prev');
            if (isPlaying) startTimer();
        } else if (e.key === 'ArrowRight') {
            showSlide(currentIndex + 1, 'next');
            if (isPlaying) startTimer();
        }
    });

    // Mobile touch swipe gestures (Swipe Left / Swipe Right)
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDist = 45;
    const heroSection = document.getElementById('home') || document.body;

    heroSection.addEventListener('touchstart', (e) => {
        if (e.target.closest('#ba-container, input, button, a, select, textarea')) return;
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
        if (e.target.closest('#ba-container, input, button, a, select, textarea')) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDist) {
            if (deltaX < 0) {
                // Swiped Left -> Next Slide
                showSlide(currentIndex + 1, 'next');
            } else {
                // Swiped Right -> Previous Slide
                showSlide(currentIndex - 1, 'prev');
            }
            if (isPlaying) startTimer();
        }
    }, { passive: true });

    // Start automated cycle with initial slide
    showSlide(0, 'none');
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
    baseRate: 48000, // PHP ₱ per sq m (Basic / Standard Residential benchmark: ₱45,000 - ₱50,000)
    typeName: 'Basic / Standard Residential',
    area: 250, // in sq.m (standard residential baseline)
    multiplier: 1.0, // Standard finishing specification
    addons: 0 // Optional value-adds unchecked by default for true unit rate reference
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
                if (icon) {
                    icon.classList.remove('text-amber-400', 'text-amber-600');
                    icon.classList.add('text-slate-500');
                }
            });
            btn.classList.add('active');
            const activeIcon = btn.querySelector('i');
            if (activeIcon) {
                activeIcon.classList.remove('text-slate-500');
                activeIcon.classList.add('text-amber-400');
            }

            estimatorState.baseRate = parseFloat(btn.getAttribute('data-rate'));
            const nameEl = btn.querySelector('.font-bold');
            if (nameEl) estimatorState.typeName = nameEl.innerText.trim();
            recalculateEstimate();
        });
    });

    // Area Range Slider (in Square Meters)
    if (areaSlider && areaDisplay) {
        areaSlider.addEventListener('input', (e) => {
            const sqm = parseInt(e.target.value);
            estimatorState.area = sqm;
            areaDisplay.innerText = Number(sqm).toLocaleString() + ' sq.m';
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
                    heading.classList.remove('text-amber-400', 'text-amber-600');
                    heading.classList.add('text-slate-400');
                }
            });
            btn.classList.add('active');
            const activeHeading = btn.querySelector('div');
            if (activeHeading) {
                activeHeading.classList.remove('text-slate-400');
                activeHeading.classList.add('text-amber-400');
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
    const effectiveRate = Math.round(total / (estimatorState.area || 1));

    const structural = Math.round(total * 0.45);
    const mep = Math.round(total * 0.25);
    const finishes = Math.round(total * 0.20);
    const softCosts = Math.round(total * 0.10);

    let monthsMin = Math.max(6, Math.round(Math.sqrt(estimatorState.area / 10)));
    let monthsMax = Math.round(monthsMin * 1.25);
    if (estimatorState.multiplier > 1.4) {
        monthsMin += 2;
        monthsMax += 3;
    }

    const totalPriceDisplay = document.getElementById('total-price-display');
    const rateRefDisplay = document.getElementById('rate-reference-display');
    const timelineDisplay = document.getElementById('timeline-display');
    const structDisplay = document.getElementById('breakdown-structural');
    const mepDisplay = document.getElementById('breakdown-mep');
    const finishDisplay = document.getElementById('breakdown-finishes');
    const softDisplay = document.getElementById('breakdown-soft');

    if (totalPriceDisplay) totalPriceDisplay.innerText = '₱' + total.toLocaleString();

    // Dynamically update rate reference badge & live effective rate per sq.m
    if (rateRefDisplay) {
        if (estimatorState.typeName.includes('Basic') || estimatorState.typeName.includes('Standard Residential')) {
            rateRefDisplay.innerHTML = `₱45,000 - ₱50,000 / sq.m <span class="text-slate-400 font-normal text-[11px]">(Live: ₱${effectiveRate.toLocaleString()}/sq.m)</span>`;
        } else {
            rateRefDisplay.innerHTML = `₱${estimatorState.baseRate.toLocaleString()} / sq.m base <span class="text-slate-400 font-normal text-[11px]">(Live: ₱${effectiveRate.toLocaleString()}/sq.m)</span>`;
        }
    }

    if (timelineDisplay) timelineDisplay.innerText = `${monthsMin} - ${monthsMax} Months`;
    if (structDisplay) structDisplay.innerText = '₱' + structural.toLocaleString();
    if (mepDisplay) mepDisplay.innerText = '₱' + mep.toLocaleString();
    if (finishDisplay) finishDisplay.innerText = '₱' + finishes.toLocaleString();
    if (softDisplay) softDisplay.innerText = '₱' + softCosts.toLocaleString();
}

window.transferEstimateToQuote = function() {
    const messageField = document.getElementById('contact-message');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const effectiveRate = Math.round((estimatorState.area * estimatorState.baseRate * estimatorState.multiplier + estimatorState.addons) / (estimatorState.area || 1));

    if (messageField && totalPriceDisplay) {
        let rateNote = '';
        if (estimatorState.typeName.includes('Residential')) {
            rateNote = ` | Benchmark: ₱45,000 - ₱50,000/sq.m (Effective: ₱${effectiveRate.toLocaleString()}/sq.m)`;
        } else {
            rateNote = ` | Effective: ₱${effectiveRate.toLocaleString()}/sq.m`;
        }

        messageField.value = `[Generated Estimate: ${estimatorState.typeName} | ${estimatorState.area.toLocaleString()} sq.m${rateNote} | Estimated Valuation: ${totalPriceDisplay.innerText}]\n\nWe require an engineering consultation, soil test coordination, and formal schedule of values for this project.`;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast('Estimate Transferred', 'Your project estimate parameters (₱45,000 - ₱50,000 / sq.m residential reference) have been locked into the proposal form below.');
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

    window.addEventListener('touchcancel', () => {
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
        stats: "Over 760,000 sq.m of Grade-A commercial space delivered."
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
    const video = document.getElementById('video-player');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    }
};

window.closeVideoModal = function() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('video-player');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (video) {
            video.pause();
        }
    }
};

/* -------------------------------------------------------------
 * 7.2. PROMOTIONAL VIDEO PRESENTATION ENGINE
 * ------------------------------------------------------------- */
const promoClipsData = [
    {
        id: 0,
        title: "Turnkey Architectural Fit-Out & Architectural Finishes",
        badge: "Architectural Finish",
        duration: "0:07",
        file: "Media/2ab353b2-8712-4dff-b570-2ae5e4718c45.mp4",
        caption: "Acoustic Glass Partitions, Ambient Illumination & Bespoke Corporate Finishes.",
        description: "High-end corporate and commercial fit-outs crafted with acoustic glazing, architectural woodwork, seamless drywall partitions, energy-efficient LED luminaires, and tailored spatial ergonomics.",
        specs: [
            { label: "Acoustics", value: "STC 50+ Double-Glazed Glass" },
            { label: "Efficiency", value: "LEED Gold Certified Lighting" },
            { label: "Craftsmanship", value: "Custom Architectural Joinery" },
            { label: "Handover", value: "Turnkey Move-In Commissioning" }
        ]
    },
    {
        id: 1,
        title: "Heavy Structural Steel & High-Rise Moment Framing",
        badge: "Structural Steelwork",
        duration: "0:05",
        file: "Media/40d27247-1b06-4f45-b0a1-d331a8b9cc66.mp4",
        caption: "Precision High-Load Moment Frames, Seismic Splices & Heavy Tower Crane Erection.",
        description: "Engineered heavy structural framing featuring millimeter-tolerance column splices, high-tensile bolted connections, and seismic lateral load-resisting systems designed to withstand extreme typhoons and seismic loads.",
        specs: [
            { label: "Material", value: "High-Tensile Grade 50 Steel" },
            { label: "Assembly", value: "Moment Connection Splicing" },
            { label: "Inspection", value: "100% Ultrasonic Weld Testing" },
            { label: "Logistics", value: "Coordinated Tower Crane Picks" }
        ]
    },
    {
        id: 2,
        title: "MIRR Master Engineering Showcase Reel",
        badge: "Master Showcase Reel",
        duration: "0:42",
        file: "Media/showcase-reel.mp4",
        caption: "End-to-End Turnkey Civil & Commercial Execution — From Geotechnical Groundbreak to High-Rise Commissioning.",
        description: "A comprehensive look at MIRR Construction's integrated capabilities: precision structural core casting, autonomous tower crane logistics, high-tolerance MEP reticulation, and certified OSHA VPP safety protocols across 1.5M+ safe man-hours.",
        specs: [
            { label: "Scope", value: "Turnkey Commercial & Civil" },
            { label: "Safety Index", value: "1.5M+ Zero-Incident Hours" },
            { label: "Standards", value: "ISO 9001:2026 & OSHA VPP" },
            { label: "Execution", value: "100% On-Schedule Milestone Rate" }
        ]
    },
    {
        id: 3,
        title: "Reinforced Concrete Slabs & Civil Substructure",
        badge: "Civil & Concrete",
        duration: "0:10",
        file: "Media/a8da201a-1c76-4aca-89aa-45ce223c6e52.mp4",
        caption: "Monolithic Post-Tensioned Slabs, Rebar Matrices & Embedded MEP Reticulation.",
        description: "Complex elevated deck engineering featuring dense rebar grids, precision-spaced post-tensioning tendons, integrated MEP electrical conduits, and laser-screeded monolithic pours achieving FF/FL superflat tolerances.",
        specs: [
            { label: "System", value: "Post-Tensioned Monolithic Slab" },
            { label: "Integration", value: "Embedded Conduit Reticulation" },
            { label: "Tolerance", value: "FF/FL Superflat Specification" },
            { label: "Testing", value: "Compressive Strength >40 MPa" }
        ]
    }
];

let currentPromoClipIndex = 0;
let promoBgmUserMuted = false;
let webAudioContext = null;
let webAudioOscillators = [];

function initPromoVideoPresentation() {
    const video = document.getElementById('promo-video-player');
    const bgMusic = document.getElementById('promo-bg-music');
    if (!video) return;

    // Permanently remove original sound of all videos
    video.muted = true;
    if (bgMusic) {
        bgMusic.volume = 0.75;
    }

    // Render initial swapped clip 1 (Concrete Slabs)
    renderPromoClip(0, false);

    // Synchronize motivational background music with video playback
    video.addEventListener('play', () => {
        video.muted = true; // Ensure original audio remains removed
        if (!promoBgmUserMuted) {
            playMotivationalBgm();
        }
    });

    video.addEventListener('pause', () => {
        pauseMotivationalBgm();
    });

    // Timecode and dynamic broadcast ad overlay sync
    video.addEventListener('timeupdate', () => {
        const timecode = document.getElementById('ad-timecode');
        const billboard = document.getElementById('ad-billboard-hook');
        if (timecode) {
            const cur = Math.floor(video.currentTime || 0);
            const mins = String(Math.floor(cur / 60)).padStart(2, '0');
            const secs = String(cur % 60).padStart(2, '0');
            timecode.innerText = `00:${mins}:${secs}`;
        }
        if (billboard) {
            if (video.currentTime <= 3.5) {
                billboard.classList.remove('opacity-0', 'scale-95');
                billboard.classList.add('opacity-95', 'scale-100');
            } else {
                billboard.classList.remove('opacity-95', 'scale-100');
                billboard.classList.add('opacity-0', 'scale-95');
            }
        }
    });

    // Auto-advance sequentially to next clip when current clip ends
    video.addEventListener('ended', () => {
        const nextIndex = (currentPromoClipIndex + 1) % promoClipsData.length;
        window.switchPromoClip(nextIndex, true);
    });
}

function playMotivationalBgm() {
    const bgMusic = document.getElementById('promo-bg-music');
    if (bgMusic) {
        bgMusic.play().then(() => {
            setBgmPlayingUI(true);
        }).catch(() => {
            // Fallback to Web Audio procedural synthesis if file playback is blocked
            startProceduralMotivationalSynth();
            setBgmPlayingUI(true);
        });
    } else {
        startProceduralMotivationalSynth();
        setBgmPlayingUI(true);
    }
}

function pauseMotivationalBgm() {
    const bgMusic = document.getElementById('promo-bg-music');
    if (bgMusic) {
        bgMusic.pause();
    }
    stopProceduralMotivationalSynth();
    setBgmPlayingUI(false);
}

function setBgmPlayingUI(isPlaying) {
    const eq = document.getElementById('promo-equalizer');
    const status = document.getElementById('promo-music-status');
    const icon = document.getElementById('promo-music-icon');
    if (eq) {
        if (isPlaying) {
            eq.classList.remove('opacity-40');
            eq.querySelectorAll('span').forEach(b => b.classList.add('animate-pulse'));
        } else {
            eq.classList.add('opacity-40');
            eq.querySelectorAll('span').forEach(b => b.classList.remove('animate-pulse'));
        }
    }
    if (status && !promoBgmUserMuted) {
        status.innerText = isPlaying ? 'Music: Playing' : 'Music: Ready';
    }
}

window.togglePromoMusic = function() {
    const bgMusic = document.getElementById('promo-bg-music');
    const video = document.getElementById('promo-video-player');
    const status = document.getElementById('promo-music-status');
    const icon = document.getElementById('promo-music-icon');
    const btn = document.getElementById('promo-music-toggle');

    promoBgmUserMuted = !promoBgmUserMuted;

    if (promoBgmUserMuted) {
        pauseMotivationalBgm();
        if (status) status.innerText = 'Music: OFF';
        if (icon) icon.className = 'fa-solid fa-volume-xmark text-slate-400';
        if (btn) btn.classList.add('opacity-60');
    } else {
        if (status) status.innerText = 'Music: ON';
        if (icon) icon.className = 'fa-solid fa-volume-high text-amber-400';
        if (btn) btn.classList.remove('opacity-60');
        if (video && !video.paused) {
            playMotivationalBgm();
        }
    }
};

window.setPromoMusicVolume = function(vol) {
    const bgMusic = document.getElementById('promo-bg-music');
    if (bgMusic) {
        bgMusic.volume = Math.max(0, Math.min(1, parseFloat(vol)));
    }
};

/* Procedural Web Audio API Motivational Pad Synthesizer (Zero-Network Built-in Fallback) */
function startProceduralMotivationalSynth() {
    try {
        if (!webAudioContext) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            webAudioContext = new AudioCtx();
        }
        if (webAudioContext.state === 'suspended') {
            webAudioContext.resume();
        }
        if (webAudioOscillators.length > 0) return;

        // D Major Inspirational Chord: D3 (146.8Hz), F#3 (185.0Hz), A3 (220.0Hz), D4 (293.7Hz)
        const freqs = [146.83, 185.00, 220.00, 293.66];
        const masterGain = webAudioContext.createGain();
        masterGain.gain.setValueAtTime(0.001, webAudioContext.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.18, webAudioContext.currentTime + 1.2);
        masterGain.connect(webAudioContext.destination);

        freqs.forEach(f => {
            const osc = webAudioContext.createOscillator();
            const gain = webAudioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, webAudioContext.currentTime);

            gain.gain.setValueAtTime(0.25, webAudioContext.currentTime);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            webAudioOscillators.push({ osc, masterGain });
        });
    } catch (e) {
        // Silent graceful fallback
    }
}

function stopProceduralMotivationalSynth() {
    try {
        if (webAudioOscillators.length > 0 && webAudioContext) {
            webAudioOscillators.forEach(({ osc, masterGain }) => {
                try {
                    masterGain.gain.exponentialRampToValueAtTime(0.0001, webAudioContext.currentTime + 0.5);
                    setTimeout(() => osc.stop(), 500);
                } catch (err) {}
            });
            webAudioOscillators = [];
        }
    } catch (e) {}
}

window.switchPromoClip = function(index, autoPlay = true) {
    if (index < 0 || index >= promoClipsData.length) return;
    currentPromoClipIndex = index;
    renderPromoClip(index, autoPlay);
};

function renderPromoClip(index, autoPlay) {
    const clip = promoClipsData[index];
    const video = document.getElementById('promo-video-player');
    const source = document.getElementById('promo-video-source');
    const counter = document.getElementById('promo-clip-counter');
    const badge = document.getElementById('promo-clip-badge');
    const title = document.getElementById('promo-clip-title');
    const duration = document.getElementById('promo-clip-duration');
    const caption = document.getElementById('promo-clip-caption');
    const desc = document.getElementById('promo-clip-desc');
    const specsContainer = document.getElementById('promo-clip-specs');
    const buttons = document.querySelectorAll('.promo-clip-btn');

    if (counter) counter.innerText = `Clip 0${index + 1} of 0${promoClipsData.length} • ${clip.badge}`;
    if (badge) badge.innerText = clip.badge;
    if (title) title.innerText = clip.title;
    if (duration) duration.innerHTML = `<i class="fa-regular fa-clock text-amber-400 mr-1"></i> ${clip.duration}`;
    if (caption) caption.innerText = `"${clip.caption}"`;
    if (desc) desc.innerText = clip.description;

    if (specsContainer && clip.specs) {
        specsContainer.innerHTML = clip.specs.map(s => `
            <div class="neu-card p-2 sm:p-2.5 rounded-lg border border-white/5">
                <span class="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">${s.label}</span>
                <span class="text-[11px] font-heading font-extrabold text-amber-400 block mt-0.5">${s.value}</span>
            </div>
        `).join('');
    }

    // Update active button state
    buttons.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add('active');
            btn.classList.remove('opacity-70');
            const num = btn.querySelector('.font-mono');
            if (num) {
                num.classList.add('text-amber-400');
                num.classList.remove('text-slate-400');
            }
        } else {
            btn.classList.remove('active');
            btn.classList.add('opacity-70');
            const num = btn.querySelector('.font-mono');
            if (num) {
                num.classList.remove('text-amber-400');
                num.classList.add('text-slate-400');
            }
        }
    });

    if (video && source) {
        video.muted = true; // Guarantee original video audio is completely silenced
        if (source.getAttribute('src') !== clip.file) {
            source.setAttribute('src', clip.file);
            video.load();
            if (autoPlay) {
                video.play().catch(() => {});
            }
        } else if (autoPlay && video.paused) {
            video.play().catch(() => {});
        }
    }

    // Sync ad lower third title with current clip if in general B2B campaign mode
    const adLowerTitle = document.getElementById('ad-lower-title');
    const adCampaignSelect = document.getElementById('ad-campaign-select');
    if (adLowerTitle && (!adCampaignSelect || adCampaignSelect.value === 'b2b')) {
        adLowerTitle.innerText = clip.title;
    }
}

/* -------------------------------------------------------------
 * COMMERCIAL AD PRESENTATION & VIDEO EXPORT SUITE
 * ------------------------------------------------------------- */
window.toggleAdOverlay = function() {
    const overlay = document.getElementById('promo-ad-overlay');
    const status = document.getElementById('ad-mode-status');
    if (!overlay) return;
    const isHidden = overlay.classList.toggle('ad-mode-off');
    if (status) {
        if (isHidden) {
            status.innerText = 'OFF';
            status.className = 'neu-pill px-2 py-0.5 text-[9px] text-slate-400 font-extrabold bg-slate-800 border border-slate-600/40';
        } else {
            status.innerText = 'ON';
            status.className = 'neu-pill px-2 py-0.5 text-[9px] text-emerald-400 font-extrabold bg-emerald-950/60 border border-emerald-500/40';
        }
    }
};

window.setPromoAspect = function(aspect) {
    const wrapper = document.getElementById('promo-video-stage-wrapper');
    const btn169 = document.getElementById('aspect-btn-16-9');
    const btn916 = document.getElementById('aspect-btn-9-16');
    if (!wrapper) return;

    if (aspect === '9:16') {
        wrapper.classList.add('vertical-mode');
        if (btn916) {
            btn916.classList.add('text-amber-400', 'active');
            btn916.classList.remove('text-slate-300');
        }
        if (btn169) {
            btn169.classList.remove('text-cyan-300', 'active');
            btn169.classList.add('text-slate-400');
        }
    } else {
        wrapper.classList.remove('vertical-mode');
        if (btn169) {
            btn169.classList.add('text-cyan-300', 'active');
            btn169.classList.remove('text-slate-400');
        }
        if (btn916) {
            btn916.classList.remove('text-amber-400', 'active');
            btn916.classList.add('text-slate-300');
        }
    }
};

const adCampaignPresets = {
    b2b: {
        billboard: "BUILDING TOMORROW'S LANDMARKS TODAY",
        sub: "1.5M+ Zero-Incident Hours • Heavy Civil & Turnkey Architecture",
        badge: "ISO 9001:2026 Certified",
        title: "Turnkey Commercial & Civil Infrastructure Execution",
        ticker: "<span><i class='fa-solid fa-shield-halved text-emerald-400 mr-1'></i> 1.5M+ Safe Hours</span><span>•</span><span><i class='fa-solid fa-map-pin text-amber-400 mr-1'></i> Metro Manila & Calabarzon</span><span>•</span><span><i class='fa-solid fa-award text-cyan-400 mr-1'></i> Triple-A Certified Team</span>"
    },
    safety: {
        billboard: "1.5M+ ZERO-INCIDENT SAFE MAN-HOURS",
        sub: "OSHA VPP Star Compliant • Uncompromised Safety On Every Tier",
        badge: "Safety First Excellence",
        title: "Engineered With Zero Incidents Since Project Day One",
        ticker: "<span><i class='fa-solid fa-helmet-safety text-emerald-400 mr-1'></i> OSHA VPP Star Standards</span><span>•</span><span><i class='fa-solid fa-circle-check text-cyan-400 mr-1'></i> Daily Tool-Box Audits</span><span>•</span><span><i class='fa-solid fa-medal text-amber-400 mr-1'></i> Certified Safety Officers</span>"
    },
    tender: {
        billboard: "FAST-TRACK TENDER MOBILIZATION",
        sub: "Guaranteed Milestone Timelines • Itemized Cost Engineering",
        badge: "Tender Bid RFP Open",
        title: "Submit Your Project RFP — Instant Estimator Mobilization",
        ticker: "<span><i class='fa-solid fa-bolt text-amber-400 mr-1'></i> 24-Hour Bid Turnaround</span><span>•</span><span><i class='fa-solid fa-calculator text-cyan-400 mr-1'></i> Value Engineering</span><span>•</span><span><i class='fa-solid fa-file-contract text-emerald-400 mr-1'></i> Fully Bonded & Insured</span>"
    }
};

window.changeAdCampaignPreset = function(presetKey) {
    const preset = adCampaignPresets[presetKey] || adCampaignPresets.b2b;
    const bTitle = document.getElementById('ad-billboard-title');
    const bSub = document.getElementById('ad-billboard-sub');
    const lBadge = document.getElementById('ad-lower-badge');
    const lTitle = document.getElementById('ad-lower-title');
    const lTicker = document.getElementById('ad-lower-ticker');

    if (bTitle) bTitle.innerText = preset.billboard;
    if (bSub) bSub.innerText = preset.sub;
    if (lBadge) lBadge.innerText = preset.badge;
    if (lTitle) lTitle.innerText = preset.title;
    if (lTicker) lTicker.innerHTML = preset.ticker;
};

window.switchPromoConsoleTab = function(tabName) {
    const tabSpecs = document.getElementById('tab-pane-specs');
    const tabStoryboard = document.getElementById('tab-pane-storyboard');
    const tabExporter = document.getElementById('tab-pane-exporter');

    const btnSpecs = document.getElementById('tab-btn-specs');
    const btnStoryboard = document.getElementById('tab-btn-storyboard');
    const btnExporter = document.getElementById('tab-btn-exporter');

    [tabSpecs, tabStoryboard, tabExporter].forEach(p => p && p.classList.add('hidden'));
    [btnSpecs, btnStoryboard, btnExporter].forEach(b => b && b.classList.remove('active'));

    if (tabName === 'storyboard') {
        if (tabStoryboard) tabStoryboard.classList.remove('hidden');
        if (btnStoryboard) btnStoryboard.classList.add('active');
    } else if (tabName === 'exporter') {
        if (tabExporter) tabExporter.classList.remove('hidden');
        if (btnExporter) btnExporter.classList.add('active');
    } else {
        if (tabSpecs) tabSpecs.classList.remove('hidden');
        if (btnSpecs) btnSpecs.classList.add('active');
    }
};

window.selectStoryboardLength = function(len) {
    const c15 = document.getElementById('sb-content-15s');
    const c30 = document.getElementById('sb-content-30s');
    const c60 = document.getElementById('sb-content-60s');
    const b15 = document.getElementById('sb-btn-15s');
    const b30 = document.getElementById('sb-btn-30s');
    const b60 = document.getElementById('sb-btn-60s');

    [c15, c30, c60].forEach(c => c && c.classList.add('hidden'));
    [b15, b30, b60].forEach(b => {
        if (b) {
            b.classList.remove('active', 'text-amber-400');
            b.classList.add('text-slate-300');
        }
    });

    if (len === '30s') {
        if (c30) c30.classList.remove('hidden');
        if (b30) { b30.classList.add('active', 'text-amber-400'); b30.classList.remove('text-slate-300'); }
    } else if (len === '60s') {
        if (c60) c60.classList.remove('hidden');
        if (b60) { b60.classList.add('active', 'text-amber-400'); b60.classList.remove('text-slate-300'); }
    } else {
        if (c15) c15.classList.remove('hidden');
        if (b15) { b15.classList.add('active', 'text-amber-400'); b15.classList.remove('text-slate-300'); }
    }
};

window.copyAdScript = function(len) {
    const scripts = {
        '15s': `MIRR CONSTRUCTION SERVICES - 15-SECOND SOCIAL HOOK COMMERCIAL
[0:00 - 0:04] HOOK: "Looking to build your landmark on time, zero incidents, zero excuses?" (Visual: Tower Crane Erection)
[0:04 - 0:10] PROOF: "1.5 million safe man-hours. ISO 9001:2026 certified structural and architectural excellence." (Visual: Heavy Steel & Slabs)
[0:10 - 0:15] CTA: "Submit your tender bid now at mirrcon.vercel.app or call +63 936-958-0308." (Visual: Modern Fit-Out & Brand Bumper)`,
        '30s': `MIRR CONSTRUCTION SERVICES - 30-SECOND COMMERCIAL SPOT
[0:00 - 0:07] "Every iconic landmark begins with unwavering precision in the ground."
[0:07 - 0:15] "Engineered moment frames and heavy steel erected with millimeter tolerance."
[0:15 - 0:23] "Seamless architectural fit-outs ready for day-one tenant occupation."
[0:23 - 0:30] "MIRR Construction. Building tomorrow's landmarks today. Call +63 936-958-0308 or request your tender bid now at mirrcon.vercel.app."`,
        '60s': `MIRR CONSTRUCTION SERVICES - 60-SECOND CORPORATE CAPABILITY SHOWCASE
"In the modern skylines of Metro Manila and Calabarzon, enduring landmarks demand more than materials — they demand visionary engineering and zero-compromise precision.
At MIRR Construction, we bring total lifecycle mastery: from geotechnical excavation and laser-screeded monolithic concrete slabs, to heavy structural steel moment frames and turnkey high-tolerance interior fit-outs.
With over 1.5 million safe man-hours, OSHA VPP compliance, and ISO 9001:2026 certified quality management, we deliver certainty to every project sponsor.
Building tomorrow's landmarks today. Partner with MIRR Construction Services. Contact our chief estimators at +63 936-958-0308 or submit your complete tender specs at mirrcon.vercel.app."`
    };

    const text = scripts[len] || scripts['15s'];
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Commercial Script Copied', `The ${len} advertisement voiceover script is ready to paste into your campaign manager.`);
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
};

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Commercial Script Copied', 'Advertisement script copied to clipboard.');
}

/* In-Browser HTML5 Canvas + MediaRecorder Video Ad Exporter */
window.startExportAdVideo = function() {
    const video = document.getElementById('promo-video-player');
    const bgMusic = document.getElementById('promo-bg-music');
    const durationSelect = document.getElementById('export-duration-select');
    const aspectSelect = document.getElementById('export-aspect-select');
    const audioSelect = document.getElementById('export-audio-select');
    const progressBox = document.getElementById('export-progress-box');
    const progressBar = document.getElementById('export-progress-bar');
    const progressPct = document.getElementById('export-progress-pct');
    const statusLabel = document.getElementById('export-status-label');

    if (!video) return;

    if (typeof MediaRecorder === 'undefined') {
        showToast('Browser Notice', 'Direct browser video export is not supported in this browser version. You can screen-capture the live commercial mode playback directly.');
        return;
    }

    const durationSeconds = durationSelect ? parseInt(durationSelect.value, 10) : 10;
    const isVertical = aspectSelect ? aspectSelect.value === '9:16' : false;
    const includeAudio = audioSelect ? audioSelect.value === 'bgm' : true;

    const width = isVertical ? 720 : 1280;
    const height = isVertical ? 1280 : 720;

    // Switch to exporter tab if not active
    switchPromoConsoleTab('exporter');

    if (progressBox) progressBox.classList.remove('hidden');
    if (statusLabel) statusLabel.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Recording Commercial Video Ad (${durationSeconds}s)...`;
    if (progressBar) progressBar.style.width = '5%';
    if (progressPct) progressPct.innerText = '5%';

    // Create offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Reset video and audio to beginning
    video.currentTime = 0;
    video.muted = true;
    video.play().catch(() => {});

    if (includeAudio && bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
    }

    const canvasStream = canvas.captureStream ? canvas.captureStream(30) : null;
    if (!canvasStream) {
        showToast('Notice', 'Canvas streaming not supported in this browser.');
        if (progressBox) progressBox.classList.add('hidden');
        return;
    }

    let audioTrack = null;
    try {
        if (includeAudio && bgMusic && (bgMusic.captureStream || bgMusic.mozCaptureStream)) {
            const aStream = bgMusic.captureStream ? bgMusic.captureStream() : bgMusic.mozCaptureStream();
            if (aStream && aStream.getAudioTracks().length > 0) {
                audioTrack = aStream.getAudioTracks()[0];
            }
        }
    } catch (err) {}

    const tracks = [...canvasStream.getVideoTracks()];
    if (audioTrack) {
        tracks.push(audioTrack);
    }
    const combinedStream = new MediaStream(tracks);

    let recorder;
    try {
        recorder = new MediaRecorder(combinedStream, {
            mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm'
        });
    } catch (e) {
        try {
            recorder = new MediaRecorder(combinedStream);
        } catch (err) {
            showToast('Export Error', 'Unable to initialize MediaRecorder on this device.');
            if (progressBox) progressBox.classList.add('hidden');
            return;
        }
    }

    const recordedChunks = [];
    recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };

    const startTime = Date.now();
    const totalMs = durationSeconds * 1000;
    let renderLoopId;

    function drawFrame() {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.floor((elapsed / totalMs) * 100));

        if (progressBar) progressBar.style.width = `${pct}%`;
        if (progressPct) progressPct.innerText = `${pct}%`;

        // 1. Draw base video frame
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, width, height);

        if (video.videoWidth > 0) {
            if (isVertical) {
                const vRatio = video.videoWidth / video.videoHeight;
                const cRatio = width / height;
                let sWidth, sHeight, sx, sy;
                if (vRatio > cRatio) {
                    sHeight = video.videoHeight;
                    sWidth = video.videoHeight * cRatio;
                    sx = (video.videoWidth - sWidth) / 2;
                    sy = 0;
                } else {
                    sWidth = video.videoWidth;
                    sHeight = video.videoWidth / cRatio;
                    sx = 0;
                    sy = (video.videoHeight - sHeight) / 2;
                }
                ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, width, height);
            } else {
                ctx.drawImage(video, 0, 0, width, height);
            }
        }

        // 2. Draw Top Bar: REC Pill + Watermark
        ctx.fillStyle = 'rgba(185, 28, 28, 0.9)';
        drawCanvasRoundRect(ctx, 30, 30, 160, 40, 20, true, false);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('● REC', 50, 55);
        const sec = Math.floor(elapsed / 1000);
        const timeStr = `00:00:${String(sec).padStart(2, '0')}`;
        ctx.fillText(timeStr, 110, 55);

        // Watermark Top-Right
        ctx.fillStyle = 'rgba(6, 14, 38, 0.88)';
        drawCanvasRoundRect(ctx, width - 260, 30, 230, 40, 20, true, false);
        ctx.fillStyle = '#F59E0B';
        ctx.font = '900 18px "Oxanium", sans-serif';
        ctx.fillText('MIRR', width - 240, 56);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('ISO 9001:2026', width - 180, 56);

        // 3. Draw Center Billboard in the first 3.5 seconds
        if (elapsed < 3500) {
            const bWidth = Math.min(width - 60, 800);
            const bHeight = 120;
            const bx = (width - bWidth) / 2;
            const by = (height - bHeight) / 2;

            ctx.fillStyle = 'rgba(6, 16, 42, 0.94)';
            drawCanvasRoundRect(ctx, bx, by, bWidth, bHeight, 16, true, false);
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 13px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('COMMERCIAL AD SPOTLIGHT • MIRR CONSTRUCTION SERVICES', width / 2, by + 34);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '900 24px "Oxanium", sans-serif';
            ctx.fillText("BUILDING TOMORROW'S LANDMARKS TODAY", width / 2, by + 68);

            ctx.fillStyle = '#94A3B8';
            ctx.font = '13px sans-serif';
            ctx.fillText('1.5M+ Zero-Incident Hours • Heavy Civil & Turnkey Architecture', width / 2, by + 96);
            ctx.textAlign = 'left';
        }

        // 4. Draw Lower-Third Graphic Banner
        const ltHeight = 110;
        const lty = height - ltHeight - 30;
        const ltx = 30;
        const ltWidth = width - 60;

        ctx.fillStyle = 'rgba(3, 8, 24, 0.95)';
        drawCanvasRoundRect(ctx, ltx, lty, ltWidth, ltHeight, 16, true, false);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Metallic Emblem
        ctx.fillStyle = '#D97706';
        drawCanvasRoundRect(ctx, ltx + 18, lty + 18, 74, 74, 12, true, false);
        ctx.fillStyle = '#0F172A';
        ctx.font = '900 36px "Oxanium", sans-serif';
        ctx.fillText('M', ltx + 40, lty + 68);

        // Title & Subtitle
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('MIRR CONSTRUCTION SERVICES • ISO 9001:2026 CERTIFIED', ltx + 108, lty + 40);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 20px "Oxanium", sans-serif';
        const activeClip = promoClipsData[currentPromoClipIndex] || promoClipsData[0];
        const headline = activeClip.title.length > 40 ? activeClip.title.substring(0, 40) + '...' : activeClip.title;
        ctx.fillText(headline, ltx + 108, lty + 68);

        ctx.fillStyle = '#93C5FD';
        ctx.font = '12px sans-serif';
        ctx.fillText('1.5M+ Safe Hours • Metro Manila & Calabarzon • +63 936-958-0308', ltx + 108, lty + 92);

        // CTA Button on right
        const ctaWidth = 210;
        const ctaX = ltx + ltWidth - ctaWidth - 20;
        ctx.fillStyle = '#F59E0B';
        drawCanvasRoundRect(ctx, ctaX, lty + 30, ctaWidth, 50, 10, true, false);
        ctx.fillStyle = '#0F172A';
        ctx.font = '900 13px sans-serif';
        ctx.fillText('REQUEST TENDER BID →', ctaX + 24, lty + 61);

        if (elapsed < totalMs) {
            renderLoopId = requestAnimationFrame(drawFrame);
        } else {
            cancelAnimationFrame(renderLoopId);
            recorder.stop();
        }
    }

    recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MIRR-Construction-Ad-${durationSeconds}s-${isVertical ? 'vertical-9x16' : 'landscape-16x9'}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        if (statusLabel) statusLabel.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> Video Ad Downloaded! (${(blob.size / (1024 * 1024)).toFixed(2)} MB)`;
        if (progressBar) progressBar.style.width = '100%';
        if (progressPct) progressPct.innerText = '100%';

        showToast('Commercial Video Exported', `Downloaded ${a.download} (${(blob.size / (1024 * 1024)).toFixed(2)} MB). Ready for marketing distribution!`);

        setTimeout(() => {
            if (progressBox) progressBox.classList.add('hidden');
        }, 5000);
    };

    recorder.start();
    renderLoopId = requestAnimationFrame(drawFrame);
};

function drawCanvasRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

/* -------------------------------------------------------------
 * CAREERS & WORKFORCE PORTAL (CONSTRUCTION LABOR & SKILLED TRADES)
 * ------------------------------------------------------------- */
const DEFAULT_CAREER_POSITIONS = [
    // Civil & Structural Trades
    {
        id: "POS-CIVIL-01",
        title: "Structural Steel Erector / SMAW-FCAW Welder",
        category: "civil",
        categoryLabel: "Civil & Structural",
        type: "Project-Based",
        rate: "₱950 - ₱1,350 / day + OT",
        vacancies: "8 Vacancies",
        location: "Metro Manila High-Rise Sites",
        certs: ["TESDA SMAW NC II", "FCAW 6G", "Working at Heights"],
        desc: "Responsible for erecting heavy structural steel moment frames, column splicing, high-tensile bolt torquing, and full-penetration welding on multi-story commercial and industrial towers."
    },
    {
        id: "POS-CIVIL-02",
        title: "Heavy Equipment & Tower Crane Operator",
        category: "civil",
        categoryLabel: "Civil & Structural",
        type: "Full-Time",
        rate: "₱1,200 - ₱1,650 / day + OT",
        vacancies: "4 Vacancies",
        location: "Calabarzon & Metro Manila Sites",
        certs: ["TESDA Crane Operation NC III", "LTO License Code 8", "Rigging Safety"],
        desc: "Operates 50-ton mobile cranes and top-slewing tower cranes for lifting heavy precast panels, structural steel sections, and concrete bucket pours with zero-blind-spot coordination."
    },
    {
        id: "POS-CIVIL-03",
        title: "Monolithic Concrete Finisher & Laser-Screed Mason",
        category: "civil",
        categoryLabel: "Civil & Structural",
        type: "Project-Based",
        rate: "₱800 - ₱1,100 / day + OT",
        vacancies: "10 Vacancies",
        location: "Commercial Logistics Parks & Slabs",
        certs: ["TESDA Masonry NC II", "Power Trowel Operation"],
        desc: "Specializes in high-tolerance FF/FL floor slab finishing, vibratory screeding, power troweling, monolithic toppings, and structural concrete joint cutting."
    },
    {
        id: "POS-CIVIL-04",
        title: "Master Rebar Fabricator & Steelfixer",
        category: "civil",
        categoryLabel: "Civil & Structural",
        type: "Project-Based",
        rate: "₱850 - ₱1,150 / day + OT",
        vacancies: "8 Vacancies",
        location: "Bridge & Civil Substructure Projects",
        certs: ["TESDA Reinforcing Steel NC II", "Blueprint Reading"],
        desc: "Reads structural engineering rebar schedules, cuts and bends high-tensile Grade 60 rebars, and ties complex foundation footing and column cage matrices."
    },
    {
        id: "POS-CIVIL-05",
        title: "Civil Earthworks & Shoring Lead Foreman",
        category: "civil",
        categoryLabel: "Civil & Structural",
        type: "Full-Time",
        rate: "₱32,000 - ₱42,000 / month",
        vacancies: "2 Vacancies",
        location: "Basement Excavation Sites",
        certs: ["TESDA Civil Works Lead", "DOLE COSH", "5+ Yrs Exp"],
        desc: "Oversees site grading, deep basement excavation, soldier pile shoring, soil nailing, and dewatering pumps in compliance with geotechnical specifications."
    },

    // Architectural & Interior Fit-Out Trades
    {
        id: "POS-FITOUT-01",
        title: "Master Architectural Joiner & Finish Carpenter",
        category: "fitout",
        categoryLabel: "Architectural Fit-Out",
        type: "Full-Time",
        rate: "₱900 - ₱1,300 / day + OT",
        vacancies: "6 Vacancies",
        location: "Corporate Headquarters & Hotel Fit-Outs",
        certs: ["TESDA Carpentry NC II", "Millwork Precision"],
        desc: "Executes luxury corporate woodwork, acoustic wall paneling, bespoke executive reception counters, and precision architectural door framing."
    },
    {
        id: "POS-FITOUT-02",
        title: "Drywall Partitions & Acoustic Ceiling Specialist",
        category: "fitout",
        categoryLabel: "Architectural Fit-Out",
        type: "Project-Based",
        rate: "₱850 - ₱1,150 / day + OT",
        vacancies: "8 Vacancies",
        location: "Commercial BPO Office Fit-Outs",
        certs: ["Gypsum Board Specialist", "Laser Leveling Cert"],
        desc: "Installs galvanized metal stud framing, fire-rated moisture-resistant gypsum boards, acoustic baffle ceilings, and seamless joint taping."
    },
    {
        id: "POS-FITOUT-03",
        title: "Commercial Tile & Natural Stone Mason",
        category: "fitout",
        categoryLabel: "Architectural Fit-Out",
        type: "Project-Based",
        rate: "₱850 - ₱1,200 / day + OT",
        vacancies: "6 Vacancies",
        location: "Commercial Lobby & Luxury Bath Projects",
        certs: ["TESDA Tile Setting NC II", "Large-Format Porcelain"],
        desc: "Lays large-format 1200x600mm porcelain tiles, natural granite cladding, and epoxy grout sealing with leveling clips achieving flawless planar alignment."
    },
    {
        id: "POS-FITOUT-04",
        title: "Glazing Specialist & Aluminium Curtain-Wall Fabricator",
        category: "fitout",
        categoryLabel: "Architectural Fit-Out",
        type: "Full-Time",
        rate: "₱900 - ₱1,250 / day + OT",
        vacancies: "4 Vacancies",
        location: "Curtain-Wall High-Rise Enclosures",
        certs: ["Curtain-Wall Installation", "Spider Glazing"],
        desc: "Fabricates and installs double-glazed unitized curtain wall cassettes, frameless acoustic glass storefronts, and structural silicone weather seals."
    },
    {
        id: "POS-FITOUT-05",
        title: "Commercial Painter & High-Performance Epoxy Applicator",
        category: "fitout",
        categoryLabel: "Architectural Fit-Out",
        type: "Project-Based",
        rate: "₱800 - ₱1,100 / day + OT",
        vacancies: "6 Vacancies",
        location: "Industrial Floors & Commercial Buildings",
        certs: ["Airless Spray Cert", "Epoxy Coating Specialist"],
        desc: "Applies industrial self-leveling floor epoxy, polyurethane anti-skid coatings, airless wall priming, and textured decorative finishes."
    },

    // MEP Engineering Trades
    {
        id: "POS-MEP-01",
        title: "Licensed Master Electrician & Cable Jointer",
        category: "mep",
        categoryLabel: "MEP Engineering",
        type: "Full-Time",
        rate: "₱1,100 - ₱1,500 / day + OT",
        vacancies: "5 Vacancies",
        location: "Substations & High-Rise Buildings",
        certs: ["PRC Master Electrician", "TESDA Electrical NC II/III"],
        desc: "Installs three-phase main distribution boards, busducts, transformer switchgear, emergency generator transfer switches, and conduit routing."
    },
    {
        id: "POS-MEP-02",
        title: "Certified Master Plumber & High-Pressure Pipefitter",
        category: "mep",
        categoryLabel: "MEP Engineering",
        type: "Full-Time",
        rate: "₱950 - ₱1,350 / day + OT",
        vacancies: "5 Vacancies",
        location: "Commercial Water Supply & Fire Mains",
        certs: ["TESDA Plumbing NC II", "Electrofusion HDPE Welding"],
        desc: "Routinely executes PPR sanitary risers, cast iron soil pipes, booster pump skids, and wet standpipe fire protection sprinkler systems."
    },
    {
        id: "POS-MEP-03",
        title: "HVAC Ducting, VRF & Chiller Technician",
        category: "mep",
        categoryLabel: "MEP Engineering",
        type: "Project-Based",
        rate: "₱1,000 - ₱1,400 / day + OT",
        vacancies: "4 Vacancies",
        location: "Commercial Central HVAC Projects",
        certs: ["TESDA RAC Servicing NC II", "Brazing Safety"],
        desc: "Installs galvanized sheet ductwork, VRF copper line sets, chilled water fan coil units, and performs nitrogen pressure leak tests."
    },

    // General Construction Labor & Site Safety
    {
        id: "POS-LABOR-01",
        title: "Construction General Laborer (Site Logistics & Clearing)",
        category: "labor",
        categoryLabel: "General Labor & Safety",
        type: "Project-Based",
        rate: "₱650 - ₱850 / day + OT",
        vacancies: "12 Vacancies",
        location: "All Active Metro Manila & Rizal Sites",
        certs: ["Fit-to-Work Medical", "Basic Site Safety Induction"],
        desc: "Assists with material offloading, staging rebar and cement sacks, manual excavation, concrete mixing support, and 5S site housekeeping."
    },
    {
        id: "POS-LABOR-02",
        title: "Rigging, Scaffolding & Formwork Crew",
        category: "labor",
        categoryLabel: "General Labor & Safety",
        type: "Project-Based",
        rate: "₱850 - ₱1,150 / day + OT",
        vacancies: "8 Vacancies",
        location: "High-Rise Elevated Deck Works",
        certs: ["TESDA Scaffolding Erector NC II", "Fall Protection"],
        desc: "Erects modular ringlock and cuplock scaffolding towers, heavy-duty shoring jacks, and engineered column formwork clamps."
    },
    {
        id: "POS-LABOR-03",
        title: "DOLE-Accredited Construction Safety Officer (SO2 / SO3)",
        category: "labor",
        categoryLabel: "General Labor & Safety",
        type: "Full-Time",
        rate: "₱35,000 - ₱48,000 / month",
        vacancies: "2 Vacancies",
        location: "Turnkey Commercial Sites",
        certs: ["DOLE-BWC Accredited", "COSH (40 Hours)", "First Aider"],
        desc: "Enforces DOLE DO 13 construction safety guidelines, leads daily morning toolbox talks, inspects heavy machinery, and maintains MIRR's 1.5M+ zero-incident record."
    }
];

let currentCareerCategory = 'all';
let careerSearchTerm = '';
let careerTypeFilter = 'all';
let currentAttachedResume = null; // { name, size, type, dataUrl }
const ADMIN_SECRET_PIN = 'mirr2026';

function initCareersPortal() {
    // 1. Initialize stored positions in localStorage if empty
    if (!localStorage.getItem('mirr_career_positions')) {
        localStorage.setItem('mirr_career_positions', JSON.stringify(DEFAULT_CAREER_POSITIONS));
    }

    // 2. Setup Drag and Drop listeners on Resume Zone
    setupResumeDropZone();

    // 3. Update Admin Session UI state
    updateCareerAdminUIState();

    // 4. Render initial positions
    renderCareerPositions();

    // 5. Update applications inbox count
    updateInboxBadgeCount();
}

function getCareerPositions() {
    try {
        const stored = localStorage.getItem('mirr_career_positions');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}
    return DEFAULT_CAREER_POSITIONS;
}

function saveCareerPositions(positions) {
    try {
        localStorage.setItem('mirr_career_positions', JSON.stringify(positions));
    } catch (e) {}
    renderCareerPositions();
}

function getCareerApplications() {
    try {
        const stored = localStorage.getItem('mirr_career_applications');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) {}
    return [];
}

function saveCareerApplications(apps) {
    try {
        localStorage.setItem('mirr_career_applications', JSON.stringify(apps));
    } catch (e) {}
    updateInboxBadgeCount();
}

function isCareerAdmin() {
    return sessionStorage.getItem('mirr_career_admin_auth') === 'true' || localStorage.getItem('mirr_career_admin_auth') === 'true';
}

function updateCareerAdminUIState() {
    const adminPanel = document.getElementById('career-admin-panel');
    const toggleBtn = document.getElementById('career-admin-toggle-btn');
    const label = document.getElementById('career-admin-btn-label');
    const lockIcon = document.getElementById('career-admin-lock-icon');

    const loggedIn = isCareerAdmin();

    if (adminPanel) {
        if (loggedIn) {
            adminPanel.classList.remove('hidden');
        } else {
            adminPanel.classList.add('hidden');
        }
    }

    if (toggleBtn && label && lockIcon) {
        if (loggedIn) {
            label.innerText = 'Admin Active';
            lockIcon.className = 'fa-solid fa-unlock text-emerald-400';
            toggleBtn.classList.add('border-emerald-500/50', 'text-emerald-400');
            toggleBtn.classList.remove('text-amber-400');
        } else {
            label.innerText = 'Admin Access';
            lockIcon.className = 'fa-solid fa-lock text-amber-400';
            toggleBtn.classList.remove('border-emerald-500/50', 'text-emerald-400');
            toggleBtn.classList.add('text-amber-400');
        }
    }
}

function updateInboxBadgeCount() {
    const badge = document.getElementById('career-inbox-badge');
    if (!badge) return;
    const apps = getCareerApplications();
    badge.innerText = apps.length;
}

function renderCareerPositions() {
    const grid = document.getElementById('career-positions-grid');
    const emptyState = document.getElementById('career-empty-state');
    const totalCountEl = document.getElementById('career-total-count');
    const vacanciesEl = document.getElementById('career-vacancies-count');
    if (!grid) return;

    const allPositions = getCareerPositions();
    const isAdmin = isCareerAdmin();

    // Update Category Counts in Filter Buttons
    const counts = { all: allPositions.length, civil: 0, fitout: 0, mep: 0, labor: 0 };
    allPositions.forEach(p => {
        if (counts[p.category] !== undefined) counts[p.category]++;
    });
    const cAll = document.getElementById('cat-count-all');
    const cCivil = document.getElementById('cat-count-civil');
    const cFitout = document.getElementById('cat-count-fitout');
    const cMep = document.getElementById('cat-count-mep');
    const cLabor = document.getElementById('cat-count-labor');
    if (cAll) cAll.innerText = `(${counts.all})`;
    if (cCivil) cCivil.innerText = `(${counts.civil})`;
    if (cFitout) cFitout.innerText = `(${counts.fitout})`;
    if (cMep) cMep.innerText = `(${counts.mep})`;
    if (cLabor) cLabor.innerText = `(${counts.labor})`;

    // Filter positions
    const filtered = allPositions.filter(p => {
        // Category check
        if (currentCareerCategory !== 'all' && p.category !== currentCareerCategory) return false;

        // Type check
        if (careerTypeFilter !== 'all' && p.type !== careerTypeFilter) return false;

        // Search check
        if (careerSearchTerm.trim() !== '') {
            const term = careerSearchTerm.toLowerCase();
            const matchTitle = (p.title || '').toLowerCase().includes(term);
            const matchDesc = (p.desc || '').toLowerCase().includes(term);
            const matchLocation = (p.location || '').toLowerCase().includes(term);
            const matchCerts = (p.certs || []).some(c => c.toLowerCase().includes(term));
            if (!matchTitle && !matchDesc && !matchLocation && !matchCerts) return false;
        }

        return true;
    });

    if (totalCountEl) totalCountEl.innerText = `${allPositions.length} Trade Positions Open`;
    if (vacanciesEl) {
        let totalSlots = 0;
        allPositions.forEach(p => {
            const num = parseInt(p.vacancies) || 4;
            totalSlots += num;
        });
        vacanciesEl.innerText = `${totalSlots}+ Active Field Slots`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    const categoryBadges = {
        civil: { label: "Civil & Structural", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40", icon: "fa-trowel-bricks" },
        fitout: { label: "Architectural Fit-Out", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40", icon: "fa-paint-roller" },
        mep: { label: "MEP Engineering", color: "text-yellow-400 border-yellow-500/30 bg-yellow-950/40", icon: "fa-bolt" },
        labor: { label: "General Labor & Safety", color: "text-rose-400 border-rose-500/30 bg-rose-950/40", icon: "fa-shield-halved" }
    };

    grid.innerHTML = filtered.map(p => {
        const catInfo = categoryBadges[p.category] || categoryBadges.civil;
        const certTags = (p.certs || []).map(c => `
            <span class="neu-pill px-2 py-0.5 text-[9px] text-slate-300 font-mono">
                <i class="fa-solid fa-check text-amber-400 mr-0.5"></i> ${c}
            </span>
        `).join('');

        const adminActions = isAdmin ? `
            <div class="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    <i class="fa-solid fa-gear"></i> Admin Controls
                </span>
                <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openPositionEditor('${p.id}')" class="neu-btn px-2.5 py-1 text-[11px] font-bold text-amber-400 hover:text-white flex items-center gap-1" title="Edit Position">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button type="button" onclick="deleteCareerPosition('${p.id}')" class="neu-btn px-2.5 py-1 text-[11px] font-bold text-red-400 hover:text-white flex items-center gap-1" title="Delete Position">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        ` : '';

        return `
            <div class="neu-card career-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between relative group">
                <div>
                    <!-- Top Telemetry Row -->
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="neu-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${catInfo.color}">
                            <i class="fa-solid ${catInfo.icon} mr-1"></i> ${p.categoryLabel || catInfo.label}
                        </span>
                        <div class="flex items-center gap-1.5">
                            <span class="neu-pill px-2 py-0.5 text-[10px] text-slate-300 font-bold">${p.type}</span>
                            <span class="neu-pill px-2 py-0.5 text-[10px] text-emerald-400 font-extrabold bg-emerald-950/60 border border-emerald-500/30">${p.vacancies}</span>
                        </div>
                    </div>

                    <!-- Job Title -->
                    <h3 class="text-base sm:text-lg font-black font-heading text-white group-hover:text-amber-400 transition-colors leading-snug">
                        ${p.title}
                    </h3>

                    <!-- Daily Rate & Location Strip -->
                    <div class="mt-2.5 pb-2.5 border-b border-white/10 flex flex-col gap-1 text-xs">
                        <div class="flex items-center gap-2">
                            <span class="text-slate-400 text-[11px]">Rate:</span>
                            <span class="font-mono font-bold text-cyan-300 text-xs">${p.rate}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-slate-300 text-[11px]">
                            <i class="fa-solid fa-location-dot text-amber-400"></i>
                            <span class="truncate">${p.location}</span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-3">
                        ${p.desc}
                    </p>

                    <!-- Required Certifications Tags -->
                    <div class="flex flex-wrap gap-1.5 mt-3">
                        ${certTags}
                    </div>
                </div>

                <!-- Card Action Footer -->
                <div class="mt-5 pt-3.5 border-t border-white/10">
                    <button type="button" onclick="openApplyModal('${p.id}')" class="neu-btn-primary w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md group-hover:scale-[1.02] transition-transform">
                        <i class="fa-solid fa-file-arrow-up"></i>
                        <span>Apply & Drop Resume</span>
                    </button>
                    ${adminActions}
                </div>
            </div>
        `;
    }).join('');
}

window.setCareerCategoryFilter = function(category) {
    currentCareerCategory = category;
    const buttons = document.querySelectorAll('.career-filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
            btn.classList.remove('text-slate-300');
        } else {
            btn.classList.remove('active');
            btn.classList.add('text-slate-300');
        }
    });
    renderCareerPositions();
};

window.filterCareerPositions = function() {
    const searchInput = document.getElementById('career-search-input');
    const typeSelect = document.getElementById('career-type-filter');
    careerSearchTerm = searchInput ? searchInput.value : '';
    careerTypeFilter = typeSelect ? typeSelect.value : 'all';
    renderCareerPositions();
};

window.resetCareerFilters = function() {
    const searchInput = document.getElementById('career-search-input');
    const typeSelect = document.getElementById('career-type-filter');
    if (searchInput) searchInput.value = '';
    if (typeSelect) typeSelect.value = 'all';
    careerSearchTerm = '';
    careerTypeFilter = 'all';
    window.setCareerCategoryFilter('all');
};

/* Resume File Drag and Drop Engine */
function setupResumeDropZone() {
    const zone = document.getElementById('resume-drop-zone');
    if (!zone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        zone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            zone.classList.add('drag-active');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        zone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            zone.classList.remove('drag-active');
        });
    });

    zone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
            processResumeFile(files[0]);
        }
    });
}

window.triggerResumeBrowse = function() {
    const input = document.getElementById('resume-file-input');
    if (input) input.click();
};

window.handleResumeFileSelected = function(e) {
    if (e.target.files && e.target.files.length > 0) {
        processResumeFile(e.target.files[0]);
    }
};

function processResumeFile(file) {
    const emptyState = document.getElementById('drop-zone-empty');
    const loadedState = document.getElementById('drop-zone-loaded');
    const nameEl = document.getElementById('resume-file-name');
    const sizeEl = document.getElementById('resume-file-size');
    const iconEl = document.getElementById('resume-file-icon');

    if (!file) return;

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showToast('File Too Large', 'Please upload a resume under 10MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        currentAttachedResume = {
            name: file.name,
            size: formatBytes(file.size),
            type: file.type || 'application/octet-stream',
            dataUrl: event.target.result
        };

        if (nameEl) nameEl.innerText = file.name;
        if (sizeEl) sizeEl.innerText = formatBytes(file.size);

        if (iconEl) {
            if (file.name.endsWith('.pdf')) {
                iconEl.className = 'fa-solid fa-file-pdf text-red-400';
            } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                iconEl.className = 'fa-solid fa-file-word text-blue-400';
            } else {
                iconEl.className = 'fa-solid fa-file-image text-emerald-400';
            }
        }

        if (emptyState) emptyState.classList.add('hidden');
        if (loadedState) {
            loadedState.classList.remove('hidden');
            loadedState.classList.add('flex');
        }
    };
    reader.readAsDataURL(file);
}

window.removeResumeFile = function(e) {
    if (e) e.stopPropagation();
    currentAttachedResume = null;
    const input = document.getElementById('resume-file-input');
    const emptyState = document.getElementById('drop-zone-empty');
    const loadedState = document.getElementById('drop-zone-loaded');

    if (input) input.value = '';
    if (loadedState) {
        loadedState.classList.remove('flex');
        loadedState.classList.add('hidden');
    }
    if (emptyState) emptyState.classList.remove('hidden');
};

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/* Candidate Application Modal Controls */
window.openApplyModal = function(posIdOrTitle) {
    const modal = document.getElementById('career-apply-modal');
    const titleEl = document.getElementById('apply-modal-job-title');
    const rateEl = document.getElementById('apply-modal-job-rate');
    const typeEl = document.getElementById('apply-modal-job-type');
    const idInput = document.getElementById('apply-position-id');
    const titleInput = document.getElementById('apply-position-title');

    if (!modal) return;

    let targetTitle = "General Workforce Application";
    let targetRate = "Prevailing Daily Rate + Benefits";
    let targetType = "Project-Based / Pool";
    let targetId = "GENERAL";

    const allPositions = getCareerPositions();
    const found = allPositions.find(p => p.id === posIdOrTitle || p.title === posIdOrTitle);
    if (found) {
        targetTitle = found.title;
        targetRate = found.rate;
        targetType = found.type;
        targetId = found.id;
    } else if (posIdOrTitle) {
        targetTitle = posIdOrTitle;
    }

    if (titleEl) titleEl.innerText = targetTitle;
    if (rateEl) rateEl.innerText = targetRate;
    if (typeEl) typeEl.innerText = targetType;
    if (idInput) idInput.value = targetId;
    if (titleInput) titleInput.value = targetTitle;

    // Reset resume state
    removeResumeFile();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeCareerApplyModal = function() {
    const modal = document.getElementById('career-apply-modal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};

window.handleCareerApplicationSubmit = function(e) {
    e.preventDefault();
    const idInput = document.getElementById('apply-position-id');
    const titleInput = document.getElementById('apply-position-title');
    const nameInput = document.getElementById('apply-candidate-name');
    const phoneInput = document.getElementById('apply-candidate-phone');
    const emailInput = document.getElementById('apply-candidate-email');
    const cityInput = document.getElementById('apply-candidate-city');
    const expSelect = document.getElementById('apply-candidate-exp');
    const licenseInput = document.getElementById('apply-candidate-license');
    const notesInput = document.getElementById('apply-candidate-notes');

    if (!currentAttachedResume) {
        showToast('Resume Required', 'Please drop or browse your resume / bio-data file before submitting.');
        return;
    }

    const trackingId = 'MIRR-HR-' + Math.floor(100000 + Math.random() * 900000);
    const newApplication = {
        id: trackingId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        positionId: idInput ? idInput.value : '',
        positionTitle: titleInput ? titleInput.value : 'General Workforce',
        name: nameInput ? nameInput.value : '',
        phone: phoneInput ? phoneInput.value : '',
        email: emailInput ? emailInput.value : 'N/A',
        city: cityInput ? cityInput.value : '',
        experience: expSelect ? expSelect.value : '',
        license: licenseInput ? licenseInput.value : 'None Stated',
        notes: notesInput ? notesInput.value : '',
        resumeName: currentAttachedResume.name,
        resumeSize: currentAttachedResume.size,
        resumeType: currentAttachedResume.type,
        resumeData: currentAttachedResume.dataUrl
    };

    const apps = getCareerApplications();
    apps.unshift(newApplication);
    saveCareerApplications(apps);

    closeCareerApplyModal();
    e.target.reset();
    removeResumeFile();

    showToast('Application Received!', `Application ${trackingId} submitted successfully. Our site recruiters will contact you within 24-48 hours.`);
};

/* Admin Authentication & Position Editor Engine */
window.openCareerAdminAuthModal = function() {
    if (isCareerAdmin()) {
        const adminPanel = document.getElementById('career-admin-panel');
        if (adminPanel) {
            adminPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast('Admin Mode Active', 'You are already authenticated as HR administrator.');
        }
        return;
    }
    const modal = document.getElementById('career-admin-auth-modal');
    if (!modal) return;
    const pinInput = document.getElementById('career-admin-pin');
    if (pinInput) pinInput.value = '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeCareerAdminAuthModal = function() {
    const modal = document.getElementById('career-admin-auth-modal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};

window.toggleAdminPinVisibility = function() {
    const pin = document.getElementById('career-admin-pin');
    const eye = document.getElementById('admin-pin-eye');
    if (!pin) return;
    if (pin.type === 'password') {
        pin.type = 'text';
        if (eye) eye.className = 'fa-solid fa-eye-slash';
    } else {
        pin.type = 'password';
        if (eye) eye.className = 'fa-solid fa-eye';
    }
};

window.handleCareerAdminLogin = function(e) {
    e.preventDefault();
    const pin = document.getElementById('career-admin-pin');
    if (!pin) return;

    if (pin.value === ADMIN_SECRET_PIN) {
        sessionStorage.setItem('mirr_career_admin_auth', 'true');
        closeCareerAdminAuthModal();
        updateCareerAdminUIState();
        renderCareerPositions();
        showToast('Admin Authorized', 'HR management console unlocked. You may now post, edit, or delete positions.');
        const panel = document.getElementById('career-admin-panel');
        if (panel) panel.scrollIntoView({ behavior: 'smooth' });
    } else {
        showToast('Access Denied', 'Incorrect Administrator PIN code. Please verify credentials.');
        pin.focus();
        pin.select();
    }
};

window.logoutCareerAdmin = function() {
    sessionStorage.removeItem('mirr_career_admin_auth');
    localStorage.removeItem('mirr_career_admin_auth');
    updateCareerAdminUIState();
    renderCareerPositions();
    showToast('Logged Out', 'Exited Administrator Mode. Public candidate view restored.');
};

/* Position Editor Modal (Create / Update) */
window.openPositionEditor = function(posId) {
    if (!isCareerAdmin()) {
        openCareerAdminAuthModal();
        return;
    }

    const modal = document.getElementById('career-position-editor-modal');
    const modalTitle = document.getElementById('position-editor-modal-title');
    const idInput = document.getElementById('editor-position-id');
    const titleInput = document.getElementById('editor-title');
    const catInput = document.getElementById('editor-category');
    const typeInput = document.getElementById('editor-type');
    const rateInput = document.getElementById('editor-rate');
    const vacanciesInput = document.getElementById('editor-vacancies');
    const locInput = document.getElementById('editor-location');
    const certsInput = document.getElementById('editor-certs');
    const descInput = document.getElementById('editor-desc');

    if (!modal) return;

    if (posId) {
        const positions = getCareerPositions();
        const found = positions.find(p => p.id === posId);
        if (found) {
            if (modalTitle) modalTitle.innerText = 'Edit Trade Position';
            if (idInput) idInput.value = found.id;
            if (titleInput) titleInput.value = found.title;
            if (catInput) catInput.value = found.category;
            if (typeInput) typeInput.value = found.type;
            if (rateInput) rateInput.value = found.rate;
            if (vacanciesInput) vacanciesInput.value = found.vacancies;
            if (locInput) locInput.value = found.location;
            if (certsInput) certsInput.value = (found.certs || []).join(', ');
            if (descInput) descInput.value = found.desc;
        }
    } else {
        if (modalTitle) modalTitle.innerText = 'Post New Trade Position';
        if (idInput) idInput.value = '';
        const form = document.getElementById('career-position-form');
        if (form) form.reset();
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closePositionEditor = function() {
    const modal = document.getElementById('career-position-editor-modal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};

window.handleSavePosition = function(e) {
    e.preventDefault();
    if (!isCareerAdmin()) {
        showToast('Unauthorized', 'Admin authentication required.');
        return;
    }

    const idInput = document.getElementById('editor-position-id');
    const titleInput = document.getElementById('editor-title');
    const catInput = document.getElementById('editor-category');
    const typeInput = document.getElementById('editor-type');
    const rateInput = document.getElementById('editor-rate');
    const vacanciesInput = document.getElementById('editor-vacancies');
    const locInput = document.getElementById('editor-location');
    const certsInput = document.getElementById('editor-certs');
    const descInput = document.getElementById('editor-desc');

    const positions = getCareerPositions();
    const existingId = idInput ? idInput.value : '';

    const categoryLabels = {
        civil: "Civil & Structural",
        fitout: "Architectural Fit-Out",
        mep: "MEP Engineering",
        labor: "General Labor & Safety"
    };

    const certsArray = certsInput ? certsInput.value.split(',').map(s => s.trim()).filter(Boolean) : [];

    if (existingId) {
        // Edit existing
        const idx = positions.findIndex(p => p.id === existingId);
        if (idx !== -1) {
            positions[idx] = {
                ...positions[idx],
                title: titleInput ? titleInput.value : '',
                category: catInput ? catInput.value : 'civil',
                categoryLabel: categoryLabels[catInput.value] || 'Civil & Structural',
                type: typeInput ? typeInput.value : 'Project-Based',
                rate: rateInput ? rateInput.value : '',
                vacancies: vacanciesInput ? vacanciesInput.value : '4 Vacancies',
                location: locInput ? locInput.value : '',
                certs: certsArray.length > 0 ? certsArray : ['TESDA / DOLE Recommended'],
                desc: descInput ? descInput.value : ''
            };
            saveCareerPositions(positions);
            closePositionEditor();
            showToast('Position Updated', `"${positions[idx].title}" details have been updated successfully.`);
            return;
        }
    }

    // Create new position
    const newId = 'POS-' + (catInput ? catInput.value.toUpperCase() : 'TRADE') + '-' + Math.floor(10 + Math.random() * 90);
    const newPos = {
        id: newId,
        title: titleInput ? titleInput.value : 'New Trade Position',
        category: catInput ? catInput.value : 'civil',
        categoryLabel: categoryLabels[catInput.value] || 'Civil & Structural',
        type: typeInput ? typeInput.value : 'Project-Based',
        rate: rateInput ? rateInput.value : '₱900 - ₱1,200 / day',
        vacancies: vacanciesInput ? vacanciesInput.value : '6 Vacancies',
        location: locInput ? locInput.value : 'Metro Manila & Calabarzon Sites',
        certs: certsArray.length > 0 ? certsArray : ['TESDA NC II', 'Site Induction'],
        desc: descInput ? descInput.value : 'Responsible for field execution in accordance with project safety standards.'
    };

    positions.unshift(newPos);
    saveCareerPositions(positions);
    closePositionEditor();
    showToast('Position Published', `"${newPos.title}" is now open for applications.`);
};

window.deleteCareerPosition = function(posId) {
    if (!isCareerAdmin()) {
        showToast('Unauthorized', 'Admin privileges required.');
        return;
    }
    const positions = getCareerPositions();
    const found = positions.find(p => p.id === posId);
    const title = found ? found.title : 'this position';

    if (confirm(`Are you sure you want to delete "${title}" from open vacancies?`)) {
        const filtered = positions.filter(p => p.id !== posId);
        saveCareerPositions(filtered);
        showToast('Position Deleted', `"${title}" has been removed.`);
    }
};

window.resetCareerPositions = function() {
    if (!isCareerAdmin()) return;
    if (confirm('Restore the default 16 construction labor & skilled trade positions catalog? Any custom edits will be replaced.')) {
        saveCareerPositions(DEFAULT_CAREER_POSITIONS);
        showToast('Defaults Restored', '16 construction trade positions restored.');
    }
};

/* Admin Applications & Resumes Inbox */
window.openCareerInboxModal = function() {
    if (!isCareerAdmin()) {
        openCareerAdminAuthModal();
        return;
    }

    const modal = document.getElementById('career-inbox-modal');
    const list = document.getElementById('career-inbox-list');
    if (!modal || !list) return;

    const apps = getCareerApplications();

    if (apps.length === 0) {
        list.innerHTML = `
            <div class="neu-card p-10 text-center rounded-xl border border-white/10">
                <div class="w-12 h-12 neu-inset rounded-xl flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <i class="fa-solid fa-inbox text-xl"></i>
                </div>
                <h4 class="text-sm font-bold text-white mb-1">No Applications Received Yet</h4>
                <p class="text-xs text-slate-400">When candidates apply and drop resumes, their records and attached files will appear here.</p>
            </div>
        `;
    } else {
        list.innerHTML = apps.map(app => `
            <div class="neu-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div class="space-y-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-bold text-white text-sm">${app.name}</span>
                        <span class="neu-pill px-2 py-0.5 text-[9px] text-amber-400 font-extrabold uppercase">${app.positionTitle}</span>
                        <span class="text-[10px] text-slate-400 font-mono">${app.date}</span>
                    </div>
                    <div class="flex items-center gap-3 text-slate-300 text-[11px] flex-wrap">
                        <span><i class="fa-solid fa-phone text-amber-400 mr-1"></i> ${app.phone}</span>
                        <span><i class="fa-solid fa-envelope text-cyan-400 mr-1"></i> ${app.email}</span>
                        <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> ${app.city}</span>
                        <span><i class="fa-solid fa-briefcase text-slate-400 mr-1"></i> ${app.experience}</span>
                    </div>
                    ${app.notes ? `<p class="text-[11px] text-slate-300 italic pt-0.5">"${app.notes}"</p>` : ''}
                    <div class="text-[10px] text-slate-400 font-mono">
                        Tracking ID: <span class="text-white">${app.id}</span> • Attached: <span class="text-cyan-300">${app.resumeName}</span> (${app.resumeSize})
                    </div>
                </div>

                <div class="flex items-center gap-2 flex-shrink-0">
                    <button type="button" onclick="downloadCandidateResume('${app.id}')" class="neu-btn-primary px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 shadow-sm" title="Download Candidate Resume">
                        <i class="fa-solid fa-download"></i>
                        <span>Download Resume</span>
                    </button>
                    <button type="button" onclick="deleteCandidateApplication('${app.id}')" class="neu-btn w-8 h-8 flex items-center justify-center text-red-400 hover:text-white" title="Delete record">
                        <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeCareerInboxModal = function() {
    const modal = document.getElementById('career-inbox-modal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};

window.downloadCandidateResume = function(appId) {
    const apps = getCareerApplications();
    const app = apps.find(a => a.id === appId);
    if (!app || !app.resumeData) {
        showToast('Resume File Missing', 'No downloadable resume file found for this record.');
        return;
    }

    const a = document.createElement('a');
    a.href = app.resumeData;
    a.download = `${app.name.replace(/\s+/g, '_')}_${app.resumeName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast('Download Started', `Downloading resume for ${app.name}.`);
};

window.deleteCandidateApplication = function(appId) {
    if (!confirm('Are you sure you want to remove this applicant record?')) return;
    const apps = getCareerApplications();
    const filtered = apps.filter(a => a.id !== appId);
    saveCareerApplications(filtered);
    openCareerInboxModal();
    showToast('Application Deleted', 'Candidate record removed.');
};

window.clearAllApplications = function() {
    if (!confirm('Delete all submitted candidate applications? This cannot be undone.')) return;
    saveCareerApplications([]);
    openCareerInboxModal();
    showToast('Inbox Cleared', 'All candidate application records have been deleted.');
};

window.exportApplicationsJson = function() {
    const apps = getCareerApplications();
    if (apps.length === 0) {
        showToast('No Data', 'There are no applications to export.');
        return;
    }
    const blob = new Blob([JSON.stringify(apps, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIRR-Career-Applications-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Export Complete', 'Exported applications database as JSON.');
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
    const applyModal = document.getElementById('career-apply-modal');
    const adminAuthModal = document.getElementById('career-admin-auth-modal');
    const editorModal = document.getElementById('career-position-editor-modal');
    const inboxModal = document.getElementById('career-inbox-modal');

    if (e.target === serviceModal) closeServiceModal();
    if (e.target === videoModal) closeVideoModal();
    if (e.target === applyModal) closeCareerApplyModal();
    if (e.target === adminAuthModal) closeCareerAdminAuthModal();
    if (e.target === editorModal) closePositionEditor();
    if (e.target === inboxModal) closeCareerInboxModal();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeServiceModal();
        closeVideoModal();
        closeCareerApplyModal();
        closeCareerAdminAuthModal();
        closePositionEditor();
        closeCareerInboxModal();
    }
});
