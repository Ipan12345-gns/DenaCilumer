// Data produk makanan
const makanan = [
  {
    img: 'asets/Beringas.jpeg',
    nama: 'Roti Bringas',
    harga: 'Rp 20.000 - Rp 35.000',
    deskripsi: 'Roti Bringas original, extra telur, special keju mozarella.'
  },
  {
    img: 'asets/Burger.jpeg',
    nama: 'Burger',
    harga: 'Rp 5.000 - Rp 15.000',
    deskripsi: 'Burger daging tebal, tipis, keju kribo, sayur, mayonais, saos tomat.'
  },
  {
    img: 'asets/Kebab.jpeg',
    nama: 'Kebab',
    harga: 'Rp 5.000 - Rp 15.000',
    deskripsi: 'Kebab jumbo sapi/ayam, mini ayam, keju, sayuran, saos tomat, mayones.'
  },
  {
    img: 'asets/Roti Bakar keju.jpeg',
    nama: 'Roti Bakar Keju',
    harga: 'Rp 10.000 - Rp 20.000',
    deskripsi: 'Roti bakar keju, best seller, special, topping request.'
  },
  {
    img: 'asets/Roti Bakar.jpeg',
    nama: 'Roti Bakar',
    harga: 'Rp 10.000 - Rp 20.000',
    deskripsi: 'Roti bakar reguler, best seller, special, aneka rasa.'
  },
  {
    img: 'asets/Roti Gembong.jpeg',
    nama: 'Roti Gembong',
    harga: 'Rp 15.000 - Rp 25.000',
    deskripsi: 'Roti gembong pilihan rasa, lumeer, 2 rasa, topping keju/durian.'
  }
];

// Data produk minuman
const minuman = [
  {
    img: 'asets/Es alpukat+keju.jpeg',
    nama: 'Es Alpukat + Keju',
    harga: 'Rp 10.000',
    deskripsi: 'Minuman segar alpukat dengan taburan keju.'
  },
  {
    img: 'asets/Es durian kocok.jpeg',
    nama: 'Es Durian Kocok',
    harga: 'Rp 15.000',
    deskripsi: 'Es durian segar, manis dan creamy.'
  },
  {
    img: 'asets/Es milo.jpeg',
    nama: 'Es Milo',
    harga: 'Rp 9.000',
    deskripsi: 'Minuman milo dingin, favorit semua usia.'
  },
  {
    img: 'asets/Es milo 2.jpeg',
    nama: 'Es Milo 2',
    harga: 'Rp 9.000',
    deskripsi: 'Es milo segar, cocok untuk cuaca panas.'
  },
  {
    img: 'asets/Es sop buah.jpeg',
    nama: 'Es Sop Buah',
    harga: 'Rp 12.000',
    deskripsi: 'Es buah segar dengan aneka topping.'
  }
];

function renderProduk(list, targetId) {
  const target = document.getElementById(targetId);
  target.innerHTML = list.map(item => `
    <div class="product-card">
      <img src="${item.img}" alt="${item.nama}">
      <h4>${item.nama}</h4>
      <p>${item.deskripsi}</p>
      <span class="price">${item.harga}</span>
      <a class="order-now-btn" href="https://wa.me/+62-857-1137-5919/?text=Hallo%20kak%20selamat%20pagi/siang/sore/malam,%20saya%20mau%20pesan" target="_blank" rel="noopener">Order Now</a>
    </div>
  `).join('');
}

function filterProduk(keyword, kategori) {
  keyword = keyword.trim().toLowerCase();
  let hasil = [];
  if (kategori === 'makanan') {
    hasil = makanan.filter(item => item.nama.toLowerCase().includes(keyword) || item.deskripsi.toLowerCase().includes(keyword));
  } else {
    hasil = minuman.filter(item => item.nama.toLowerCase().includes(keyword) || item.deskripsi.toLowerCase().includes(keyword));
  }
  return hasil;
}

document.addEventListener('DOMContentLoaded', function() {
  renderProduk(makanan, 'produk-makanan');
  renderProduk(minuman, 'produk-minuman');

  const tabBtns = document.querySelectorAll('.tab-btn');
  const makananGrid = document.getElementById('produk-makanan');
  const minumanGrid = document.getElementById('produk-minuman');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const postersSearch = document.getElementById('gallery-posters-search');

  let kategoriAktif = 'makanan';

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      kategoriAktif = this.dataset.filter;
      searchInput.value = '';
      postersSearch.style.display = 'none';
      if (kategoriAktif === 'makanan') {
        makananGrid.style.display = '';
        minumanGrid.style.display = 'none';
      } else {
        makananGrid.style.display = 'none';
        minumanGrid.style.display = '';
      }
    });
  });

  searchForm.addEventListener('submit', function() {
    const keyword = searchInput.value;
    if (!keyword) {
      postersSearch.style.display = 'none';
      if (kategoriAktif === 'makanan') {
        makananGrid.style.display = '';
        minumanGrid.style.display = 'none';
      } else {
        makananGrid.style.display = 'none';
        minumanGrid.style.display = '';
      }
      return;
    }
    const hasil = filterProduk(keyword, kategoriAktif);
    if (kategoriAktif === 'makanan') {
      makananGrid.style.display = '';
      minumanGrid.style.display = 'none';
      renderProduk(hasil, 'produk-makanan');
    } else {
      makananGrid.style.display = 'none';
      minumanGrid.style.display = '';
      renderProduk(hasil, 'produk-minuman');
    }
    if (hasil.length === 0) {
      makananGrid.style.display = 'none';
      minumanGrid.style.display = 'none';
      postersSearch.style.display = '';
    } else {
      postersSearch.style.display = 'none';
    }
  });

  searchInput.addEventListener('input', function() {
    searchForm.dispatchEvent(new Event('submit'));
  });
}); 