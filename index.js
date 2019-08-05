import React from 'react';

export default function useLazyLoadImage({
  imageAttribute = '[data-img-src]',
  imageAttributeKey = 'imgSrc',
  rootMargin = '200px 0px',
  threshold = 0.01,
  debug = false,
} = {}) {
  function log(...args) {
    // eslint-disable-next-line no-console
    if (debug) console.log(args);
  }

  function loadImage(image) {
    const imageUrlToLoad = image.dataset[imageAttributeKey];
    log('Loading image url', imageUrlToLoad);
    // eslint-disable-next-line no-param-reassign
    image.src = imageUrlToLoad;
  }

  React.useEffect(() => {
    const images = document.querySelectorAll(imageAttribute);
    if (!window.IntersectionObserver) {
      log(
        'IntersectionObserver not available on this browser, loading all images now'
      );
      Array.from(images).forEach(image => loadImage(image));
    } else {
      log(
        'Adding intersection observer to all elements that match',
        imageAttribute
      );
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              log('Unobserving image');
              observer.unobserve(entry.target);
              loadImage(entry.target);
            }
          });
        },
        { rootMargin, threshold }
      );
      images.forEach(image => observer.observe(image));
    }
  }, []);
}
