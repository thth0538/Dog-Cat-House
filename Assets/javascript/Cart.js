function changeQty(btn, delta) {
    const qtySpan = btn.parentElement.querySelector("span");
    let qty = parseInt(qtySpan.textContent);
    qty = Math.max(1, qty + delta);
    qtySpan.textContent = qty;
  
    updateItemTotal(btn.closest(".cart-item"), qty);
    updateSummary();
  
    qtySpan.classList.add("qty-changed");
    setTimeout(() => {
      qtySpan.classList.remove("qty-changed");
    }, 300);
  }
  
  function updateItemTotal(item, qty) {
    const price = parseInt(item.dataset.price);
    const total = price * qty;
    const itemTotal = item.querySelector(".cart-item-total");
    itemTotal.textContent = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    itemTotal.classList.add("price-updated");
    setTimeout(() => {
      itemTotal.classList.remove("price-updated");
    }, 300);
  }
  
  function updateSummary(appliedDiscount = 0) {
    let subtotal = 0;
    document.querySelectorAll(".cart-item").forEach((item) => {
      const price = parseInt(item.dataset.price);
      const qty = parseInt(item.querySelector(".cart-quantity-control span").textContent);
      subtotal += price * qty;
    });
  
    const subtotalElement = document.getElementById("subtotal");
    subtotalElement.textContent = subtotal.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    subtotalElement.classList.add("price-updated");
    setTimeout(() => {
      subtotalElement.classList.remove("price-updated");
    }, 300);
  
    const discount = appliedDiscount;
    const total = Math.max(0, subtotal - discount);
    const grandTotalElement = document.getElementById("grandtotal");
    grandTotalElement.textContent = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    grandTotalElement.classList.add("price-updated");
    setTimeout(() => {
      grandTotalElement.classList.remove("price-updated");
    }, 300);
  }
  
  function applyDiscount(voucherCode) {
    let discount = 0;
  
    if (voucherCode === "PETSTORE20") {
      discount = 20000;
    } else if (voucherCode === "SUPERDEAL10") {
      discount = 10000;
    }
  
    document.getElementById("voucher").value = voucherCode;}