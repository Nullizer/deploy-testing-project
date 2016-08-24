import $ from 'jquery'
import { isProd } from './helpers'
import url from 'url'
import questions from './questions'
import qrcode from 'qrcode-js'

export function buttonsInit() {
  $('.accept-button').click(() => {
  })

  $('.start-button').click(() => {
    $('.questions input[type=radio]').removeAttr('checked')
    $('.questions input[type=checkbox]').removeAttr('checked')
    $('.questions input[type=range]').val($('.questions input[type=range]').data('def')) // val bug ?
    $.fn.fullpage.moveTo('questions', '1')
  })

  $('.again-button').click(() => {
    const url_obj = url.parse(location.href, true)
    delete url_obj.query.s
    delete url_obj.search
    delete url_obj.hash
    console.log(url_obj)
    location = url.format(url_obj)
  })

  $('.show-result').click((event) => {
    const currentSlide = $(event.target).closest('.slide')
    if (!validateSlideInput(currentSlide)) return
    // uploadData()
    nextSection()
  })

  $('.show-prev').click(() => {
    $.fn.fullpage.moveSlideLeft()
  })

  $('.show-next').click((event) => {
    const currentSlide = $(event.target).closest('.slide')
    if (!validateSlideInput(currentSlide)) return
    nextSlide(currentSlide)
  })

  $('.option-show-modal').change(event => {
    const target = event.currentTarget
    const currentSlide = $(target).closest('.slide')
    if (!validateSlideInput(currentSlide)) return
    nextSlide(currentSlide)
  })

  $('.social-share-button').click((event) => {
    const target = event.target
    const platform = $(target).data('platform')
    let url_obj = url.parse(location.href, true)

    const shareText = questions.result().shareText
    delete url_obj.search
    delete url_obj.hash
    console.log(url_obj)
    const targetUrl = encodeURIComponent(url.format(url_obj))
    console.log(targetUrl)

    if (platform === 'facebook') {
      let shareUrl = 'https://www.facebook.com/sharer.php?' +
        'u=' + targetUrl +
        '&description=' + shareText
      window.open(shareUrl)
    } else if (platform === 'twitter') {
      let shareUrl = 'https://twitter.com/intent/tweet?url=' + targetUrl
      window.open(shareUrl)
    } else if (platform === 'wechat') {
      const src = qrcode.toDataURL(decodeURIComponent(targetUrl), 4)
      console.log(src)
      const elem = document.getElementById('wechatqr')
      elem.src = src
      if (elem.style.display == 'none') {
        elem.style.display = 'block'
      } else {
        elem.style.display = 'none'
      }
    }
  })

  $('.close-banner').click(event => {
    const close = event.target.dataset.close
    console.log(close)
    if (close && close.length) {
      $(`[data-close="${close}"]`).hide()
      $(`#${close}`).hide()
    }
  })
}

export function nextSection(currentSlide) {
  $.fn.fullpage.moveSectionDown()
}

export function nextSlide(currentSlide) {
  const currentAnchor = currentSlide.data('anchor')
  const nextSlide = currentSlide.next()
  const nextContainer = nextSlide.find('[data-hidden]')

  const showNextBoxes = currentSlide.find('input[data-show-next]:checked')
  if (showNextBoxes.length > 0 && nextContainer) {
    nextContainer.css('display', 'block')
  } else if (nextContainer.data('hidden') === '') {
    nextContainer.css('display', 'none')
    nextContainer.find('input[type=radio]').removeAttr('checked')
    nextContainer.find('input[type=checkbox]').removeAttr('checked')
  }

  // skip hidden slide
  if (nextContainer.css('display') === 'none') {
    $.fn.fullpage.moveTo('questions', currentAnchor + 2)
  } else {
    $.fn.fullpage.moveSlideRight()
  }
}

export function uploadData() {
  const apiPrefix = 'http://s.initiumlab.com:8081/'
  const urlRemember = apiPrefix + 'remember/'
  const urlUUID = apiPrefix + 'utility/uuid/'
  let eventname = 'test-event-zk'
  if (isProd) {
    eventname = 'hkfoodnames'
  }
  const key = 'answers'

  const answers = stringifyAnswers()
  const UA = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent || ''
  const upload = JSON.stringify({ answers, UA })

  $.get(urlUUID).then(function (response) {
    let uuid = null
    uuid = response.data.uuid
    console.log(uuid)
    if (uuid) {
      console.log('Got uuid', uuid)
      $.ajax(
        {
          url: urlRemember + eventname + '/',
          type: 'POST',
          //dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          async: true,
          data: JSON.stringify({
            username: uuid,
            key,
            value: upload,
            raw: ''
          }),
          success: function(response){
            console.log(response)
          }
        }
      )
    }
  }, function(response){
    console.log('Error:' + response)
  })
}

function stringifyAnswers() {
  const checkedAnswers = $('input:checked').map(function (index, elem) {
    return {
      id: elem.id,
      name: elem.name,
      text: $(`label[for=${elem.id}] p`).clone().children().remove().end().text().trim(),
      score: parseInt($(elem).data('score'))
    }
  }).get()

  const rangeAnswers = $('input[type=range]').map(function (index, elem) {
    return {
      id: elem.id,
      name: elem.name,
      text: $(elem).closest('.qa').find('.question').text().trim(),
      score: parseInt($(elem).val())
    }
  }).get()

  const textAnswers = $('input[type=text]').filter(function (index, elem) {
    return $(elem).val() && $(elem).val().length > 0
  }).map(function (index, elem) {
    return {
      id: elem.id,
      name: elem.name,
      text: $(elem).closest('p').clone().children().remove().end().text().trim(),
      score: 0,
      value: $(elem).val(),
    }
  }).get()

  const selectedAnswers = $('select').filter(function (index, elem) {
    return $('#' + $(elem).closest('label').attr('for')).prop('checked')
  }).map(function (index, elem) {
    return {
      id: elem.id,
      name: elem.name,
      text: $(elem).closest('.qa').find('.question').text().trim(),
      score: 0,
      value: $(elem).val(),
    }
  }).get()

  return checkedAnswers.concat(rangeAnswers, textAnswers, selectedAnswers)
}

function validateSlideInput(slide) {
  const checkedInputs = slide.find('input:checked')
  const rangeInputs = slide.find('input[type=range]')
  const dropdowns = slide.find('.dropdown')
  let ret = true

  if (checkedInputs.length === 0 && rangeInputs.length === 0 && dropdowns.length === 0) {
    return false
  } else {
    checkedInputs.each(function () {
      const text = $(this).data('showText')
      if (text && text.length > 0) {
        window.vueInstant.modalText = text
        window.vueInstant.showModal = true
        window.currentSlide = slide
        ret = false
      }
    })
    return ret
  }
}