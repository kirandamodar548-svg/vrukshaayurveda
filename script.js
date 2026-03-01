const ttlFile = "vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim().toLowerCase();
  const output = document.getElementById("output");

  if (!input) {
    output.innerHTML = "Please enter a plant name.";
    return;
  }

  output.innerHTML = "Searching ontology...";

  try {
    const response = await fetch(ttlFile);
    const ttlText = await response.text();

    // Case-insensitive search (NO TTL CHANGE)
    if (ttlText.toLowerCase().includes(input)) {
      output.innerHTML = `
        <h3>Result</h3>
        <p><b>${input}</b> exists in the ontology ✅</p>
      `;
    } else {
      output.innerHTML = "Plant not found in ontology ❌";
    }
  } catch (error) {
    output.innerHTML = "Error loading ontology file.";
  }
}
