import Hls from "hls.js";

function HlsPlayer({ src, autoplay = false, media, callback = () => ({}) }) {
  // eslint-disable-next-line no-undef
  if (Hls.isSupported()) {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    // eslint-disable-next-line no-undef
    const hls = new Hls({
      autoStartLoad: true,
      debug: App.isDevelopment(),
      manifestLoadingTimeOut : 60000,
      /*manifestLoadingMaxRetry : 9,*/
      manifestLoadingRetryDelay : 500,
      levelLoadingTimeOut : 60000,
      /*levelLoadingMaxRetry : 9,*/
      levelLoadingRetryDelay : 500,

      fragLoadingTimeOut : 60000,
      /*fragLoadingMaxRetry : 6,*/
      fragLoadingRetryDelay : 250,
      startFragPrefetch : true
});
    hls.loadSource(src);
    hls.attachMedia(media);
    hls.on(Hls.Events.ERROR, function(event, data) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          default:
            hls.destroy();
            break;
        }
      }
    });
    if (autoplay) {
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        media.play();
      });
    }
    callback(hls);
  }
}

export default HlsPlayer;
