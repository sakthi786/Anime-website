function Log(event) {
    event.preventDefault(); // Prevent form submission to handle validation
  
    let validForm = true;
  
    const username = document.getElementById("uname");
    const password = document.getElementById("pass");
    const rememberMe = document.getElementById("rememberMe");
  
    // Clear previous error messages
    document.getElementById("msg").innerHTML = "";
    document.getElementById("msg4").innerHTML = "";
  
    // Username Validation
    if (username.value.length < 3) {
      document.getElementById("msg").innerHTML = "Enter at least 3 letters for username";
      validForm = false;
    }
  
    // Password Validation
    if (password.value.length < 6) {
      document.getElementById("msg4").innerHTML = "Password must be at least 6 characters";
      validForm = false;
    }
  
    // If form is valid, submit (or simulate a successful login)
    if (validForm) {
      // Load existing users from localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Check if username and password match any stored user
      const user = users.find(user => user.username === username.value.trim().toLowerCase() && user.password === password.value);
  
      if (!user) {
        document.getElementById("msg4").innerHTML = "Invalid username or password!";
        return;
      }
  
      // Check if "Remember Me" is checked
      if (rememberMe.checked) {
        localStorage.setItem("currentUser", username.value); // Store in localStorage
      } else {
        sessionStorage.setItem("currentUser", username.value); // Store in sessionStorage
      }
  
      alert("Login Successful!");
      window.location.href = "episodes.html"; // Redirect after successful login
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
  
  // ----------- When Page Loads -------------
  window.onload = () => {
    // Check if the user is already logged in and remember their credentials
    const savedUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
  
    if (savedUser) {
      window.location.href = "episodes.html"; // Redirect to episodes page if logged in
    }
  }
  
  // ----------- Forgot Password Link ---------
  function forgotPassword() {
    // Redirect to forgot password page
    window.location.href = "forgot.html";
  }
  
  // Add event listener for Forgot Password
  document.getElementById('forgotPasswordLink').addEventListener('click', forgotPassword);
  