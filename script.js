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

    // simple semantic-friendly match
    const found = ttlText
      .toLowerCase()
      .split(/\s+/)
      .some(word => word.includes(input));

    if (found) {
      output.innerHTML = `
        <b>${input}</b> found in ontology ✅
      `;
    } else {
      output.innerHTML = "Plant not found in ontology ❌";
    }
  } catch (e) {
    output.innerHTML = "Failed to load ontology file.";
  }
}
