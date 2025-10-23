document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.querySelector("button[type='submit']");
  const resultDiv = document.querySelector(".result-card");
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

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
        try {
          const d = new Date(birthRaw);
          birthFormatted = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
        } catch {
          birthFormatted = birthRaw;
        }
      }

      const checkedRadio = document.querySelector("input[name='status']:checked");
      let genderText = "";
      if (checkedRadio) {
        const lbl = document.querySelector(`label[for="${checkedRadio.id}"]`);
        if (lbl) genderText = lbl.textContent.trim();
        else genderText = checkedRadio.value || "";
      }

      resultDiv.style.display = "block";

      const fullNameEl = document.getElementById("fullName");
      const birthEl = document.getElementById("birthDate");
      const emailEl = document.getElementById("emailResult");
      const phoneEl = document.getElementById("phoneResult");
      const genderEl = document.getElementById("genderResult");
      const messageEl = document.getElementById("messageResult");
      const currentTimeEl = document.getElementById("currentTime");

      if (fullNameEl) fullNameEl.textContent = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : "-";
      if (birthEl) birthEl.textContent = birthFormatted || "-";
      if (emailEl) emailEl.textContent = email || "-";
      if (phoneEl) phoneEl.textContent = phone || "-";
      if (genderEl) genderEl.textContent = genderText || "-";
      if (messageEl) messageEl.textContent = message || "-";
      if (currentTimeEl) currentTimeEl.textContent = new Date().toLocaleString();

      const form = submitBtn.closest("form");
      if (form) {
        form.reset();
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // kalau mau animasi hanya sekali:
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // muncul 20% di layar baru jalan animasinya
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});

