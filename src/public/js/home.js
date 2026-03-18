console.log("Home frontend javascript file");

(function () {
  const carousel = document.getElementById("luggageCarousel");
  const dots = document.querySelectorAll(".dot");
  const total = 3;
  let current = 0;
  let autoTimer = null;
  let startX = 0;
  let isDragging = false;

  function rotateTo(index) {
    current = ((index % total) + total) % total;
    carousel.style.transform = "rotateY(" + (-current * 120) + "deg)";
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
  }

  function next() { rotateTo(current + 1); }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 2000);
  }

  // Auto rotate
  startAuto();

  // Dot clicks
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      rotateTo(parseInt(dot.getAttribute("data-index")));
      startAuto();
    });
  });

  // Mouse swipe
  carousel.addEventListener("mousedown", function (e) {
    startX = e.clientX;
    isDragging = true;
  });

  document.addEventListener("mouseup", function (e) {
    if (!isDragging) return;
    isDragging = false;
    var diff = startX - e.clientX;
    if (Math.abs(diff) > 40) {
      rotateTo(current + (diff > 0 ? 1 : -1));
      startAuto();
    }
  });

  // Touch swipe
  carousel.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      rotateTo(current + (diff > 0 ? 1 : -1));
      startAuto();
    }
  });

  // Pause auto on hover, resume on leave
  carousel.addEventListener("mouseenter", function () {
    clearInterval(autoTimer);
  });

  carousel.addEventListener("mouseleave", function () {
    isDragging = false;
    startAuto();
  });
})();
