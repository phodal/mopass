import * as $ from 'jquery'

function showAllPasswordsTitle() {
  let $password = $('#page-password')

  $password.html('<div>loading</div>')
  let domStr = '<div>'
  chrome.storage.sync.get(['passwords'], function(items) {
    console.log(items);
    for (let i = 0; i < items.passwords.length; i++) {
      const passwordItem = items.passwords[i]
      domStr += `<p id="password-${i}">${passwordItem.title}</p>`
    }

    domStr += '<div>'
    $password.html(domStr)
    $password.show();
  })
}

$(function() {
  console.log('showAllPasswordsTitle');
  $('#master-password').submit(function(e) {
    console.log(e);
    e.preventDefault()
    $('#page-master').hide();
    showAllPasswordsTitle()
  })
})
