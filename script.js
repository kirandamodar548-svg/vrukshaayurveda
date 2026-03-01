/**
 * Vrukshaayurveda Ontology Knowledge Retrieval
 * Connection: GitHub Raw Database
 * Version: 2.0 (Natural Language Processing)
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

  // Visual feedback for search start
  btn.disabled = true;
  btn.innerText = "Querying Database...";
  output.innerHTML = `<div class="loader">🍃</div><p>Searching Ancient Wisdom...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    if (!response.ok) throw new Error("Connection failed");
    const ttlText = await response.text();
    
    let resultHTML = "";

    // --- NATURAL LANGUAGE KEYWORD DETECTION ---

    // 1. WETLANDS / WET SOIL
    if (input.includes("wetland") || input.includes("wet soil") || input.includes("wet lowland")) {
      const wetPlants = [
        { name: "Arjuna", desc: "Thrives in wetlands (Anupa) and along river banks." },
        { name: "Jambu", desc: "The Rose Apple; specifically suited for moist areas." },
        { name: "Kadamba", desc: "Commonly found in low-lying wet lands." },
        { name: "Udumbara", desc: "The Cluster Fig; prefers high moisture levels." },
        { name: "Panasa", desc: "Jackfruit trees; thrive in the Jala-prānta (lake banks)." }
      ];
      resultHTML = generateListHTML("🌊 Plants for Wetlands (Anupa)", wetPlants);
    } 

    // 2. SPACING / DISTANCE
    else if (input.includes("spacing") || input.includes("distance") || input.includes("far")) {
      const spacingRules = [
        { name: "Ideal (Vimshatihasta)", desc: "20 Hastas (~30 ft) to allow maximum nutrient absorption." },
        { name: "Minimum (Dvadashahasta)", desc: "12 Hastas (~18 ft) for smaller garden spaces." }
      ];
      resultHTML = generateListHTML("📏 Ancient Spacing Rules", spacingRules);
    }

    // 3. BLEEDING / SAP / DISEASES
    else if (input.includes("bleeding") || input.includes("oozing") || input.includes("sap") || input.includes("disease")) {
      const diseaseInfo = [
        { name: "Disease Name", desc: "Rasaśruti (Bleeding Sores)." },
        { name: "Susceptible Plants", desc: "Arjuna and Kapittha trees." },
        { name: "Treatment", desc: "Apply a medicinal paste of Vidanga and Milk (Kṣīra)." }
      ];
      resultHTML = generateListHTML("🩺 Disease: Rasaśruti", diseaseInfo);
    }

    // 4. FERMENT / FERTILIZER / FRUITING
    else if (input.includes("ferment") || input.includes("fruiting") || input.includes("growth")) {
      const recipeInfo = [
        { name: "Sapta-ratroshita", desc: "A 7-night fermented broth for continuous fruiting." },
        { name: "Ingredients", desc: "Mixture of dung, sesame (Til), meat, and fish." },
        { name: "Method", desc: "Ferment for 7 days before applying to the roots." }
      ];
      resultHTML = generateListHTML("🧪 Growth & Fruiting (Vrukshadohada)", recipeInfo);
    }

    // 5. FALLBACK: SIMPLE SEARCH (Checks for exact names like "Arishta" or "Ashoka")
    else {
      const plantKey = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${plantKey}`, 'i');
      
      if (regex.test(ttlText)) {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #27ae60;">✅ Found</h2>
            <p>The entity <b>${input}</b> exists in the knowledge base.</p>
          </div>`;
      } else {
        resultHTML = `
          <div style="text-align: center;">
            <h2 style="color: #e67e22;">❌ No Record</h2>
            <p>Try: <i>"List all plants suitable for wetlands"</i></p>
          </div>`;
      }
    }

    // Display the result after a short delay
    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      output.innerHTML = resultHTML;
      output.style.background = "rgba(255, 255, 255, 0.9)";
    }, 800);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = "❌ <b>Database Error:</b> Failed to fetch ontology data.";
  }
}

// Helper function to generate standardized beautiful lists
function generateListHTML(title, items) {
  return `
    <div style="text-align: left; animation: fadeIn 0.5s ease;">
      <h3 style="color: #27ae60; margin-bottom: 12px; border-bottom: 2px solid #2ecc71; display: inline-block;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 10px; padding: 12px; background: rgba(255,255,255,0.8); border-radius: 12px; border-left: 5px solid #2ecc71; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <b style="color: #1a3a3a;">${item.name}</b><br>
          <span style="font-size: 0.85em; color: #555;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
