

(async () => {
  const videos = Array.from(document.querySelectorAll('video'))
    .filter(video => video.readyState != 0)
    .sort((v1, v2) => {
      const v1Rect = v1.getClientRects()[0];
      const v2Rect = v2.getClientRects()[0];
      return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
    });

  if (videos.length === 0)
    return;

  const video = videos[0];


  function isFullScreen()
  {
      return (document.fullScreenElement && document.fullScreenElement !== null)
           || document.mozFullScreen
           || document.webkitIsFullScreen;
  }

  function exitFullScreen()
  {
      if (document.exitFullscreen)
          document.exitFullscreen();
      else if (document.msExitFullscreen)
          document.msExitFullscreen();
      else if (document.mozCancelFullScreen)
          document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen)
          document.webkitExitFullscreen();
  }

  function requestFullScreen(element)
  {
      if (element.requestFullscreen)
          element.requestFullscreen();
      else if (element.msRequestFullscreen)
          element.msRequestFullscreen();
      else if (element.mozRequestFullScreen)
          element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen)
          element.webkitRequestFullscreen();
  }

  if (isFullScreen()) {
    exitFullScreen();
  } else {
    requestFullScreen(video);
  }


})();
