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
  btn.innerText = "Extracting Wisdom...";
  output.innerHTML = `<div class="loader">🍃</div><p>Searching Vrukshaayurveda Ontology...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    const ttlText = await response.text();
    let resultHTML = "";

    // 1. RED SOIL / LATERITE / HARD SOIL
    if (input.includes("red soil") || input.includes("hard soil") || input.includes("laterite")) {
      const redSoilData = [
        { name: "Suitable Plants", desc: "Arishta (Neem) and Ashoka are ideal for red, hard soils." },
        { name: "Preparation", desc: "Soften the soil by growing and incorporating Sesame (Til) first." },
        { name: "Organic Pit", desc: "Use a Layered Organic Pit with cow dung, pulses, and fish infusion." }
      ];
      resultHTML = generateListHTML("🔴 Red & Hard Soil Management", redSoilData);
    } 

    // 2. WETLANDS / LOWLANDS (Anūpa)
    else if (input.includes("wetland") || input.includes("wet soil") || input.includes("anupa") || input.includes("lowland")) {
      const wetData = [
        { name: "Arjuna", desc: "Thrives in wetlands (Anūpa) and river banks." },
        { name: "Jambu & Kadamba", desc: "Specifically recommended for moist, low-lying lands." },
        { name: "Udumbara & Panasa", desc: "The Cluster Fig and Jackfruit flourish in high-moisture soil." }
      ];
      resultHTML = generateListHTML("🌊 Wetland & Lowland Plants (Anūpa)", wetData);
    }

    // 3. DISEASES / BLEEDING / PALE LEAVES
    else if (input.includes("disease") || input.includes("bleeding") || input.includes("sap") || input.includes("pale") || input.includes("wilting")) {
      const diseaseData = [
        { name: "Rasaśruti (Bleeding)", desc: "Oozing sap in Arjuna/Kapittha; treat with Vidanga and Milk." },
        { name: "Pāṇḍupatratā (Pale Leaves)", desc: "Caused by temperature stress; use Kṣīra (milk) sprays." },
        { name: "Śākhaśoṣa (Wilting)", desc: "Branch drying in Banana (Kadali); treat with antifungal Vidanga." }
      ];
      resultHTML = generateListHTML("🩺 Healthcare & Disease Treatments", diseaseData);
    }

    // 4. SPACING / DISTANCE (Hastas)
    else if (input.includes("spacing") || input.includes("distance") || input.includes("far")) {
      const spacingData = [
        { name: "Vimshatihasta (Ideal)", desc: "20 Hastas (~30 ft) to allow maximum root and branch growth." },
        { name: "Dvadashahasta (Minimum)", desc: "12 Hastas (~18 ft) for smaller plots or shrubs." }
      ];
      resultHTML = generateListHTML("📏 Ancient Spacing Guidelines", spacingData);
    }

    // 5. TIMING / NAKSHATRAS / SEASONS
    else if (input.includes("timing") || input.includes("when") || input.includes("nakshatra") || input.includes("season")) {
      const timingData = [
        { name: "Best Stars", desc: "Mūla, Puṣya, and Śravaṇa are auspicious for long-term growth." },
        { name: "Grishma (Summer)", desc: "Irrigate twice daily (morning and evening)." },
        { name: "Hemanta (Winter)", desc: "Irrigate on alternate days to prevent root chill." }
      ];
      resultHTML = generateListHTML("✨ Auspicious Timing & Seasons", timingData);
    }

    // 6. PARKS / GARDENS (Arāma)
    else if (input.includes("park") || input.includes("garden") || input.includes("arama")) {
      const parkData = [
        { name: "Arishta (Neem)", desc: "The first priority tree for public health and shade." },
        { name: "Sirisha & Punnaga", desc: "Ornamental trees recommended for beauty and prosperity." },
        { name: "Ashoka", desc: "A traditional choice for residential house gardens." }
      ];
      resultHTML = generateListHTML("🌳 Recommendations for Parks", parkData);
    }

    // 7. FALLBACK: Simple Search for Specific Individuals (e.g., "Mango")
    else {
      const searchTerm = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${searchTerm}`, 'i');
      if (regex.test(ttlText)) {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #27ae60;">✅ Found</h2>
            <p>The concept <b>"${input}"</b> is registered in the knowledge base.</p>
          </div>`;
      } else {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #e67e22;">❌ No Record</h2>
            <p>Try: <i>"Red Soil"</i>, <i>"Spacing"</i>, or <i>"Wetlands"</i>.</p>
          </div>`;
      }
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
    }, 1000);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ <b>Database Error:</b> Could not reach the .ttl file.";
  }
}

function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: fadeIn 0.4s ease;">
      <h3 style="color: #27ae60; margin-bottom: 12px; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 10px; padding: 12px; background: rgba(255,255,255,0.85); border-radius: 12px; border-left: 5px solid #2ecc71; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <b style="color: #1a3a3a; font-size: 1.05em;">${item.name}</b><br>
          <span style="font-size: 0.9em; color: #444; line-height: 1.4;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
