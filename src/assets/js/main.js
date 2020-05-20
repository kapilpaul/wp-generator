'use strict';

// Remove preload class once page is fully loaded

window.addEventListener('load', function() {
  Array.from(document.getElementsByTagName('body')).forEach(function(el) {
    el.classList.remove('preload');
  });
});

// Add class to navigation when scrolling down

document.addEventListener('scroll', function() {
  const header = document.querySelector('.header-main');
  if (window.scrollY >= 20) {
    header.classList.add('fade-in');
  } else {
    header.classList.remove('fade-in');
  }
});

// Add class when mobile navigation icon is clicked

Array.from(document.getElementsByClassName('nav-toggle')).forEach(function(el) {
  el.addEventListener('click', function() {
    Array.from(document.getElementsByTagName('body')).forEach(function(el) {
      el.classList.toggle('no-scroll');
    });
    Array.from(document.getElementsByClassName('header-main')).forEach(function(el) {
      el.classList.toggle('active');
    });
  });
});

// Add class when mobile sidebar navigation is clicked

Array.from(document.getElementsByClassName('sidebar-header')).forEach(function(el) {
  el.addEventListener('click', function() {
    Array.from(document.getElementsByClassName('sidebar')).forEach(function(el) {
      el.classList.toggle('active');
    });
  });
});

// Add class when switching between monthly and yearly pricing

Array.from(document.getElementsByClassName('switch-button')).forEach(function(el) {
  el.addEventListener('click', function() {
    Array.from(document.getElementsByClassName('pricing-monthly')).forEach(function(el) {
      el.classList.toggle('inactive');
    });
    Array.from(document.getElementsByClassName('pricing-yearly')).forEach(function(el) {
      el.classList.toggle('active');
    });
  });
});

// Prevent background from scrolling on mobile when navigation is toggled

document.addEventListener('touchmove', function(evt) {
  evt.preventDefault();
});