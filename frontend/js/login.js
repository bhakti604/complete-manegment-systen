document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    try {

        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                email: email, 
                password: pass 
            })
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("userEmail", email);
            localStorage.setItem("userLevel", data.role);

            if(data.dept) {
                localStorage.setItem("userDept", data.dept);
            }

            alert("Login Successful! ✅");

            window.location.href = "admin.html";

        } else {

            alert(data.message || "Invalid Email or Password");

        }

    } catch (error) {

        console.error("Login Error:", error);

        alert("Server connected nahiye! Backend deploy kara.");

    }
});