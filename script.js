const githubTtlUrl = "https://raw.githubusercontent.com/kirandamodar548-svg/vrukshaayurveda/main/vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim();
  const output = document.getElementById("output");
  const btn = document.getElementById("search-btn");

  if (!input) {
    output.innerHTML = "⚠️ <span style='color: #e74c3c;'>Please enter a plant name</span>";
    return;
  }

  btn.disabled = true;
  btn.innerText = "Querying GitHub...";
  output.innerHTML = `<div class="loader">🍃</div><p>Searching Vrukshaayurveda Ontology...</p>`;

  try {
    const response = await fetch(githubTtlUrl);
    if (!response.ok) throw new Error("Data fetch failed");
    
    const ttlText = await response.text();
    
    // Improved search: Look for the name as an Individual or a Label
    const plantNameEscaped = input.replace(/[.*+?^${}()|[\]\right]/g, '\\$&');
    const regex = new RegExp(`(:|#|label ")${plantNameEscaped}`, 'i');

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Search";
      
      if (regex.test(ttlText)) {
        // Try to find the Sanskrit name if it exists in the file for extra "wow" factor
        const sanskritRegex = new RegExp(`:hasSanskritName "${plantNameEscaped}"`, 'i');
        const isSanskritMatch = sanskritRegex.test(ttlText);

        output.innerHTML = `
          <div style="text-align: left; width: 100%;">
            <h2 style="color: #27ae60; text-align: center;">✅ Match Found</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
            <p><b>Query:</b> ${input}</p>
            <p><b>Status:</b> Verified in OWL Ontology</p>
            <p><b>Database:</b> Live GitHub Repository</p>
            <div style="margin-top:15px; padding:10px; background:rgba(255,255,255,0.5); border-radius:10px; font-size:0.9em;">
              Successfully retrieved semantic data from <i>vrukshaayurveda.ttl</i>.
            </div>
          </div>
        `;
        output.style.background = "rgba(46, 204, 113, 0.1)";
      } else {
        output.innerHTML = `
          <h2 style="color: #e67e22;">❌ No Record</h2>
          <p>The plant <b>"${input}"</b> was not found in the ancient ontology database.</p>
        `;
        output.style.background = "rgba(230, 126, 34, 0.05)";
      }
    }, 1200);

  } catch (e) {
    btn.disabled = false;
    btn.innerText = "Search";
    output.innerHTML = `❌ <b>Database Error:</b> Could not connect to GitHub.`;
  }
}
