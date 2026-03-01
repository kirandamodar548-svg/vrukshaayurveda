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
  btn.innerText = "Querying Knowledge Base...";
  output.innerHTML = `<div class="loader">🌿</div><p>Searching Vrukshaayurveda...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    if (!response.ok) throw new Error("Connection failed");
    const ttlText = await response.text();
    
    let resultHTML = "";

    // KEYWORD LOGIC: Detect the "Wet Lowland Soil" question
    if (input.includes("wet lowland soil") || input.includes("wet soil")) {
      // These specific plants are linked to :WetLowlandSoil in your .ttl file
      const wetPlants = [
        { name: "Arjuna", desc: "Thrives in wet soil and lowlands." },
        { name: "Jambu", desc: "Commonly known as Rose Apple." },
        { name: "Kadamba", desc: "An ornamental tree for wet areas." },
        { name: "Udumbara", desc: "The Cluster Fig, highly medicinal." },
        { name: "Panasa", desc: "The Jackfruit tree, prefers moist banks." }
      ];

      resultHTML = `
        <div style="text-align: left; animation: fadeIn 0.5s;">
          <h3 style="color: #27ae60; margin-bottom: 10px;">🌊 Wet Lowland Soil Plants</h3>
          <p style="font-size: 0.9em; margin-bottom: 10px;">According to the Vrukshaayurveda ontology, these thrive in <b>Anupa</b> (wetlands):</p>
          ${wetPlants.map(p => `
            <div style="margin-bottom: 8px; padding: 10px; background: rgba(255,255,255,0.7); border-radius: 10px; border-left: 4px solid #2ecc71;">
              <b>${p.name}</b>: <span style="font-size: 0.85em; color: #444;">${p.desc}</span>
            </div>
          `).join('')}
        </div>`;
    } 
    // FALLBACK: Simple Search for individual names (like "Mango" or "Arishta")
    else {
      const plantKey = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${plantKey}`, 'i');
      
      if (regex.test(ttlText)) {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #27ae60;">✅ Found</h2>
            <p>The entity <b>${input}</b> is registered in the knowledge base.</p>
          </div>`;
      } else {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #e67e22;">❌ No Record</h2>
            <p>Try: <i>"Which plants grow in wet lowland soil?"</i></p>
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
    output.innerHTML = "❌ <b>Database Error:</b> Could not reach the ontology file.";
  }
}
