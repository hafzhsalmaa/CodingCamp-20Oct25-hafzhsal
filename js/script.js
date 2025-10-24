window.onload = function () {
  const namePrompt = document.createElement("div");
  namePrompt.style.position = "fixed";
  namePrompt.style.top = "0";
  namePrompt.style.left = "0";
  namePrompt.style.width = "100%";
  namePrompt.style.height = "100%";
  namePrompt.style.background = "rgba(0,0,0,0.8)";
  namePrompt.style.display = "flex";
  namePrompt.style.flexDirection = "column";
  namePrompt.style.justifyContent = "center";
  namePrompt.style.alignItems = "center";
  namePrompt.style.zIndex = "9999";
  namePrompt.innerHTML = `
    <div style="background:white;padding:30px;border-radius:12px;text-align:center;max-width:320px;box-shadow:0 0 20px rgba(0,0,0,0.3);">
      <h2 style="margin-bottom:15px;color:#111;font-weight:600;">Masukkan nama kamu</h2>
      <input id="userNameInput" type="text" placeholder="Nama kamu..." style="padding:10px;width:100%;border:1px solid #ccc;border-radius:8px;margin-bottom:15px;"/>
      <button id="submitUserName" style="background:#111;color:white;padding:10px 25px;border:none;border-radius:8px;cursor:pointer;">OK</button>
    </div>
  `;

  const savedName = localStorage.getItem("userName");

  if (!savedName) {
    document.body.appendChild(namePrompt);
    document.body.style.overflow = "hidden";

    const submitUserName = namePrompt.querySelector("#submitUserName");
    submitUserName.addEventListener("click", function () {
      const name = namePrompt.querySelector("#userNameInput").value.trim();
      if (!name) {
        alert("Nama tidak boleh kosong!");
        return;
      }

      sessionStorage.setItem("userName", name); // pakai sessionStorage
      namePrompt.remove();
      document.body.style.overflow = "auto";

      const welcomeEl = document.querySelector("h1.animate-slide-in");
      if (welcomeEl) welcomeEl.innerHTML = `Welcome, ${name}!`;
    });
  } else {
    const welcomeEl = document.querySelector("h1.animate-slide-in");
    if (welcomeEl) welcomeEl.innerHTML = `Welcome, ${savedName}!`;
  }


  const submitBtn = document.querySelector("button[type='submit']");
  const resultDiv = document.querySelector(".result-card");

  if (submitBtn && resultDiv) {
    resultDiv.style.display = "none";

    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("first-name")?.value.trim() || "";
      const lastName = document.getElementById("last-name")?.value.trim() || "";
      const birthRaw = document.getElementById("birth")?.value || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const phone = document.getElementById("phone-number")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      let birthFormatted = "";
      if (birthRaw) {
        const d = new Date(birthRaw);
        if (!isNaN(d)) {
          birthFormatted = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
        } else {
          birthFormatted = birthRaw;
        }
      }

      const checkedRadio = document.querySelector("input[name='status']:checked");
      let genderText = "";
      if (checkedRadio) {
        const lbl = document.querySelector(`label[for="${checkedRadio.id}"]`);
        genderText = lbl ? lbl.textContent.trim() : checkedRadio.value || "";
      }

      resultDiv.style.display = "block";
      resultDiv.style.opacity = 0;
      setTimeout(() => (resultDiv.style.opacity = 1), 100);

      document.getElementById("fullName").textContent = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : "-";
      document.getElementById("birthDate").textContent = birthFormatted || "-";
      document.getElementById("emailResult").textContent = email || "-";
      document.getElementById("phoneResult").textContent = phone || "-";
      document.getElementById("genderResult").textContent = genderText || "-";
      document.getElementById("messageResult").textContent = message || "-";
      document.getElementById("currentTime").textContent = new Date().toLocaleString();

      const form = submitBtn.closest("form");
      if (form) form.reset();
    });
  }

  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealElements.forEach((el) => observer.observe(el));
};
