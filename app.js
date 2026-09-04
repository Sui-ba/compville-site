// ========== Data: Ready Builds ==========
const builds = [
  {
    id: 1,
    title: "Офисный старт",
    category: ["office", "budget"],
    price: "от 28 000 ₽",
    priceNum: 28000,
    desc: "Документы, браузер, онлайн-уроки, Zoom. Тихая и надёжная система.",
    specs: [
      "Процессор: Intel Core i3 / Ryzen 3",
      "ОЗУ: 16 ГБ DDR4",
      "Накопитель: 512 ГБ SSD",
      "Видео: встроенная графика",
      "Корпус: компактный, тихий"
    ]
  },
  {
    id: 2,
    title: "Учёба + лёгкие игры",
    category: ["office", "budget", "gaming"],
    price: "от 45 000 ₽",
    priceNum: 45000,
    desc: "Учёба, работа и игры уровня CS2, Valorant, GTA V на средних настройках.",
    specs: [
      "Процессор: Ryzen 5 5500 / i5",
      "ОЗУ: 16 ГБ DDR4",
      "Видеокарта: GTX 1650 / RTX 3050",
      "SSD: 512 ГБ–1 ТБ",
      "БП: 500–550 Вт"
    ]
  },
  {
    id: 3,
    title: "Игровой Full HD",
    category: ["gaming"],
    price: "от 75 000 ₽",
    priceNum: 75000,
    desc: "Комфортные 60–100+ FPS в современных AAA на Full HD / высоких настройках.",
    specs: [
      "Процессор: Ryzen 5 5600 / i5-12400F",
      "ОЗУ: 16–32 ГБ DDR4",
      "Видеокарта: RTX 3060 / 4060",
      "SSD: 1 ТБ NVMe",
      "Охлаждение: башня / AIO"
    ]
  },
  {
    id: 4,
    title: "Игровой 1440p",
    category: ["gaming"],
    price: "от 110 000 ₽",
    priceNum: 110000,
    desc: "Высокие/ультра настройки в 1440p, запас на будущее. Стриминг возможен.",
    specs: [
      "Процессор: Ryzen 7 5700X / i5-14600K",
      "ОЗУ: 32 ГБ DDR4/DDR5",
      "Видеокарта: RTX 4070 / 4070 Super",
      "SSD: 1–2 ТБ NVMe",
      "БП: 750 Вт Gold"
    ]
  },
  {
    id: 5,
    title: "Монтаж и стримы",
    category: ["workstation", "streaming", "video"],
    price: "от 95 000 ₽",
    priceNum: 95000,
    desc: "Premiere, DaVinci, OBS. Быстрый рендер и стабильный стрим без просадок.",
    specs: [
      "Процессор: Ryzen 7 5700X / 7700",
      "ОЗУ: 32 ГБ",
      "Видеокарта: RTX 3060–4070",
      "SSD: 1 ТБ + HDD под проекты",
      "Хорошее охлаждение"
    ]
  },
  {
    id: 6,
    title: "Максимум / 4K",
    category: ["gaming", "workstation"],
    price: "от 180 000 ₽",
    priceNum: 180000,
    desc: "Топовые игры в 4K, тяжёлый монтаж, 3D. Конфигурация под ваши задачи.",
    specs: [
      "Процессор: Ryzen 7/9 / i7/i9",
      "ОЗУ: 32–64 ГБ DDR5",
      "Видеокарта: RTX 4070 Ti – 4080",
      "SSD: 2 ТБ+ NVMe",
      "Премиум корпус и БП"
    ]
  }
];

// ========== State ==========
let currentStep = 1;
let orders = JSON.parse(localStorage.getItem("compville_orders") || "[]");

// ========== DOM ==========
const buildsGrid = document.getElementById("buildsGrid");
const buildForm = document.getElementById("buildForm");
const ordersList = document.getElementById("ordersList");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// ========== Render Builds ==========
function renderBuilds(filter = "all") {
  const filtered = filter === "all"
    ? builds
    : builds.filter(b => b.category.includes(filter));

  buildsGrid.innerHTML = filtered.map(b => `
    <article class="build-card" data-categories="${b.category.join(" ")}">
      <div class="build-card-header">
        <span class="build-tag">${getCategoryLabel(b.category[0])}</span>
        <span class="build-price">${b.price}</span>
      </div>
      <div class="build-card-body">
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
        <ul class="build-specs">
          ${b.specs.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <div class="build-card-footer">
        <button class="btn btn-primary" onclick="selectBuild(${b.id})">Выбрать</button>
        <a href="#custom" class="btn btn-secondary">Адаптировать</a>
      </div>
    </article>
  `).join("");
}

function getCategoryLabel(cat) {
  const map = {
    office: "Офис",
    gaming: "Игры",
    workstation: "Работа",
    budget: "Бюджет",
    streaming: "Стрим",
    video: "Монтаж"
  };
  return map[cat] || cat;
}

function selectBuild(id) {
  const build = builds.find(b => b.id === id);
  if (!build) return;

  // Pre-fill form somewhat
  document.getElementById("preferences").value =
    `Интересует готовая сборка «${build.title}» (${build.price}). Хочу адаптировать под себя.`;

  // Scroll to form
  document.getElementById("custom").scrollIntoView({ behavior: "smooth" });
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderBuilds(btn.dataset.filter);
  });
});

// ========== Multi-step Form ==========
function showStep(step) {
  currentStep = step;
  document.querySelectorAll(".form-step").forEach(s => {
    s.classList.toggle("active", Number(s.dataset.step) === step);
  });
  document.querySelectorAll(".progress-step").forEach(p => {
    const n = Number(p.dataset.step);
    p.classList.toggle("active", n === step);
    p.classList.toggle("done", n < step);
  });
}

document.querySelectorAll(".next-step").forEach(btn => {
  btn.addEventListener("click", () => {
    const stepEl = btn.closest(".form-step");
    const step = Number(stepEl.dataset.step);

    // Simple validation
    if (step === 1) {
      const name = document.getElementById("name").value.trim();
      const city = document.getElementById("city").value.trim();
      const phone = document.getElementById("phone").value.trim();
      if (!name || !city || !phone) {
        alert("Пожалуйста, заполните имя, город и телефон.");
        return;
      }
    }
    if (step === 2) {
      const purposes = document.querySelectorAll('input[name="purpose"]:checked');
      if (purposes.length === 0) {
        alert("Выберите хотя бы одну задачу для компьютера.");
        return;
      }
    }

    showStep(step + 1);
  });
});

document.querySelectorAll(".prev-step").forEach(btn => {
  btn.addEventListener("click", () => {
    const stepEl = btn.closest(".form-step");
    showStep(Number(stepEl.dataset.step) - 1);
  });
});

// ========== Submit Form ==========
buildForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const budgetChecked = document.querySelector('input[name="budget"]:checked');
  if (!budgetChecked) {
    alert("Выберите бюджет.");
    return;
  }

  const purposes = [...document.querySelectorAll('input[name="purpose"]:checked')]
    .map(c => c.value);

  const order = {
    id: "CV-" + Date.now().toString().slice(-6),
    date: new Date().toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    name: document.getElementById("name").value.trim(),
    city: document.getElementById("city").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    telegram: document.getElementById("telegram").value.trim() || "—",
    purposes: purposes,
    games: document.getElementById("games").value.trim() || "—",
    budget: budgetChecked.value,
    budgetLabel: budgetChecked.nextElementSibling.textContent,
    monitor: document.getElementById("monitor").value,
    peripherals: document.getElementById("peripherals").value,
    preferences: document.getElementById("preferences").value.trim() || "—"
  };

  orders.unshift(order);
  localStorage.setItem("compville_orders", JSON.stringify(orders));
  renderOrders();

  document.getElementById("orderId").textContent = order.id;
  showStep(4);
});

// New order
document.getElementById("newOrderBtn")?.addEventListener("click", () => {
  buildForm.reset();
  showStep(1);
});

// ========== Orders Panel ==========
function renderOrders() {
  if (orders.length === 0) {
    ordersList.innerHTML = '<p class="orders-empty">Пока нет заявок. Заполните форму выше.</p>';
    return;
  }

  const purposeLabels = {
    office: "Офис/Учёба",
    gaming: "Игры",
    streaming: "Стриминг",
    video: "Монтаж",
    design: "Дизайн/3D",
    server: "Сервер"
  };

  ordersList.innerHTML = orders.map(o => `
    <div class="order-item">
      <div class="order-item-header">
        <span class="order-id">${o.id}</span>
        <span class="order-date">${o.date}</span>
      </div>
      <div class="order-meta">
        <div><strong>${o.name}</strong> · ${o.city}</div>
        <div>${o.phone}${o.telegram !== "—" ? " · " + o.telegram : ""}</div>
        <div>Бюджет: <strong>${o.budgetLabel}</strong></div>
        <div>Задачи: ${o.purposes.map(p => purposeLabels[p] || p).join(", ")}</div>
        ${o.preferences !== "—" ? `<div>Пожелания: ${o.preferences.slice(0, 80)}${o.preferences.length > 80 ? "…" : ""}</div>` : ""}
      </div>
    </div>
  `).join("");
}

document.getElementById("clearOrdersBtn")?.addEventListener("click", () => {
  if (confirm("Очистить все заявки?")) {
    orders = [];
    localStorage.removeItem("compville_orders");
    renderOrders();
  }
});

// ========== Mobile Menu ==========
mobileMenuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ========== Init ==========
renderBuilds();
renderOrders();

// Phone mask (simple)
const phoneInput = document.getElementById("phone");
phoneInput?.addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "");
  if (v.startsWith("8")) v = "7" + v.slice(1);
  if (v.startsWith("7")) {
    let formatted = "+7";
    if (v.length > 1) formatted += " (" + v.slice(1, 4);
    if (v.length >= 4) formatted += ") " + v.slice(4, 7);
    if (v.length >= 7) formatted += "-" + v.slice(7, 9);
    if (v.length >= 9) formatted += "-" + v.slice(9, 11);
    e.target.value = formatted;
  }
});
