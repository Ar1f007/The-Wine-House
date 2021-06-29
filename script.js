'use strict';

const sections = document.querySelectorAll('section');

let counter1 = 0;
let counter2 = 1;

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

  if (counter1 === 5) {
    // if it is the last section return to the first section
    sections.forEach(section => (section.style.left = '0'));

    counter1 = 0;
    counter2 = 1;
    return;
  }

  if (counter1 === -1) {
    // if, scrolling up from first section
    sections.forEach(section => {
      if (section.classList[0] === 'section-5') return; // change the left position of every section except section 5
      section.style.left = '-100vw';
    });
    counter1 = 4;
    counter2 = 5;
  }

  document.querySelector(
    `.section-${deltaY ? counter1 : counter2}`
  ).style.left = `${deltaY ? '-100vw' : '0'}`;
});
