class TxtType {
  // The below is our single call
  // TxtType(<p class='typewrite'...</p>, JSON.parse('Array of things to say'), 2000)
  constructor(el, scrollingText, period) {
    this.el = el;
    this.scrollingText = scrollingText;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    // Calls .tick() upon new TxtType instantiation
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    let i = this.loopNum % this.scrollingText.length;
    let fullTxt = this.scrollingText[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    // console.log(that);
    console.log(this);
    let delta = 200 - Math.random() * 250;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  //domElements = p.typewrite
  const domElements = document.getElementsByClassName('typewrite');
  try {
    console.log(
      `"domElements[0].getAttribute('data-type'); : "${domElements[0].getAttribute(
        'data-type'
      )}`
    );
    console.log(
      `"domElements[0].getAttribute('data-period'); :"${domElements[0].getAttribute(
        'data-period'
      )}`
    );
  } catch (error) {
    console.warn('Error caught');
  }
  for (let i = 0; i < domElements.length; i++) {
    let scrollingText = domElements[i].getAttribute('data-type');
    let period = domElements[i].getAttribute('data-period');
    // console.log(scrollingText);
    // console.log(JSON.parse(scrollingText));
    if (scrollingText) {
      //TxtType(<p class='typewrite'...</p>, JSON.parseArray of things to say'), 2000)
      new TxtType(domElements[i], JSON.parse(scrollingText), period);
    }
  }
  // INJECT CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  document.body.appendChild(css);
};

// const kitty = {
//   name: 'Charlie',
//   meow() {
//     console.log('meow');
//   },
// };

// const personPrototype = {
//   greet() {
//     console.log(`hello, my name is ${this.name}!`);
//   },
// };

// class Person {
//   constructor(name) {
//     this.name = name;
//   }
// }

// Object.assign(Person.prototype, personPrototype);
// or
// Person.prototype.greet = personPrototype.greet;
