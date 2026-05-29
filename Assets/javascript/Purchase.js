document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo biến
    const applyBtn = document.querySelector('.apply-btn');
    const placeOrderBtn = document.querySelector('.place-order');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const useCouponBtns = document.querySelectorAll('.use-coupon');
    const discountInput = document.querySelector('.discount-code input');
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const bankInfo = document.getElementById('bank-transfer-info');
    const transferNote = document.getElementById('transfer-note');
    const phoneInput = document.getElementById('phone');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const totalPriceElement = document.getElementById('total-price');
    const discountValueElement = document.getElementById('discount-value');
    
    // Giá trị mặc định
    let subtotal = 490000;
    let shippingFee = 20000;
    let discount = 0;
    
    // Load dữ liệu địa chỉ
    const provinceSelect = document.getElementById("province");
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");
    
    let locationData = {};
    
    // Load dữ liệu từ file JSON
    fetch('location_data.json')
      .then(response => response.json())
      .then(data => {
        locationData = data;
    
        // Load danh sách tỉnh/thành
        Object.keys(data).forEach(province => {
          const option = document.createElement("option");
          option.value = province;
          option.textContent = province;
          provinceSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error loading location data:', error));
    
    // Khi chọn Tỉnh/Thành phố
    provinceSelect.addEventListener("change", function() {
      const selectedProvince = this.value;
      districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
      wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
      districtSelect.disabled = !selectedProvince;
      wardSelect.disabled = true;
    
      if (selectedProvince && locationData[selectedProvince]) {
        const districts = Object.keys(locationData[selectedProvince]);
        districts.forEach(district => {
          const option = document.createElement("option");
          option.value = district;
          option.textContent = district;
          districtSelect.appendChild(option);
        });
        districtSelect.disabled = false;
      }
    });
    
    // Khi chọn Quận/Huyện
    districtSelect.addEventListener("change", function() {
      const selectedProvince = provinceSelect.value;
      const selectedDistrict = this.value;
      wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
      wardSelect.disabled = !selectedDistrict;
    
      if (selectedProvince && selectedDistrict && locationData[selectedProvince][selectedDistrict]) {
        const wards = locationData[selectedProvince][selectedDistrict];
        wards.forEach(ward => {
          const option = document.createElement("option");
          option.value = ward;
          option.textContent = ward;
          wardSelect.appendChild(option);
        });
        wardSelect.disabled = false;
      }
    });
    
    // Áp dụng mã giảm giá
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (discountInput.value.trim() === '') {
        showAlert('Vui lòng nhập mã giảm giá', 'error');
        return;
      }
      
      // Kiểm tra mã giảm giá (demo)
      const discountCode = discountInput.value.trim().toUpperCase();
      let discountAmount = 0;
      let message = '';
      
      if (discountCode === 'FREESHIP50K') {
        discountAmount = 50000;
        message = 'Áp dụng thành công mã giảm giá 50.000đ phí vận chuyển';
      } else if (discountCode === 'SUMMER10') {
        discountAmount = Math.min(100000, subtotal * 0.1);
        message = `Áp dụng thành công mã giảm giá 10% (${formatCurrency(discountAmount)})`;
      } else {
        showAlert('Mã giảm giá không hợp lệ', 'error');
        return;
      }
      
      discount = discountAmount;
      updateOrderSummary();
      showAlert(message, 'success');
    });
    
    // Sử dụng mã giảm giá từ danh sách
    useCouponBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const couponItem = e.target.closest('.coupon-item');
        const couponCode = couponItem.querySelector('strong').textContent;
        
        discountInput.value = couponCode;
        
        // Tự động áp dụng
        const event = new Event('click');
        applyBtn.dispatchEvent(event);
      });
    });
    
    // Thay đổi phương thức vận chuyển
    shippingRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        switch(radio.value) {
          case 'fast':
            shippingFee = 20000;
            break;
          case 'express':
            shippingFee = 50000;
            break;
          case 'standard':
            shippingFee = 15000;
            break;
          default:
            shippingFee = 20000;
        }
        updateOrderSummary();
      });
    });
    
    // Thay đổi phương thức thanh toán
    paymentRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'bank') {
          bankInfo.style.display = 'block';
          updateTransferNote();
        } else {
          bankInfo.style.display = 'none';
        }
      });
    });
    
    // Cập nhật nội dung chuyển khoản khi thay đổi số điện thoại
    phoneInput.addEventListener('input', updateTransferNote);
    
    // Tiếp tục mua hàng
    continueShoppingBtn.addEventListener('click', () => {
      // Chuyển hướng về trang sản phẩm (demo)
      window.location.href = '/products';
    });
    
    // Đặt hàng
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validate form
      const form = document.getElementById('payment-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--danger-color)';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        showAlert('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
        return;
      }
      
      // Kiểm tra địa chỉ
      if (!provinceSelect.value || !districtSelect.value || !wardSelect.value) {
        showAlert('Vui lòng chọn đầy đủ thông tin địa chỉ', 'error');
        return;
      }
      
      // Hiển thị thông báo thành công (demo)
      showAlert('Đơn hàng của bạn đã được đặt thành công!', 'success');
      
      // Reset form (demo)
      setTimeout(() => {
        form.reset();
        discount = 0;
        updateOrderSummary();
        bankInfo.style.display = 'none';
      }, 2000);
    });
    
    // Cập nhật nội dung chuyển khoản
    function updateTransferNote() {
      const phoneNumber = phoneInput.value.trim();
      transferNote.textContent = phoneNumber ? phoneNumber : 'Số điện thoại đặt hàng';
    }
    
    // Cập nhật tổng đơn hàng
    function updateOrderSummary() {
      const total = subtotal + shippingFee - discount;
      
      shippingFeeElement.textContent = formatCurrency(shippingFee);
      discountValueElement.textContent = formatCurrency(discount);
      totalPriceElement.textContent = formatCurrency(total);
    }
    
    // Định dạng tiền tệ
    function formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND',
        minimumFractionDigits: 0
      }).format(amount).replace('₫', 'đ');
    }
    
    // Hiển thị thông báo
    function showAlert(message, type) {
      const alert = document.createElement('div');
      alert.className = `alert alert-${type}`;
      alert.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
      `;
      
      document.body.appendChild(alert);
      
      setTimeout(() => {
        alert.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(alert);
        }, 300);
      }, 3000);
    }
    
    // Khởi tạo
    updateOrderSummary();
    updateTransferNote();
  });
  
  // Thêm style cho alert
  const style = document.createElement('style');
  style.textContent = `
    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    }
    
    .alert.show {
      opacity: 1;
      transform: translateX(0);
    }
    
    .alert-success {
      background-color: var(--success-color);
    }
    
    .alert-error {
      background-color: var(--danger-color);
    }
  `;
  document.head.appendChild(style);