// Libraries

let $ = require('jquery');
window.$ = $;
window.jquery = $;
window.jQuery = $;

// let Tether = require('../../node_modules/tether/dist/js/tether');
// window.Tether = Tether;
// require('../../node_modules/bootstrap/dist/js/bootstrap');
// let Handlebars = require('handlebars');
window.onload = function() {
  console.log("--- Loaded ---");
  function second_passed() {
    let clock = document.querySelector('.clock');
    clock.classList.remove('is-off');
  }

  setTimeout(second_passed, 4000);

}

console.log("Basic Project");

let importedModule = require('./module');
console.dir( importedModule );
