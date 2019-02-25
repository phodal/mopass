import * as $ from 'jquery';

let $mopass = $('#mopass-key')

function save_options() {
  let mopassKey = $mopass.val();
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

function restore_options() {
  chrome.storage.sync.get(['mopassKey'], function (items: { mopassKey }) {
    $mopass.val(items.mopassKey);
  });
}

$('#save').click(save_options);
$(restore_options);

