// ── Theme Toggle ──
function toggleTheme() {
  var isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}
document.getElementById("themeToggle").addEventListener("click", toggleTheme);

// ── Custom Cursor ──
var cursor = document.getElementById("cursor");
var ring   = document.getElementById("cursor-ring");
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener("mousemove", function(e) {
  mx = e.clientX;
  my = e.clientY;
});

(function loop() {
  cursor.style.left = mx + "px";
  cursor.style.top  = my + "px";
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top  = ry + "px";
  requestAnimationFrame(loop);
})();

document.querySelectorAll("a, button, .skill-tag, .project-card, .contact-link-item").forEach(function(el) {
  el.addEventListener("mouseenter", function() { document.body.classList.add("hov"); });
  el.addEventListener("mouseleave", function() { document.body.classList.remove("hov"); });
});

// ── Navbar Scroll ──
window.addEventListener("scroll", function() {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 30);
});

// ── Hamburger Menu ──
document.getElementById("hamburger").addEventListener("click", function() {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(function(a) {
  a.addEventListener("click", function() {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// ── Scroll Reveal ──
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(function(el) {
  observer.observe(el);
});

// ── Contact Form ──
var contactForm = document.getElementById("contactForm");
var submitBtn = document.getElementById("submitBtn");
var formSuccess = document.getElementById("formSuccess");

if (contactForm && submitBtn && formSuccess) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var name = document.getElementById("fname").value.trim();
    var email = document.getElementById("femail").value.trim();
    var msg = document.getElementById("fmessage").value.trim();

    if (!name || !email || !msg) {
      alert("Please fill in Name, Email and Message.");
      return;
    }

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert("Please enter a valid email address.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        firstName: document.getElementById("fname").value.trim(),
        lastName: document.getElementById("lname").value.trim(),
        email: email,
        subject: document.getElementById("fsubject").value.trim(),
        message: msg
      })
    })
      .then(function(res) {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(function() {
        formSuccess.textContent = "Message sent! I'll get back to you within 24 hours.";
        formSuccess.style.display = "block";
        contactForm.reset();
      })
      .catch(function() {
        formSuccess.textContent = "Could not send right now. Please try again in a minute.";
        formSuccess.style.display = "block";
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

        setTimeout(function() {
          formSuccess.style.display = "none";
        }, 5000);
      });
  });
}
