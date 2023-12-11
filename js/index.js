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