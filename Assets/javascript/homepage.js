document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Dropdown menu
  // ==========================
  let homepageDropdownTimer;
  const homepageDropdown = document.querySelector('.homepage-dropdown');
  const homepageDropdownContent = document.querySelector('.homepage-dropdown-content');

  homepageDropdown.addEventListener('mouseleave', (e) => {
    if (!homepageDropdownContent.contains(e.relatedTarget)) {
      homepageDropdownTimer = setTimeout(() => {
        if (!homepageDropdownContent.matches(':hover')) {
          homepageDropdownContent.style.display = 'none';
          homepageDropdownContent.style.opacity = '0';
        }
      }, 500); // Delay 500ms
    }
  });

  homepageDropdownContent.addEventListener('mouseleave', (e) => {
    if (!homepageDropdown.contains(e.relatedTarget)) {
      homepageDropdownContent.style.display = 'none';
      homepageDropdownContent.style.opacity = '0';
    }
  });

  homepageDropdown.addEventListener('mouseenter', () => {
    clearTimeout(homepageDropdownTimer);
  });

  // ==========================
  // Banner Slideshow
  // ==========================
  const homepageSlideshow = document.querySelector(".homepage-banner-slideshow");
  const homepageDots = document.querySelectorAll(".homepage-banner-dot");
  const homepageBanner = document.querySelector(".homepage-banner-wrapper");
  const homepageSlides = document.querySelectorAll(".homepage-banner-slide");
  const homepageTotalSlides = homepageSlides.length;

  let homepageCurrentIndex = 0;
  let homepageIntervalId;
  let homepageIsHovering = false;
  const homepageSlideInterval = 5000; // 5 seconds

  function homepageInitSlideshow() {
    homepageSlideshow.style.transform = `translateX(-${homepageCurrentIndex * 100}%)`;
    homepageUpdateDots();
  }

  function homepageGoToSlide(index) {
    homepageCurrentIndex = (index + homepageTotalSlides) % homepageTotalSlides;
    homepageSlideshow.style.transform = `translateX(-${homepageCurrentIndex * 100}%)`;
    homepageUpdateDots();
  }

  function homepageUpdateDots() {
    homepageDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === homepageCurrentIndex);
    });
  }

  function homepageStartAutoSlide() {
    homepageStopAutoSlide();
    homepageIntervalId = setInterval(() => {
      if (!homepageIsHovering) {
        homepageGoToSlide(homepageCurrentIndex + 1);
      }
    }, homepageSlideInterval);
  }

  function homepageStopAutoSlide() {
    if (homepageIntervalId) {
      clearInterval(homepageIntervalId);
    }
  }

  homepageDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(dot.getAttribute('data-index'));
      homepageGoToSlide(index);
      homepageStopAutoSlide();
      homepageStartAutoSlide();
    });
  });

  homepageBanner.addEventListener("mouseenter", () => {
    homepageIsHovering = true;
    homepageStopAutoSlide();
  });

  homepageBanner.addEventListener("mouseleave", () => {
    homepageIsHovering = false;
    homepageStartAutoSlide();
  });

  let homepageTouchStartX = 0;
  let homepageTouchEndX = 0;

  homepageBanner.addEventListener('touchstart', (e) => {
    homepageTouchStartX = e.changedTouches[0].screenX;
    homepageStopAutoSlide();
  }, { passive: true });

  homepageBanner.addEventListener('touchend', (e) => {
    homepageTouchEndX = e.changedTouches[0].screenX;
    homepageHandleSwipe();
    homepageStartAutoSlide();
  }, { passive: true });

  function homepageHandleSwipe() {
    const difference = homepageTouchStartX - homepageTouchEndX;
    if (difference > 50) {
      homepageGoToSlide(homepageCurrentIndex + 1);
    } else if (difference < -50) {
      homepageGoToSlide(homepageCurrentIndex - 1);
    }
  }

  homepageInitSlideshow();
  homepageStartAutoSlide();

  // ==========================
  // Scroll To Top Button
  // ==========================
  window.addEventListener('scroll', function() {
    const homepageScrollBtn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
      homepageScrollBtn.style.opacity = '1';
      homepageScrollBtn.style.visibility = 'visible';
    } else {
      homepageScrollBtn.style.opacity = '0';
      homepageScrollBtn.style.visibility = 'hidden';
    }
  });

  // Khởi tạo trạng thái nút scroll
  const homepageScrollBtnInit = document.getElementById('scrollTopBtn');
  homepageScrollBtnInit.style.opacity = '0';
  homepageScrollBtnInit.style.visibility = 'hidden';
  homepageScrollBtnInit.style.transition = 'opacity 0.3s, visibility 0.3s';

});