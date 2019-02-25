import * as $ from 'jquery'
let $password = $('#page-password')

function buildPasswords() {
  let domStr = '<div>'
  chrome.storage.sync.get(['passwords'], function(items) {
    console.log(items)
    for (let i = 0; i < items.passwords.length; i++) {
      const passwordItem = items.passwords[i]
      domStr += `<p id="password-${i}">${passwordItem.title}</p>`
    }

    domStr += '<div>'
    $password.html(domStr)
  })
}

function showAllPasswordsTitle(pwd) {
  $password.html('<div>loading</div>')
  chrome.runtime.sendMessage({
    type: 'page',
    info: pwd
  }, function(data) {
    $password.show()
    if (data) {
      if (data.status === 200) {
        buildPasswords()
      } else {
        $password.html(data.body)
      }
    } else {
      $password.html('Error, Not Background Services')
    }
  });
}

$(function() {
  console.log('showAllPasswordsTitle')
  $('#master-password').submit(function(e) {
    e.preventDefault()
    $('#page-master').hide()
    showAllPasswordsTitle($('#password').val())
  })
})
