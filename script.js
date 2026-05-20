/* ============================================
   BUSARA AFYA — script.js
   Community Health Initiative · Tanzania
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ── NAV SHADOW ON SCROLL ── */
  var nav = document.getElementById('mnav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });


  /* ── MOBILE HAMBURGER ── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nlinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    /* Close menu when a nav link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }


  /* ── CONTACT FORM SUBMISSION ── */
  var formBtn = document.getElementById('form-submit');

  if (formBtn) {
    formBtn.addEventListener('click', function () {
      var firstName = document.getElementById('first-name').value.trim();
      var email     = document.getElementById('email').value.trim();
      var message   = document.getElementById('message').value.trim();

      if (!firstName || !email || !message) {
        alert('Please fill in your name, email, and message before sending.');
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      formBtn.textContent = 'Message Sent ✓';
      formBtn.style.background = 'var(--g700)';
      formBtn.disabled = true;

      setTimeout(function () {
        document.getElementById('first-name').value = '';
        document.getElementById('last-name').value  = '';
        document.getElementById('email').value       = '';
        document.getElementById('message').value     = '';
        document.getElementById('topic').value       = '';
        formBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>';
        formBtn.style.background = 'var(--g600)';
        formBtn.disabled = false;
      }, 3000);
    });
  }


  /* ── RESOURCE "READ MORE" BUTTONS ── */
  var readMoreButtons = document.querySelectorAll('.rescta');

  readMoreButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      alert('Full article coming soon — content is being reviewed by our health team.');
    });
  });


  /* ── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ── */
  var sections = document.querySelectorAll('section[id], footer');
  var navAnchors = document.querySelectorAll('.nlinks a[href^="#"]');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function (a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--g600)';
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });

});
