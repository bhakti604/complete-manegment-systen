// 1. Data load karnyacha function (With Department Filter)
async function loadData() {
  const listContainer = document.getElementById("list");
  
  // 🔍 LocalStorage madhun Admin cha dept ghene
  const adminDept = localStorage.getItem("userDept") || ""; 
  console.log("Admin logged in for Department:", adminDept);

  try {
    // Backend kadun sagle complaints ghene
    // Note: Tuzya server.js madhe path "/api/complaints" asel tar toach vapra
    const res = await fetch("http://localhost:5000/api/complaints");
    const data = await res.json();

    // 🔥 Filter Logic: Fakt Admin chya dept chya complaints dakhva
    const filteredData = data.filter(c => {
        if(!c.dept || !adminDept) return false;
        return c.dept.trim().toUpperCase() === adminDept.trim().toUpperCase();
    });

    if (filteredData.length === 0) {
      listContainer.innerHTML = `<p style='text-align:center; color:white;'>${adminDept} sathi ajun kontihi complaint nahiye.</p>`;
      return;
    }

    let html = "";

    filteredData.forEach(c => {
      // Status nusar color badalne
      const statusColor = c.status === "Resolved" ? "#22c55e" : "#eab308";

      html += `
        <div style="border: 1px solid rgba(255,255,255,0.2); margin: 15px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            <h3 style="margin: 0; color: #f97316;">${c.fullName}</h3> <p style="color: #cbd5e1; margin: 5px 0;">${c.msg}</p> <p style="margin: 0; font-size: 12px; color: #94a3b8;">Category: ${c.category} | Priority: ${c.priority}</p>
            <p style="margin: 5px 0 0 0; font-weight: bold; color: ${statusColor};">Status: ${c.status}</p>
          </div>
          
          <div style="display: flex; gap: 10px;">
            <button onclick="updateStatus('${c._id}')" 
              style="background: #22c55e; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              Done
            </button>

            <button onclick="deleteComplaint('${c._id}')" 
              style="background: #ef4444; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              Delete
            </button>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;

  } catch (err) {
    console.error("Load Error:", err);
    listContainer.innerHTML = "<p style='color:red;'>Server connect hot nahiye!</p>";
  }
}

// 2. 🗑️ DELETE Function
async function deleteComplaint(id) {
  if (confirm("Naki delete karayche aahe ka?")) {
    try {
      // URL check kara: server.js madhe delete route konta aahe toach vapra
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("🗑️ Complaint Deleted Successfully!");
        loadData(); 
      }
    } catch (err) {
      alert("Delete failed!");
    }
  }
}

// 3. 🔄 UPDATE Status Function
async function updateStatus(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Resolved" })
    });
    if (res.ok) {
      alert("✅ Complaint Resolved!");
      loadData(); 
    }
  } catch (err) {
    alert("Update failed!");
  }
}

// Sarvat aadhi data load karne
loadData();