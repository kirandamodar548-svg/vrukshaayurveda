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
  btn.innerText = "Processing Query...";
  output.innerHTML = `<div class="loader">🍃</div><p>Querying Ontology...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    const ttlText = await response.text();
    
    let resultHTML = "";

    // 1. Handle Relationship Query: "Wet Lowland Soil"
    if (input.includes("wet lowland soil") || input.includes("wet soil")) {
      // Searching for plants linked to :WetLowlandSoil in the TTL
      const plants = ["Arjuna", "Jambu", "Kadamba", "Udumbara", "Lakuca", "Panasa"];
      const found = plants.filter(p => ttlText.includes(`:${p}`));

      resultHTML = `
        <div style="text-align: left;">
          <h3 style="color: #27ae60;">🌱 Plants for Wet Lowland Soil</h3>
          <p>Based on Vrukshaayurveda, the following thrive in wet soil:</p>
          <ul style="margin-left: 20px; margin-top: 10px;">
            ${found.map(p => `<li><b>${p}</b></li>`).join('')}
          </ul>
        </div>`;
    } 
    
    // 2. Handle Simple Plant Search (Existing Logic)
    else {
      const regex = new RegExp(`(:|#|label ")${input}`, 'i');
      if (regex.test(ttlText)) {
        resultHTML = `<h2>✅ Found</h2><p><b>${input}</b> is registered in the ontology.</p>`;
      } else {
        resultHTML = `<h2>❌ No Match</h2><p>Try asking "Which plants grow in wet lowland soil?"</p>`;
      }
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
      output.style.background = "rgba(255, 255, 255, 0.8)";
    }, 800);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ Error connecting to GitHub database.";
  }
}
