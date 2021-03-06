'use strict';

const sections = document.querySelectorAll('section');
const section1Wrapper = document.querySelector('.section-1-wrapper');
const section5Wrapper = document.querySelector('.section-5-wrapper');

section1Wrapper.style.transform = 'scale(1)';

let counter1 = 0;
let counter2 = 1;
let bool = true;

// Menu
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('change');
});

// progress
const progress = document.querySelector('.progress h2');
const circles = document.querySelectorAll('.circle');

const progressCounter = () => {
  progress.textContent = `${counter2}/${sections.length}`;

  circles.forEach(circle => {
    circle.style.backgroundColor = 'transparent';
  });

  document.querySelector(`.circle-${counter2}`).style.backgroundColor = '#ddd';
};

const pageController = () => {
  bool = true;
  if (counter1 === 5) {
    // if it is the last section return to the first section
    sections.forEach(section => (section.style.left = '0'));

    counter1 = 0;
    counter2 = 1;

    section1Wrapper.style.transform = 'scale(1)';
    section5Wrapper.style.transform = 'scale(1.5)';

    progressCounter();

    bool = false;
  }

  if (counter1 === -1) {
    // if, scrolling up from first section
    sections.forEach(section => {
      if (section.classList[0] === 'section-5') return; // change the left position of every section except section 5
      section.style.left = '-100vw';
    });
    counter1 = 4;
    counter2 = 5;

    section1Wrapper.style.transform = 'scale(1.5)';
    section5Wrapper.style.transform = 'scale(1)';

    progressCounter();
    bool = false;
  }
  progressCounter();
  return bool;
};

window.addEventListener('wheel', e => {
  const deltaY = e.deltaY > 0; // check if scrolling up or down

  if (deltaY) {
    //scrolling up is true
    counter1++;
    counter2++;
  } else {
    counter1--;
    counter2--;
  }

  pageController();
  progressCounter();

  if (bool) {
    document.querySelector(
      `.section-${deltaY ? counter1 : counter2}`
    ).style.left = `${deltaY ? '-100vw' : '0'}`;

    document.querySelector(
      `.section-${deltaY ? counter1 : counter2}-wrapper`
    ).style.transform = `scale(${deltaY ? '1.5' : '1'})`;

    document.querySelector(
      `.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`
    ).style.transform = `scale(${deltaY ? '1' : '1.5'})`;
  }
});

// navigate through buttons
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

leftBtn.addEventListener('click', () => {
  counter1--;
  counter2--;
  pageController() &&
    (document.querySelector(`.section-${counter2}`).style.left = '0');

  if (bool) {
    document.querySelector(`.section-${counter2}-wrapper`).style.transform =
      'scale(1)';
    document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform =
      'scale(1.5)';
  }
});

rightBtn.addEventListener('click', () => {
  counter1++;
  counter2++;
  pageController() &&
    (document.querySelector(`.section-${counter1}`).style.left = '-100vw');

  if (bool) {
    document.querySelector(`.section-${counter2}-wrapper`).style.transform =
      'scale(1)';
    document.querySelector(`.section-${counter1}-wrapper`).style.transform =
      'scale(1.5)';
  }
});

// Section 3 mouseover effect
const grapesImg = document.querySelector('.grapes-img');
const section3 = document.querySelector('.section-3-wrapper');

grapesImg.addEventListener('mouseover', () => (section3.style.opacity = '.5'));
grapesImg.addEventListener('mouseout', () => (section3.style.opacity = '1'));
