function loadOntology() {
  const plant = document.getElementById("plantInput").value;

  const ttlURL =
    "https://kirandamodar548-svg.github.io/vrukshaayurveda/vrukshaayurveda.ttl";

  fetch(ttlURL)
    .then(res => res.text())
    .then(data => {
      if (!plant) {
        document.getElementById("output").innerText =
          "Ontology loaded successfully from GitHub.";
        return;
      }

      if (data.toLowerCase().includes(plant.toLowerCase())) {
        document.getElementById("output").innerText =
          "Plant found in ontology:\n\n" + plant;
      } else {
        document.getElementById("output").innerText =
          "Plant not found in ontology.";
      }
    })
    .catch(() => {
      document.getElementById("output").innerText =
        "Error loading ontology from GitHub.";
    });
}