# react-use-lazy-load-image

Add image lazy loading to your React app with ease

### Usage

1. Add a `data-img-src` attribute ([you can customise this](#arguments)) to your `img` tags as your main image source
2. Change the `src` attribute to a placeholder like a small data URL blob
3. Import and run `useLazyLoadImage` in the body of your React function component

Now as your users scroll down the page the images will load just in time.

### Arguments

| Argument name     | Default value    | Description                                                                                              |
|-------------------|------------------|----------------------------------------------------------------------------------------------------------|
| imageAttribute    | `'[data-img-src]'` | The query passed to `document.querySelectorAll` to grab all lazy load-able images on the page            |
| imageAttributeKey | `'imgSrc'`         | The camel-cased key to pull the `data-img-src` out of the image element                                  |
| rootMargin        | `'200px 0px'`     | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options |
| threshold         | `0.01 `            | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options |
| debug             | `false`          | When set to `true` some useful messages will get logged to the console                                   |


### Example

```javascript
import React from 'react';
import useLazyLoadImage from 'react-use-lazy-load-image';

function App() {
  useLazyLoadImageReact();

  return (
    <div>Lots of content that means the image is off screen goes here</div>
    <img src="DATA URL" data-img-src="https://link-to-my-image.com/image.png" alt="My image" />
  )
}
```
