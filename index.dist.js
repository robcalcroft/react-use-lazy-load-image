"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useLazyLoadImage;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useLazyLoadImage() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$imageAttribute = _ref.imageAttribute,
      imageAttribute = _ref$imageAttribute === void 0 ? '[data-img-src]' : _ref$imageAttribute,
      _ref$imageAttributeKe = _ref.imageAttributeKey,
      imageAttributeKey = _ref$imageAttributeKe === void 0 ? 'imgSrc' : _ref$imageAttributeKe,
      _ref$rootMargin = _ref.rootMargin,
      rootMargin = _ref$rootMargin === void 0 ? '200px 0px' : _ref$rootMargin,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0.01 : _ref$threshold,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      _ref$dependencies = _ref.dependencies,
      dependencies = _ref$dependencies === void 0 ? [] : _ref$dependencies;

  function log() {
    var _console;

    // eslint-disable-next-line no-console
    if (debug) (_console = console).log.apply(_console, arguments);
  }

  function loadImage(image) {
    var imageUrlToLoad = image.dataset[imageAttributeKey];
    log('Loading image url', imageUrlToLoad); // eslint-disable-next-line no-param-reassign

    image.src = imageUrlToLoad;
  } // eslint-disable-next-line consistent-return


  _react["default"].useEffect(function () {
    var images = document.querySelectorAll(imageAttribute);

    if (!window.IntersectionObserver) {
      log('IntersectionObserver not available on this browser, loading all images now');
      Array.from(images).forEach(function (image) {
        return loadImage(image);
      });
    } else {
      log('Adding intersection observer to all elements that match', imageAttribute);
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0) {
            log('Unobserving image');
            observer.unobserve(entry.target);
            loadImage(entry.target);
          }
        });
      }, {
        rootMargin: rootMargin,
        threshold: threshold
      });
      images.forEach(function (image) {
        return observer.observe(image);
      });
      return function () {
        images.forEach(function (image) {
          return observer.unobserve(image);
        });
      };
    }
  }, dependencies);
}
