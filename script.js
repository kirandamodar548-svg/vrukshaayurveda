const ttlFile = "vrukshaayurveda.ttl";

async function searchPlant() {
  const input = document.getElementById("plant-input").value.trim();
  const output = document.getElementById("output");

  if (!input) {
    output.innerHTML = "⚠️ Please enter a plant name";
    return;
  }

  output.innerHTML = "🔍 Searching ontology...";

  try {
    const response = await fetch(ttlFile);
    const ttlText = await response.text();

    // REGEX search (ontology-safe)
    const regex = new RegExp(`\\b${input}\\b`, "i");

    setTimeout(() => {
      if (regex.test(ttlText)) {
        output.innerHTML = `✅ <b>${input}</b> found in ontology`;
      } else {
        output.innerHTML = `❌ <b>${input}</b> not found in ontology`;
      }
    }, 500);

  } catch (err) {
    output.innerHTML = "❌ Error loading ontology file";
  }
}
