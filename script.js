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

    // --- CATEGORY: SOIL (Red, Wet, Hard) ---
    if (input.includes("soil") || input.includes("laterite") || input.includes("anupa")) {
      const soilData = [
        { name: "Wet Lowland (Anupa)", desc: "Best for Arjuna, Jambu, and Kadamba trees." },
        { name: "Hard/Red Soil", desc: "Suited for Arishta (Neem); soften using Sesame (Til) first." },
        { name: "Preparation", desc: "Use a Layered Organic Pit with Mamsa (meat) and Matsya (fish)." }
      ];
      resultHTML = generateListHTML("🌱 Soil & Preparation", soilData);
    } 

    // --- CATEGORY: DISEASES & SYMPTOMS ---
    else if (input.includes("disease") || input.includes("bleeding") || input.includes("pale") || input.includes("wilting")) {
      const diseaseData = [
        { name: "Rasaśruti (Bleeding)", desc: "Oozing sap in Arjuna trees; treat with Vidanga and Milk." },
        { name: "Pāṇḍupatratā (Pale)", desc: "Pale leaves caused by stress; use Kṣīra (milk) sprays." },
        { name: "Śākhaśoṣa (Wilting)", desc: "Branch drying in Banana (Kadali); treat with Vidanga." }
      ];
      resultHTML = generateListHTML("🩺 Plant Healthcare", diseaseData);
    }

    // --- CATEGORY: SPACING & PLANTING ---
    else if (input.includes("spacing") || input.includes("distance") || input.includes("how far")) {
      const spacingData = [
        { name: "Ideal (Vimshatihasta)", desc: "20 Hastas (~30 ft) to prevent branch touching." },
        { name: "Minimum (Dvadashahasta)", desc: "12 Hastas (~18 ft) for smaller trees." }
      ];
      resultHTML = generateListHTML("📏 Planting Rules", spacingData);
    }

    // --- CATEGORY: TIMING (Nakshatras & Seasons) ---
    else if (input.includes("when") || input.includes("timing") || input.includes("season") || input.includes("nakshatra")) {
      const timingData = [
        { name: "Auspicious Stars", desc: "Mūla, Puṣya, and Śravaṇa are ideal for planting." },
        { name: "Summer (Grishma)", desc: "Irrigate twice daily (morning and evening)." },
        { name: "Winter (Hemanta)", desc: "Irrigate every alternate day." }
      ];
      resultHTML = generateListHTML("✨ Seasonal & Astral Timing", timingData);
    }

    // --- CATEGORY: MATERIALS & FERTILIZERS ---
    else if (input.includes("fertilizer") || input.includes("material") || input.includes("ferment")) {
      const materialData = [
        { name: "Gomaya", desc: "Cow dung used for microbial protection and scion treatment." },
        { name: "Sapta-ratroshita", desc: "7-night ferment of meat and grains for fruit growth." },
        { name: "Vidanga", desc: "Essential plant material for treating fungal diseases." }
      ];
      resultHTML = generateListHTML("🧪 Materials & Bio-inputs", materialData);
    }

    // --- FALLBACK: Search for Individuals ---
    else {
      const searchTerm = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${searchTerm}`, 'i');
      if (regex.test(ttlText)) {
        resultHTML = `<div class="info-card"><h2>✅ Match Found</h2><p><b>${input}</b> is a specific concept defined in your Vrukshaayurveda ontology.</p></div>`;
      } else {
        resultHTML = `<div class="info-card"><h2>❌ No Data</h2><p>Try asking about <b>soil</b>, <b>diseases</b>, or <b>spacing</b>.</p></div>`;
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
    output.innerHTML = "❌ Connection Error.";
  }
}

function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: slideUp 0.4s ease;">
      <h3 style="color: #27ae60; margin-bottom: 12px; border-bottom: 2px solid #2ecc71;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 10px; padding: 12px; background: #fff; border-radius: 10px; border-left: 5px solid #2ecc71; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <b>${item.name}</b>: <span style="font-size: 0.9em; color: #444;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
