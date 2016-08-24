import $ from 'jquery'
const questions = {
  title: '部署優化調試用',
  intro: `<p>a部署優化調試用</p>
<p>Peter是一個喜歡中華文化的美國人。為了更好地學習中文，體驗中國文化，他到香港住了下來。在體驗這個東方都市的日常生活時，他也認識了不少兩岸三地的朋友。
不過作為一個還在學習中文的Beginner，Peter總會被中港台對同一事物的不同說法弄得暈頭轉向。來幫幫很忙的Peter吧。</p>`,
  styles: {
    'Title Size': '55px', // Quiz標題文字大小
    'Primary Background Color': '#2C3E50', // 被選中的選項的顏色
    'Secondary Background Color': '#4EC5C1', // 沒被選中的選項的顏色
    'Tertiary Background Color': '#dfe3e2', // 進度條背景色
    'Progress Color': '#2C3E50', // 進度條完成部分的顏色
    'Question Text Color': '#FFF', // 問題文字顏色
    'Question Text Size': '23px', // 問題文字大小
    'Option Text Color': '#FFF', // 選項文字顏色
    'Option Text Size': '22px', // 選項文字大小
    'Background Color': '#4EC5C1', // 背景顏色
    'Background Image': '',// 背景圖片路徑
    'Button Background Color': '#2C3E50', // 按鈕顏色
    'Button Text Color': 'white', // 按鈕上文字的顏色
  },
  sharePreview: 'http://project.initiumlab.com/hk-expats/images/quiz.jpg', // 分享到 FB 中的圖片
  issues: [

    {
      question: '香港能下載Pokemon Go啦！Peter抓到了Wigglytuff ,它在台灣叫胖可丁,它在香港叫什麼？',
      image: 'images/1.png',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 9,
      options: [
        {text: '胖波波', score: 0, showText: '不對哦，香港翻譯成肥波球。'},
        {text: '肥波球', score: 1, showText: '恭喜你，答對了！'},
        {text: '粉粉球', score: 0, showText: '不對哦，香港翻譯成肥波球。'},
        {text: '皮皮丁', score: 0, showText: '不對哦，香港翻譯成肥波球。'},
      ]
    },
    {
      question: 'Pokemon Go非常耗電,Peter帶上移動電源上街去抓小精靈。香港朋友Kenny問他,你可以借我_______ 嗎？Peter一臉驚恐：what？那麼移動電源在香港被翻譯成什麼？',
      image: 'images/2.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 18,
      options: [
        {text: '血包', score: 0, showText: '不對哦，香港的翻譯是尿袋。移動電源在使用時由一根線連接著手機和電源本體，放在口袋裡時線會露出，確實很像尿袋。'},
        {text: '蓄電池', score: 0, showText: '不對哦，香港的翻譯是尿袋。移動電源在使用時由一根線連接著手機和電源本體，放在口袋裡時線會露出，確實很像尿袋。'},
        {text: '充電電池', score: 0, showText: '不對哦，香港的翻譯是尿袋。移動電源在使用時由一根線連接著手機和電源本體，放在口袋裡時線會露出，確實很像尿袋。'},
        {text: '尿袋', score: 1, showText: '恭喜你，答對了！'},
      ]
    },
    {
      question: '台灣朋友對Peter說：“我很羨慕你能玩Pokemon Go啊！我用的是智障型手機，不能玩。”Peter驚恐地問：“你為什麼要用智障型手機啊？” 台灣俗語“智障型手機”指的是什麼？',
      image: 'images/3.png',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 27,
      options: [
        {text: '壞了的手機', score: 0, showText: '不對哦，“智障型手機”在台灣是一個對非智能手機的玩笑式說法。'},
        {text: '非智能手機', score: 1, showText: '恭喜你，答對了！'},
        {text: '智障用的手機', score: 0, showText: '不對哦，“智障型手機”在台灣是一個對非智能手機的玩笑式說法。'},
        {text: '不能玩遊戲的手機', score: 0, showText: '不對哦，“智障型手機”在台灣是一個對非智能手機的玩笑式說法。'},
      ]
    },
    {
      question: 'Peter在香港銅鑼灣逛街，看見David Backham的海報，但海報上寫著一個奇怪的名字，和他在大陸台灣看見的不一樣。這個名字究竟是什麼？',
      image: 'images/4.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 36,
      options: [
        {text: '貝克漢姆', score: 0, showText: '不對哦，這是大陸的翻譯。香港翻譯成碧咸，是粵語的音譯。'},
        {text: '碧咸', score: 1, showText: '恭喜你，答對了！'},
        {text: '巴克汗', score: 0, showText: '不對哦，這是大陸的翻譯。香港翻譯成碧咸，是粵語的音譯。'},
        {text: '貝克漢', score: 0, showText: '不對哦，這是大陸的翻譯。香港翻譯成碧咸，是粵語的音譯。'},
      ]
    },
    {
      question: 'Peter 在香港時代廣場大屏幕看到英國新首相Theresa May的演說,新首相的名字在香港翻譯成”文翠珊”,在台灣怎樣翻譯？',
      image: 'images/5.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 45,
      options: [
        {text: '德蕾莎·五月', score: 0, showText: '不對哦，台灣的翻譯應該是德蕾莎·梅伊。'},
        {text: '德蕾莎·梅伊', score: 1, showText: '恭喜你，答對了！'},
        {text: '梅姨', score: 0, showText: '不對哦，台灣的翻譯應該是德蕾莎·梅伊。'},
        {text: '特蕾莎·梅', score: 0, showText: '不對哦，這是大陸的翻譯，台灣的翻譯應該是德蕾莎·梅伊。'},
      ]
    },
    {
      question: 'Peter在香港看到了《新鐵金剛》系列電影的宣傳海報。以下哪一張海報屬於《新鐵金剛》系列？',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      picture: true,
      progress: 54,
      options: [
        {image: 'images/01.jpg', score: 0, showText: '不對哦，《新鐵金剛》系列在大陸和台灣都被翻譯成《007》系列。答案是C'},
        {image: 'images/02.jpg', score: 0, showText: '不對哦，《新鐵金剛》系列在大陸和台灣都被翻譯成《007》系列。答案是C'},
        {image: 'images/03.jpg', score: 1, showText: '恭喜你，答對了！'},
        {image: 'images/04.jpg', score: 0, showText: '不對哦，《新鐵金剛》系列在大陸和台灣都被翻譯成《007》系列。答案是C'},
      ],
      styles: {
        // 'Background Color': '#d6d3cc',
        // 'Background Image': 'images/background.png',
      }
    },
    {
      question: 'Peter 很喜歡電影《哈利波特》系列,影片中的角色Draco Malfoy在大陸叫德拉科·马尔福,他在台灣的譯名是什麼？',
      image: 'images/6.jpeg',
      scoreTag: 'life-adapt',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 63,
      options: [
        {text: '跩哥·馬份', score: 1, showText: '恭喜你，答對了！'},
        {text: '白頭·馬福', score: 0, showText: '不對哦，台灣翻譯成拽哥·馬份。'},
        {text: '大可·馬菲', score: 0, showText: '不對哦，台灣翻譯成拽哥·馬份。'},
        {text: '達哥·馬夫', score: 0, showText: '不對哦，台灣翻譯成拽哥·馬份。'},
      ]
    },
    {
      question: 'Peter 想看Despicable Me, 它在台灣譯為“神偷奶爸”,但是他不知道在大陸譯成什麼。你知道嗎？',
      image: 'images/7.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 72,
      options: [
        {text: '壞蛋獎門人', score: 0, showText: '不對哦，這是香港的譯名。大陸翻譯成《卑鄙的我》。'},
        {text: '壞蛋是好人', score: 0, showText: '不對哦，大陸翻譯成《卑鄙的我》。'},
        {text: '卑鄙的我', score: 1, showText: '恭喜你，答對了！'},
        {text: '小黃人大軍', score: 0, showText: '不對哦，大陸翻譯成《卑鄙的我》。'},
      ]
    },
    {
      question: 'Peter最後看了《變形金剛》,影片中的Optimus Prime 在香港被譯為柯博文, 在大陸被譯為擎天柱，台灣最早把它譯為什麼？',
      image: 'images/8.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 81,
      options: [
        {text: '千斤頂', score: 0, showText: '不對哦，台灣最早把它翻譯成無敵鐵牛。近年來逐漸改成柯博文，和香港一樣。'},
        {text: '巨鋼人', score: 0, showText: '不對哦，台灣最早把它翻譯成無敵鐵牛。近年來逐漸改成柯博文，和香港一樣。'},
        {text: '車頭俠', score: 0, showText: '不對哦，台灣最早把它翻譯成無敵鐵牛。近年來逐漸改成柯博文，和香港一樣。'},
        {text: '無敵鐵牛', score: 1, showText: '恭喜你，答對了！不過近年來，台灣已經逐漸改成柯博文了，和香港一樣。'},
      ]
    },
    {
      question: 'Peter去大陸旅遊，有台灣朋友叫Peter幫忙買延長線，但賣東西的人卻不知道這是什麼意思。那麼延長線在大陸究竟稱作是什麼呢？',
      image: 'images/9.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 90,
      options: [
        {text: '能量線', score: 0, showText: '不對哦，應該是插線板。'},
        {text: '插線板', score: 1, showText: '恭喜你，答對了！'},
        {text: '插頭', score: 0, showText: '不對哦，應該是插線板。'},
        {text: '拖蘇', score: 0, showText: '不對哦，這是香港的說法，應該是插線板。'},
      ]
    },
    {
      question: 'Peter最後決定要好好學習了，問認真學習的同學借圖中的物品拷貝資料，它在香港應該叫什麼名字？',
      image: 'images/10.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 100,
      options: [
        {text: '手指', score: 0, showText: '恭喜你，答對了！'},
        {text: 'U盤', score: 0, showText: '不對哦，這是大陸的說法，香港的說法應該是USB手指，簡稱手指。'},
        {text: '隨身碟', score: 0, showText: '不對哦，這是台灣的說法，香港的說法應該是USB手指，簡稱手指。'},
        {text: '硬盤', score: 0, showText: '不對哦，香港的說法應該是USB手指，簡稱手指。'},
      ]
    },
  ],
  result: function () {
    let score = 0

    $('.option input:checked').each(function () {
      score += parseInt($(this).data('score'))
    })

    $('.option input[type=range]').each(function () {
      score += parseInt($(this).val())
    })

    const suffix = '，繼續加油！歡迎關注<a href="https://theinitium.com">「端傳媒」</a>：立足香港，放眼世界！讓你擁有更寬闊的視野'
    let desc
    if (score <= 2) {
      desc = '还是不夠了解哦' + suffix
    } else if (score <= 5) {
      desc = '已經有一定了解了' + suffix
    } else if (score <= 9) {
      desc = '已經有相當的了解了' + suffix
    } else {
      desc = '了然於胸，獲得稱號：“大翻譯家”！'
    }

    const resultText = `
<h1 class="text-center">測試結果</h1>
<p>最後你的得分是${score}分。你對中港台的翻譯差異${desc}</p>`
    const shareText = `我的得分是${score}`

    return {resultText, shareText}
  }
}

export default questions
