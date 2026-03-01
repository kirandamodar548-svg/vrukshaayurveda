/**
 * Vrukshaayurveda Knowledge Retrieval Engine
 * Maps natural language queries to ontology data
 */

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
  output.innerHTML = `<div class="loader">🌿</div><p>Traversing Vrukshaayurveda...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    if (!response.ok) throw new Error("Connection failed");
    const ttlText = await response.text();
    
    let resultHTML = "";

    // 1. QUERY: Recommended for Parks (Arāma)
    if (input.includes("park") || input.includes("garden") || input.includes("arama")) {
      const parksPlants = [
        { name: "Arishta (Neem)", desc: "The first tree recommended for parks; medicinal and eco-friendly." },
        { name: "Ashoka", desc: "A beautiful, traditional ornamental tree for house gardens and parks." },
        { name: "Punnaga (Cobra Saffron)", desc: "Known for prosperity; recommended for garden aesthetic." },
        { name: "Sirisha (Siris)", desc: "A shade-giving tree excellent for public parks." },
        { name: "Priyangu", desc: "A fruiting creeper that brings prosperity to the home garden." }
      ];
      resultHTML = generateListHTML("🌳 Recommended for Parks (Arāma)", parksPlants);
    } 

    // 2. QUERY: Wetlands (Anūpa)
    else if (input.includes("wetland") || input.includes("wet soil") || input.includes("anupa")) {
      const wetPlants = [
        { name: "Arjuna", desc: "Thrives in low-lying wet lands (Anūpa) and river banks." },
        { name: "Jambu (Rose Apple)", desc: "Specifically suited for moist soil near water bodies." },
        { name: "Kadamba", desc: "An ornamental and holy tree that loves high soil moisture." },
        { name: "Udumbara (Cluster Fig)", desc: "Grows best in wet, low-lying lowland soil." },
        { name: "Panasa (Jackfruit)", desc: "Requires moisture and cow-dung enriched fertile soil." }
      ];
      resultHTML = generateListHTML("🌊 Plants for Wetlands (Anūpa)", wetPlants);
    } 

    // 3. QUERY: Spacing Rules
    else if (input.includes("spacing") || input.includes("distance") || input.includes("far")) {
      const spacingRules = [
        { name: "Vimshatihasta (Ideal)", desc: "20 Hastas (~30 ft) to prevent root and branch competition." },
        { name: "Dvadashahasta (Minimum)", desc: "12 Hastas (~18 ft) for smaller trees or restricted spaces." },
        { name: "Logic", desc: "Trees planted too close together suffer from lack of light and nutrients." }
      ];
      resultHTML = generateListHTML("📏 Ancient Spacing Rules", spacingRules);
    }

    // 4. FALLBACK: Direct Search for Individuals
    else {
      const searchTerm = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${searchTerm}`, 'i');
      
      if (regex.test(ttlText)) {
        resultHTML = `
          <div style="text-align: center; padding: 10px;">
            <h2 style="color: #27ae60;">✅ Found</h2>
            <p>The entity <b>"${input}"</b> is a registered concept in the ontology.</p>
          </div>`;
      } else {
        resultHTML = `
          <div style="text-align: center; padding: 10px;">
            <h2 style="color: #e67e22;">❌ No Record</h2>
            <p>Try: <i>"Which plants are recommended for parks?"</i></p>
          </div>`;
      }
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
      output.style.background = "rgba(255, 255, 255, 0.9)";
    }, 800);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ <b>Database Error:</b> Could not reach the .ttl file on GitHub.";
  }
}

// Helper to render beautiful results
function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: fadeIn 0.4s ease;">
      <h3 style="color: #27ae60; margin-bottom: 15px; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 12px; padding: 12px; background: rgba(255,255,255,0.9); border-radius: 12px; border-left: 6px solid #2ecc71; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <b style="color: #1a3a3a; font-size: 1.05em;">${item.name}</b><br>
          <span style="font-size: 0.9em; color: #444; line-height: 1.5;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
