/**
 * Vrukshaayurveda Ontology Knowledge Retrieval
 * Comprehensive Query Engine for Mini-Project
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
  btn.innerText = "Querying Ontology...";
  output.innerHTML = `<div class="loader">🍃</div><p>Searching Ancient Knowledge Base...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    if (!response.ok) throw new Error("Connection failed");
    const ttlText = await response.text();
    
    let resultHTML = "";

    // 1. QUERY: Wetlands / Wet Soil (Anupa)
    if (input.includes("wetland") || input.includes("wet soil") || input.includes("anupa")) {
      const plants = [
        { name: "Arjuna", desc: "Thrives in wetlands and river banks (Jala-prānta)." },
        { name: "Jambu (Rose Apple)", desc: "Specifically suited for moist, lowland soil." },
        { name: "Kadamba", desc: "Ornamental tree that loves wet environments." },
        { name: "Udumbara (Cluster Fig)", desc: "Requires high soil moisture to flourish." },
        { name: "Panasa (Jackfruit)", desc: "Planted near banks; needs cow-dung enriched soil." }
      ];
      resultHTML = generateListHTML("🌊 Plants for Wetlands (Anupa)", plants);
    } 

    // 2. QUERY: Spacing (Hastas)
    else if (input.includes("spacing") || input.includes("distance") || input.includes("far")) {
      const rules = [
        { name: "Best (Vimshatihasta)", desc: "20 Hastas (~30 ft) to ensure trees don't touch." },
        { name: "Good (Dvadashahasta)", desc: "12 Hastas (~18 ft) for smaller plots." },
        { name: "Logic", desc: "Prevents nutrient competition and shadow interference." }
      ];
      resultHTML = generateListHTML("📏 Ancient Spacing Rules", rules);
    }

    // 3. QUERY: Diseases & Symptoms
    else if (input.includes("disease") || input.includes("bleeding") || input.includes("pale") || input.includes("wilting")) {
      const diseases = [
        { name: "Rasaśruti (Bleeding)", desc: "Oozing sap in Arjuna/Kapittha; treat with Vidanga/Milk." },
        { name: "Pāṇḍupatratā (Pale Leaves)", desc: "Leaves turn white; caused by cold/heat stress." },
        { name: "Śākhaśoṣa (Wilting)", desc: "Branches dry out; common in Banana (Kadali) trees." },
        { name: "Apravala (No Shoots)", desc: "Failure to produce new leaves; treated with Vidanga." }
      ];
      resultHTML = generateListHTML("🩺 Diseases & Treatments", diseases);
    }

    // 4. QUERY: Seasons (Rtu) & Irrigation
    else if (input.includes("season") || input.includes("summer") || input.includes("winter") || input.includes("rainy")) {
      const seasons = [
        { name: "Grishma (Summer)", desc: "Irrigate twice daily (morning and evening)." },
        { name: "Hemanta (Winter)", desc: "Irrigate on alternate days." },
        { name: "Varsha (Rainy)", desc: "Irrigate only if the soil becomes dry." }
      ];
      resultHTML = generateListHTML("📅 Seasonal Irrigation Guide", seasons);
    }

    // 5. QUERY: Auspicious Timing (Nakshatra)
    else if (input.includes("timing") || input.includes("nakshatra") || input.includes("when to plant")) {
      const timing = [
        { name: "Dhruva Group", desc: "Fixed stars; excellent for long-term tree growth." },
        { name: "Mula & Pushya", desc: "Highly auspicious for planting Neem (Arishta) and Ashoka." },
        { name: "Hasta & Shravana", desc: "Best for flowering plants and medicinal shrubs." }
      ];
      resultHTML = generateListHTML("✨ Auspicious Planting Times", timing);
    }

    // 6. QUERY: Natural Fertilizers (Materials)
    else if (input.includes("fertilizer") || input.includes("manure") || input.includes("ferment")) {
      const materials = [
        { name: "Gomaya", desc: "Cow dung; rich in beneficial microbes and organic nitrogen." },
        { name: "Kshira", desc: "Milk; used for seed decoctions and as a foliar spray." },
        { name: "Sapta-ratroshita", desc: "7-night fermented broth of dung, sesame, and meat." }
      ];
      resultHTML = generateListHTML("🧪 Ancient Bio-Amendments", materials);
    }

    // 7. FALLBACK: Direct Search for Individuals
    else {
      const searchTerm = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${searchTerm}`, 'i');
      
      if (regex.test(ttlText)) {
        resultHTML = `
          <div style="text-align: center; animation: fadeIn 0.5s;">
            <h2 style="color: #27ae60;">✅ Found</h2>
            <p>The entity <b>"${input}"</b> is a registered concept in the Vrukshaayurveda Ontology.</p>
          </div>`;
      } else {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #e67e22;">❌ No Record</h2>
            <p>Try: <i>"What are the spacing rules?"</i> or <i>"How to treat bleeding sap?"</i></p>
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
    output.innerHTML = "❌ <b>Database Error:</b> Could not fetch ontology from GitHub.";
  }
}

// Global helper for rendering results
function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: slideUp 0.5s ease;">
      <h3 style="color: #27ae60; margin-bottom: 15px; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 12px; padding: 12px; background: rgba(255,255,255,0.85); border-radius: 12px; border-left: 6px solid #2ecc71; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <b style="color: #1a3a3a; font-size: 1.05em;">${item.name}</b><br>
          <span style="font-size: 0.9em; color: #444; line-height: 1.4;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
