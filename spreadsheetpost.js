// Simulasi ketika QRIS berhasil dibayar & Kirim ke Google Sheets
document
  .getElementById("simulateSuccessBtn")
  .addEventListener("click", async () => {
    const btn = document.getElementById("simulateSuccessBtn");
    btn.innerText = "Memproses Pesanan...";
    btn.disabled = true;

    let totalBayar = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0,
    );

    // Data yang akan dikirim ke Spreadsheet
    const dataPesanan = {
      nama_pelanggan: "Pelanggan Online", // Bisa diganti jika nanti Anda menambahkan form nama
      total_harga: totalBayar,
      metode_pembayaran: "QRIS",
      cart: cart,
    };

    try {
      // GANTI teks di bawah ini dengan URL Web App dari Google Script Anda!
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbycISQeM22jcq9jdQHGdnBiOrHActg8j09Gjb8OUeqysJ2r8ShqxkNeJDfRHnCPByxw/exec";

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Penting agar tidak diblokir oleh Google
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPesanan),
      });

      // Tutup Modal QRIS, Tampilkan Modal Sukses
      document.getElementById("qrisModal").classList.add("hidden");
      document.getElementById("successModal").classList.remove("hidden");
      setTimeout(
        () =>
          document
            .getElementById("successModalContent")
            .classList.replace("scale-95", "scale-100"),
        50,
      );

      // Kosongkan keranjang setelah sukses
      cart = [];
      updateCartUI();
    } catch (error) {
      alert("Gagal mengirim pesanan. Silakan coba lagi.");
    } finally {
      btn.innerText = "(Simulasi) Klik jika sudah dibayar";
      btn.disabled = false;
    }
  });
