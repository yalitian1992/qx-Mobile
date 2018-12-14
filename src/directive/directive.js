/* eslint-disable */

const normalImg = require("../images/error-to-img.png");

function handleElError(el, { value }) {
  if (el.src === normalImg || el.src === value) {
    el.style.objectFit = "contain";
  } else {
    el.style.objectFit = "cover";
  }
  ((currentEl, val) => {
    currentEl.onerror = () => {
      if (val) {
        currentEl.src = val;
      } else {
        currentEl.src = require("../images/error-to-img.png");
      }
      currentEl.style.objectFit = "contain";
      currentEl.onerror = null;
    };
  })(el, value);
}

const errorToImg = {
  bind: handleElError,
  update: handleElError,
  unbind(el) {
    el.onerror = null;
  }
};

export default {
  "error-to-img": errorToImg
};
