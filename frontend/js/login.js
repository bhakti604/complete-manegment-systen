document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Input fields madhun data ghya
    // 'username' id aslelya input madhe Admin cha EMAIL taka
    const email = document.getElementById("username").value; 
    const pass = document.getElementById("password").value;

    try {
        // 1. Backend la login request pathva
        const response = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: pass })
        });

        const data = await response.json();

        // 2. Jar login success zala tar
        if (response.ok) {
            // ✅ localStorage madhe data save kara (Popup logic sathi he garjeche aahe)
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userLevel", data.role); // Role: HOD kiva Principal
            
            // Jar garaj asel tar dept pan save karun theva
            if(data.dept) {
                localStorage.setItem("userDept", data.dept);
            }

            alert("Login Successful! ✅");
            
            // 3. Admin Dashboard (admin.html) la redirect kara
            window.location.href = "admin.html"; 
        } else {
            // Backend kadun aalela error message dakhva
            alert(data.message || "Invalid Email or Password");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Server connected nahiye! Backend chalu aahe ka check kara.");
    }
});