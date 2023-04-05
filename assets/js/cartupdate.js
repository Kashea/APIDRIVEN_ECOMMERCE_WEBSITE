class CartItem {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = 1;
  }
}

let cart = [];
let wishlist = [];

function addToCart(id, title, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = new CartItem(id, title, price);
    cart.push(newItem);
  }
  updateCartDropdown();
}

function addToWishlist(id, title, price) {
  const existingItem = wishlist.find((item) => item.id === id);
  if (!existingItem) {
    const newItem = new CartItem(id, title, price);
    wishlist.push(newItem);
  }
  updateWishlistDropdown();
}

function moveFromWishlistToCart(id) {
  const itemIndex = wishlist.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    const { id, title, price } = wishlist[itemIndex];
    wishlist.splice(itemIndex, 1);
    addToCart(id, title, price);
    updateWishlistDropdown();
  }
}

function updateCartDropdown() {
  let cartDropdownContent = '';
  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    cartDropdownContent += `
  <div class="dropdown-item">
    <img src="https://via.placeholder.com/50" alt="Product Image">
    <span>${item.title}</span>
    <span>${item.quantity} x $${item.price}</span>
    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
  </div>
`;
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  cartDropdownContent += `
<div class="dropdown-item">
  <strong>Total: $${totalPrice.toFixed(2)}</strong>
</div>
<div class="dropdown-item">
  <button class="btn btn-primary" onclick="proceedToCheckout()">Proceed to checkout</button>
</div>
`;

  document.querySelector('#cart-dropdown').innerHTML = cartDropdownContent;
  document.querySelector('#cart-count').textContent = totalQuantity;
}

function updateWishlistDropdown() {
  let wishlistDropdownContent = '';
  let totalWishlistItems = 0;

  wishlist.forEach((item) => {
    wishlistDropdownContent += `
  <div class="dropdown-item">
    <img src="https://via.placeholder.com/50" alt="Product Image">
    <span>${item.title}</span>
    <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
    <button class="btn btn-sm btn-primary" onclick="moveFromWishlistToCart(${item.id})">Add to Cart</button>
  </div>
`;
    totalWishlistItems++;
  });

  document.querySelector('#wishlist-dropdown').innerHTML =
    wishlistDropdownContent;
  document.querySelector('#wishlist-count').textContent = totalWishlistItems;
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartDropdown();
  }
}

function removeFromWishlist(id) {
  const itemIndex = wishlist.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    wishlist.splice(itemIndex, 1);
    updateWishlistDropdown();
  }
}

function proceedToCheckout() {
  alert('Proceeding to the checkout page...');
}
