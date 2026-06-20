document.getElementById("complaintForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("name").value,
    dept: document.getElementById("dept").value,
    targetLevel: document.getElementById("targetLevel").value,
    category: document.getElementById("category").value,
    priority: document.getElementById("priority").value,
    msg: document.getElementById("msg").value,
    status: "Pending"
  };

  try {
    const res = await fetch("/api/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      const result = await res.json();
      alert("Complaint Registered Successfully! ✅");
      window.location.href = "dashboard.html";
    } else {
      const errorData = await res.json();
      alert("Error: " + (errorData.message || "Submit hou shakle nahi."));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Backend connect hou shakle nahi. Server chalu aahe ka check kara.");
  }
});