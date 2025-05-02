function resetPassword(event) {
    event.preventDefault(); // Prevent form submission
  
    const email = document.getElementById("email").value;
    const messageElement = document.getElementById("msg");
  
    // Clear previous messages
    messageElement.innerHTML = "";
  
    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
      messageElement.innerHTML = "Please enter a valid email address.";
      return;
    }
  
    // Load existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if email exists in the users
    const user = users.find(user => user.email === email);
  
    if (!user) {
      messageElement.innerHTML = "No account found with this email.";
    } else {
      // Send a password reset email (simulated)
      alert("A password reset link has been sent to your email.");
      window.location.href = "login.html"; // Redirect to login page after reset
    }
  }
  