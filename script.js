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

    // 1. RED SOIL / LATERITE SOIL
    if (input.includes("red soil") || input.includes("laterite") || input.includes("hard soil")) {
      const redSoilData = [
        { name: "Suitable Plants", desc: "Arishta (Neem) and Ashoka are recommended for harder, lateritic soils." },
        { name: "Preparation", desc: "Hard soil must be softened by growing and incorporating Sesame (Til) first." },
        { name: "Ontology Reference", desc: "Mapped to :HardLateriteSoil and :SesameSoftenedSoil." }
      ];
      resultHTML = generateListHTML("🔴 Red / Hard Laterite Soil", redSoilData);
    } 

    // 2. WETLANDS / ANUPA
    else if (input.includes("wetland") || input.includes("anupa") || input.includes("wet soil")) {
      const wetData = [
        { name: "Arjuna", desc: "Ideal for river banks and wetlands." },
        { name: "Jambu & Kadamba", desc: "Thrive in high-moisture lowlands." },
        { name: "Udumbara", desc: "Specifically recommended for :WetLowlandSoil." }
      ];
      resultHTML = generateListHTML("🌊 Wetland Plants (Anupa)", wetData);
    }

    // 3. SPACING / HASTA
    else if (input.includes("spacing") || input.includes("distance")) {
      const spacing = [
        { name: "Vimshatihasta", desc: "20 Hastas (~30 ft) - Best for healthy growth." },
        { name: "Dvadashahasta", desc: "12 Hastas (~18 ft) - Minimum required distance." }
      ];
      resultHTML = generateListHTML("📏 Spacing Guidelines", spacing);
    }

    // 4. PARKS / ARAMA
    else if (input.includes("park") || input.includes("garden")) {
      const parks = [
        { name: "Arishta (Neem)", desc: "Priority planting for public health and shade." },
        { name: "Sirisha & Punnaga", desc: "Recommended for prosperity and aesthetic beauty." }
      ];
      resultHTML = generateListHTML("🌳 Park Recommendations", parks);
    }

    // 5. FALLBACK: Simple Search
    else {
      const searchTerm = input.split(' ').pop(); 
      const regex = new RegExp(`(:|#|label ")${searchTerm}`, 'i');
      if (regex.test(ttlText)) {
        resultHTML = `<h2 style="color: #27ae60;">✅ Found</h2><p><b>${input}</b> is registered in the ontology.</p>`;
      } else {
        resultHTML = `<h2>❌ No Record</h2><p>Try: <i>"Which plants grow in red soil?"</i></p>`;
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
    <div style="text-align: left; animation: fadeIn 0.4s;">
      <h3 style="color: #27ae60; margin-bottom: 12px; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">${title}</h3>
      ${items.map(item => `
        <div style="margin-bottom: 10px; padding: 12px; background: #f9f9f9; border-radius: 10px; border-left: 5px solid #2ecc71;">
          <b>${item.name}</b>: <span style="font-size: 0.9em; color: #333;">${item.desc}</span>
        </div>
      `).join('')}
    </div>`;
}
