const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');


searchEl.addEventListener('click', function(){
  searchInputEl.focus();
})

// 입력상자가 포커스를 받으면 Placeholder에 통합검색 보이게...
searchInputEl.addEventListener('focus', function(){
  // search 클래스 밑에 focused 라는 클래스를 만들어 붙이겠다.
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
})

searchInputEl.addEventListener('blur', function(){
  // search 클래스 밑에 focused 라는 클래스를 삭제하겠다.
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
})

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// scroll 이벤트가 수십개 이상발생하니 화면이 버벅이는 현상이 생김
// 이를 방지하기 위해 외부에서 제공하는 자바라이브러리를 사용해 보자
// 0.3초 마다 scroll 이벤트가 발생되도록 처리
// _.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function(){
  // console.log('scroll');
  console.log(window.scrollY);
  if(window.scrollY > 500){
    //배지 숨기기
    // badgeEl.style.display = 'none'; 
    // gsap.to(요소, 지속시간(초), 옵션)
    gsap.to(badgeEl, 0.6, {
      opacity : 0,
      display : 'none',
    });
    // 맨 위로 이동하기 버튼 보이기
    gsap.to(toTopEl, 0.2, {
      x : 0
    })

  } else {
    //배지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, 0.6, {
      opacity : 1,
      display : 'block',
    });
    // 버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x : 100
    })
  }
},300));

toTopEl.addEventListener('click', function() {
  gsap.to(window, 0.7, {
    scrollTo: 0
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  gsap.to(fadeEl, 1, {
    delay : (index + 1) * 0.7,  // 0.7초, 1.4초, 2.1초....
    opacity : 1,
  });
})

// const swiper = new Swiper('.notice-line .swiper', {
new Swiper('.notice-line .swiper', {
  // Optional parameters
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

new Swiper('.promotion .swiper', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView : 3,
  spaceBetween : 10,
  centeredSlides : true,
  loop: true,
  autoplay: {
    delay : 5000
  },
  //페이지 번호 요소 선택자 처리
  pagination: {
    el : '.promotion .swiper-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  }
});

new Swiper('.awards .swiper', {
  direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})



const promotioinEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = ! isHidePromotion;
  if(isHidePromotion){
    // 숨김처리
    // promotionEl 내 모든 클래스리스트에 hide 클래스를 추가
    promotioinEl.classList.add('hide');
  } else {
    // 다시 보임 처리
    promotioinEl.classList.remove('hide')
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
  // gsap.to(요소, 시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay)
  })
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})

/**
 * 올해가 몇 년도인지 계산
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()