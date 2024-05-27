async function likeButton(productId) {
  try {
    const response = await axios({
      method: "post",
      url: `/products/${productId}/like`,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    console.log(response);
  } catch (e) {
    console.log(e);
    window.location.replace("/login");
  }
}

// Using event deligation
window.document.addEventListener("click", (e) => {
  const btn = e.target;
  if (btn.classList.contains("product-like-button")) {
    const productId = btn.getAttribute("product-id");
    // getting product_id to
    // console.log(productId);
    likeButton(productId);
  }
});
