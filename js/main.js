const head = document.querySelector("#harry-head");

if (head) {
  const images = {
    left: "images/harry-left.png",
    right: "images/harry-right.png",
    upLeft: "images/harry-up-left.png",
    upRight: "images/harry-up-right.png",
    crossEyed: "images/harry-cross-eyed.png"
  };

  // Load the other images early so switching feels immediate.
  Object.values(images).forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  // Reveal the head one second after the page loads.
  window.setTimeout(() => {
    head.classList.add("is-visible");
  }, 1000);

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const rect = head.getBoundingClientRect();
    const eyeX = rect.left + rect.width * 0.5;
    const eyeY = rect.top + rect.height * 0.4;
    const noseX = rect.left + rect.width * 0.5;
    const noseY = rect.top + rect.height * 0.7;

    let gaze;

    // Adjust these percentages to match where the nose appears in your image.
    const isOverNose =
      Math.abs(event.clientX - noseX) < rect.width * 0.12 &&
      Math.abs(event.clientY - noseY) < rect.height * 0.12;

    if (isOverNose) {
      gaze = "crossEyed";
    } else if (event.clientY < eyeY) {
      gaze = event.clientX < eyeX ? "upLeft" : "upRight";
    } else {
      gaze = event.clientX < eyeX ? "left" : "right";
    }

    const nextImage = images[gaze];
    if (!head.src.endsWith(nextImage)) {
      head.src = nextImage;
    }
  });
}