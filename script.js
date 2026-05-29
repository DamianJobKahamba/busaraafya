/* ============================================
   BUSARA AFYA — script.js
   Community Health Initiative · Tanzania
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* -- SCROLL REVEAL -- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  /* -- NAV SHADOW ON SCROLL -- */
  var nav = document.getElementById('mnav');

  function updateNavState() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 10px 34px rgba(26, 35, 126, 0.12)';
    } else {
      nav.style.boxShadow = '0 1px 0 rgba(26, 35, 126, 0.04)';
    }
  }

  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  /* -- MOBILE HAMBURGER -- */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nlinks');

  function closeMobileMenu() {
    if (!hamburger || !navLinks) return;
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMobileMenu();
    });
  }

  /* -- CONTACT FORM SUBMISSION -- */
  var formBtn = document.getElementById('form-submit');

  if (formBtn) {
    formBtn.addEventListener('click', function () {
      var firstNameEl = document.getElementById('first-name');
      var lastNameEl  = document.getElementById('last-name');
      var emailEl     = document.getElementById('email');
      var topicEl     = document.getElementById('topic');
      var messageEl   = document.getElementById('message');

      var firstName = firstNameEl ? firstNameEl.value.trim() : '';
      var email     = emailEl ? emailEl.value.trim() : '';
      var message   = messageEl ? messageEl.value.trim() : '';

      if (!firstName || !email || !message) {
        alert('Please fill in your name, email, and message before sending.');
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        if (emailEl) emailEl.focus();
        return;
      }

      formBtn.textContent = 'Message Sent ✓';
      formBtn.style.background = 'linear-gradient(135deg, #1a237e, #1565c0)';
      formBtn.disabled = true;
      formBtn.setAttribute('aria-live', 'polite');

      setTimeout(function () {
        if (firstNameEl) firstNameEl.value = '';
        if (lastNameEl)  lastNameEl.value = '';
        if (emailEl)     emailEl.value = '';
        if (messageEl)   messageEl.value = '';
        if (topicEl)     topicEl.value = '';

        formBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>';
        formBtn.style.background = '';
        formBtn.disabled = false;
      }, 3000);
    });
  }

  /* -- RESOURCE READ MORE BUTTONS -- */
  document.querySelectorAll('.rescta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      alert('Full article coming soon — content is being reviewed by our health team.');
    });
  });

  /* -- ACTIVE NAV LINK HIGHLIGHT ON SCROLL -- */
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navAnchors = document.querySelectorAll('.nlinks a[href^="#"]');

  function setActiveLink(id) {
    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      a.style.color = '';
      if (a.getAttribute('href') === '#' + id) {
        a.classList.add('active');
        a.style.color = 'var(--blue)';
      }
    });
  }

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          if (id) setActiveLink(id);
        }
      });
    }, { threshold: 0.32, rootMargin: '-80px 0px -45% 0px' });

    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }
});
