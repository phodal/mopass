import * as $ from 'jquery'
import Mopass from 'mopass-common'

let $password = $('#page-password')

function copyToClipboard(text) {
  const input = document.createElement('input')
  input.style.position = 'fixed'
  // @ts-ignore
  input.style.opacity = 0
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
}

function buildPasswords() {
  let domStr = '<div>'
  chrome.storage.sync.get(['passwords'], function(items) {
    for (let i = 0; i < items.passwords.length; i++) {
      const passwordItem = items.passwords[i]
      domStr += `<a class="button pwd-btn" id="password-${i}" data-pwd-type="${passwordItem.type}" data-pwd="${passwordItem.password}">${passwordItem.title}</a>`
    }

    domStr += '<div>'
    $password.html(domStr)

    let $pwdBtn = $('.pwd-btn')
    $pwdBtn.on('click', function(event) {
      $('#error').html('')
      let passwordType = $(event.target).attr('data-pwd-type')
      let encodedPassword = $(event.target).attr('data-pwd')
      decryptPassword(encodedPassword, passwordType)
    })
  })
}

function decryptPassword(encodedPassword: any, passwordType: any) {
  chrome.runtime.sendMessage({
    msgType: 'decrypt',
    info: encodedPassword
  }, function(data) {
    $password.show()
    if (data && data.status === 200) {
      if (passwordType === 'mfa') {
        copyToClipboard(data.body)
      } else {
        copyToClipboard(Mopass.MFAUtil.getMFAPassword(data.body))
      }

      $('#error').html('copy success')
    } else {
      $('#error').html('decrypt failure')
    }
  })
}

function showAllPasswordsTitle(pwd) {
  $password.show()
  $password.html('<div>loading</div>')
  chrome.runtime.sendMessage({
    msgType: 'page',
    info: pwd
  }, function(data) {
    if (data) {
      if (data.status === 200) {
        buildPasswords()
      } else {
        $password.html(data.body)
      }
    } else {
      $password.html('Error, Not Background Services')
    }
  })
}

$(function() {
  $('#master-password').submit(function(e) {
    e.preventDefault()
    $('#page-master').hide()
    showAllPasswordsTitle($('#password').val())
  })

})
