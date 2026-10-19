const menuData = [
  {
    id: 1,
    name: "Sate Asin Pedas (10 pcs) + Nasi/Lontong",
    price: 25000,
    category: "Paket Kenyang",
  },
  {
    id: 2,
    name: "Sate Cabe Ijo (10 pcs) + Nasi/Lontong",
    price: 25000,
    category: "Paket Kenyang",
  },
  {
    id: 3,
    name: "Sate Taichan (10 pcs) + Nasi/Lontong",
    price: 25000,
    category: "Paket Kenyang",
  },
  {
    id: 4,
    name: "Sate Asin Pedas (15 pcs) + Nasi/Lontong",
    price: 35000,
    category: "Paket Kenyang",
  },
  {
    id: 5,
    name: "Sate Cabe Ijo (15 pcs) + Nasi/Lontong",
    price: 35000,
    category: "Paket Kenyang",
  },
  {
    id: 6,
    name: "Sate Taichan (15 pcs) + Nasi/Lontong",
    price: 35000,
    category: "Paket Kenyang",
  },
  {
    id: 7,
    name: "Sate Asin Pedas (10 pcs)",
    price: 22000,
    category: "A La Carte",
  },
  {
    id: 8,
    name: "Sate Cabe Ijo (10 pcs)",
    price: 22000,
    category: "A La Carte",
  },
  {
    id: 9,
    name: "Sate Taichan (10 pcs)",
    price: 22000,
    category: "A La Carte",
  },
  {
    id: 10,
    name: "Sate Asin Pedas (5 pcs)",
    price: 17000,
    category: "A La Carte",
  },
  {
    id: 11,
    name: "Sate Cabe Ijo (5 pcs)",
    price: 17000,
    category: "A La Carte",
  },
  {
    id: 12,
    name: "Sate Taichan (5 pcs)",
    price: 17000,
    category: "A La Carte",
  },
  {
    id: 13,
    name: "Sate Kulit Jumbo (1 pc)",
    price: 6000,
    category: "A La Carte",
  },
  {
    id: 14,
    name: "Sate Kulit B Aja (1 pc)",
    price: 3000,
    category: "A La Carte",
  },
  { id: 15, name: "Nasi", price: 5000, category: "A La Carte" },
  { id: 16, name: "Lontong", price: 5000, category: "A La Carte" },
];

let cart = [];
const formatRp = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);

const renderMenu = () => {
  const paketContainer = document.getElementById("menuPaketContainer");
  const alacarteContainer = document.getElementById("menuAlaCarteContainer");

  menuData.forEach((item) => {
    const card = `
                    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                        <div class="pr-2">
                            <h3 class="font-bold text-gray-800 text-sm md:text-base">${item.name}</h3>
                            <p class="text-brand-600 font-bold mt-1">${formatRp(item.price)}</p>
                        </div>
                        <button onclick="addToCart(${item.id})" class="min-w-[40px] h-[40px] bg-brand-50 text-brand-600 rounded-lg hover:bg-brand-600 hover:text-white transition flex items-center justify-center">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                `;
    if (item.category === "Paket Kenyang") paketContainer.innerHTML += card;
    else alacarteContainer.innerHTML += card;
  });
};

window.addToCart = (id) => {
  const product = menuData.find((item) => item.id === id);
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) existingItem.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
};

window.minCart = (id) => {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    if (cart[itemIndex].qty > 1) cart[itemIndex].qty -= 1;
    else cart.splice(itemIndex, 1);
    updateCartUI();
  }
};

const updateCartUI = () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartTotalEl = document.getElementById("cartTotal");
  const payBtn = document.getElementById("payQrisBtn");
  const mobileCartCount = document.getElementById("mobileCartCount");

  let subtotal = 0;
  let totalQty = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="text-center text-gray-400 py-10"><i class="fa-solid fa-basket-shopping text-4xl mb-3"></i><p>Keranjang masih kosong</p></div>`;
    payBtn.disabled = true;
  } else {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      subtotal += item.price * item.qty;
      totalQty += item.qty;
      cartItemsContainer.innerHTML += `
                        <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <h4 class="font-semibold text-gray-800 text-sm mb-2">${item.name}</h4>
                            <div class="flex justify-between items-center">
                                <span class="text-brand-600 font-bold text-sm">${formatRp(item.price * item.qty)}</span>
                                <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                    <button onclick="minCart(${item.id})" class="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-brand-600"><i class="fa-solid fa-minus text-xs"></i></button>
                                    <span class="font-bold text-sm w-4 text-center">${item.qty}</span>
                                    <button onclick="addToCart(${item.id})" class="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-brand-600"><i class="fa-solid fa-plus text-xs"></i></button>
                                </div>
                            </div>
                        </div>
                    `;
    });
    payBtn.disabled = false;
  }

  cartSubtotalEl.innerText = formatRp(subtotal);
  cartTotalEl.innerText = formatRp(subtotal);
  mobileCartCount.innerText = totalQty;
  document.getElementById("modalTotalAmount").innerText = formatRp(subtotal);
  document.getElementById("qrisImage").src =
    `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=QRIS-SATETANGGA-TOTAL-${subtotal}`;
};

const toggleCart = () => {
  document.getElementById("cartSidebar").classList.toggle("translate-x-full");
  document.getElementById("cartOverlay").classList.toggle("hidden");
};

document.getElementById("mobileCartBtn").addEventListener("click", toggleCart);
document.getElementById("closeCartBtn").addEventListener("click", toggleCart);
document.getElementById("cartOverlay").addEventListener("click", toggleCart);

document.getElementById("payQrisBtn").addEventListener("click", () => {
  document.getElementById("qrisModal").classList.remove("hidden");
  if (window.innerWidth < 1024) toggleCart();
});

document
  .getElementById("closeModalBtn")
  .addEventListener("click", () =>
    document.getElementById("qrisModal").classList.add("hidden"),
  );

document.getElementById("simulateSuccessBtn").addEventListener("click", () => {
  document.getElementById("qrisModal").classList.add("hidden");
  document.getElementById("successModal").classList.remove("hidden");
  setTimeout(
    () =>
      document
        .getElementById("successModalContent")
        .classList.replace("scale-95", "scale-100"),
    50,
  );
  cart = [];
  updateCartUI();
});

document.getElementById("closeSuccessBtn").addEventListener("click", () => {
  document
    .getElementById("successModalContent")
    .classList.replace("scale-100", "scale-95");
  setTimeout(
    () => document.getElementById("successModal").classList.add("hidden"),
    300,
  );
});

renderMenu();
updateCartUI();
