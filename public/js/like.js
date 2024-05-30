async function likeButton(productId, btn) {
  try {
    const response = await axios({
      method: "post",
      // sending the productId as params
      url: `/products/${productId}/like`,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    if (btn.classList.contains("fa-regular")) {
      btn.classList.remove("fa-regular");
      btn.classList.add("fa-solid");
    } else {
      btn.classList.remove("fa-solid");
      btn.classList.add("fa-regular");
    }

    console.log(response);
  } catch (e) {
    // console.log(e);
    window.location.replace("/login");
  }
}

// Using event deligation
window.document.addEventListener("click", (e) => {
  const btn = e.target;
  if (btn.classList.contains("product-like-button")) {
    const productId = btn.getAttribute("product-id");
    // getting product_id
    // console.log(productId);
    likeButton(productId, btn);
  }
});
