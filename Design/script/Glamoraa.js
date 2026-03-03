 AOS.init();
    const exploreSwiper = new Swiper(".mySwiper", {
      slidesPerView: 3, spaceBetween: 30, loop: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: { 1024: { slidesPerView: 3 }, 768: { slidesPerView: 2 }, 480: { slidesPerView: 1 } }
    });
    const feedbackSwiper = new Swiper(".feedback-swiper", {
      loop: true, pagination: { el: ".feedback-pagination", clickable: true }
    });

  function openLoginModal() {
  document.getElementById("registerModal").style.display = "none"; // ✅ close register
  document.getElementById("loginModal").style.display = "block";
}


  function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
  }

  function togglePassword() {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  }

  document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const role = document.querySelector('select[name="role"]').value;

    if (!username || !password || !role) {
      alert("Please fill all fields.");
      return;
    }

    const data = { Username: username, Password: password };
    const loginUrl = `https://localhost:44353/api/login/${role}`;

    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem("token", result.Token);
        localStorage.setItem("role", result.Role);
        localStorage.setItem("name", result.Name);

        if (result.Role === "Admin") window.location.href = "admin_dashboard.html";
        else if (result.Role === "Staff") window.location.href = "staff_dashboard.html";
        else window.location.href = "customer_dashboard.html";
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  });

  // Close modal when clicked outside
  window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  function openRegisterModal() {
  document.getElementById("loginModal").style.display = "none"; // ✅ close login
  document.getElementById("registerModal").style.display = "block";

  const now = new Date();
  const IST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  document.getElementById("createdAt").value = IST.toISOString().slice(0, 16);
}

  function closeRegisterModal() {
    document.getElementById("registerModal").style.display = "none";
  }

  function togglePassword() {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  }

  document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.querySelector('input[name="fullName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
    const gender = document.querySelector('select[name="gender"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!fullName || !email || !phoneNumber || !gender || !password) {
      alert("Please fill all the fields.");
      return;
    }

    const data = { fullName, email, phoneNumber, gender, password };

    try {
      const res = await fetch("https://localhost:44353/api/login/register/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.text();

      if (res.status === 201) {
        alert("Registered successfully!");
        document.getElementById("registrationForm").reset();
        closeRegisterModal();
        window.location.href = "login.html";
      } else if (res.status === 409) {
        alert("Email already exists!");
      } else {
        alert("Registration failed: " + result);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  });

  // Close modal if clicked outside
  window.onclick = function(event) {
    const modal = document.getElementById("registerModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  
function openEmailVerificationModal() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("emailVerificationModal").style.display = "block";
}

function closeEmailVerificationModal() {
  document.getElementById("emailVerificationModal").style.display = "none";
}

function toggleResetPasswordVisibility() {
  const newPass = document.getElementById("newPassword");
  const confirmPass = document.getElementById("confirmPassword");

  newPass.type = newPass.type === "password" ? "text" : "password";
  confirmPass.type = confirmPass.type === "password" ? "text" : "password";
}

if (response.ok && data.success) {
  alert("Email verification successful!");
  document.getElementById("emailVerificationModal").style.display = "none";
  document.getElementById("resetPasswordModal").style.display = "block";
}

document.getElementById("resetPasswordForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!newPassword || !confirmPassword) {
    alert("Please enter both fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const email = document.getElementById("email").value.trim(); // from previous modal

    const res = await fetch("https://localhost:44353/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, NewPassword: newPassword }),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      alert("Password reset successfully!");
      document.getElementById("resetPasswordModal").style.display = "none";
      document.getElementById("loginModal").style.display = "block"; // redirect to login
    } else {
      alert("Failed: " + (result.message || "Please try again."));
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});