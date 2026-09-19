// ---------- Header: add background after scrolling ----------
const header = document.querySelector('header');

const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Mobile menu ----------
const toggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelector('#menu-links');
const toggleIcon = toggle.querySelector('.material-symbols-outlined');

const setMenu = (open) => {
    menuLinks.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    toggleIcon.textContent = open ? 'close' : 'menu';
};

toggle.addEventListener('click', () => {
    setMenu(!menuLinks.classList.contains('open'));
});

// Close after choosing a link, clicking outside, or pressing Escape
menuLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

// ---------- Menu tabs (Kopi / Non-kopi / Camilan) ----------
const tabs = [...document.querySelectorAll('.tab')];
const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

const selectTab = (tab, focus = false) => {
    tabs.forEach((t, i) => {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
    });
    if (focus) tab.focus();
};

tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        selectTab(tabs[(i + dir + tabs.length) % tabs.length], true);
    });
});

selectTab(tabs[0]);

// ---------- Contact form: send the message through WhatsApp ----------
// Ganti dengan nomor WhatsApp toko (format internasional, tanpa + atau 0 di depan)
const WA_NUMBER = '6281200000000';

document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const message = e.target.elements.message.value.trim();
    const text = `Halo Coffee, saya ${name}. ${message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

// ---------- Footer year ----------
document.querySelector('#year').textContent = new Date().getFullYear();
