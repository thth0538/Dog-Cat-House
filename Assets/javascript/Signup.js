document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Animation for tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.style.transform = 'scale(1)';
        });
        this.classList.add('active');
        this.style.transform = 'scale(1.05)';
        
        // Animation for forms
        forms.forEach(form => {
          if (form.classList.contains(tabName + '-form')) {
            form.classList.remove('hidden');
            form.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            form.classList.add('hidden');
          }
        });
      });
    });
  
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
      });
      
      button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }
      });
    });
  
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentNode.querySelector('label')?.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentNode.querySelector('label')?.classList.remove('focused');
      });
    });
  });
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function isValidPassword(password) {
    return password.length >= 6;
  }
  
  function isValidDate(date) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  }
  
  function showLoadingThenRedirect(url, message) {
    const submitBtn = event ? event.target : document.querySelector('.submit.yellow');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <span class="loading">
        <i class="fas fa-spinner fa-spin"></i> ${message || 'Đang xử lý...'}
      </span>
    `;
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = `
        <span class="success">
          <i class="fas fa-check"></i> Thành công!
        </span>
      `;
      setTimeout(() => {
        window.location.href = url || 'index.html';
      }, 1000);
    }, 1500);
  }
  
  function submitLogin() {
    event.preventDefault();
    const email = document.querySelector('.login-form input[type="email"]').value;
    const password = document.querySelector('.login-form input[type="password"]').value;
  
    if (!isValidEmail(email)) {
      showErrorNotification("Email không hợp lệ");
      return;
    }
    if (!isValidPassword(password)) {
      showErrorNotification("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
  
    showLoadingThenRedirect('index.html', 'Đang đăng nhập...');
    showSuccessNotification("Đăng nhập thành công!");
  }
  
  function submitRegister() {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    const name = form.querySelector('input[type="text"]').value.trim();
    const dob = form.querySelectorAll('input[type="text"]')[1].value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();
    const genderChecked = form.querySelector('input[name="gender"]:checked');
  
    if (!name) {
      showErrorNotification("Vui lòng nhập họ tên");
      return;
    }
    if (!isValidDate(dob)) {
      showErrorNotification("Ngày sinh không đúng định dạng dd/mm/yyyy");
      return;
    }
    if (!genderChecked) {
      showErrorNotification("Vui lòng chọn giới tính");
      return;
    }
    if (!isValidEmail(email)) {
      showErrorNotification("Email không hợp lệ");
      return;
    }
    if (!isValidPassword(password)) {
      showErrorNotification("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
  
    showLoadingThenRedirect('index.html', 'Đang đăng ký...');
    showSuccessNotification("Đăng ký thành công!");
  }
  
  function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    }, 100);
  }
  
  function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    }, 100);
  }
  
  function forgotPassword() {
    const email = prompt("Vui lòng nhập email để khôi phục mật khẩu:");
    if (email && isValidEmail(email)) {
      showSuccessNotification(`Hướng dẫn khôi phục đã gửi đến ${email}`);
    } else if (email) {
      showErrorNotification("Email không hợp lệ");
    }
  }