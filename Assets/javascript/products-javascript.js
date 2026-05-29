
// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(productName);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    alert(`✅ Đã thêm "${productName}" vào giỏ hàng!`);
    // Chuyển sang trang cart nếu muốn tự động:
    // window.location.href = "cart.html";
  }

 