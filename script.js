/* ====== LOGIN / LOGOUT REVISED (FINAL + DASHBOARD ACTIVE + USER PHOTO) ====== */

const users = {
  "derihanggara86@gmail.com": {
    password: "embun2017",
    role: "admin" // bisa buka semua
  },

  "anggito@pertamina.com": {
    password: "gito2026",
    role: "admin" // bisa buka semua
  },

  "dian@devimandiri.com": {
    password: "Dian2025",
    role: "admin" // bisa buka semua
  },
  
  "suharso@pertamina.com": {
    password: "acok2026",
    role: "admin" // bisa buka semua
  },


  "caesar@devimandiri.com": {
    password: "cs2026",
    role: "field" // hanya KRP FIELD
  },

  "syahrul@pertamina.com": {
    password: "syahrul2026",
    role: "field" // hanya KRP FIELD
  },

  "revino@devimandiri.com": {
    password: "vino2026",
    role: "field" // hanya KRP FIELD
  },

  "rahmat@devimandiri.com": {
    password: "rahmat2026",
    role: "field" // hanya KRP FIELD
  },

  "ojie@devimandiri.com": {
    password: "ojie2026",
    role: "zona" // hanya KRP ZONA
  }
};

// foto user per email
const userPhotos = {
  "derihanggara86@gmail.com": "https://i.postimg.cc/qR1C6dWC/silvia.png",
  "caesar@devimandiri.com": "https://i.postimg.cc/wBg2ZtdS/admint.jpg",
  "ojie@devimandiri.com": "https://i.postimg.cc/wBg2ZtdS/admint.jpg",
  "suharso@pertamina.com": "https://i.postimg.cc/MK0X4cQ7/acok.jpg",
  "anggito@pertamina.com": "https://i.postimg.cc/qR1C6dWC/silvia.png",
  "syahrul@pertamina.com": "https://i.postimg.cc/mDDj37mb/sahrul.jpg",
  "revino@devimandiri.com": "https://i.postimg.cc/jdNpJrWL/vino-g.jpg",
  "dian@devimandiri.com": "https://i.postimg.cc/V6mQzZs4/bajil.jpg",
  "rahmat@devimandiri.com": "https://i.postimg.cc/0j4BKVvd/rahmat.jpg"
};

function applyRole(role) {
  const fieldMenus = document.querySelectorAll(".krp-field");

  const zonaMenus = document.querySelectorAll(".krp-zona");

  const adminMenu = document.getElementById("adminDashboardMenu");

  // tampilkan semua dulu
  fieldMenus.forEach((el) => (el.style.display = "block"));
  zonaMenus.forEach((el) => (el.style.display = "block"));

  // sembunyikan menu admin dulu
  if (adminMenu) {
    adminMenu.style.display = "none";
  }

  // user FIELD
  if (role === "field") {
    zonaMenus.forEach((el) => (el.style.display = "none"));
  }

  // user ZONA
  if (role === "zona") {
    fieldMenus.forEach((el) => (el.style.display = "none"));
  }

  // ADMIN
  if (role === "admin") {
    if (adminMenu) {
      adminMenu.style.display = "block";
    }
  }
}
let currentUserEmail = null;

/* === FUNGSI: TAMPILKAN DASHBOARD / APLIKASI SESUAI USER === */

function showAppForUser(email) {
  const loginPage = document.getElementById("loginPage");

  const dashboard = document.querySelector(".dashboard-container");

  const sidebar = document.querySelector(".sidebar");

  const mainContent = document.querySelector(".main-content");

  const header = document.querySelector(".header");

  // sembunyikan login
  if (loginPage) {
    loginPage.style.display = "none";
  }

  // tampilkan dashboard
  if (dashboard) {
    dashboard.style.display = "flex";
  }

  // tampilkan sidebar
  if (sidebar) {
    sidebar.style.display = "block";

    sidebar.style.opacity = "0";

    setTimeout(() => {
      sidebar.style.opacity = "1";
    }, 200);
  }

  // tampilkan main content
  if (mainContent) {
    mainContent.style.display = "block";

    mainContent.style.opacity = "0";

    setTimeout(() => {
      mainContent.style.opacity = "1";
    }, 200);
  }

  // tampilkan header lagi setelah login
  if (header) {
    header.style.display = "flex";

    header.style.opacity = "0";

    setTimeout(() => {
      header.style.opacity = "1";
    }, 200);
  }

  const name = email.split("@")[0];

  // simpan nama user
  localStorage.setItem("reservationName", name);

  localStorage.setItem("currentEditor", name);

  currentUserEmail = email;

  localStorage.setItem("loggedUser", email);

  // isi otomatis field reservation
  const cr = document.getElementById("createReservation");

  if (cr) {
    cr.value = name;
  }

  // tampilkan nama user
  const userLabel = document.getElementById("loggedInUser");

  if (userLabel) {
    userLabel.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  }

  // tampilkan foto user
  const userImg = document.querySelector(".user-info img");

  if (userImg && userPhotos[email]) {
    userImg.src = userPhotos[email];
  }
}

/* === AUTO LOAD USER NAME === */

document.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("reservationName");

  const cr = document.getElementById("createReservation");

  if (cr && savedName) {
    cr.value = savedName;
  }

  // auto login jika user masih tersimpan
  const savedUser = localStorage.getItem("loggedUser");

  if (savedUser && users[savedUser]) {
    localStorage.setItem("userRole", users[savedUser].role);

    showAppForUser(savedUser);

    applyRole(users[savedUser].role);
  }
});

// =======================
// GLOBAL login() FUNCTION
// =======================

function login(event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  // === BUAT LOADER LOGIN ===================

  let loader = document.getElementById("loginLoader");

  if (!loader) {
    loader = document.createElement("div");

    loader.id = "loginLoader";

    loader.innerHTML = `
      <div class="loader-overlay">
        <div class="spinner"></div>
        <p>Logging in...</p>
      </div>
    `;

    document.body.appendChild(loader);
  }

  // tampilkan loader
  loader.style.display = "flex";

  // cari field email & password

  const possibleEmailIds = ["loginEmail", "email", "username", "userEmail"];

  const possiblePassIds = ["loginPassword", "password", "userPassword"];

  let emailEl = null;

  let passEl = null;

  for (const id of possibleEmailIds) {
    const el =
      document.getElementById(id) ||
      document.querySelector(`input[name="${id}"]`);

    if (el) {
      emailEl = el;

      break;
    }
  }

  for (const id of possiblePassIds) {
    const el =
      document.getElementById(id) ||
      document.querySelector(`input[name="${id}"]`);

    if (el) {
      passEl = el;

      break;
    }
  }

  // fallback login form

  if ((!emailEl || !passEl) && document.getElementById("loginForm")) {
    const form = document.getElementById("loginForm");

    emailEl =
      emailEl ||
      form.querySelector(
        'input[type="email"], input[name="email"], input[name="username"]'
      );

    passEl =
      passEl ||
      form.querySelector(
        'input[type="password"], input[name="password"], input[name="userPassword"]'
      );
  }

  // validasi form
  if (!emailEl || !passEl) {
    loader.style.display = "none";

    alert("Form login tidak ditemukan.");

    return false;
  }

  const email = emailEl.value.trim();

  const pass = passEl.value;

  if (!email || !pass) {
    loader.style.display = "none";

    alert("Masukkan email dan password.");

    return false;
  }

  // delay efek login

  setTimeout(() => {
    if (users[email] && users[email].password === pass) {
      localStorage.setItem("loggedUser", email);

      // SIMPAN ROLE LOGIN
      localStorage.setItem("userRole", users[email].role);

      showAppForUser(email);

      applyRole(users[email].role);

      // buka form input otomatis
      showSection("formSection");

      loader.style.display = "none";

      return true;
    } else {
      loader.style.display = "none";

      alert("Email atau password salah.");

      return false;
    }
  }, 700);
}
// Listener form dan button
const loginForm = document.getElementById("loginForm");
if (loginForm) loginForm.addEventListener("submit", (e) => login(e));

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) loginBtn.addEventListener("click", (e) => login(e));

/* === FUNGSI LOGOUT (DENGAN LOADER + HIDE HEADER) === */

function logout() {
  // buat elemen loader jika belum ada
  let loader = document.getElementById("logoutLoader");
  document.body.style.overflow = "hidden";

  if (!loader) {
    loader = document.createElement("div");

    loader.id = "logoutLoader";

    loader.innerHTML = `
      <div class="loader-overlay">
        <div class="spinner"></div>
        <p>Logging out...</p>
      </div>
    `;

    document.body.appendChild(loader);
  }

  // tampilkan loader
  loader.style.display = "flex";

  // ambil elemen dashboard
  const sidebar = document.querySelector(".sidebar");

  const main = document.querySelector(".main");

  const header = document.querySelector(".header");

  // efek redup sebelum logout
  if (sidebar) sidebar.style.opacity = "0.5";

  if (main) main.style.opacity = "0.5";

  if (header) header.style.opacity = "0.5";

  // proses logout
  setTimeout(() => {
    // hapus data login
    localStorage.removeItem("loggedUser");

    localStorage.removeItem("currentEditor");

    currentUserEmail = null;

    // reset field reservation
    const cr = document.getElementById("createReservation");

    if (cr) cr.value = "";

    // reset nama user
    const userLabel = document.getElementById("loggedInUser");

    if (userLabel) userLabel.textContent = "Guest";

    // reset foto user
    const userImg = document.querySelector(".user-info img");

    if (userImg) {
      userImg.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    // tampilkan login page
    const loginPage = document.getElementById("loginPage");

    if (loginPage) {
      loginPage.style.display = "flex";
    }

    // sembunyikan dashboard
    if (sidebar) {
      sidebar.style.display = "none";

      sidebar.style.opacity = "1";
    }

    if (main) {
      main.style.display = "none";

      main.style.opacity = "1";
    }

    // sembunyikan header
    if (header) {
      header.style.display = "none";

      header.style.opacity = "1";
    }

    // reset input login
    const emailEl = document.getElementById("loginEmail");

    const passEl = document.getElementById("loginPassword");

    const errorEl = document.getElementById("loginError");

    if (emailEl) emailEl.value = "";

    if (passEl) passEl.value = "";

    if (errorEl) errorEl.textContent = "";

    // sembunyikan daily report
    const reportSection = document.getElementById("reportSection");

    if (reportSection) {
      reportSection.style.display = "none";
    }

    // kosongkan isi tabel daily report
    const reportBody = document.querySelector("#reportTable tbody");

    if (reportBody) {
      reportBody.innerHTML = "";
    }

    /* ================= HIDE ALL SECTIONS ================= */

    [
      "formSection",
      "dinasLuarSection",
      "reportSection",
      "monthlyReportSection",
      "chartSection",
      "driverChartSection",
      "driverMatrixSection"
    ].forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        el.style.display = "none";
      }
    });

    /* ================= RESET CHART ================= */

    if (driverChart) {
      driverChart.destroy();
      driverChart = null;
    }

    if (typeof overtimeLineChart !== "undefined" && overtimeLineChart) {
      overtimeLineChart.destroy();
      overtimeLineChart = null;
    }
    const driverSelect = document.getElementById("driverSelect");

    if (driverSelect) {
      driverSelect.value = "";
    }

    // sembunyikan loader
    loader.style.display = "none";
  }, 1500);
}

function resetForm() {
  /* ================= RESET INPUT ================= */

  document.getElementById("namaDriver").selectedIndex = 0;

  document.getElementById("tanggal").value = "";

  document.getElementById("hari").selectedIndex = 0;

  document.getElementById("jamKerja").value = "";

  document.getElementById("jamLembur").value = "";

  document.getElementById("jamAwal1").value = "";
  document.getElementById("jamAkhir1").value = "";

  document.getElementById("jamAwal2").value = "";
  document.getElementById("jamAkhir2").value = "";

  document.getElementById("jamAwal3").value = "";
  document.getElementById("jamAkhir3").value = "";

  document.getElementById("jamAwal4").value = "";
  document.getElementById("jamAkhir4").value = "";

  document.getElementById("note").value = "";

  /* ================= RESET HASIL ================= */

  document.getElementById("hasil").innerHTML = "";
}

/* ================= AUTO HARI ================= */

function updateDay() {
  const tanggalInput = document.getElementById("tanggal").value;

  const hariSelect = document.getElementById("hari");

  if (!tanggalInput) return;

  const tanggal = new Date(tanggalInput);

  const daftarHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];

  const namaHari = daftarHari[tanggal.getDay()];

  hariSelect.value = namaHari;
}

/* ================= AUTO TANGGAL HARI INI ================= */

window.onload = function () {
  const today = new Date();

  const yyyy = today.getFullYear();

  const mm = String(today.getMonth() + 1).padStart(2, "0");

  const dd = String(today.getDate()).padStart(2, "0");

  const formatTanggal = `${yyyy}-${mm}-${dd}`;

  document.getElementById("tanggal").value = formatTanggal;

  updateDay();
};

function hitungJamKerja() {
  let jamAwal1 = document.getElementById("jamAwal1").value;
  let jamAkhir1 = document.getElementById("jamAkhir1").value;
  let jamAwal2 = document.getElementById("jamAwal2").value;
  let jamAkhir2 = document.getElementById("jamAkhir2").value;
  let jamAwal3 = document.getElementById("jamAwal3").value;
  let jamAkhir3 = document.getElementById("jamAkhir3").value;
  let jamAwal4 = document.getElementById("jamAwal4").value;
  let jamAkhir4 = document.getElementById("jamAkhir4").value;
  let jamKerjaNormal = 8;
  let totalJamLembur = 0;

  function hitungDurasi(start, end) {
  if (!start || !end) return 0;

  let startTime = new Date(`1970-01-01T${start}:00`);
  let endTime;

  // Anggap 23:59 sebagai 24:00
  if (end === "23:59") {
    endTime = new Date("1970-01-02T00:00:00");
  } else {
    endTime = new Date(`1970-01-01T${end}:00`);
  }

  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
  }

  return (endTime - startTime) / (1000 * 60 * 60);
}
  let sesiLembur1 = hitungDurasi(jamAwal1, jamAkhir1);
  let sesiLembur2 = hitungDurasi(jamAwal2, jamAkhir2);
  let sesiLembur3 = hitungDurasi(jamAwal3, jamAkhir3);
  let sesiLembur4 = hitungDurasi(jamAwal4, jamAkhir4);
  totalJamLembur = sesiLembur1 + sesiLembur2 + sesiLembur3 + sesiLembur4;
  let totalJamKerja = jamKerjaNormal + totalJamLembur;
  document.getElementById("jamKerja").value = totalJamKerja.toFixed(2);
  document.getElementById("jamLembur").value = totalJamLembur.toFixed(2);
}
[
  "jamAwal1",
  "jamAkhir1",
  "jamAwal2",
  "jamAkhir2",
  "jamAwal3",
  "jamAkhir3",
  "jamAwal4",
  "jamAkhir4"
].forEach((id) => {
  document.getElementById(id).addEventListener("input", hitungJamKerja);
});

function hitungLembur() {
  var namaDriver = document.getElementById("namaDriver").value;
  var tanggal = document.getElementById("tanggal").value;
  var hari = document.getElementById("hari").value;
  const liburKhusus = document.getElementById("liburKhusus").checked;
  var jamKerja = parseFloat(document.getElementById("jamKerja").value);
  var jamLembur = parseFloat(document.getElementById("jamLembur").value);
  var jamAwal1 = document.getElementById("jamAwal1").value;
  var jamAkhir1 = document.getElementById("jamAkhir1").value;
  var jamAwal2 = document.getElementById("jamAwal2").value;
  var jamAkhir2 = document.getElementById("jamAkhir2").value;
  var jamAwal3 = document.getElementById("jamAwal3").value;
  var jamAkhir3 = document.getElementById("jamAkhir3").value;
  var jamAwal4 = document.getElementById("jamAwal4").value; // Jam awal sesi 4
  var jamAkhir4 = document.getElementById("jamAkhir4").value; // Jam akhir sesi 4
  var note = document.getElementById("note").value;
  if (
    !namaDriver ||
    !tanggal ||
    isNaN(jamKerja) ||
    jamKerja < 1 ||
    jamKerja > 24 ||
    isNaN(jamLembur) ||
    jamLembur < 0 ||
    !jamAwal1 ||
    !jamAkhir1
  ) {
    document.getElementById("errorMessage").innerText =
      "Harap lengkapi semua field dengan data yang valid!";
    return;
  }
  // Hitung total lembur berdasarkan input waktu
  let totalLembur = calculateOvertime(hari, jamKerja, jamLembur, liburKhusus);
  let jamLembur1 = calculateSessionOvertime(jamAwal1, jamAkhir1);
  let jamLembur2 = calculateSessionOvertime(jamAwal2, jamAkhir2);
  let jamLembur3 = calculateSessionOvertime(jamAwal3, jamAkhir3);
  let jamLembur4 = calculateSessionOvertime(jamAwal4, jamAkhir4); // Hitung jam lembur sesi 4
  var hasil = `Total Lembur: ${totalLembur} jam`;
  document.getElementById("hasil").innerHTML = hasil;

  /* ================= KIRIM KE GOOGLE SHEET ================= */

  const data = {
    namaDriver: namaDriver,
    tanggal: tanggal,
    hari: hari,
    liburKhusus: liburKhusus,

    jamKerja: jamKerja,
    jamLembur: jamLembur,

    hasilLembur: totalLembur,

    jamAwal1: jamAwal1,
    jamAkhir1: jamAkhir1,

    jamAwal2: jamAwal2,
    jamAkhir2: jamAkhir2,

    jamAwal3: jamAwal3,
    jamAkhir3: jamAkhir3,

    jamAwal4: jamAwal4,
    jamAkhir4: jamAkhir4,

    jamPertama: jamLembur1,
    jamKedua: jamLembur2,
    jamKetiga: jamLembur3,
    jamKeempat: jamLembur4,

    keterangan: note
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("Berhasil kirim ke Google Sheet", result);
    })
    .catch((error) => {
      console.error("Gagal kirim:", error);
    });

  // Tampilkan alert untuk penyimpanan yang berhasil
  alert("Laporan berhasil disimpan!");

 function calculateSessionOvertime(jamAwal, jamAkhir) {
  if (!jamAwal || !jamAkhir) return 0;

  const start = new Date(`1970-01-01T${jamAwal}:00`);

  let end;

  // Jika 23:59 dianggap 24:00
  if (jamAkhir === "23:59") {
    end = new Date("1970-01-02T00:00:00");
  } else {
    end = new Date(`1970-01-01T${jamAkhir}:00`);
  }

  // Jika melewati tengah malam
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  const diff = (end - start) / (1000 * 60 * 60);

  return diff > 0 ? diff : 0;
}

  function calculateOvertime(hari, jamKerja, jamLembur, liburKhusus = false) {
    let totalLembur = 0;

    const isHariLibur = hari === "Sabtu" || hari === "Minggu" || liburKhusus;

    if (isHariLibur) {
      if (jamLembur <= 8) {
        totalLembur = jamLembur * 2;
      } else {
        totalLembur = 8 * 2;

        let sisaJam = jamLembur - 8;

        if (sisaJam >= 1) {
          totalLembur += 3;
          sisaJam--;
        }

        if (sisaJam >= 1) {
          totalLembur += 4;
          sisaJam--;
        }

        if (sisaJam > 0) {
          totalLembur += sisaJam * 4;
        }
      }
    } else {
      if (jamLembur >= 1) {
        totalLembur += 1.5;

        jamLembur--;
      }

      if (jamLembur >= 1) {
        totalLembur += jamLembur * 2;
      }
    }

    return totalLembur;
  }
}
/* ================= SHOW SECTION ================= */

function showSection(sectionId) {
  /* ================= HIDE ALL ================= */

  document.getElementById("formSection").style.display = "none";

  document.getElementById("dinasLuarSection").style.display = "none";

  document.getElementById("reportDinasLuarSection").style.display = "none";

  document.getElementById("pekerjaanDriverSection").style.display = "none";

  document.getElementById("reportSTJSection").style.display = "none";

  document.getElementById("reportSection").style.display = "none";

  document.getElementById("monthlyReportSection").style.display = "none";

  document.getElementById("chartSection").style.display = "none";

  document.getElementById("driverChartSection").style.display = "none";

  document.getElementById("driverMatrixSection").style.display = "none";

  /* ================= SHOW SELECTED ================= */

  document.getElementById(sectionId).style.display = "block";

  /* ================= LOAD REPORT ================= */

  if (sectionId === "reportSection") {
    loadReport();
  }

  if (sectionId === "reportDinasLuarSection") {
    loadReportDinasLuar();
  }

  /* ================= LOAD MONTHLY ================= */

  if (sectionId === "monthlyReportSection") {
    loadMonthlyReport();
  }

  /* ================= LOAD DRIVER MATRIX ================= */

  if (sectionId === "driverMatrixSection") {
    generateDriverMatrix();
  }

  if (sectionId === "reportSTJSection") {
    loadReportSTJ();
  }

  /* ================= LOAD OVERTIME CHART ================= */

  if (sectionId === "chartSection") {
    generateOvertimeChart();
  }

  /* ================= DRIVER CHART ================= */

  if (sectionId === "driverChartSection") {
    const select = document.getElementById("driverSelect");

    const role = localStorage.getItem("userRole") || "admin";

    let firstOption = null;

    if (role === "field") {
      firstOption = select.querySelector("option.krp-field");
    } else if (role === "zona") {
      firstOption = select.querySelector("option.krp-zona");
    } else {
      firstOption = select.querySelector("option[value]:not([value=''])");
    }

    if (firstOption) {
      select.value = firstOption.value;
    }

    loadDriverPhoto();

    generateDriverChart();
  }

  /* ================= PEKERJAAN DRIVER ================= */

  if (sectionId === "pekerjaanDriverSection") {
    const today = new Date().toISOString().split("T")[0];

    document.getElementById("jobTanggal").value = today;
  }
}

function formatTanggal(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

let allDinasLuarData = [];
function loadReportDinasLuar() {
  const role = localStorage.getItem("userRole") || "admin";

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readDinasLuar&role=${role}`
  )
    .then((res) => res.json())

    .then((data) => {
      allDinasLuarData = data;

      renderReportDinasLuar(data);

      loadDriverFilter(data);
    })

    .catch((err) => {
      console.error("Gagal load dinas luar:", err);
    });
}
function renderReportDinasLuar(data) {
  const tbody = document.getElementById("reportDinasLuarBody");

  tbody.innerHTML = "";

  data.forEach((row) => {
    tbody.innerHTML += `
      <tr>
        <td>${row[0] || ""}</td>
        <td>${formatTanggal(row[1])}</td>
        <td>${row[2] || ""}</td>
        <td>${row[3] || ""}</td>
      </tr>
    `;
  });
}
function loadDriverFilter(data) {
  const select = document.getElementById("filterDinasDriver");

  select.innerHTML = '<option value="">Semua Driver</option>';

  const drivers = [...new Set(data.map((row) => row[0]))]
    .filter(Boolean)
    .sort();

  drivers.forEach((driver) => {
    select.innerHTML += `
      <option value="${driver}">
        ${driver}
      </option>
    `;
  });
}
function filterReportDinasLuar() {
  const selectedDriver = document.getElementById("filterDinasDriver").value;

  const startDate = document.getElementById("filterDinasStart").value;

  const endDate = document.getElementById("filterDinasEnd").value;

  const filtered = allDinasLuarData.filter((row) => {
    const driver = row[0] || "";

    const tanggal = row[1] ? new Date(row[1]).toISOString().split("T")[0] : "";

    const cocokDriver = !selectedDriver || driver === selectedDriver;

    const cocokTanggal =
      (!startDate || tanggal >= startDate) && (!endDate || tanggal <= endDate);

    return cocokDriver && cocokTanggal;
  });

  renderReportDinasLuar(filtered);
}
function resetFilterDinasLuar() {
  document.getElementById("filterDinasDriver").value = "";

  document.getElementById("filterDinasStart").value = "";

  document.getElementById("filterDinasEnd").value = "";

  renderReportDinasLuar(allDinasLuarData);
}

/* ================= LOAD REPORT ================= */

function loadReport() {

  const role =
    localStorage.getItem("userRole") || "admin";

  const isUserAdmin =
    localStorage.getItem("userRole") === "admin";

  console.log("ROLE:", role);

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readWithRow&role=${role}`
  )
    .then((response) => response.json())

    .then((data) => {
      const tbody = document.querySelector("#reportTable tbody");

      const monthHeader = document.getElementById("matrixMonthHeader");

      const dateHeader = document.getElementById("matrixDateHeader");

      const dayHeader = document.getElementById("matrixDayHeader");

      tbody.innerHTML = "";

       data.forEach((item) => {
        const row = item.data;

        const rowNumber = item.rowNumber;

        let tr = document.createElement("tr");

        if (row[20] === "Approved") {
          tr.classList.add("approved-row");
        }
         
         if (item.color === "#ff0000") {
  tr.classList.add("edited-row");
}
        /* ================= FORMAT TANGGAL ================= */

        let tanggal = "";

        if (row[1]) {
          const tgl = new Date(row[1]);

          tanggal = tgl.toLocaleDateString("id-ID");
        }

        /* ================= FORMAT JAM ================= */

        function formatJam(jamData) {
          if (!jamData) return "";

          const jam = new Date(jamData);

          if (isNaN(jam)) return jamData;

          return jam.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
          });
        }
        tr.innerHTML = `

        <td>${row[0] || ""}</td>
        <td>${tanggal}</td>
        <td>${row[2] || ""}</td>
        <td>${row[3] || ""}</td>
        <td>${row[4] || ""}</td>
        <td>${row[5] || ""}</td>

        <td>${formatJam(row[6])}</td>
        <td>${formatJam(row[7])}</td>

        <td>${formatJam(row[8])}</td>
        <td>${formatJam(row[9])}</td>

        <td>${formatJam(row[10])}</td>
        <td>${formatJam(row[11])}</td>

        <td>${formatJam(row[12])}</td>
        <td>${formatJam(row[13])}</td>

        <td>${row[14] || ""}</td>
        <td>${row[15] || ""}</td>
        <td>${row[16] || ""}</td>
        <td>${row[17] || ""}</td>

        <td>${row[18] || ""}</td>

        <td>

  <button
    class="delete-btn"
    onclick="deleteReport(${rowNumber})">
    🗑 Hapus
  </button>

  ${isUserAdmin ? `

    <button
      class="edit-btn"
      onclick="editReport(${rowNumber})">
      ✏ Edit
    </button>

    <button
      class="approval-btn"
      onclick="approvalReport(${rowNumber})">
      ✔ Approve
    </button>

  ` : ""}

</td>

      `;

        tbody.appendChild(tr);
      });
    })

    .catch((error) => {
      console.error("Gagal load report:", error);
    });
}

function deleteReport(rowNumber) {
  const konfirmasi = confirm("Yakin ingin menghapus data ini?");

  if (!konfirmasi) return;

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=delete&row=${rowNumber}`
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert("Data berhasil dihapus");

        loadReport();
      }
    })
    .catch((error) => {
      console.error(error);

      alert("Gagal menghapus data");
    });
}

function approvalReport(rowNumber) {

  const isUserAdmin =
    localStorage.getItem("userRole") === "admin";

  if (!isUserAdmin) {
    alert("Hanya admin yang dapat melakukan approval");
    return;
  }

  if (!confirm("Approve data ini?")) {
    return;
  }

  fetch(
    "https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec",
    {
      method: "POST",
      body: JSON.stringify({
        action: "approve",
        rowNumber: rowNumber
      })
    }
  )
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Data berhasil di approve");
      loadReport();
    }
  })
  .catch(err => {
    console.error(err);
    alert("Gagal approve data");
  });
}

function editReport(rowNumber) {

  const isUserAdmin =
    localStorage.getItem("userRole") === "admin";

  if (!isUserAdmin) {
    alert("Hanya admin yang dapat mengedit data");
    return;
  }

  const btn = document.querySelector(
    `button[onclick="editReport(${rowNumber})"]`
  );

  const tr = btn.closest("tr");

  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {

    const value = tds[i].innerText;

    tds[i].innerHTML = `
      <input
        type="text"
        value="${value}"
        style="width:100%;padding:4px;">
    `;
  }

  tds[tds.length - 1].innerHTML = `
    <button
      class="save-btn"
      onclick="saveReport(${rowNumber},this)">
      💾 Simpan
    </button>
  `;
}

function fixTimeFormat(time) {
if (!time) return "";
return String(time).replace(".", ":");
}

function calculateSessionOvertime(jamAwal, jamAkhir) {

if (!jamAwal || !jamAkhir) return 0;

jamAwal = fixTimeFormat(jamAwal);
jamAkhir = fixTimeFormat(jamAkhir);

const start = new Date(`1970-01-01T${jamAwal}:00`);
const end = new Date(`1970-01-01T${jamAkhir}:00`);

if (isNaN(start) || isNaN(end)) return 0;

let diff = (end - start) / (1000 * 60 * 60);

return diff > 0 ? diff : 0;
}

function calculateOvertime(
hari,
jamKerja,
jamLembur,
liburKhusus = false
) {

let totalLembur = 0;

const isHariLibur =
hari === "Sabtu" ||
hari === "Minggu" ||
liburKhusus;

if (isHariLibur) {

if (jamLembur <= 8) {

  totalLembur = jamLembur * 2;

} else {

  totalLembur = 8 * 2;

  let sisaJam = jamLembur - 8;

  if (sisaJam >= 1) {
    totalLembur += 3;
    sisaJam--;
  }

  if (sisaJam >= 1) {
    totalLembur += 4;
    sisaJam--;
  }

  if (sisaJam > 0) {
    totalLembur += sisaJam * 4;
  }

}

} else {

if (jamLembur >= 1) {
  totalLembur += 1.5;
  jamLembur--;
}

if (jamLembur > 0) {
  totalLembur += jamLembur * 2;
}

}

return totalLembur;
}

function saveReport(rowNumber, btn) {
  
  const isUserAdmin =
    localStorage.getItem("userRole") === "admin";

  if (!isUserAdmin) {
    alert("Hanya admin yang dapat menyimpan perubahan");
    return;
  }


const tr = btn.closest("tr");
const inputs = tr.querySelectorAll("input");

const values = Array.from(inputs).map(input => input.value);

const hari = values[2];

const jamPertama =
calculateSessionOvertime(values[6], values[7]);

const jamKedua =
calculateSessionOvertime(values[8], values[9]);

const jamKetiga =
calculateSessionOvertime(values[10], values[11]);

const jamKeempat =
calculateSessionOvertime(values[12], values[13]);

const totalJamLembur =
jamPertama +
jamKedua +
jamKetiga +
jamKeempat;

const totalJamKerja =
8 + totalJamLembur;

const hasilLembur =
calculateOvertime(
hari,
totalJamKerja,
totalJamLembur,
false
);

values[3] = totalJamKerja;
values[4] = totalJamLembur;
values[5] = hasilLembur;

values[14] = jamPertama;
values[15] = jamKedua;
values[16] = jamKetiga;
values[17] = jamKeempat;

fetch(
"https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec",
{
method: "POST",
body: JSON.stringify({
action: "edit",
rowNumber: rowNumber,
values: values
})
}
)
.then(res => res.json())
.then(data => {

if (data.success) {

  tr.classList.add("edited-row");

  alert("Data berhasil diupdate");

  setTimeout(() => {
    loadReport();
  }, 1000);

}

})
.catch(err => {

console.error(err);

alert("Gagal update data");

});

}
/* ================= FILTER TANGGAL ================= */

function filterTanggal() {

  const filterDriver =
    document
      .getElementById("filterDriver")
      .value
      .toLowerCase();

  const dari =
    document.getElementById("filterStartDate").value;

  const sampai =
    document.getElementById("filterEndDate").value;

  const role =
    localStorage.getItem("userRole") || "admin";

  const isUserAdmin =
    role === "admin";

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readWithRow&role=${role}`
  )
    .then(response => response.json())

    .then(data => {

      const tbody =
        document.querySelector("#reportTable tbody");

      tbody.innerHTML = "";

      data.forEach(item => {

        const row = item.data;
        const rowNumber = item.rowNumber;

        /* ================= TANGGAL ASLI ================= */

        let tanggalFormat = "";

        if (row[1]) {

          if (typeof row[1] === "string") {
            tanggalFormat = row[1].split("T")[0];
          } else {
            tanggalFormat =
              new Date(row[1])
                .toISOString()
                .split("T")[0];
          }

        }

        /* ================= FILTER DRIVER ================= */

        const namaDriver =
          (row[0] || "").toLowerCase();

        if (
          filterDriver &&
          !namaDriver.includes(filterDriver)
        ) {
          return;
        }

        /* ================= FILTER TANGGAL ================= */

        if (dari && !sampai) {

          if (tanggalFormat !== dari) {
            return;
          }

        }

        /* ================= FILTER RANGE ================= */

        if (dari && sampai) {

          if (
            tanggalFormat < dari ||
            tanggalFormat > sampai
          ) {
            return;
          }

        }

        /* ================= FORMAT TANGGAL ================= */

        let tanggal = "";

        if (tanggalFormat) {

          const parts =
            tanggalFormat.split("-");

          tanggal =
            `${parts[2]}/${parts[1]}/${parts[0]}`;

        }

        /* ================= FORMAT JAM ================= */

        function formatJam(jamData) {

          if (!jamData) return "";

          try {

            const jam =
              new Date(jamData);

            if (!isNaN(jam)) {

              return jam.toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit"
                }
              );

            }

          } catch (e) {}

          if (
            typeof jamData === "string" &&
            jamData.includes("T")
          ) {

            return jamData
              .split("T")[1]
              .substring(0, 5);

          }

          return jamData;

        }

        /* ================= BUAT ROW ================= */

        let tr =
          document.createElement("tr");

        /* ================= WARNA APPROVED ================= */

        if (row[20] === "Approved") {
          tr.classList.add("approved-row");
        }

        /* ================= WARNA EDITED ================= */

        if (item.color === "#ff0000") {
          tr.classList.add("edited-row");
        }

        tr.innerHTML = `

          <td>${row[0] || ""}</td>
          <td>${tanggal}</td>
          <td>${row[2] || ""}</td>
          <td>${row[3] || ""}</td>
          <td>${row[4] || ""}</td>
          <td>${row[5] || ""}</td>

          <td>${formatJam(row[6])}</td>
          <td>${formatJam(row[7])}</td>

          <td>${formatJam(row[8])}</td>
          <td>${formatJam(row[9])}</td>

          <td>${formatJam(row[10])}</td>
          <td>${formatJam(row[11])}</td>

          <td>${formatJam(row[12])}</td>
          <td>${formatJam(row[13])}</td>

          <td>${row[14] || ""}</td>
          <td>${row[15] || ""}</td>
          <td>${row[16] || ""}</td>
          <td>${row[17] || ""}</td>

          <td>${row[18] || ""}</td>

          <td>

            <button
              class="delete-btn"
              onclick="deleteReport(${rowNumber})">
              🗑 Hapus
            </button>

            ${isUserAdmin ? `

              <button
                class="edit-btn"
                onclick="editReport(${rowNumber})">
                ✏ Edit
              </button>

              <button
                class="approval-btn"
                onclick="approvalReport(${rowNumber})">
                ✔ Approve
              </button>

            ` : ""}

          </td>

        `;

        tbody.appendChild(tr);

      });

    })

    .catch(error => {
      console.error(
        "Gagal filter report:",
        error
      );
    });

}
/* =========================================================
   DOWNLOAD REPORT EXCEL
========================================================= */

async function downloadReportExcel() {
  await downloadTableAsExcel("reportTableBody", "Daily_Overtime_Report.xlsx");
}

/* =========================================================
   DOWNLOAD TABLE TO EXCEL
========================================================= */

async function downloadTableAsExcel(bodyTableId, filename) {
  /* ================= LOADER ================= */

  let loader = document.getElementById("excelDownloadLoader");

  if (!loader) {
    loader = document.createElement("div");

    loader.id = "excelDownloadLoader";

    loader.style.display = "none";

    loader.innerHTML = `

      <div class="loader-overlay">

        <div class="spinner"></div>

        <p class="loader-text">
          Sedang membuat file Excel...
        </p>

      </div>

    `;

    document.body.appendChild(loader);
  }

  loader.style.display = "flex";

  try {
    /* ================= TABEL ================= */

    const bodyTable = document.getElementById(bodyTableId);

    if (!bodyTable) {
      alert("Tabel body tidak ditemukan!");

      return;
    }

    const table = bodyTable.closest("table");

    const headerDiv = table.querySelector("thead");

    if (!headerDiv) {
      alert("Header tabel tidak ditemukan!");

      return;
    }

    /* ================= HEADER ================= */

    const headers = Array.from(headerDiv.querySelectorAll("th")).map((th) =>
      th.innerText.trim()
    );

    /* ================= ROWS ================= */

    const rows = Array.from(bodyTable.querySelectorAll("tr"));

    /* ================= WORKBOOK ================= */

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Report");

    /* ================= HEADER ROW ================= */

    sheet.addRow(headers);

    const headerRow = sheet.getRow(1);

    headerRow.height = 25;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",

        pattern: "solid",

        fgColor: {
          argb: "658C58"
        }
      };

      cell.font = {
        bold: true,

        color: {
          argb: "FFFFFFFF"
        },

        size: 12
      };

      cell.alignment = {
        vertical: "middle",

        horizontal: "center"
      };

      cell.border = {
        top: {
          style: "thin"
        },

        left: {
          style: "thin"
        },

        bottom: {
          style: "thin"
        },

        right: {
          style: "thin"
        }
      };
    });

    /* ================= DATA ROW ================= */

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");

      const rowValues = [];

      cells.forEach((cell) => {
        rowValues.push(cell.innerText.trim());
      });

      const addedRow = sheet.addRow(rowValues);

      addedRow.eachCell((cell) => {
        cell.border = {
          top: {
            style: "thin"
          },

          left: {
            style: "thin"
          },

          bottom: {
            style: "thin"
          },

          right: {
            style: "thin"
          }
        };

        cell.alignment = {
          vertical: "middle",

          horizontal: "center",

          wrapText: true
        };
      });
    });

    /* ================= AUTO WIDTH ================= */

    sheet.columns.forEach((column) => {
      let maxLength = 15;

      column.eachCell(
        {
          includeEmpty: true
        },
        (cell) => {
          const value = cell.value ? cell.value.toString() : "";

          maxLength = Math.max(maxLength, value.length);
        }
      );

      column.width = maxLength + 5;
    });

    /* ================= EXPORT ================= */

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),

      filename
    );
  } catch (error) {
    console.error(error);

    alert("Gagal membuat file Excel!");
  } finally {
    loader.style.display = "none";
  }
}

/* =========================================================
   FILTER MONTHLY REPORT
========================================================= */

function filterMonthlyReport() {
  const startDate = document.getElementById("monthlyStartDate").value;

  const endDate = document.getElementById("monthlyEndDate").value;

  /* ================= VALIDASI ================= */

  if (!startDate || !endDate) {
    alert("Pilih tanggal awal dan tanggal akhir!");

    return;
  }

  /* =====================================================
     AMBIL DATA DARI GOOGLE SHEET
  ===================================================== */

  const role = localStorage.getItem("userRole") || "admin";

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=read&role=${role}`
  )
    .then((response) => response.json())

    .then((data) => {
      const tbody = document.getElementById("monthlyReportBody");

      tbody.innerHTML = "";

      /* ================= SUMMARY DRIVER ================= */

      let summary = {};

      /* =====================================================
         FILTER DATA BERDASARKAN TANGGAL
      ===================================================== */

      data.forEach((row) => {
        /* ================= MAPPING DATA =================
           row[0] = Nama Driver
           row[1] = Tanggal
           row[3] = Jam Kerja
           row[5] = Hasil Lembur
        ================================================= */

        const namaDriver = row[0] || "-";

        const tanggalRaw = row[1];

        const jamKerja = parseFloat(row[3]) || 0;

        const jamLembur = parseFloat(row[5]) || 0;

        /* ================= CEK TANGGAL ================= */

        if (!tanggalRaw) return;

        /* =====================================================
           FORMAT TANGGAL AMAN UNTUK LINTAS BULAN / TIMEZONE
        ===================================================== */

        const itemDate = new Date(tanggalRaw);

        const start = new Date(startDate);

        const end = new Date(endDate);

        /* ================= STABILKAN JAM ================= */

        itemDate.setHours(12, 0, 0, 0);

        start.setHours(0, 0, 0, 0);

        end.setHours(23, 59, 59, 999);

        /* ================= FILTER RANGE ================= */

        if (itemDate >= start && itemDate <= end) {
          /* ================= CEK DRIVER ================= */

          if (!summary[namaDriver]) {
            summary[namaDriver] = {
              totalKerja: 0,

              totalLembur: 0
            };
          }

          /* ================= JUMLAHKAN ================= */

          summary[namaDriver].totalKerja += jamKerja;

          summary[namaDriver].totalLembur += jamLembur;
        }
      });

      /* =====================================================
         TAMPILKAN HASIL
      ===================================================== */

      Object.keys(summary).forEach((driver) => {
        let tr = document.createElement("tr");

        const totalKerja = parseFloat(summary[driver].totalKerja.toFixed(2));

        const totalLembur = parseFloat(summary[driver].totalLembur.toFixed(2));

        tr.innerHTML = `

          <td>${driver}</td>

          <td>
            ${totalKerja}
          </td>

          <td>
            ${totalLembur}
          </td>

        `;

        tbody.appendChild(tr);
      });

      /* ================= JIKA TIDAK ADA DATA ================= */

      if (Object.keys(summary).length === 0) {
        tbody.innerHTML = `

          <tr>

            <td colspan="3"
                style="
                  text-align:center;
                  padding:20px;
                  font-weight:bold;
                  color:red;
                ">

              Data tidak ditemukan

            </td>

          </tr>

        `;
      }
    })

    .catch((error) => {
      console.error("Gagal filter monthly report:", error);
    });
}
/* ================= LOAD MONTHLY REPORT ================= */

function loadMonthlyReport() {
  const role = localStorage.getItem("userRole") || "admin";

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=read&role=${role}`
  )
    .then((response) => response.json())

    .then((data) => {
      const tbody = document.querySelector("#monthlyReportTable tbody");

      tbody.innerHTML = "";

      /* ================= OBJECT SUMMARY ================= */

      let summary = {};

      data.forEach((row) => {
        /* ================= DATA SHEET =================
         row[0] = Nama Driver
         row[3] = Jam Kerja (Kolom D)
         row[5] = Hasil Lembur (Kolom F)
      =============================================== */

        const namaDriver = row[0] || "-";

        const totalJamKerja = parseFloat(row[3]) || 0;

        const totalJamLembur = parseFloat(row[5]) || 0;

        /* ================= CEK DRIVER ================= */

        if (!summary[namaDriver]) {
          summary[namaDriver] = {
            totalKerja: 0,
            totalLembur: 0
          };
        }

        /* ================= JUMLAHKAN ================= */

        summary[namaDriver].totalKerja += totalJamKerja;

        summary[namaDriver].totalLembur += totalJamLembur;
      });

      /* ================= TAMPILKAN KE TABEL ================= */

      Object.keys(summary).forEach((driver) => {
        let tr = document.createElement("tr");

        /* ================= FORMAT ANGKA ================= */

        const totalKerja = parseFloat(summary[driver].totalKerja.toFixed(2));

        const totalLembur = parseFloat(summary[driver].totalLembur.toFixed(2));

        tr.innerHTML = `

    <td>${driver}</td>

    <td>
      ${totalKerja}
    </td>

    <td>
      ${totalLembur}
    </td>

  `;

        tbody.appendChild(tr);
      });
    })

    .catch((error) => {
      console.error("Gagal load monthly report:", error);
    });
}

/* =========================================================
   DOWNLOAD MONTHLY REPORT EXCEL
========================================================= */

async function downloadMonthlyExcel() {
  await downloadMonthlyTableAsExcel(
    "monthlyReportBody",
    "Monthly_Overtime_Report.xlsx"
  );
}

/* =========================================================
   DOWNLOAD MONTHLY TABLE TO EXCEL
========================================================= */

async function downloadMonthlyTableAsExcel(bodyTableId, filename) {
  /* ================= LOADER ================= */

  let loader = document.getElementById("excelDownloadLoader");

  if (!loader) {
    loader = document.createElement("div");

    loader.id = "excelDownloadLoader";

    loader.style.display = "none";

    loader.innerHTML = `

      <div class="loader-overlay">

        <div class="spinner"></div>

        <p class="loader-text">
          Sedang membuat file Excel...
        </p>

      </div>

    `;

    document.body.appendChild(loader);
  }

  loader.style.display = "flex";

  try {
    /* ================= AMBIL TABEL ================= */

    const bodyTable = document.getElementById(bodyTableId);

    if (!bodyTable) {
      alert("Tabel monthly report tidak ditemukan!");

      return;
    }

    const table = bodyTable.closest("table");

    const headerDiv = table.querySelector("thead");

    /* ================= HEADER ================= */

    const headers = Array.from(headerDiv.querySelectorAll("th")).map((th) =>
      th.innerText.trim()
    );

    /* ================= ROWS ================= */

    const rows = Array.from(bodyTable.querySelectorAll("tr"));

    /* ================= WORKBOOK ================= */

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Monthly Report");

    /* ================= HEADER ROW ================= */

    sheet.addRow(headers);

    const headerRow = sheet.getRow(1);

    headerRow.height = 25;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",

        pattern: "solid",

        fgColor: {
          argb: "658C58"
        }
      };

      cell.font = {
        bold: true,

        color: {
          argb: "FFFFFFFF"
        },

        size: 12
      };

      cell.alignment = {
        vertical: "middle",

        horizontal: "center"
      };

      cell.border = {
        top: {
          style: "thin"
        },

        left: {
          style: "thin"
        },

        bottom: {
          style: "thin"
        },

        right: {
          style: "thin"
        }
      };
    });

    /* ================= DATA ================= */

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");

      const rowValues = [];

      cells.forEach((cell) => {
        rowValues.push(cell.innerText.trim());
      });

      const addedRow = sheet.addRow(rowValues);

      addedRow.eachCell((cell) => {
        cell.border = {
          top: {
            style: "thin"
          },

          left: {
            style: "thin"
          },

          bottom: {
            style: "thin"
          },

          right: {
            style: "thin"
          }
        };

        cell.alignment = {
          vertical: "middle",

          horizontal: "center"
        };
      });
    });

    /* ================= AUTO WIDTH ================= */

    sheet.columns.forEach((column) => {
      let maxLength = 15;

      column.eachCell(
        {
          includeEmpty: true
        },
        (cell) => {
          const value = cell.value ? cell.value.toString() : "";

          maxLength = Math.max(maxLength, value.length);
        }
      );

      column.width = maxLength + 5;
    });

    /* ================= EXPORT ================= */

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),

      filename
    );
  } catch (error) {
    console.error(error);

    alert("Gagal membuat Monthly Excel!");
  } finally {
    loader.style.display = "none";
  }
}

function generateDriverMatrix() {
  const role = localStorage.getItem("userRole") || "admin";

  Promise.all([
    fetch(
      `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=read&role=${role}`
    ).then((r) => r.json()),

    fetch(
      `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readDinasLuar&role=${role}`
    ).then((r) => r.json()),

    fetch(
      `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readBiodata`
    ).then((r) => r.json())
  ])

    .then(([data, dinasLuarData, biodata]) => {
      const tbody = document.getElementById("driverMatrixBody");

      const monthHeader = document.getElementById("matrixMonthHeader");

      const dateHeader = document.getElementById("matrixDateHeader");

      const dayHeader = document.getElementById("matrixDayHeader");

      const holidayDates = {};

      tbody.innerHTML = "";

      monthHeader.innerHTML = `
    <th rowspan="3">NO</th>
    <th rowspan="3">NO PEGAWAI</th>
    <th rowspan="3">NAMA PENGEMUDI</th>
    <th rowspan="3">RINCIAN</th>
    <th rowspan="3">FLEET CODE</th>
    <th rowspan="3">LOKASI</th>
  `;

      dateHeader.innerHTML = "";
      dayHeader.innerHTML = "";

      const biodataMap = {};

      biodata.forEach((row) => {
        const nama = (row.nama || "").trim().toLowerCase();

        biodataMap[nama] = {
          noBadge: row.badge || "-",

          fleetCode: row.fleet || "-",

          lokasi: row.lokasi || "-"
        };
      });
      console.log("BIODATA =", biodata);

      /* ================= FORMAT TANGGAL LOKAL ================= */

      function formatLocalDate(date) {
        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
      }

      /* ================= FILTER TANGGAL ================= */

      /* Jika tanggal belum dipilih,
   otomatis gunakan bulan berjalan */

      if (
        !document.getElementById("matrixStartDate").value &&
        !document.getElementById("matrixEndDate").value
      ) {
        const today = new Date();

        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        document.getElementById(
          "matrixStartDate"
        ).value = firstDay.toISOString().split("T")[0];

        document.getElementById(
          "matrixEndDate"
        ).value = lastDay.toISOString().split("T")[0];
      }

      const startDate = document.getElementById("matrixStartDate").value;

      const endDate = document.getElementById("matrixEndDate").value;

      const start = new Date(startDate);

      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);

      end.setHours(23, 59, 59, 999);
      document.addEventListener("DOMContentLoaded", function () {
        generateDriverMatrix();
      });
      /* ================= LIST TANGGAL ================= */

      const dateList = [];

      const current = new Date(start);

      while (current <= end) {
        dateList.push(new Date(current));

        current.setDate(current.getDate() + 1);
      }

      const namaHari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

      /* ================= HEADER BULAN ================= */

      const monthGroups = {};

      dateList.forEach((date) => {
        const monthName = date.toLocaleString("id-ID", {
          month: "long"
        });

        const key = `${monthName} ${date.getFullYear()}`;

        if (!monthGroups[key]) {
          monthGroups[key] = 0;
        }

        monthGroups[key]++;
      });

      Object.keys(monthGroups).forEach((month) => {
        monthHeader.innerHTML += `

      <th colspan="${monthGroups[month]}">
        ${month.toUpperCase()}
      </th>

    `;
      });

      monthHeader.innerHTML += `
  <th rowspan="3">
    TOTAL
  </th>
`;

      /* ================= HEADER TANGGAL ================= */

      dateList.forEach((date) => {
        const th = document.createElement("th");

        th.textContent = String(date.getDate()).padStart(2, "0");

        const key = formatLocalDate(date);

        if (date.getDay() === 0 || date.getDay() === 6) {
          th.classList.add("weekend");
        }

        if (holidayDates[key]) {
          th.classList.add("holiday");
        }

        dateHeader.appendChild(th);
      });

      /* ================= HEADER HARI ================= */

      const shortDay = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

      dateList.forEach((date) => {
        const th = document.createElement("th");

        th.textContent = shortDay[date.getDay()];

        const key = formatLocalDate(date);

        if (date.getDay() === 0 || date.getDay() === 6) {
          th.classList.add("weekend");
        }

        if (holidayDates[key]) {
          th.classList.add("holiday");
        }

        dayHeader.appendChild(th);
      });

      /* ================= GROUP DRIVER ================= */

      const drivers = {};

      data.forEach((row) => {
        const driver = row[0] || "-";

        const tanggal = row[1];

        if (!tanggal) return;

        const date = new Date(tanggal);

        if (isNaN(date)) {
          return;
        }

        date.setHours(0, 0, 0, 0);

        if (date < start || date > end) {
          return;
        }

        const dayKey = formatLocalDate(date);

        if (row[19] === true || row[19] === "TRUE" || row[19] === "true") {
          holidayDates[dayKey] = true;
        }

        if (!drivers[driver]) {
          drivers[driver] = {
            hariKerja: {},
            jamLembur: {},
            konversi: {},
            dinasLuar: {}
          };
        }

        /* ================= KOLOM C ================= */

        drivers[driver].hariKerja[dayKey] = row[2] || "";

        /* ================= KOLOM E ================= */

        drivers[driver].jamLembur[dayKey] = row[4] || "";

        /* ================= KOLOM F ================= */

        drivers[driver].konversi[dayKey] = row[5] || "";
      });

      /* ================= DINAS LUAR ================= */

      dinasLuarData.forEach((row) => {
        const driver = row[0];

        const tanggal = row[1];

        if (!driver || !tanggal) return;

        const date = new Date(tanggal);

        const key = formatLocalDate(date);

        if (!drivers[driver]) {
          drivers[driver] = {
            hariKerja: {},
            jamLembur: {},
            konversi: {},
            dinasLuar: {}
          };
        }

        drivers[driver].dinasLuar[key] = 1;
      });

      /* ================= BUAT TABEL ================= */

      let no = 1;

      Object.keys(drivers)
        .sort()
        .forEach((driver) => {
          const detailRows = [
            {
              label: "HARI KERJA",
              data: drivers[driver].hariKerja
            },

            {
              label: "JAM LEMBUR",
              data: drivers[driver].jamLembur
            },

            {
              label: "KONVERSI",
              data: drivers[driver].konversi
            },

            {
              label: "DINAS LUAR",
              data: drivers[driver].dinasLuar
            }
          ];

          detailRows.forEach((detail, index) => {
            const tr = document.createElement("tr");

            let html = "";

            const bio = biodataMap[driver.trim().toLowerCase()] || {
              noBadge: "-",
              fleetCode: "-",
              lokasi: "-"
            };
            console.log("Driver Matrix:", driver);

            console.log("Biodata:", biodataMap[driver.trim().toLowerCase()]);

            if (index === 0) {
              html += `

<td rowspan="${detailRows.length}">
  ${no}
</td>

<td rowspan="${detailRows.length}">
  ${bio.noBadge}
</td>

<td rowspan="${detailRows.length}">
  ${driver}
</td>

`;
            }

            html += `

<td class="detail-col">
  ${detail.label}
</td>

<td>
  ${index === 0 ? bio.fleetCode : ""}
</td>

<td>
  ${index === 0 ? bio.lokasi : ""}
</td>

`;

            let total = 0;

            dateList.forEach((date) => {
              const key = formatLocalDate(date);

              const value = detail.data[key] || "";

              let cellClass = "";

              /* Sabtu & Minggu */

              if (date.getDay() === 0 || date.getDay() === 6) {
                cellClass = "weekend-data";
              }

              /* Libur Khusus */

              if (holidayDates[key]) {
                cellClass = "holiday-data";
              }

              html += `

    <td class="${cellClass}">
      ${value}
    </td>

  `;

              const num = parseFloat(value);

              if (!isNaN(num)) {
                total += num;
              }
            });
            html += `

              <td class="total-col">
                ${total}
              </td>

            `;

            tr.innerHTML = html;

            tbody.appendChild(tr);
          });

          no++;
        });
    })
    .catch((error) => {
      console.error("Generate Matrix Error:", error);

      console.error("Message:", error.message);

      console.error("Stack:", error.stack);
    });
}

async function downloadDriverMatrixExcel() {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Driver Matrix");

  /* ================= JUDUL ================= */

  worksheet.mergeCells("A1:AZ2");

  const title = worksheet.getCell("A1");

  title.value = "Driver Attendance & Overtime Table";

  title.font = {
    bold: true,
    size: 20,
    name: "Calibri"
  };

  title.alignment = {
    horizontal: "center",
    vertical: "middle"
  };

  worksheet.getRow(1).height = 28;
  worksheet.getRow(2).height = 20;

  /* ================= AMBIL TABEL HTML ================= */

  const table = document.getElementById("driverMatrixTable");

  const rows = table.querySelectorAll("tr");

  let excelRow = 4;

  rows.forEach((tr) => {
    let excelCol = 1;

    tr.querySelectorAll("th, td").forEach((cell) => {
      while (worksheet.getRow(excelRow).getCell(excelCol).value !== null) {
        excelCol++;
      }

      const rowSpan = parseInt(cell.getAttribute("rowspan") || 1);

      const colSpan = parseInt(cell.getAttribute("colspan") || 1);

      const target = worksheet.getRow(excelRow).getCell(excelCol);

      target.value = cell.innerText.trim();

      target.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true
      };

      target.border = {
        top: {
          style: "thin",
          color: {
            argb: "C0C0C0"
          }
        },

        left: {
          style: "thin",
          color: {
            argb: "C0C0C0"
          }
        },

        bottom: {
          style: "thin",
          color: {
            argb: "C0C0C0"
          }
        },

        right: {
          style: "thin",
          color: {
            argb: "C0C0C0"
          }
        }
      };

      /* ================= HEADER ================= */

      if (cell.tagName === "TH") {
        target.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "7FB8D4"
          }
        };

        target.font = {
          bold: true,
          color: {
            argb: "000000"
          }
        };

        target.border = {
          top: {
            style: "thin",
            color: {
              argb: "000000"
            }
          },

          left: {
            style: "thin",
            color: {
              argb: "000000"
            }
          },

          bottom: {
            style: "thin",
            color: {
              argb: "000000"
            }
          },

          right: {
            style: "thin",
            color: {
              argb: "000000"
            }
          }
        };
      }

      /* ================= WEEKEND ================= */

      if (cell.classList.contains("weekend")) {
        target.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb: "FF1E1E"
          }
        };

        target.font = {
          bold: true,

          color: {
            argb: "FFFFFF"
          }
        };
      }

      /* ================= DATA WEEKEND ================= */

      if (cell.classList.contains("weekend-data")) {
        target.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb: "FFF5F5"
          }
        };

        target.font = {
          bold: true,

          color: {
            argb: "E60000"
          }
        };
      }

      /* ================= TOTAL ================= */

      if (cell.classList.contains("total-col")) {
        target.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb: "EAF4FA"
          }
        };

        target.font = {
          bold: true
        };
      }

      /* ================= DETAIL ================= */

      if (cell.classList.contains("detail-col")) {
        target.font = {
          bold: true
        };
      }

      /* ================= MERGE ================= */

      if (rowSpan > 1 || colSpan > 1) {
        worksheet.mergeCells(
          excelRow,

          excelCol,

          excelRow + rowSpan - 1,

          excelCol + colSpan - 1
        );
      }

      excelCol += colSpan;
    });

    excelRow++;
  });

  /* ================= LEBAR KOLOM ================= */

  worksheet.columns.forEach((column) => {
    column.width = 9;
  });

  worksheet.getColumn(1).width = 6;
  worksheet.getColumn(2).width = 15;
  worksheet.getColumn(3).width = 28;
  worksheet.getColumn(4).width = 18;
  worksheet.getColumn(5).width = 12;
  worksheet.getColumn(6).width = 12;

  /* ================= TINGGI BARIS ================= */

  worksheet.eachRow((row) => {
    row.height = 22;
  });

  /* ================= FREEZE ================= */

  worksheet.views = [
    {
      state: "frozen",
      xSplit: 6,
      ySplit: 6
    }
  ];

  /* ================= PRINT ================= */

  worksheet.pageSetup = {
    orientation: "landscape",

    paperSize: 9,

    fitToPage: true,

    fitToWidth: 1,

    fitToHeight: 0,

    horizontalCentered: true
  };

  /* ================= DOWNLOAD ================= */

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }),

    `Driver_Matrix_${new Date().toISOString().split("T")[0]}.xlsx`
  );
}

function filterOvertimeChart() {
  const startDate = document.getElementById("chartStartDate").value;

  const endDate = document.getElementById("chartEndDate").value;

  generateOvertimeChart(startDate, endDate);
}
function loadCurrentMonthChart() {
  const now = new Date();

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  document.getElementById(
    "chartStartDate"
  ).value = firstDay.toISOString().split("T")[0];

  document.getElementById("chartEndDate").value = lastDay
    .toISOString()
    .split("T")[0];

  generateOvertimeChart(
    document.getElementById("chartStartDate").value,

    document.getElementById("chartEndDate").value
  );
}
/* ================= GLOBAL CHART ================= */
let overtimeChart;
let overtimeLineChart;

/* ================= GENERATE CHART ================= */
function generateOvertimeChart(startDate = null, endDate = null) {
  const canvas = document.getElementById("overtimeLineChart");

  if (!canvas) {
    console.error("❌ Canvas overtimeLineChart tidak ditemukan!");
    return;
  }

  const ctx = canvas.getContext("2d");

  const role = localStorage.getItem("userRole") || "admin";

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=read&role=${role}`,
    {
      method: "GET",
      mode: "cors"
    }
  )
    .then(async (response) => {
      console.log("STATUS:", response.status);

      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      try {
        return JSON.parse(text);
      } catch (e) {
        throw new Error("Response bukan JSON valid!");
      }
    })

    .then(async (data) => {
      if (!Array.isArray(data)) {
        throw new Error("Data bukan array!");
      }

      /* ================= LOAD BIODATA ================= */

      const biodataResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readBiodata"
      );

      const biodataDriver = await biodataResponse.json();
      console.log("BIODATA DRIVER");
      console.table(biodataDriver);

      console.log("BIODATA PERTAMA");
      console.log(biodataDriver[0]);

      /* ================= FILTER DEPARTEMENT ================= */

      const selectedDept =
        document.getElementById("departmentFilter")?.value || "all";

      const departmentMap = {};

      biodataDriver.forEach((item) => {
        const nama = String(item.nama || "")
          .trim()
          .toLowerCase();

        const dept = String(item.departement || item.department || "").trim();

        departmentMap[nama] = dept;
      });
      console.log("=== BIODATA DRIVER ===");
      console.table(biodataDriver);

      console.log("=== DEPARTMENT MAP ===");
      console.log(departmentMap);

      /* ================= FILTER DATA ================= */

      let filteredData = [...data];

      if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        filteredData = filteredData.filter((row) => {
          if (!row[1]) return false;

          const rowDate = new Date(row[1]);
          rowDate.setHours(0, 0, 0, 0);

          return rowDate >= start && rowDate <= end;
        });
      }

      /* ================= FILTER DEPARTEMENT ================= */

      if (selectedDept !== "all") {
        filteredData = filteredData.filter((row) => {
          const namaDriver = String(row[0] || "")
            .trim()
            .toLowerCase();

          const deptDriver = String(departmentMap[namaDriver] || "")
            .trim()
            .toLowerCase();

          const deptDipilih = String(selectedDept || "")
            .trim()
            .toLowerCase();

          console.log(
            namaDriver,
            "| Driver:",
            deptDriver,
            "| Dipilih:",
            deptDipilih,
            "| Cocok:",
            deptDriver === deptDipilih
          );

          return deptDriver === deptDipilih;
        });
      }

      console.log("Data setelah filter:", filteredData.length);

      /* ================= SUMMARY ================= */

      const monthlySummary = {};

      filteredData.forEach((row) => {
        const driver = row[0] || "Unknown";

        const jamKerja = Number(row[3]) || 0;

        const hasilPerkalianLembur = Number(row[5]) || 0;

        if (!monthlySummary[driver]) {
          monthlySummary[driver] = {
            totalJamKerja: 0,

            totalJamLembur: 0
          };
        }

        monthlySummary[driver].totalJamKerja += jamKerja;

        monthlySummary[driver].totalJamLembur += hasilPerkalianLembur;
      });
      console.table(
        Object.keys(monthlySummary).map((driver) => ({
          driver,

          totalJamKerja: monthlySummary[driver].totalJamKerja,

          totalJamLembur: monthlySummary[driver].totalJamLembur
        }))
      );

      /* ================= SORT ================= */

      const sortedDrivers = Object.keys(monthlySummary)
        .map((driver) => ({
          driver,

          totalJamKerja: monthlySummary[driver].totalJamKerja,

          totalJamLembur: monthlySummary[driver].totalJamLembur
        }))
        .sort((a, b) => b.totalJamLembur - a.totalJamLembur);

      /* ================= DATA CHART ================= */

      const sortedLabels = sortedDrivers.map((item) => item.driver);

      const sortedLembur = sortedDrivers.map((item) => item.totalJamLembur);

      const sortedJamKerja = sortedDrivers.map((item) => item.totalJamKerja);

      /* ================= SELISIH LEMBUR ================= */

      const overtimeDifferences = sortedLembur.map((value, index, arr) => {
        if (index === 0) return 0;

        return value - arr[index - 1];
      });

      /* ================= DESTROY CHART LAMA ================= */

      if (overtimeLineChart) {
        overtimeLineChart.destroy();
      }

      /* ================= AUTO WIDTH ================= */

      const dynamicWidth = Math.max(sortedLabels.length * 120, 1200);

      canvas.style.width = dynamicWidth + "px";

      /* ================= DEBUG ================= */

      console.log("Driver:", sortedLabels);

      console.log("Lembur F:", sortedLembur);

      console.log("Jam Kerja D:", sortedJamKerja);

      console.log("Selisih:", overtimeDifferences);
      /* ================= LINE CHART ================= */
      overtimeLineChart = new Chart(ctx, {
        type: "line",

        plugins: [ChartDataLabels],

        data: {
          labels: sortedLabels,

          datasets: [
            /* ================= HASIL PERKALIAN LEMBUR (F) ================= */

            {
              label: "Jam lembur (koversi)",

              data: sortedLembur,

              borderColor: "rgba(75, 192, 192, 1)",

              backgroundColor: "rgba(75, 192, 192, 0.2)",

              fill: true,

              tension: 0.35,

              borderWidth: 4,

              pointRadius: 5,

              pointHoverRadius: 8,

              datalabels: {
                align: "top",

                anchor: "end",

                backgroundColor: "rgba(255,255,255,0.9)",

                borderColor: "#ccc",

                borderWidth: 1,

                borderRadius: 5,

                padding: 4,

                color: "#333",

                font: {
                  weight: "bold",
                  size: 11
                },

                formatter: (value) => value
              }
            },

            /* ================= JAM KERJA (D) ================= */

            {
              label: "Jam Kerja (Kolom D)",

              data: sortedJamKerja,

              borderColor: "#ffd600",

              backgroundColor: "rgba(255,214,0,0.15)",

              fill: true,

              tension: 0.35,

              borderWidth: 4,

              pointRadius: 5,

              pointHoverRadius: 8,

              datalabels: {
                align: "bottom",
                anchor: "end",
                color: "#b28704",
                font: {
                  weight: "bold",
                  size: 11
                },
                formatter: (value) => value
              }
            },

            /* ================= SELISIH LEMBUR ================= */

            {
              label: "Selisih Lembur Antar Driver",

              data: overtimeDifferences,

              yAxisID: "y1",

              borderColor: "rgba(255, 99, 132, 1)",

              backgroundColor: "rgba(255, 99, 132, 0.2)",

              borderDash: [6, 4],

              tension: 0.3,

              fill: false,

              borderWidth: 3,

              pointRadius: 5,

              pointHoverRadius: 7,

              datalabels: {
                align: "top",

                anchor: "end",

                backgroundColor: "rgba(255,255,255,0.9)",

                borderColor: "#ddd",

                borderWidth: 1,

                borderRadius: 5,

                padding: 4,

                color: "#444",

                font: {
                  weight: "bold",
                  size: 10
                },

                formatter: function (value, context) {
                  if (context.dataIndex === 0) {
                    return "0j";
                  }

                  const previous = sortedLembur[context.dataIndex - 1];

                  const current = sortedLembur[context.dataIndex];

                  const diff = current - previous;

                  let percent = 0;

                  if (previous !== 0) {
                    percent = (diff / previous) * 100;
                  }

                  return `${diff.toFixed(1)}j (${percent.toFixed(1)}%)`;
                }
              }
            }
          ]
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          animation: {
            duration: 1500,

            easing: "easeOutQuart"
          },

          layout: {
            padding: {
              bottom: 100
            }
          },

          plugins: {
            legend: {
              position: "top"
            },

            datalabels: {
              clamp: true
            },

            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw} jam`;
                }
              }
            }
          },

          scales: {
            x: {
              ticks: {
                maxRotation: 35,
                minRotation: 35,
                autoSkip: false,
                font: {
                  size: 11
                }
              }
            },

            y: {
              beginAtZero: true,
              position: "left",

              title: {
                display: true,
                text: "Jam Kerja & Konversi Lembur"
              }
            },

            y1: {
              position: "right",

              beginAtZero: false,

              grid: {
                drawOnChartArea: false
              },

              title: {
                display: true,
                text: "Selisih Antar Driver"
              }
            }
          }
        }
      });
      /* ================= INFO ================= */
      const updateInfo = document.getElementById("updateInfo");

      const totalLembur = sortedLembur.reduce((a, b) => a + b, 0);

      const totalJamKerja = sortedJamKerja.reduce((a, b) => a + b, 0);

      if (updateInfo) {
        updateInfo.innerHTML = `
  <p><strong>Update:</strong> ${new Date().toLocaleString()}</p>
  <p><strong>Total Driver:</strong> ${sortedLabels.length}</p>
  <p><strong>Total Hasil Perkalian Lembur (F):</strong> ${totalLembur.toFixed(
    1
  )} jam</p>
  <p><strong>Total Jam Kerja (D):</strong> ${totalJamKerja.toFixed(1)} jam</p>
`;
      }
    })

    .catch((err) => {
      console.error("❌ Gagal load chart:", err);
    });
}
/* ================= FILTER DEPARTEMENT ================= */

function filterDepartmentChart() {
  const startDate = document.getElementById("chartStartDate").value;

  const endDate = document.getElementById("chartEndDate").value;

  generateOvertimeChart(startDate, endDate);
}

/* ================= BIODATA DRIVER ================= */
let biodataReady = false;
let biodataDriver = [];

window.addEventListener("load", loadDriverBiodata);

function loadDriverBiodata() {
  fetch(
    "https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readBiodata"
  )
    .then((res) => res.json())
    .then((data) => {
      biodataDriver = data;
      biodataReady = true;

      console.log("Biodata Driver Loaded:", biodataDriver.length);
    })
    .catch((err) => {
      console.error("Gagal load biodata:", err);
    });
}

/* ================= LOAD FOTO DRIVER ================= */

function loadDriverPhoto() {
  const selectedDriver = document.getElementById("driverSelect").value;

  const img = document.getElementById("driverPhoto");

  const nama = document.getElementById("driverPhotoName");

  console.log("Jumlah Biodata:", biodataDriver.length);
  console.log("Driver Dipilih:", selectedDriver);

  if (!selectedDriver) {
    img.src = "https://via.placeholder.com/240x320?text=Driver";

    nama.textContent = "Pilih Driver";

    return;
  }

  console.log("Driver dipilih:", selectedDriver);

  biodataDriver.forEach((row, i) => {
    console.log(i, "Nama Sheet:", row.nama);
  });

  const driver = biodataDriver.find((row) => {
    const namaSheet = (row.nama || "")
      .toString()
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    const namaDropdown = selectedDriver
      .toString()
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    console.log("Bandingkan:", namaSheet, "===", namaDropdown);

    return namaSheet === namaDropdown;
  });

  console.log("Driver ditemukan:", driver);

  if (driver) {
    img.src =
      driver.photo || "https://via.placeholder.com/240x320?text=No+Photo";

    nama.textContent = driver.nama;
  } else {
    img.src = "https://via.placeholder.com/240x320?text=No+Photo";

    nama.textContent = "Photo Tidak Ditemukan";
  }
}
console.log("Data Pertama:", biodataDriver[0]);
console.log(
  "Semua Nama Biodata:",
  biodataDriver.map((x) => x.nama)
);
window.addEventListener("load", loadCurrentMonthChart);
/* ================= GLOBAL DRIVER CHART ================= */

let driverChart;

/* ================= FILTER BUTTON ================= */

function filterdriverChart() {
  const startDate = document.getElementById("driverChartStartDate").value;

  const endDate = document.getElementById("driverChartEndDate").value;

  generateDriverChart(true);
}

/* ================= GENERATE DRIVER CHART ================= */

function generateDriverChart(useDateFilter = false) {
  const role = localStorage.getItem("userRole") || "admin";

  const selectedDriver = document.getElementById("driverSelect").value;

  if (!selectedDriver) return;

  const startDate = document.getElementById("driverChartStartDate").value;

  const endDate = document.getElementById("driverChartEndDate").value;

  const canvas = document.getElementById("driverChart");

  const ctx = canvas.getContext("2d");

  fetch(
    `https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=read&role=${role}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("ROLE DRIVER CHART:", role);

      /* ================= FILTER DATA ================= */

      let filteredData = data.filter((row) => {
        const driverName = (row[0] || "").toLowerCase();

        const matchDriver = driverName.includes(selectedDriver.toLowerCase());

        if (!matchDriver) return false;

        if (!useDateFilter || !startDate || !endDate) {
          return true;
        }

        /* ================= FILTER TANGGAL ================= */

        const rowDateObj = new Date(row[1]);

        const startObj = new Date(startDate);

        const endObj = new Date(endDate);

        startObj.setHours(0, 0, 0, 0);

        endObj.setHours(23, 59, 59, 999);

        console.log(
          "Driver:",
          row[0],
          "Tanggal:",
          rowDateObj,
          "Start:",
          startObj,
          "End:",
          endObj
        );

        return rowDateObj >= startObj && rowDateObj <= endObj;
      });

      /* ================= SORT TANGGAL ================= */

      filteredData.sort((a, b) => {
        return new Date(a[1]) - new Date(b[1]);
      });

      console.log("Data setelah filter:", filteredData.length);

      /* ================= DESTROY OLD CHART ================= */

      if (driverChart) {
        driverChart.destroy();
      }

      /* ================= JIKA TIDAK ADA DATA ================= */

      if (filteredData.length === 0) {
        driverChart = new Chart(ctx, {
          type: "bar",

          data: {
            labels: ["Tidak Ada Data"],

            datasets: [
              {
                label: "Overtime",
                data: [0],
                backgroundColor: "rgba(200,200,200,0.7)"
              }
            ]
          },

          options: {
            responsive: true,

            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: false
              }
            }
          }
        });

        return;
      }

      /* ================= LABEL ================= */

      const labels = filteredData.map((row) => {
        const rawTanggal = row[1];

        const hari = row[2] || "-";

        const tanggal = new Date(rawTanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

        return `${hari} - ${tanggal}`;
      });

      /* ================= OVERTIME ================= */

      const overtimeData = filteredData.map((row) => parseFloat(row[5]) || 0);

      /* ================= AUTO WIDTH ================= */

      const dynamicWidth = Math.max(labels.length * 120, 1000);

      canvas.style.width = dynamicWidth + "px";

      /* ================= CREATE CHART ================= */

      driverChart = new Chart(ctx, {
        type: "bar",

        plugins: [ChartDataLabels],

        data: {
          labels,

          datasets: [
            {
              label: `Overtime ${selectedDriver}`,

              data: overtimeData,

              backgroundColor: "rgba(54,162,235,0.7)",

              borderColor: "rgba(54,162,235,1)",

              borderWidth: 2,

              borderRadius: 8
            }
          ]
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          animation: {
            duration: 1500
          },

          layout: {
            padding: {
              bottom: 100
            }
          },

          plugins: {
            legend: {
              position: "top"
            },

            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.raw + " jam";
                }
              }
            },

            datalabels: {
              anchor: "end",

              align: "top",

              color: "#333",

              font: {
                weight: "bold"
              },

              formatter: (value) => value + " jam"
            }
          },

          scales: {
            x: {
              ticks: {
                autoSkip: false,

                maxRotation: 45,

                minRotation: 45
              }
            },

            y: {
              beginAtZero: true,

              title: {
                display: true,

                text: "Jam Lembur"
              }
            }
          }
        }
      });
    })

    .catch((err) => {
      console.error("❌ Gagal load driver chart:", err);
    });
}
function updateHariDinas() {
  const tanggal = document.getElementById("dlTanggal").value;

  if (!tanggal) return;

  const hariList = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];

  document.getElementById("dlHari").value =
    hariList[new Date(tanggal).getDay()];
}
function resetDinasLuar() {
  document.getElementById("dlNamaDriver").selectedIndex = 0;

  document.getElementById("dlTanggal").value = "";

  document.getElementById("dlHari").value = "";

  document.getElementById("dlTujuan").value = "";
}

function submitDinasLuar() {
  const data = {
    type: "dinasLuar",

    namaDriver: document.getElementById("dlNamaDriver").value,

    tanggal: document.getElementById("dlTanggal").value,

    hari: document.getElementById("dlHari").value,

    tujuan: document.getElementById("dlTujuan").value
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  )
    .then((res) => res.json())
    .then(() => {
      alert("Data Dinas Luar berhasil disimpan");
    });
}

window.addEventListener("load", () => {
  const source = document.getElementById("namaDriver");

  const target = document.getElementById("jobNamaDriver");

  target.innerHTML = source.innerHTML;
});
window.addEventListener("load", () => {
  fetch(
    "https://script.google.com/macros/s/AKfycbytyecx9KV5KOwEdIQT5758jJquiFfHFbYcTDVEe9Qz_acNhMxCMEcA6tCfW9Gk-JZfQQ/exec?action=readBiodata"
  )
    .then((res) => res.json())
    .then((data) => {
      biodataDriver = data;

      const selectDriver = document.getElementById("jobNamaDriver");

      selectDriver.innerHTML =
        '<option value="" disabled selected>Pilih Driver</option>';

      data.forEach((driver) => {
        const option = document.createElement("option");

        option.value = driver.nama;
        option.textContent = driver.nama;

        selectDriver.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Gagal load biodata:", err);
    });
});

let stjData = [];

document
  .getElementById("jobNamaDriver")
  .addEventListener("change", function () {
    const namaDriver = this.value;

    const driver = biodataDriver.find((d) => d.nama === namaDriver);

    if (!driver) return;

    /* ================= FOTO ================= */

    document.getElementById("jobDriverPhoto").src =
      driver.photo || "https://i.postimg.cc/BbpbqCQy/egi.jpg";

    /* ================= BADGE ================= */

    const badgeField = document.getElementById("jobBadge");

    badgeField.value = driver.badge || "";

    /* ================= FLEET CODE ================= */

    const fleetField = document.getElementById("jobFleetCode");

    fleetField.value = driver.fleet || "";

    /* ================= DEPARTMENT ================= */

    const departmentField = document.getElementById("jobDepartment");
    departmentField.value = driver.departement || "";

    /* ================= JENIS KENDARAAN ================= */

    const vehicleField = document.getElementById("jobVehicleType");
    vehicleField.value = driver.jeniskendaraan || "";

    /* ================= DRIVER CONTACT ================= */

    const contactField = document.getElementById("drivercontact");
    contactField.value = driver.drivercontact || "";

    /* ================= JABATAN ================= */

    const jabatanField = document.getElementById("jobStatusJabatan");
    jabatanField.value = driver.jabatan || "";
  });

async function submitPekerjaanDriver() {
  const data = {
    namaDriver: document.getElementById("jobNamaDriver").value,

    noBadge: document.getElementById("jobBadge").value,

    fleetCode: document.getElementById("jobFleetCode").value,

    jenisKendaraan: document.getElementById("jobVehicleType").value,

    drivercontact: document.getElementById("drivercontact").value,

    tanggalPermintaan: document.getElementById("jobTanggal").value,

    department: document.getElementById("jobDepartment").value,

    statusJabatan: document.getElementById("jobStatusJabatan").value,

    tanggalAwalPekerjaan: document.getElementById("jobTanggalPekerjaan").value,

    jamAwalPekerjaan: document.getElementById("jobJamMulai").value,

    jamAkhirPekerjaan: document.getElementById("jobJamSelesai").value,

    pemberiPekerjaan: document.getElementById("jobInputBy").value,

    pemintaPekerjaan: document.getElementById("jobPeminta").value,

    tanggalAkhirPekerjaan: document.getElementById("jobTanggalAkhir").value,

    summaryPekerjaan: document.getElementById("jobSummary").value,

    status: "Open"
  };

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxyTOkKDvhFmQnyFzB1BfK4ZVocf3X7wVQKwAtyvR2i-JrqGekMkgXqwTwQWMop_rOgsA/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      }
    );

    alert("Data STJ berhasil dikirim");

    resetPekerjaanDriver();
  } catch (error) {
    console.error("ERROR:", error);
    console.error("MESSAGE:", error.message);

    alert("Terjadi kesalahan saat mengirim data\n" + error.message);
  }
}
function resetPekerjaanDriver() {
  document.getElementById("jobNamaDriver").selectedIndex = 0;

  document.getElementById("jobBadge").value = "";
  document.getElementById("jobFleetCode").value = "";
  document.getElementById("jobDepartment").value = "";

  document.getElementById("jobDriverPhoto").src =
    "https://i.postimg.cc/NMRDPgT5/GS-dispacer.jpg";

  document.getElementById("jobVehicleType").value = "";
  document.getElementById("drivercontact").value = "";
  document.getElementById("jobStatusJabatan").value = "";

  document.getElementById("jobTanggal").value = "";
  document.getElementById("jobTanggalPekerjaan").value = "";
  document.getElementById("jobJamMulai").value = "";
  document.getElementById("jobJamSelesai").value = "";
  document.getElementById("jobTanggalAkhir").value = "";

  document.getElementById("jobPeminta").value = "";
  document.getElementById("jobSummary").value = "";
}

function loadInputByUser() {
  const name = localStorage.getItem("reservationName") || "Unknown User";

  const inputBy = document.getElementById("jobInputBy");

  if (inputBy) {
    inputBy.value = name;
  }
}

document.addEventListener("DOMContentLoaded", loadInputByUser);

function filterSTJ() {
  const keyword = document.getElementById("searchSTJ").value.toLowerCase();

  const rows = document.querySelectorAll("#stjTableBody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();

    row.style.display = text.includes(keyword) ? "" : "none";
  });
}

async function loadReportSTJ() {
  const tbody = document.getElementById("stjTableBody");

  tbody.innerHTML = "<tr><td colspan='17'>Loading...</td></tr>";

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxyTOkKDvhFmQnyFzB1BfK4ZVocf3X7wVQKwAtyvR2i-JrqGekMkgXqwTwQWMop_rOgsA/exec"
    );

    const data = await response.json();

    stjData = data;

    tbody.innerHTML = "";

    data.forEach((item, index) => {
      tbody.innerHTML += `

        <tr>

          <td>${item.nama || ""}</td>
          <td>${item.noBadge || ""}</td>
          <td>${item.fleetCode || ""}</td>
          <td>${item.jenisKendaraan || ""}</td>
          <td>${item.driverContact || ""}</td>
          <td>${item.tanggalPermintaan || ""}</td>
          <td>${item.department || ""}</td>
          <td>${item.statusJabatan || ""}</td>
          <td>${item.tanggalAwalPekerjaan || ""}</td>
          <td>${item.jamAwalPekerjaan || ""}</td>
          <td>${item.jamAkhirPekerjaan || ""}</td>
          <td>${item.pemberiPekerjaan || ""}</td>
          <td>${item.pemintaPekerjaan || ""}</td>
          <td>${item.tanggalAkhirPekerjaan || ""}</td>
          <td>${item.summaryPekerjaan || ""}</td>

          <td>

            <select
              class="status-select"
              onchange="updateStatusSTJ(${item.rowNumber}, this.value)">

              <option value="Open"
                ${item.status === "Open" ? "selected" : ""}>
                Open
              </option>

              <option value="Close"
                ${item.status === "Close" ? "selected" : ""}>
                Close
              </option>

              <option value="Kendaraan Full Job"
                ${item.status === "Kendaraan Full Job" ? "selected" : ""}>
                Kendaraan Full Job
              </option>

              <option value="User Mengcancel"
                ${item.status === "User Mengcancel" ? "selected" : ""}>
                User Mengcancel
              </option>

            </select>

          </td>

          <td>
  <button
    class="btn-detail"
    onclick="detailSTJ(${index})">
    Detail
  </button>
</td>

        </tr>

      `;
    });
  } catch (error) {
    console.error(error);

    tbody.innerHTML = `
      <tr>
        <td colspan="17">
          Gagal memuat data STJ
        </td>
      </tr>
    `;
  }
}

async function detailSTJ(index) {
  const item = stjData[index];

  let photoDriver = "";

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyxB_Bo2GNbb3EMc2JcPuUNmHHXMCSZndSjGDHiQFJ5R6GW49BxJsdjDCdcgtliZAE/exec?action=readBiodata"
    );

    const biodata = await response.json();

    const driver = biodata.find(
      (d) => String(d.badge).trim() === String(item.noBadge).trim()
    );

    if (driver) {
      photoDriver = driver.photo;
    }
  } catch (err) {
    console.error(err);
  }

  document.getElementById("stjPreview").innerHTML = `

<div style="padding:20px;">

<div style="
  border:4px double #000;
  padding:20px;
  border-radius:8px;
  background:#fff;
">

 <div class="stj-header">

  <div class="stj-logo-left">
    <img
      src="https://i.postimg.cc/NMRDPgT5/GS-dispacer.jpg"
      alt="GS Logo">
  </div>

  <div class="stj-header-title">

    <div class="stj-title">
      SURAT TUGAS JALAN KENDARAAN
    </div>

    <div class="stj-subtitle">
      General Service Pertamina Field Jambi
    </div>

  </div>

  <div class="stj-logo-right">
    <img
      src="https://i.postimg.cc/gJbRsgmt/download.png"
      alt="Pertamina">
  </div>

</div>

<div class="stj-nomor-surat">
  <strong>No. Surat :</strong>
 <span>${generateNomorSurat(index)}</span>
</div>

<table style="width:100%;">

<tr>

<td width="130" style="padding-left:0; padding-right:10px;">

<img
  src="${photoDriver}"
  style="
    width:120px;
    height:170px;
    object-fit:cover;
    border:2px solid #000;
    border-radius:4px;
    margin-left:-20px;
">

</td>

<td>

<div style="
  border:1px solid #000;
  padding:10px;
  border-radius:4px;
  margin-left:-15px;
">

<table style="width:100%; border-collapse:collapse;">

<tr>

<td style="
  vertical-align:top;
  width:50%;
  padding-right:20px;
">

<table style="width:100%;">

<tr>
  <td><b>Nama</b></td>
  <td>: ${item.nama || ""}</td>
</tr>

<tr>
  <td><b>No Badge</b></td>
  <td>: ${item.noBadge || ""}</td>
</tr>

<tr>
  <td><b>Fleet Code</b></td>
  <td>: ${item.fleetCode || ""}</td>
</tr>

<tr>
  <td><b>Vehicle Type</b></td>
  <td>: ${item.jenisKendaraan || ""}</td>
</tr>

<tr>
  <td><b>Department</b></td>
  <td>: ${item.department || ""}</td>
</tr>

<tr>
  <td><b>Position Status</b></td>
  <td>: ${item.statusJabatan || ""}</td>
</tr>

<tr>
  <td><b>Driver Contact</b></td>
  <td>: ${item.driverContact || ""}</td>
</tr>

</table>

</td>

<td style="
  vertical-align:top;
  width:50%;
  padding-left:20px;
">

<table style="width:100%;">

<tr>
  <td><b>Pemohon Kendaraan</b></td>
  <td>: ${item.pemintaPekerjaan || ""}</td>
</tr>

<tr>
  <td><b>Tanggal Permohonan</b></td>
  <td>: ${item.tanggalPermintaan || ""}</td>
</tr>

<tr>
  <td><b>Tanggal Mulai Tugas</b></td>
  <td>: ${item.tanggalAwalPekerjaan || ""}</td>
</tr>

<tr>
  <td><b>Tanggal Selesai Tugas</b></td>
  <td>: ${item.tanggalAkhirPekerjaan || ""}</td>
</tr>

<tr>
  <td><b>Jam Mulai Tugas</b></td>
  <td>: ${item.jamAwalPekerjaan || ""}</td>
</tr>

<tr>
  <td><b>Jam Selesai Tugas</b></td>
  <td>: ${item.jamAkhirPekerjaan || ""}</td>
</tr>

<tr>
  <td><b>Dispatcher</b></td>
  <td>: ${item.pemberiPekerjaan || ""}</td>
</tr>

</table>

</td>

</tr>

</table>

</div>

</td>

</tr>

</table>

<div style="
  margin-left:130px;
  margin-top:20px;
">

<h3 style="margin-bottom:10px;">
  Summary Pekerjaan
</h3>

<div style="
  border:1px solid #000;
  min-height:120px;
  padding:15px;
">
  ${item.summaryPekerjaan || ""}
</div>

</div>

<br>

<table
style="
  width:calc(100% - 130px);
  margin-left:130px;
  margin-top:20px;
  border-collapse:collapse;
  text-align:center;
  border:2px solid #000;
  table-layout:fixed;
">

<tr>

<th style="
  border:2px solid #000;
  padding:8px;
  font-weight:bold;
">
  Dispatcher
</th>

<th style="
  border:2px solid #000;
  padding:8px;
  font-weight:bold;
">
  Driver
</th>

<th style="
  border:2px solid #000;
  padding:8px;
  font-weight:bold;
">
  User
</th>

<th style="
  border:2px solid #000;
  padding:8px;
  font-weight:bold;
">
  Koordinator
</th>

</tr>

<tr style="height:100px;">

<td style="border:2px solid #000;"></td>
<td style="border:2px solid #000;"></td>
<td style="border:2px solid #000;"></td>
<td style="border:2px solid #000;"></td>

</tr>

</table>
</div>

</div>

<button onclick="downloadSTJPDF()" style="
  padding:10px 16px;
  background:#d60000;
  color:#fff;
  border:none;
  border-radius:6px;
  cursor:pointer;
  font-weight:bold;
  margin-bottom:10px;
">
  Download PDF
</button>
`;

  document.getElementById("stjModal").style.display = "flex";
}

function closeSTJModal() {
  document.getElementById("stjModal").style.display = "none";
}

async function updateStatusSTJ(rowNumber, status) {
  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbxyTOkKDvhFmQnyFzB1BfK4ZVocf3X7wVQKwAtyvR2i-JrqGekMkgXqwTwQWMop_rOgsA/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          action: "updateStatus",
          rowNumber: rowNumber,
          status: status
        })
      }
    );

    console.log("Status berhasil diubah", rowNumber, status);
  } catch (error) {
    console.error(error);

    alert("Gagal mengubah status");
  }
}
async function downloadSTJTableAsExcel(bodyTableId, filename) {
  /* ================= LOADER ================= */

  let loader = document.getElementById("excelDownloadLoader");

  if (!loader) {
    loader = document.createElement("div");

    loader.id = "excelDownloadLoader";

    loader.style.display = "none";

    loader.innerHTML = `
      <div class="loader-overlay">
        <div class="spinner"></div>
        <p class="loader-text">Sedang membuat file Excel...</p>
      </div>
    `;

    document.body.appendChild(loader);
  }

  loader.style.display = "flex";

  try {
    /* ================= TABLE ================= */

    const bodyTable = document.getElementById(bodyTableId);

    if (!bodyTable) {
      alert("Tabel body tidak ditemukan!");
      return;
    }

    const table = bodyTable.closest("table");

    const headerDiv = table.querySelector("thead");

    if (!headerDiv) {
      alert("Header tabel tidak ditemukan!");
      return;
    }

    /* ================= HEADER ================= */

    let headers = Array.from(headerDiv.querySelectorAll("th")).map((th) =>
      th.innerText.trim()
    );

    /* ❌ HAPUS KOLOM AKSI (terakhir) */
    headers = headers.slice(0, -1);

    /* ================= ROWS ================= */

    const rows = Array.from(bodyTable.querySelectorAll("tr"));

    /* ================= WORKBOOK ================= */

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("STJ Report");

    /* ================= HEADER ROW ================= */

    sheet.addRow(headers);

    const headerRow = sheet.getRow(1);

    headerRow.height = 25;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "658C58" }
      };

      cell.font = {
        bold: true,
        color: { argb: "FFFFFFFF" },
        size: 12
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center"
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });

    /* ================= DATA ROW ================= */

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");

      const rowValues = [];

      cells.forEach((cell, index) => {
        // skip kolom aksi
        if (index === cells.length - 1) return;

        const select = cell.querySelector("select");

        if (select) {
          // ambil nilai dropdown yang sedang dipilih
          rowValues.push(select.value);
        } else {
          rowValues.push(cell.innerText.trim());
        }
      });

      const addedRow = sheet.addRow(rowValues);

      addedRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" }
        };

        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true
        };
      });
    });

    /* ================= AUTO WIDTH ================= */

    sheet.columns.forEach((column) => {
      let maxLength = 15;

      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : "";

        maxLength = Math.max(maxLength, value.length);
      });

      column.width = maxLength + 5;
    });

    /* ================= EXPORT ================= */

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      filename
    );
  } catch (error) {
    console.error(error);
    alert("Gagal membuat file Excel!");
  } finally {
    loader.style.display = "none";
  }
}
function downloadSTJExcel() {
  downloadSTJTableAsExcel("stjTableBody", "Report_STJ.xlsx");
}

function generateNomorSurat(index) {
  const now = new Date();

  const bulan = String(now.getMonth() + 1).padStart(2, "0");
  const tahun = now.getFullYear();

  return `STJ/${String(index + 1).padStart(
    4,
    "0"
  )}/GS-Field jambi/${bulan}/${tahun}`;
}

function downloadSTJPDF() {
  const element = document.getElementById("stjPreview");

  // cari tombol di dalam container
  const btn = element.querySelector("button");

  // sembunyikan dulu
  if (btn) btn.style.display = "none";

  html2canvas(element, {
    scale: 2,
    useCORS: true
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let position = 0;

      if (imgHeight < pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;

        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;

          if (heightLeft > 0) pdf.addPage();
        }
      }

      pdf.save("STJ-Kendaraan.pdf");
    })
    .finally(() => {
      // tampilkan lagi tombolnya
      if (btn) btn.style.display = "";
    });
}

async function refreshSTJData() {
  const tbody = document.getElementById("stjTableBody");

  // Kosongkan isi tabel
  tbody.innerHTML = "";

  // Muat ulang data
  await loadReportSTJ();

  console.log("Report STJ berhasil direfresh");
}
