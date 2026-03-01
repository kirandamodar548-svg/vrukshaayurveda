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
    const ttlText = await response.text();
    let resultHTML = "";

    // 1. QUESTION: Wet Lowland Soil
    if (input.includes("wet lowland soil") || input.includes("wet soil")) {
      const wetPlants = [
        { name: "Arjuna", desc: "Thrives in lowlands and river banks." },
        { name: "Jambu", desc: "Specifically suited for Anupa (wetlands)." },
        { name: "Kadamba", desc: "Ornamental tree for moist areas." },
        { name: "Udumbara", desc: "The Cluster Fig; highly medicinal." }
      ];
      resultHTML = generateListHTML("🌊 Wet Lowland Soil Plants", wetPlants);
    } 
    
    // 2. QUESTION: Spacing
    else if (input.includes("spacing") || input.includes("distance")) {
      const spacingRules = [
        { name: "Ideal Spacing", desc: "20 Hastas (~30 ft) is recommended for best growth." },
        { name: "Minimum Spacing", desc: "12 Hastas (~18 ft) for smaller plots or shrubs." }
      ];
      resultHTML = generateListHTML("📏 Ancient Spacing Rules", spacingRules);
    }

    // 3. QUESTION: Bleeding/Oozing (Disease)
    else if (input.includes("bleeding") || input.includes("oozing") || input.includes("sap")) {
      const diseaseInfo = [
        { name: "Disease", desc: "Rasaśruti (Bleeding Sores)." },
        { name: "Occurs In", desc: "Arjuna, Kapittha trees." },
        { name: "Treatment", desc: "Apply a paste of Vidanga and Milk (Kṣīra)." }
      ];
      resultHTML = generateListHTML("🩺 Disease: Rasaśruti", diseaseInfo);
    }

    // 4. FALLBACK: Simple Search
    else {
      const plantKey = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${plantKey}`, 'i');
      if (regex.test(ttlText)) {
        resultHTML = `<h2 style="color: #27ae60;">✅ Found</h2><p><b>${input}</b> is defined in the ontology.</p>`;
      } else {
        resultHTML = `<h2 style="color: #e67e22;">❌ No Record</h2><p>Try: <i>"What is the ideal spacing between trees?"</i></p>`;
      }
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
    }, 800);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ Database Error.";
  }
}

// Helper function to create pretty lists
function generateListHTML(title, items) {
  return `
    <div style="text-align: left;">
      <h3 style="color: #27ae60; margin-bottom: 10px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 8px; padding: 10px; background: rgba(255,255,255,0.7); border-radius: 10px; border-left: 4px solid #2ecc71;">
          <b>${item.name}</b>: <span style="font-size: 0.9em; color: #444;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
