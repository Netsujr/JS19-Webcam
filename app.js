const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
      // console.log(localMediaStream);
    }).catch(err => {
      console.error(`Webcam Access Denied`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // canvas must be same size as video
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // the 0, 0 is where it should start from. then width and height is destination
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
}

getVideo();
video.addEventListener('canplay', paintToCanvas);

// localhost works but camera does not work
// cannot 'getUserMedia' over synched network
