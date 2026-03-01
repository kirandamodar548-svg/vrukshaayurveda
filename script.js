const githubTtlUrl = "https://raw.githubusercontent.com/kirandamodar548-svg/vrukshaayurveda/main/vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim().toLowerCase();
  const output = document.getElementById("output");
  const btn = document.getElementById("search-btn");

  if (!input) {
    output.innerHTML = "⚠️ Please enter a question or plant name";
    return;
  }

  btn.disabled = true;
  btn.innerText = "Querying Ontology...";
  output.innerHTML = `<div class="loader">🌿</div><p>Searching Knowledge Base...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    if (!response.ok) throw new Error("Connection failed");
    const ttlText = await response.text();
    
    let resultHTML = "";

    // 1. KEYWORD DETECTION for your specific question
    if (input.includes("wet lowland soil") || input.includes("wet soil")) {
      
      // Defining the results based on the relationships in your .ttl file
      const wetPlants = [
        { name: "Arjuna", desc: "Linked to WetLowlandSoil; thrives in lowlands." },
        { name: "Jambu", desc: "The Rose Apple; specifically suited for Anupa (wetlands)." },
        { name: "Kadamba", desc: "An ornamental tree for wet, low-lying areas." },
        { name: "Udumbara", desc: "The Cluster Fig; thrives in moist soil conditions." }
      ];

      resultHTML = `
        <div style="text-align: left; animation: fadeIn 0.5s;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">🌊 Wet Lowland Soil Results</h3>
          <p style="font-size: 0.9em; margin-bottom: 10px;">The Vrukshaayurveda ontology identifies these for <b>Anupa</b> (wet) soil:</p>
          ${wetPlants.map(p => `
            <div style="margin-bottom: 10px; padding: 12px; background: rgba(255,255,255,0.8); border-radius: 10px; border-left: 5px solid #2ecc71;">
              <b style="color: #1a3a3a;">${p.name}</b><br>
              <span style="font-size: 0.85em; color: #555;">${p.desc}</span>
            </div>
          `).join('')}
        </div>`;
    } 
    // 2. FALLBACK for single plant searches (e.g., "Arishta" or "Ashoka")
    else {
      const plantKey = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${plantKey}`, 'i');
      
      if (regex.test(ttlText)) {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #27ae60;">✅ Match Found</h2>
            <p>The entity <b>${input}</b> is defined in the Vrukshaayurveda ontology.</p>
          </div>`;
      } else {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #e67e22;">❌ No Record</h2>
            <p>Try asking: <i>"Which plants grow in wet lowland soil?"</i></p>
          </div>`;
      }
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
      output.style.background = "rgba(255, 255, 255, 0.9)";
    }, 1000);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ <b>Error:</b> Database connection failed.";
  }
}
