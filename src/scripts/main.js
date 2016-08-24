import $ from 'jquery'
import xdomain from 'xdomain'
import Vue from 'vue'
import assign from 'object.assign'
import fullpageInit from './fullpage'
import questions from './questions'
import { buttonsInit, nextSection, nextSlide } from './common'
import modalTpl from '../templates/modal.html'
import questionTpl from '../templates/issue_question.html'
import rangeOptTpl from '../templates/range_opt.html'
import choiceOptTpl from '../templates/choice_opt.html'
import dropdownOptTpl from '../templates/dropdown_opt.html'

$(document).ready(() => {
  xdomain.slaves({
    'http://s.initiumlab.com:8081': '/proxy.html'
  })

  Vue.directive('styles', function(p) {
    const { styles, type } = p
    const globalStyles = this.vm.globalStyles
    const issueStyles = assign({}, globalStyles, styles || {})

    let customStyles
    switch (type) {
    case 'issue':
      customStyles = {
        position: 'relative',
        backgroundColor: issueStyles['Background Color'],
        backgroundImage: `url(${issueStyles['Background Image']})`,
        backgroundSize: 'contain',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
      }
      break
    default:
      throw new TypeError('invalid type')
    }

    assign(this.el.style, customStyles)
  })
  window.vueInstant = new Vue({
    el: 'body',
    data: {
      title : questions.title,
      intro : questions.intro,
      issues: questions.issues,
      globalStyles: questions.styles,
      showModal: false,
      modalText: '你答對了！',
    },
    components: {
      'modal': {
        template: modalTpl,
        props: {
          show: {
            type: Boolean,
            required: true,
            twoWay: true,
          },
          text: {
            type: String,
            required: true,
          }
        },
        methods: {
          handle_modal_click : function () {
            this.show = false
            const resultButtons = window.currentSlide.find('.show-result')
            if (resultButtons && resultButtons.length > 0) {
              nextSection()
            } else {
              nextSlide(window.currentSlide)
            }
          },
        }
      },
      'issue-question': {
        template: questionTpl,
        props: ['issue'],
      },
      'dropdown-options': {
        template: dropdownOptTpl,
        props: ['issue', 'issue_index'],
      },
      'range-options': {
        template: rangeOptTpl,
        props: ['issue', 'issue_index'],
      },
      'choice-options': {
        template: choiceOptTpl,
        props: ['issue', 'issue_index'],
        methods: {
          handleOptImgLoaded: (e) => {
            const img = e.target
            const label = $(img).closest('label').eq(0)
            const { width, height } = img
            const imageRatio = width / height
            const labelHeight = label.height()

            if (imageRatio > 1) {
              img.style.maxWidth = '100%'
            }

            img.style.maxHeight = '13rem'
          },
        },
      },
    },
    methods: {
      is_last_issue: function (index) {
        return (index + 1 ) < this.issues.length ? false : true
      }
    },
    ready: function () {
      fullpageInit()
      buttonsInit()
    }
  })
})