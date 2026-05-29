document.addEventListener('DOMContentLoaded', function() {
    // Xử lý dropdown câu hỏi
    document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.icon');
        const isActive = answer.classList.contains('show');
  
        // Đóng tất cả các câu trả lời khác
        document.querySelectorAll('.faq-answer').forEach(ans => {
          if (ans !== answer) {
            ans.classList.remove('show');
            ans.previousElementSibling.querySelector('.icon').textContent = '+';
            ans.previousElementSibling.style.backgroundColor = '#f8f9fa';
          }
        });
  
        // Toggle câu trả lời hiện tại
        if (isActive) {
          answer.classList.remove('show');
          icon.textContent = '+';
          this.style.backgroundColor = '#f8f9fa';
        } else {
          answer.classList.add('show');
          icon.textContent = '-';
          this.style.backgroundColor = '#e9ecef';
        }
      });
    });
  
    // Xử lý cuộn đến section tương ứng khi nhấn nav
    document.querySelectorAll('.faq-nav button').forEach(button => {
      button.addEventListener('click', function() {
        // Xóa active class từ tất cả các nút
        document.querySelectorAll('.faq-nav button').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Thêm active class cho nút được nhấn
        this.classList.add('active');
        
        const targetId = this.getAttribute('data-target');
        const section = document.getElementById(targetId);
        
        // Cuộn mượt đến section
        window.scrollTo({
          top: section.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
  
    // Tự động mở section đầu tiên khi load trang
    const firstQuestion = document.querySelector('.faq-question');
    if (firstQuestion) {
      firstQuestion.click();
    }
  
    // Highlight nav button khi cuộn đến section tương ứng
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('.faq-section');
      const navButtons = document.querySelectorAll('.faq-nav button');
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-target') === currentSection) {
          button.classList.add('active');
        }
      });
    });
  });