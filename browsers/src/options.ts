import * as $ from 'jquery';

// Saves options to chrome.storage.sync.
function save_options() {
  var mopassKey = $('#mopass-key').val();
  chrome.storage.sync.set({
    mopassKey: mopassKey
  }, function () {
    var status = $('#status');
    status.text('Options saved.');
    setTimeout(function () {
      status.text('');
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    mopassKey: '',
  }, function (items: { mopassKey }) {
    $('#mopassKey').val(items.mopassKey);
  });
}

$('#save').click(save_options);
$(restore_options); // document.addEventListener('DOMContentLoaded', restore_options);

