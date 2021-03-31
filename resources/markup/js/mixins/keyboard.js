const escapeHandler = (callback) => {
  document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
      callback()
    } else if (e.key === "Escape") {
      callback()
    }
  };
}

export {
  escapeHandler
}

