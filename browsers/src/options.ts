import * as $ from 'jquery';

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

function restore_options() {
  chrome.storage.sync.get({
    mopassKey: '',
  }, function (items: { mopassKey }) {
    $('#mopassKey').val(items.mopassKey);
  });
}

$('#save').click(save_options);
$(restore_options);

