'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // Hamburger
    const menu = document.querySelector('.header__nav-list');
    const menuItem = menu.querySelectorAll('.header__nav-item');
    const hamburger = document.querySelector('.header__hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('header__hamburger-active');
        menu.classList.toggle('header__nav-active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('header__hamburger-active');
            menu.classList.toggle('header__nav-active');
        });
    });

    // Modal
    const indevBtn = document.querySelectorAll('[data-modal="indev"]');
    const close = document.querySelector('.modal__close');

    indevBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.overlay').style.display = 'block';
            document.querySelector('#indev').style.display = 'block';
        });
    });

    close.addEventListener('click', () => {
        document.querySelector('.overlay').style.display = 'none';
    });

    // Timer
    const deadLine = '2023-01-20';
    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `${num}`;
        } else {
            return num;
        }
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    setClock('.promo__timer', deadLine);

    // Scrolling

    const scrolling = (upSelector) => {
        const upElem = document.querySelector(upSelector);

        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 1650) {
                upElem.classList.add('fadeIn');
                upElem.classList.remove('fadeOut');
            } else {
                upElem.classList.add('fadeOut');
                upElem.classList.remove('fadeIn');
            }
        });

        let links = document.querySelectorAll('[href^="#"]'),
            speed = 0.2;

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                let widthTop = document.documentElement.scrollTop,
                    hash = this.hash,
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,
                    start = null;

                requestAnimationFrame(step);

                function step(time) {
                    if(start === null){
                        start = time;
                    }

                    let progress = time - start,
                        r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                    if(r != widthTop + toBlock){
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        });
    };

    scrolling('.pageup');
});
