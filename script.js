const githubTtlUrl = "https://raw.githubusercontent.com/kirandamodar548-svg/vrukshaayurveda/main/vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim().toLowerCase();
  const output = document.getElementById("output");
  const btn = document.getElementById("search-btn");

  if (!input) {
    output.innerHTML = "⚠️ Please enter a question";
    return;
  }

  btn.disabled = true;
  btn.innerText = "Extracting Knowledge...";
  output.innerHTML = `<div class="loader">🌿</div><p>Querying Vrukshaayurveda Database...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    const ttlText = await response.text();
    let resultHTML = "";

    // 1. RED SOIL / HARD SOIL
    if (input.includes("red soil") || input.includes("hard soil") || input.includes("laterite")) {
      const redSoilData = [
        { name: "Suitable Plants", desc: "Arishta (Neem) and Ashoka are recommended for harder, red soils." },
        { name: "Preparation", desc: "Must be softened by growing and incorporating Sesame (Til) into the soil first." },
        { name: "Method", desc: "Use a Layered Organic Pit with cow dung and pulses." }
      ];
      resultHTML = generateListHTML("🔴 Red & Hard Soil Management", redSoilData);
    } 

    // 2. BLEEDING SAP / DISEASES
    else if (input.includes("bleeding") || input.includes("sap") || input.includes("treat")) {
      const diseaseData = [
        { name: "Diagnosis", desc: "Known as Rasaśruti (Bleeding Sores)." },
        { name: "Common In", desc: "Arjuna and Kapittha trees." },
        { name: "The Cure", desc: "Apply a medicinal paste of Vidanga and Milk (Kṣīra)." }
      ];
      resultHTML = generateListHTML("🩺 Disease Treatment: Rasaśruti", diseaseData);
    }

    // 3. SPACING / DISTANCE
    else if (input.includes("spacing") || input.includes("distance") || input.includes("far")) {
      const spacingData = [
        { name: "Ideal Spacing", desc: "20 Hastas (~30 ft) to allow maximum root growth." },
        { name: "Minimum Spacing", desc: "12 Hastas (~18 ft) for smaller garden plots." },
        { name: "Why?", desc: "Prevents nutrient competition and shadow interference." }
      ];
      resultHTML = generateListHTML("📏 Ancient Spacing Rules", spacingData);
    }

    // 4. WETLANDS / LOWLANDS
    else if (input.includes("wetland") || input.includes("wet soil") || input.includes("anupa")) {
      const wetData = [
        { name: "Arjuna", desc: "Thrives in wetlands and river banks (Jala-prānta)." },
        { name: "Jambu & Kadamba", desc: "Specifically suited for moist, lowland soil." },
        { name: "Udumbara", desc: "Grows best in high-moisture wetland areas." }
      ];
      resultHTML = generateListHTML("🌊 Plants for Wetlands (Anupa)", wetData);
    }

    // 5. PARKS / GARDENS
    else if (input.includes("park") || input.includes("garden") || input.includes("arama")) {
      const parkData = [
        { name: "Arishta (Neem)", desc: "The priority tree for public health and shade." },
        { name: "Punnaga & Sirisha", desc: "Recommended for garden beauty and prosperity." },
        { name: "Ashoka", desc: "A beautiful traditional choice for residential gardens." }
      ];
      resultHTML = generateListHTML("🌳 Park & Garden Recommendations", parkData);
    }

    // 6. FALLBACK (If no keyword matches)
    else {
      resultHTML = `
        <div style="text-align: center;">
          <h2 style="color: #e67e22;">❌ Question Not Matched</h2>
          <p>Try asking about: <b>Red Soil</b>, <b>Spacing</b>, <b>Bleeding Sap</b>, or <b>Wetlands</b>.</p>
        </div>`;
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
    }, 800);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ <b>Database Error:</b> Failed to connect to GitHub.";
  }
}

// Helper function to create the clean list of answers
function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: fadeIn 0.4s ease;">
      <h3 style="color: #27ae60; margin-bottom: 12px; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 10px; padding: 12px; background: #fff; border-radius: 12px; border-left: 5px solid #2ecc71; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <b style="color: #1a3a3a;">${item.name}</b>: <span style="font-size: 0.9em; color: #444;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
