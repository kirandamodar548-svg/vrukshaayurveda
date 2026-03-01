const ttlFile = "vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim();
  const output = document.getElementById("output");

  if (!input) {
    output.innerText = "Please enter a plant name.";
    return;
  }

  output.innerText = "Searching ontology...";

  try {
    const response = await fetch(ttlFile);
    const ttlText = await response.text();

    const plant = input.toLowerCase();

    // ontology-safe patterns
    const patterns = [
      `:${plant}`,
      `#${plant}`,
      `/${plant}`,
      `"${plant}"`
    ];

    const ttlLower = ttlText.toLowerCase();

    const found = patterns.some(p => ttlLower.includes(p));

    if (found) {
      output.innerHTML = `<b>${input}</b> found in ontology ✅`;
    } else {
      output.innerHTML = `Plant not found in ontology ❌`;
    }

  } catch (error) {
    output.innerText = "Error loading ontology file.";
  }
}
