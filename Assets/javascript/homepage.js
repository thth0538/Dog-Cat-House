document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Dropdown menu
  // ==========================
  let indexDropdownTimer;
  const indexDropdown = document.querySelector('.index-dropdown');
  const indexDropdownContent = document.querySelector('.index-dropdown-content');

  indexDropdown.addEventListener('mouseleave', (e) => {
    if (!indexDropdownContent.contains(e.relatedTarget)) {
      indexDropdownTimer = setTimeout(() => {
        if (!indexDropdownContent.matches(':hover')) {
          indexDropdownContent.style.display = 'none';
          indexDropdownContent.style.opacity = '0';
        }
      }, 500); // Delay 500ms
    }
  });

  indexDropdownContent.addEventListener('mouseleave', (e) => {
    if (!indexDropdown.contains(e.relatedTarget)) {
      indexDropdownContent.style.display = 'none';
      indexDropdownContent.style.opacity = '0';
    }
  });

  indexDropdown.addEventListener('mouseenter', () => {
    clearTimeout(indexDropdownTimer);
  });

  // ==========================
  // Banner Slideshow
  // ==========================
  const indexSlideshow = document.querySelector(".index-banner-slideshow");
  const indexDots = document.querySelectorAll(".index-banner-dot");
  const indexBanner = document.querySelector(".index-banner-wrapper");
  const indexSlides = document.querySelectorAll(".index-banner-slide");
  const indexTotalSlides = indexSlides.length;

  let indexCurrentIndex = 0;
  let indexIntervalId;
  let indexIsHovering = false;
  const indexSlideInterval = 5000; // 5 seconds

  function indexInitSlideshow() {
    indexSlideshow.style.transform = `translateX(-${indexCurrentIndex * 100}%)`;
    indexUpdateDots();
  }

  function indexGoToSlide(index) {
    indexCurrentIndex = (index + indexTotalSlides) % indexTotalSlides;
    indexSlideshow.style.transform = `translateX(-${indexCurrentIndex * 100}%)`;
    indexUpdateDots();
  }

  function indexUpdateDots() {
    indexDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === indexCurrentIndex);
    });
  }

  function indexStartAutoSlide() {
    indexStopAutoSlide();
    indexIntervalId = setInterval(() => {
      if (!indexIsHovering) {
        indexGoToSlide(indexCurrentIndex + 1);
      }
    }, indexSlideInterval);
  }

  function indexStopAutoSlide() {
    if (indexIntervalId) {
      clearInterval(indexIntervalId);
    }
  }

  indexDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(dot.getAttribute('data-index'));
      indexGoToSlide(index);
      indexStopAutoSlide();
      indexStartAutoSlide();
    });
  });

  indexBanner.addEventListener("mouseenter", () => {
    indexIsHovering = true;
    indexStopAutoSlide();
  });

  indexBanner.addEventListener("mouseleave", () => {
    indexIsHovering = false;
    indexStartAutoSlide();
  });

  let indexTouchStartX = 0;
  let indexTouchEndX = 0;

  indexBanner.addEventListener('touchstart', (e) => {
    indexTouchStartX = e.changedTouches[0].screenX;
    indexStopAutoSlide();
  }, { passive: true });

  indexBanner.addEventListener('touchend', (e) => {
    indexTouchEndX = e.changedTouches[0].screenX;
    indexHandleSwipe();
    indexStartAutoSlide();
  }, { passive: true });

  function indexHandleSwipe() {
    const difference = indexTouchStartX - indexTouchEndX;
    if (difference > 50) {
      indexGoToSlide(indexCurrentIndex + 1);
    } else if (difference < -50) {
      indexGoToSlide(indexCurrentIndex - 1);
    }
  }

  indexInitSlideshow();
  indexStartAutoSlide();

  // ==========================
  // Scroll To Top Button
  // ==========================
  window.addEventListener('scroll', function() {
    const indexScrollBtn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
      indexScrollBtn.style.opacity = '1';
      indexScrollBtn.style.visibility = 'visible';
    } else {
      indexScrollBtn.style.opacity = '0';
      indexScrollBtn.style.visibility = 'hidden';
    }
  });

  // Khởi tạo trạng thái nút scroll
  const indexScrollBtnInit = document.getElementById('scrollTopBtn');
  indexScrollBtnInit.style.opacity = '0';
  indexScrollBtnInit.style.visibility = 'hidden';
  indexScrollBtnInit.style.transition = 'opacity 0.3s, visibility 0.3s';

});
