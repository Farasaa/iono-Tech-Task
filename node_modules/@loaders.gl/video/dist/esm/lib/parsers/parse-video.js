export default async function parseVideo(arrayBuffer) {
  const blob = new Blob([arrayBuffer]);
  const video = document.createElement('video');
  video.src = URL.createObjectURL(blob);
  return video;
}
//# sourceMappingURL=parse-video.js.map