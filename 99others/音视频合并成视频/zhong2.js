const myAudio = document.querySelector('#audio');
// 创建 WebMMuxer 实例
const muxer = new WebMMuxer.Muxer({
  target: new WebMMuxer.ArrayBufferTarget(),
});

// 获取 Canvas 元素
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { desynchronized: true });

// 获取音频的 MediaStream 对象
const audioStream = myAudio.captureStream();

// 获取 Canvas 的 MediaStreamTrack 对象
const canvasStream = canvas.captureStream().getVideoTracks()[0];

const drawScene = (bangLeft) => {
  const image = new Image(100, 184);
  image.src = './img/zhong.jpg';
  image.onload = () => {
    ctx.drawImage(image, 50, 100);
  }
  image.onerror = (e) => {
    console.error(e)
  }
  const image2 = new Image(50, 107);
  image2.src = './img/bang.jpg';
  image2.style.transform = "rotate(-30deg)";
  image2.onload = () => {
    ctx.drawImage(image2, bangLeft || 250, 140);
  }
}
drawScene();

// 添加音频和视频轨道到 WebMMuxer
let videoEncoder = new VideoEncoder({
  output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
  error: e => console.error(e)
});
videoEncoder.configure({
  codec: 'vp09.00.10.08',
  width: canvas.width,
  height: canvas.height,
  bitrate: 1e6
});

// 完成封装并获取 WebM 文件数据

const endRecording = async () => {
	endRecordingButton.style.display = 'none';
	recordingStatus.textContent = '';
	recording = false;

	clearInterval(intervalId);
	audioTrack?.stop();

	await videoEncoder.flush();
  muxer.finalize(); 
  let { buffer } = muxer.target;
  downloadBlob(new Blob([buffer]));
	muxer = null;

	startRecordingButton.style.display = 'block';
};
endRecordingButton.addEventListener('click', endRecording);

const downloadBlob = (blob) => {
	let url = window.URL.createObjectURL(blob);
	let a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = 'picasso.webm';
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
};
// 将 webmData 存储到文件或进行其他操作