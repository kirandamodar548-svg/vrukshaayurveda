const githubTtlUrl = "https://raw.githubusercontent.com/kirandamodar548-svg/vrukshaayurveda/main/vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim().toLowerCase();
  const output = document.getElementById("output");
  const btn = document.getElementById("search-btn");

  if (!input) {
    output.innerHTML = "⚠️ Please enter a question or topic";
    return;
  }

  btn.disabled = true;
  btn.innerText = "Extracting Knowledge...";
  output.innerHTML = `<div class="loader">🌿</div><p>Querying Vrukshaayurveda Knowledge Graph...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    const ttlText = await response.text();
    let resultHTML = "";

    // --- LOGIC 1: Questions about English Names ---
    if (input.includes("english name")) {
      const matches = [...ttlText.matchAll(/:hasEnglishName "([^"]+)"/gi)];
      const names = [...new Set(matches.map(m => m[1]))];
      resultHTML = generateListHTML("🇬🇧 English Names in Ontology", names.map(n => ({ name: n, desc: "Common/Botanical name" })));
    } 

    // --- LOGIC 2: Questions about Soil (Wet, Hard, Red) ---
    else if (input.includes("soil") || input.includes("wetland") || input.includes("anupa")) {
        const isHard = input.includes("hard") || input.includes("laterite") || input.includes("red");
        const results = isHard ? 
            [{ name: "Arishta (Neem)", desc: "Suited for hard laterite soil." }, { name: "Ashoka", desc: "Traditional ornamental for hard soil." }] :
            [{ name: "Arjuna", desc: "Thrives in wet lowlands (Anupa)." }, { name: "Jambu", desc: "Suited for river banks." }, { name: "Udumbara", desc: "Loves moist soil." }];
        
        resultHTML = generateListHTML(isHard ? "🔴 Hard/Red Soil Plants" : "🌊 Wetland/Wet Soil Plants", results);
    }

    // --- LOGIC 3: Questions about Locations (Parks, Gardens) ---
    else if (input.includes("park") || input.includes("garden") || input.includes("arama")) {
      const parkPlants = [
        { name: "Arishta", desc: "Primary tree for public shade." },
        { name: "Punnaga", desc: "Recommended for prosperity and beauty." },
        { name: "Sirisha", desc: "Excellent shade tree for gardens." }
      ];
      resultHTML = generateListHTML("🌳 Recommended for Parks (Arāma)", parkPlants);
    }

    // --- LOGIC 4: General Entity Search (Fallback) ---
    else {
      const searchTerm = input.split(' ').pop(); 
      const blockRegex = new RegExp(`:${searchTerm}[\\s\\S]*?\\.`, 'i');
      const match = ttlText.match(blockRegex);
      
      if (match) {
        const properties = match[0].split('\n')
          .filter(l => l.includes(':has') || l.includes('rdfs:comment'))
          .map(l => l.replace(/[:";]|rdfs:comment/g, '').trim());
          
        resultHTML = `
          <div style="text-align: left;">
            <h3 style="color: #27ae60; text-transform: capitalize;">✅ ${searchTerm} Details</h3>
            ${properties.map(p => `<p style="font-size: 0.9em; margin: 5px 0;">🔹 ${p}</p>`).join('')}
          </div>`;
      } else {
        resultHTML = `<h2>❌ No Record</h2><p>Try asking about <b>English names</b> or <b>Park plants</b>.</p>`;
      }
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
      output.style.background = "rgba(255, 255, 255, 0.95)";
    }, 800);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ Error connecting to GitHub Database.";
  }
}

function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: fadeIn 0.4s ease;">
      <h3 style="color: #27ae60; margin-bottom: 12px; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 8px; padding: 10px; background: #fff; border-radius: 10px; border-left: 5px solid #2ecc71; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <b>${item.name}</b>: <span style="font-size: 0.85em; color: #444;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
