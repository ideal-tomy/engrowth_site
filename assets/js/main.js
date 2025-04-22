/**
 * Engrowth Website - Main JavaScript
 * 
 * このファイルには、ウェブサイトのインタラクティブな機能を実装しています。
 * - ハンバーガーメニュー
 * - スムーススクロール
 * - GSAPアニメーション
 * - Locomotive Scrollによる慣性スクロール
 * - Barba.jsによるページ遷移
 */

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
    // 各種ライブラリの読み込み確認
    const isGSAPLoaded = typeof gsap !== 'undefined';
    const isSplitTypeLoaded = typeof SplitType !== 'undefined';
    const isLocomotiveScrollLoaded = typeof LocomotiveScroll !== 'undefined';
    const isBarbaLoaded = typeof barba !== 'undefined';

    // ハンバーガーメニューの処理
    initMobileMenu();

    // ライブラリが読み込まれている場合のみ初期化
    if (isGSAPLoaded && isSplitTypeLoaded) {
        initAnimations();
    }

    if (isLocomotiveScrollLoaded) {
        initSmoothScroll();
    }

    if (isBarbaLoaded) {
        initPageTransitions();
    }

    // リンクの遷移先の存在チェック
    checkBrokenLinks();
});

/**
 * モバイルメニューの初期化
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const globalNav = document.querySelector('.global-nav');

    if (!menuToggle || !globalNav) return;

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        globalNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる
    const menuLinks = globalNav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            globalNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && globalNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            globalNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * GSAPを使用したアニメーションの初期化
 */
function initAnimations() {
    // ヒーローセクションのアニメーション
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // SplitTypeを使って文字を分割
        const splitTitle = new SplitType(heroTitle, { types: 'chars' });
        
        gsap.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
    }

    // ヒーローサブタイトルのアニメーション
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        gsap.from(heroSubtitle, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.8
        });
    }

    // スクロールトリガーアニメーション
    gsap.registerPlugin(ScrollTrigger);

    // セクションタイトルのアニメーション
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // カードのアニメーション
    const cards = document.querySelectorAll('.card, .service-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

/**
 * Locomotive Scrollによる慣性スクロールの初期化
 */
function initSmoothScroll() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') || document.body,
        smooth: true,
        lerp: 0.1, // 慣性の強さ（0.1 = 滑らか、1 = 即時）
        multiplier: 1, // スクロールの速度倍率
        tablet: {
            smooth: true,
            breakpoint: 1024
        },
        smartphone: {
            smooth: false // モバイルでは無効化
        }
    });

    // ScrollTriggerとの連携
    if (typeof ScrollTrigger !== 'undefined') {
        scroll.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: document.body.style.transform ? 'transform' : 'fixed'
        });
    }

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        if (scroll) scroll.update();
    });
}

/**
 * Barba.jsによるページ遷移の初期化
 */
function initPageTransitions() {
    barba.init({
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.4
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 0.4
                });
            }
        }],
        views: [{
            namespace: 'home',
            beforeEnter() {
                // ホームページ特有の初期化
            },
            afterEnter() {
                // アニメーションの再初期化
                initAnimations();
            }
        }, {
            namespace: 'about',
            afterEnter() {
                // Aboutページ特有の初期化
                initAnimations();
            }
        }, {
            namespace: 'business',
            afterEnter() {
                // Businessページ特有の初期化
                initAnimations();
            }
        }, {
            namespace: 'students',
            afterEnter() {
                // Studentsページ特有の初期化
                initAnimations();
            }
        }, {
            namespace: 'vision',
            afterEnter() {
                // Visionページ特有の初期化
                initAnimations();
            }
        }, {
            namespace: 'contact',
            afterEnter() {
                // Contactページ特有の初期化
                initAnimations();
                initContactForm();
            }
        }]
    });
}

/**
 * お問い合わせフォームの初期化
 */
function initContactForm() {
    const contactForm = document.querySelector('form[name="contact"]');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        // フォームのバリデーションチェック
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('必須項目を入力してください。');
        }
    });
}

/**
 * リンクの遷移先チェック
 */
function checkBrokenLinks() {
    // 開発環境のみで使用する関数
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return;
    }

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            console.log(`Link check: ${href}`);
        }
    });
}
