// Language Toggle
        const languages = ['en', 'lo', 'ko'];
        const languageLabels = { en: 'EN', lo: 'ລາວ', ko: '한국어' };
        let currentLangIndex = 0;
        let currentLang = languages[currentLangIndex];
        const langToggle = document.getElementById('lang-toggle');
        const langText = document.getElementById('lang-text');

        function applyLanguage() {
            currentLang = languages[currentLangIndex];
            const nextLang = languages[(currentLangIndex + 1) % languages.length];
            langText.textContent = languageLabels[nextLang];
            document.documentElement.lang = currentLang;

            languages.forEach(lang => {
                document.querySelectorAll(`[data-lang-${lang}]`).forEach(el => {
                    el.classList.toggle('lang-hidden', lang !== currentLang);
                });
            });
        }

        langToggle.addEventListener('click', () => {
            currentLangIndex = (currentLangIndex + 1) % languages.length;
            applyLanguage();
        });

        applyLanguage();

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                content.classList.toggle('hidden');
                icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Phone links still open dialer on supported devices; desktop browsers get clear feedback.
        const actionToast = document.getElementById('action-toast');
        let toastTimer;

        function showActionToast(message) {
            if (!actionToast) return;
            actionToast.textContent = message;
            actionToast.classList.remove('opacity-0', 'pointer-events-none');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                actionToast.classList.add('opacity-0', 'pointer-events-none');
            }, 2600);
        }

        function copyTextFallback(text) {
            const input = document.createElement('textarea');
            input.value = text;
            input.setAttribute('readonly', '');
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.appendChild(input);
            input.select();
            try {
                document.execCommand('copy');
            } catch (error) {
                // The dial link still works even when the browser blocks clipboard access.
            }
            document.body.removeChild(input);
        }

        document.querySelectorAll('[data-phone-link]').forEach(link => {
            link.addEventListener('click', () => {
                const phone = link.getAttribute('data-phone-display') || '020 59 991 936';

                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(phone).catch(() => copyTextFallback(phone));
                } else {
                    copyTextFallback(phone);
                }

                const toastMessages = {
                    lo: `ກຳລັງເປີດແອັບໂທ: ${phone}`,
                    ko: `전화 앱을 여는 중: ${phone}`,
                    en: `Opening phone app: ${phone}`
                };
                showActionToast(toastMessages[currentLang] || toastMessages.en);
            });
        });

        // Smooth scroll with offset for sticky header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

