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
document.getElementById("submitBtn").addEventListener("click", function() {
  var name  = document.getElementById("fname").value.trim();
  var email = document.getElementById("femail").value.trim();
  var msg   = document.getElementById("fmessage").value.trim();
  if (!name || !email || !msg) {
    alert("Please fill in Name, Email and Message.");
    return;
  }
  document.getElementById("formSuccess").style.display = "block";
  ["fname", "lname", "femail", "fsubject", "fmessage"].forEach(function(id) {
    document.getElementById(id).value = "";
  });
  setTimeout(function() {
    document.getElementById("formSuccess").style.display = "none";
  }, 5000);
});
