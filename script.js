const ttlFile = "vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim().toLowerCase();
  const output = document.getElementById("output");

  if (!input) {
    output.innerText = "Please enter a plant name.";
    return;
  }

  output.innerText = "Searching ontology...";

  try {
    const response = await fetch(ttlFile);
    const ttlText = await response.text();

    // case-insensitive + partial match
    if (ttlText.toLowerCase().includes(input)) {
      output.innerHTML = `<b>${input}</b> found in ontology ✅`;
    } else {
      output.innerText = "Plant not found in ontology ❌";
    }
  } catch (error) {
    output.innerText = "Error loading ontology file.";
  }
}
