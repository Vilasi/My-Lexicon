class TxtType {
  constructor(el, scrollingText, period) {
    this.scrollingText = scrollingText;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
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

    setTimeout(() => {
      this.tick();
    }, delta);
  }
}

window.onload = function () {
  const elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    let scrollingText = elements[i].getAttribute('data-type');
    let period = elements[i].getAttribute('data-period');
    console.log(scrollingText);
    if (scrollingText) {
      new TxtType(elements[i], JSON.parse(scrollingText), period);
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

// {
//     "toRotate": [
//         "Welcome to My Lexicon!",
//         "Improve Your Vocabulary.",
//         "Learn Through Practice.",
//         "Develop Lifelong Skills."
//     ],
//     "el": {},
//     "loopNum": 4,
//     "period": 2000,
//     "txt": "Welcome to My ",
//     "isDeleting": true
// }

//Regular function that generates a sound file given a configuration record and two callback functions

//////// PROMISES
//A Promise is an object that represents the eventual completion or failure of an asynchronous operation
//A promise is a returned object to which you attach callbacks instead of passing callbacks into a function

/**
 *
 *
 */
// function successCallback(result) {
//   console.log(`Audio file ready at URL: ${result}`);
// }

// function failureCallback(error) {
//   console.error(`Error generating audio file: ${error}`);
// }

// createAudioFileAsync(audioSettings, successCallback, failureCallback);

// //Here is that function rewritten to be async
// createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
/**
 *
 *
 */

//Callbacks added with then() will never be invoked before the completion of the current run of the JS event loop
//Callbacks will be invoked even if they were added after the success or failure of the asynchronous operation that the promise represents
//multiple callbacks may be added by calling .then() several times. They will be invoked one after another in the order they were inserted. They can be chained
