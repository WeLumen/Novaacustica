 // Default configuration
    const defaultConfig = {
      company_name: 'Nova Acústica',
      hero_title: 'Esquadrias de Alumínio Sob Medida',
      hero_subtitle: 'Transformamos ambientes com janelas e portas de alta performance. Conforto térmico, isolamento acústico e design sofisticado para sua casa ou empresa.',
      phone_number: '(11) 94621-9072',
      email_address: 'contato@novaacustica.com.br',
      address_text: 'São Paulo - SP'
    };

    // Initialize Element SDK
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
          // Update company name
          const companyName = config.company_name || defaultConfig.company_name;
          document.getElementById('nav-company-name').textContent = companyName;
          document.getElementById('footer-company-name').textContent = companyName;
          
          // Update hero content
          const heroTitle = config.hero_title || defaultConfig.hero_title;
          const heroSubtitle = config.hero_subtitle || defaultConfig.hero_subtitle;
          document.getElementById('hero-title').innerHTML = heroTitle.replace('Sob Medida', '<span class="accent-green">Sob Medida</span>');
          document.getElementById('hero-subtitle').textContent = heroSubtitle;
          
          // Update contact info
          const phone = config.phone_number || defaultConfig.phone_number;
          const email = config.email_address || defaultConfig.email_address;
          const address = config.address_text || defaultConfig.address_text;
          document.getElementById('contact-phone').textContent = phone;
          document.getElementById('contact-email').textContent = email;
          document.getElementById('contact-address').textContent = address;
          
          // Update WhatsApp links
          const phoneClean = phone.replace(/\D/g, '');
          const phoneHref = `tel:+55${phoneClean}`;
          const emailHref = `mailto:${email}`;
          const whatsappUrl = "https://wa.me/5511946219072";
          const whatsappPrimaryLink = document.getElementById('whatsapp-link');
          if (whatsappPrimaryLink) {
            whatsappPrimaryLink.href = whatsappUrl;
          }
          document.getElementById('floating-whatsapp').href = whatsappUrl;

          const whatsappSecondaryLink = document.getElementById('whatsapp-secondary-link');
          if (whatsappSecondaryLink) {
            whatsappSecondaryLink.href = whatsappUrl;
          }

          const phoneLink = document.getElementById('contact-phone-link');
          if (phoneLink) {
            phoneLink.href = phoneHref;
          }

          const emailLink = document.getElementById('contact-email-link');
          if (emailLink) {
            emailLink.href = emailHref;
          }

          const inlineEmailLink = document.getElementById('contact-email-link-inline');
          if (inlineEmailLink) {
            inlineEmailLink.href = emailHref;
          }
        },
        mapToCapabilities: (config) => ({
          recolorables: [],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
          ['company_name', config.company_name || defaultConfig.company_name],
          ['hero_title', config.hero_title || defaultConfig.hero_title],
          ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
          ['phone_number', config.phone_number || defaultConfig.phone_number],
          ['email_address', config.email_address || defaultConfig.email_address],
          ['address_text', config.address_text || defaultConfig.address_text]
        ])
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-lg');
      } else {
        navbar.classList.remove('bg-white', 'shadow-lg');
      }
    });

    // Form submission is handled by FormSubmit (action/method on the form)

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
          return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Dynamic gallery with progressive loading and filters
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryLoadMoreBtn = document.getElementById('gallery-load-more');
    const galleryCount = document.getElementById('gallery-count');
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');

    if (galleryGrid && galleryLoadMoreBtn && galleryCount) {
      const totalImages = Number.parseInt(galleryGrid.dataset.totalImages || '0', 10);
      const initialCount = Number.parseInt(galleryGrid.dataset.initialCount || '8', 10);
      const batchCount = Number.parseInt(galleryGrid.dataset.batchCount || '6', 10);
      const basePath = galleryGrid.dataset.basePath || 'src/img';
      const extension = galleryGrid.dataset.extension || 'jpeg';
      const videoExtension = galleryGrid.dataset.videoExtension || 'mp4';
      const parseIndexSet = (rawValue) => new Set(
        (rawValue || '')
          .split(',')
          .map((value) => Number.parseInt(value.trim(), 10))
          .filter((value) => Number.isInteger(value) && value > 0)
      );
      const doorIndexes = parseIndexSet(galleryGrid.dataset.portas);
      const videoIndexes = parseIndexSet(galleryGrid.dataset.videos);
      const doorVideoCount = [...doorIndexes].filter((index) => videoIndexes.has(index)).length;
      const windowVideoCount = [...videoIndexes].filter((index) => !doorIndexes.has(index)).length;

      let nextIndexToRender = 1;
      let currentFilter = 'all';

      const setActiveFilterButton = (activeFilter) => {
        galleryFilterButtons.forEach((button) => {
          const isActive = button.dataset.filter === activeFilter;
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          button.classList.toggle('bg-accent-green', isActive);
          button.classList.toggle('text-white', isActive);
          button.classList.toggle('border-emerald-500', isActive);
          button.classList.toggle('shadow-lg', isActive);
          button.classList.toggle('shadow-green-500/20', isActive);
          button.classList.toggle('text-slate-700', !isActive);
          button.classList.toggle('bg-white', !isActive);
          button.classList.toggle('border-slate-300', !isActive);
        });
      };

      const shouldShowCard = (card) => {
        if (currentFilter === 'all') {
          return true;
        }
        if (currentFilter === 'videos') {
          return card.dataset.media === 'video';
        }
        if (card.dataset.media === 'video') {
          return false;
        }
        return card.dataset.category === currentFilter;
      };

      const getTotalForFilter = () => {
        if (currentFilter === 'all') {
          return totalImages;
        }
        if (currentFilter === 'portas') {
          return Math.max(doorIndexes.size - doorVideoCount, 0);
        }
        if (currentFilter === 'janelas') {
          return Math.max((totalImages - doorIndexes.size) - windowVideoCount, 0);
        }
        if (currentFilter === 'videos') {
          return videoIndexes.size;
        }
        return totalImages;
      };

      const buildImageCard = (imageNumber) => {
        const card = document.createElement('div');
        card.className = 'gallery-item rounded-2xl overflow-hidden shadow-lg aspect-square sm:aspect-square aspect-[4/5]';
        card.dataset.index = String(imageNumber);
        card.dataset.category = doorIndexes.has(imageNumber) ? 'portas' : 'janelas';
        card.dataset.media = videoIndexes.has(imageNumber) ? 'video' : 'image';

        const index = String(imageNumber);
        const paddedIndex = index.padStart(2, '0');
        const imageCandidates = [
          `${basePath}/${index}.${extension}`,
          `${basePath}/${paddedIndex}.${extension}`
        ];
        const videoCandidates = [
          `${basePath}/${index}.${videoExtension}`,
          `${basePath}/${paddedIndex}.${videoExtension}`
        ];

        const image = document.createElement('img');
        image.className = 'w-full h-full object-cover';
        image.loading = 'lazy';
        image.decoding = 'async';
        image.alt = `Projeto Nova Acustica ${imageNumber}`;

        let imageTryIndex = 0;
        image.src = imageCandidates[imageTryIndex];

        image.addEventListener('error', () => {
          imageTryIndex += 1;
          if (imageTryIndex < imageCandidates.length) {
            image.src = imageCandidates[imageTryIndex];
            return;
          }

          const video = document.createElement('video');
          video.className = 'w-full h-full object-cover bg-black';
          video.controls = true;
          video.preload = 'metadata';
          video.playsInline = true;

          let videoTryIndex = 0;
          const tryNextVideo = () => {
            if (videoTryIndex >= videoCandidates.length) {
              return;
            }
            video.src = videoCandidates[videoTryIndex];
            videoTryIndex += 1;
          };

          video.addEventListener('error', tryNextVideo);
          tryNextVideo();
          card.dataset.media = 'video';
          card.classList.toggle('hidden', !shouldShowCard(card));
          card.replaceChild(video, image);
        });

        card.appendChild(image);
        card.classList.toggle('hidden', !shouldShowCard(card));
        return card;
      };

      const refreshGalleryState = () => {
        const visibleCount = galleryGrid.querySelectorAll('.gallery-item:not(.hidden)').length;
        const totalForFilter = getTotalForFilter();
        galleryCount.textContent = `Exibindo ${visibleCount} de ${totalForFilter} projetos`;
        galleryLoadMoreBtn.classList.toggle('hidden', nextIndexToRender > totalImages);
      };

      const appendImages = (countToAppend) => {
        let appendedVisibleItems = 0;
        while (nextIndexToRender <= totalImages && appendedVisibleItems < countToAppend) {
          const imageNumber = nextIndexToRender;
          galleryGrid.appendChild(buildImageCard(imageNumber));
          const lastCard = galleryGrid.lastElementChild;
          if (lastCard && !lastCard.classList.contains('hidden')) {
            appendedVisibleItems += 1;
          }
          nextIndexToRender += 1;
        }
        refreshGalleryState();
      };

      const resetAndRender = () => {
        galleryGrid.innerHTML = '';
        nextIndexToRender = 1;
        appendImages(initialCount);
      };

      galleryFilterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const selectedFilter = button.dataset.filter || 'all';
          if (selectedFilter === currentFilter) {
            return;
          }
          currentFilter = selectedFilter;
          setActiveFilterButton(currentFilter);
          resetAndRender();
        });
      });

      setActiveFilterButton(currentFilter);
      appendImages(initialCount);
      galleryLoadMoreBtn.addEventListener('click', () => appendImages(batchCount));
    }

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9cc66aa7d62ce1ea',t:'MTc3MDgzOTg2MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();

