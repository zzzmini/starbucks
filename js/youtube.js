var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;
function onYouTubeIframeAPIReady() {
  // player = new YT.Player('player', {
    new YT.Player('player', {
    // height: '360',
    // width: '640',
    videoId: 'EJF919p_hb0',
    playerVars: {
      autoplay: true,
      loop: true,
      playlist: 'EJF919p_hb0',
    },
    events: {
      onReady: function (event){
        event.target.mute();
      }
    }
  });
}