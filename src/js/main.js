// Libraries
let $ = require('jquery');
window.$ = $;
window.jquery = $;
window.jQuery = $;

window.onload = function() {
  console.log("--- Loaded ---");

  let message = $('.message');
  message.text('Done!');
  message.attr('data-message', 'Done!')

  setTimeout(function() {

    let appContent = document.querySelector('.app-content');
    let loader = document.querySelector('.loader');
    appContent.removeChild(loader);
    appContent.classList.remove('overlap');

  }, 5000);

}
