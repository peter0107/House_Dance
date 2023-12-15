

// jQuery as jq
$(document).ready(function() {
    // nav toggle
    /*$(".nav-toggle").click(function(){
      $(".header .nav").slideToggle();
    })
    $(".header .nav_items a").click(function(){
      
      if($(window).width() < 768){
         $(".header .nav_item").slideToggle();
      }
    })*/
    $(".nav_item a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
});

//define variable
const moveItemInners = document.querySelectorAll(".move-item-inner");
const play_btns = document.querySelectorAll(".play-button")
const form_open_btn = document.querySelector("#form-open"),
  home = document.querySelector(".home-section"),
  form_container = document.querySelector(".form_container"),
  form_close_btn = document.querySelector(".form_close"),
  signup_btn = document.querySelector("#signup"),
  login_btn = document.querySelector("#login"),
  pw_show_hide = document.querySelectorAll(".pw_hide");

//making youtube video
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
  player=new YT.Player('player', {
    height: calculatePlayerHeight(),
    width: 560,
    videoId: 'HGPYFsItZ-o',
    playerVars: {
      autoplay: true, 
      loop: true,   
      playlist: 'HGPYFsItZ-o',
      start: 15,
      end: 270
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.mute();  
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.seekTo(15);
    player.playVideo();
  }
}

function calculatePlayerHeight() {
  // 현재 보이는 화면의 높이를 가져오기
  const screenHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // 높이를 60%로 계산하여 반환
  return screenHeight * 0.8;
}

//move-pic hover event(convert to gif)
moveItemInners.forEach(function(moveItemInner) {
  moveItemInner.addEventListener("mouseenter", function() {
    const movePic = moveItemInner.querySelector(".move-pic");
    const moveGif = moveItemInner.querySelector(".move-gif");
    movePic.style.display="none";
    moveGif.style.display="block";
    moveGif.style.filter = "grayscale(0)";
    moveGif.style.transform = "scale(1.1)";
    
  });

  moveItemInner.addEventListener("mouseleave", function() {
    const movePic = moveItemInner.querySelector(".move-pic");
    const moveGif = moveItemInner.querySelector(".move-gif");

    movePic.style.filter = "";
    movePic.style.transform = "";
    moveGif.style.display = "none"; // 이미지 변경을 위한 코드 (GIF 이미지로 교체하는 로직을 추가해야 함)
    movePic.style.display="block";
  });
});

//audio play
play_btns.forEach(btn=>{
  btn.addEventListener("click",function(){
    const btnId=this.id;
    console.log("btnId:",btnId);
    const audioId = `${btnId.replace("-play-btn", "-audio")}`;
    const audio=document.getElementById(audioId);

    if (audio) {
      // 오디오가 재생 중이면 일시 중지, 아니면 재생
      if (audio.paused) {
        playAudio(audio);
      } else {
        pauseAudio(audio);
      }
    } 
    else {
      console.error(`cannot find audio: ${audioId}`);
    }
    
  })
}
)
//audio play
function playAudio(audio){
  audio.play();
}
//audio pause
function pauseAudio(audio){
  audio.pause();
}

//login form
form_open_btn.addEventListener("click",() => home.classList.add("show"))
form_close_btn.addEventListener("click",() => home.classList.remove("show"))

pw_show_hide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let get_pw = icon.parentElement.querySelector("input");
    if (get_pw.type === "password") {
      get_pw.type = "text";
      icon.classList.replace("uil-eye-slash","uil-eye");
    }
    else{
      get_pw.type="password";
      icon.classList.replace("uil-eye","uil-eye-slash");
    }
  });
});
  

signup_btn.addEventListener("click", (e) => {
  e.preventDefault();
  form_container.classList.add("active");
})
login_btn.addEventListener("click", (e) => {
  e.preventDefault();
  form_container.classList.remove("active");
})



