const head = document.querySelector("#harry-head");

if (head) {
  const images = {
    left: "images/harry-left.png",
    right: "images/harry-right.png",
    upLeft: "images/harry-up-left.png",
    upRight: "images/harry-up-right.png",
    crossEyed: "images/harry-cross-eyed.png"
  };

  // Preload the images so they are ready when the gaze changes.
  Object.values(images).forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  // Pop the head up one second after the page loads.
  window.setTimeout(() => {
    head.classList.add("is-visible");
  }, 1000);

  function updateGaze(event) {
    const rect = head.getBoundingClientRect();

    const eyeX = rect.left + rect.width * 0.5;
    const eyeY = rect.top + rect.height * 0.4;

    // Adjust noseY if the nose appears at a different height in your images.
    const noseX = rect.left + rect.width * 0.5;
    const noseY = rect.top + rect.height * 0.7;

    const isOverNose =
      Math.abs(event.clientX - noseX) < rect.width * 0.12 &&
      Math.abs(event.clientY - noseY) < rect.height * 0.12;

    let gaze;

    if (isOverNose) {
      gaze = "crossEyed";
    } else if (event.clientY < eyeY) {
      gaze = event.clientX < eyeX ? "upLeft" : "upRight";
    } else {
      gaze = event.clientX < eyeX ? "left" : "right";
    }

    const nextImage = images[gaze];

    // Only change the image when the gaze direction changes.
    if (head.getAttribute("src") !== nextImage) {
      head.setAttribute("src", nextImage);
    }
  }

  // Mouse movement, finger movement and taps.
  window.addEventListener("pointermove", updateGaze);
  window.addEventListener("pointerdown", updateGaze);
}