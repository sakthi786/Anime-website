// Validation Function for Registration
function validateRegistration(event) {
    event.preventDefault(); // Prevent form submission
  
    let validForm = true;
  
    const username = document.getElementById("uname");
    const name = document.getElementById("name");
    const email = document.getElementById("mail");
    const mobileno = document.getElementById("ph");
    const password = document.getElementById("pass");
  
    // Clear previous error messages
    document.getElementById("msg").innerHTML = "";
    document.getElementById("msg1").innerHTML = "";
    document.getElementById("msg2").innerHTML = "";
    document.getElementById("msg3").innerHTML = "";
    document.getElementById("msg4").innerHTML = "";
  
    // Load existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    const unameVal = username.value.trim().toLowerCase();
  
    // Updated Username Validation - allow letters, numbers, ., -, _, @, #, $, %, &, and more
    const usernamePattern = /^[a-zA-Z0-9._@#$%&*-]{3,}$/;
  
    if (!usernamePattern.test(unameVal)) {
      document.getElementById("msg").innerHTML =
        "Username must be at least 3 characters and contain only letters, numbers, ., -, _, @, #, $, %, &, *, or -";
      validForm = false;
    } else if (users.some(user => user.username === unameVal)) {
      document.getElementById("msg").innerHTML = "Username is already taken!";
      validForm = false;
    }
  
    // Name Validation
    if (name.value.trim().length < 3) {
      document.getElementById("msg1").innerHTML = "Enter minimum 3 letters for name";
      validForm = false;
    }
  
    // Email Validation
    if (!email.value.includes("@") || !email.value.includes(".")) {
      document.getElementById("msg2").innerHTML = "Enter a valid email";
      validForm = false;
    }
  
    // Mobile Number Validation
    if (!/^\d{10}$/.test(mobileno.value.trim())) {
      document.getElementById("msg3").innerHTML = "Enter a 10-digit mobile number";
      validForm = false;
    }
  
    // Password Validation
    if (password.value.trim().length < 6) {
      document.getElementById("msg4").innerHTML = "Password must be at least 6 characters";
      validForm = false;
    }
  
    // If form is valid
    if (validForm) {
      alert("Registration Successful!");
  
      // Save new user
      const newUser = {
        username: unameVal,
        password: password.value.trim()
      };
  
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
  
      window.location.href = "login.html"; // Redirect to login page
    }
  }
  
  // Password Toggle Function
  function togglePassword(event) {
    const passField = document.getElementById("pass");
    const eyeIcon = document.getElementById("eyeIcon");
  
    // Check if password field is of type 'password'
    if (passField.type === "password") {
      passField.type = "text"; // Show password
      eyeIcon.classList.remove("bi-eye"); // Remove the 'eye' icon
      eyeIcon.classList.add("bi-eye-slash"); // Add the 'eye-slash' icon
    } else {
      passField.type = "password"; // Hide password
      eyeIcon.classList.remove("bi-eye-slash"); // Remove the 'eye-slash' icon
      eyeIcon.classList.add("bi-eye"); // Add the 'eye' icon
    }
  }
  