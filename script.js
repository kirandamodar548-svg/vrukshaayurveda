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

    const plant = input.toLowerCase();
    const patterns = [
      `:${plant}`,
      `#${plant}`,
      `/${plant}`,
      `"${plant}"`
    ];

    const found = patterns.some(p =>
      ttlText.toLowerCase().includes(p)
    );

    setTimeout(() => {
      if (found) {
        output.innerHTML = `✅ <b>${input}</b> found in ontology`;
      } else {
        output.innerHTML = `❌ <b>${input}</b> not found in ontology`;
      }
    }, 600);

  } catch (e) {
    output.innerHTML = "❌ Error loading ontology file";
  }
}
