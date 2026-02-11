 // Default configuration
    const defaultConfig = {
      company_name: 'Nova Acústica',
      hero_title: 'Esquadrias de Alumínio Sob Medida',
      hero_subtitle: 'Transformamos ambientes com janelas e portas de alta performance. Conforto térmico, isolamento acústico e design sofisticado para sua casa ou empresa.',
      phone_number: '(11) 99999-9999',
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
          const whatsappUrl = `https://wa.me/55${phoneClean}?text=Olá! Gostaria de solicitar um orçamento.`;
          document.getElementById('whatsapp-link').href = whatsappUrl;
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

    // Form submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show success message
      successMessage.classList.remove('hidden');
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    });

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
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9cc66aa7d62ce1ea',t:'MTc3MDgzOTg2MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
