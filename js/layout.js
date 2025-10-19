$(document).ready(function(){

  // 캐싱 (반복 DOM 접근 방지)
  const BODY = $("body");
  const scrollTopBtn = $(".scrollTop_btn_pc");

  /* =====================
  (1) Scroll 관련 통합 제어
  ===================== */
  let lastScrollTop = 0;

  $(window).on("scroll", function(){
    let scroll = $(this).scrollTop();

  if (scroll > 60) {
    BODY.addClass("scrolling");
  } else {
    BODY.removeClass("scrolling");
  }

  // 2️⃣ 헤더 색상 변경
  if (scroll > 50) {
    BODY.addClass("active");
  } else {
    BODY.removeClass("active");
  }

  // 3️⃣ gototop 버튼 노출
  if (scroll > 300) {
    scrollTopBtn.addClass("show");
  } else {
    scrollTopBtn.removeClass("show");
  }
});

  /* =====================
  (2) gototop 클릭 시 부드럽게 이동
  ===================== */
  scrollTopBtn.on("click", function(){
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

  /* =====================
  (3) 모바일 메뉴 토글
  ===================== */
  $(".mob_btn").on("click", function(){
    $(".sub_menu").stop(true, true).fadeIn(200);
  });

  $(".sub_menu .close").on("click", function(){  
    $(".sub_menu").stop(true, true).fadeOut(200);
  });	

  /* =====================
  (4) GNB 메뉴 active 효과
  ===================== */
  $(".gnbs a").on("click", function(){
    $(".gnbs a").removeClass("active");
    $(this).addClass("active");
  });

  /* =====================
  (5) 메인 슬라이드
  ===================== */
  $(".main_inner").each(function(){
    const $wrap = $(this);
    const $imgs = $wrap.find(".main_img img");
    const $dots = $wrap.find(".indicator a");
    const count = $imgs.length;
    const interval = 4000;

    let curr = 0, timer;

    function show(i){
      if (i === curr) return;
      $dots.removeClass("active").eq(i).addClass("active");
      $imgs.eq(curr).removeClass("is-active");
      $imgs.eq(i).addClass("is-active");
      curr = i;
    }

    function start(){
      clearInterval(timer);
      timer = setInterval(function(){
        const next = (curr + 1) % count;
        show(next);
      }, interval);
    }

    $dots.on("click", function(e){
      e.preventDefault();
      show($(this).index());
      start(); 
    });

    $imgs.removeClass("is-active").eq(0).addClass("is-active");
    $dots.removeClass("active").eq(0).addClass("active");
    start();
  });

  /* =====================
  (6) section3 메타아이콘 클릭
  ===================== */
  $(".sec3_metapo").on("click", function(){
  const $this = $(this);

  $(".sec3_metapo").not($this).removeClass("active");

  $this.toggleClass("active");
});



  /* =====================
  스크롤애니메이션
  ===================== */
  let ani = $(".ani");

  $.fn.scrollMoving = function(){
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    
    return (viewportTop < elementBottom) && (elementTop < viewportBottom);
  };

  $(window).on('load scroll',function(){

    ani.each(function(){
      if($(this).scrollMoving()){
        $(this).addClass("moving");
      }else{
        $(this).removeClass("moving");
      };
    });
  });
});
