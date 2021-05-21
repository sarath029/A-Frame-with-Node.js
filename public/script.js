window.onload = () => {
  renderItems();
};

var models = [
  {
    url:
      "https://cdn.glitch.com/26a5cd73-7501-4013-96ea-9280595b4e9e%2Fsingle_seater_chair.glb?v=1621599032985",
    scale: "0.7 0.7 0.7"
  },
  {
    url:
      "https://cdn.glitch.com/26a5cd73-7501-4013-96ea-9280595b4e9e%2Fwall_storage_large.glb?v=1621599033067",
    scale: "0.01 0.01 0.01"
  },
  {
    url:
      "https://cdn.glitch.com/26a5cd73-7501-4013-96ea-9280595b4e9e%2Fsofa_bed.glb?v=1621599034402",
    scale: "0.004 0.007 0.007"
  },
  {
    url:
      "https://cdn.glitch.com/26a5cd73-7501-4013-96ea-9280595b4e9e%2Fliving_room_chair.glb?v=1621599035321",
    scale: "1 1 1"
  },
  {
    url:
      "https://cdn.glitch.com/26a5cd73-7501-4013-96ea-9280595b4e9e%2Fcoffe_table.glb?v=1621599028117",
    scale: "1 1 1"
  }
];

var modelIndex = 0;

var setModel = function(model, entity) {
  if (model.scale) {
    entity.setAttribute("scale", model.scale);
  }

  if (model.rotation) {
    entity.setAttribute("rotation", model.rotation);
  }

  if (model.position) {
    entity.setAttribute("position", model.position);
  }

  entity.setAttribute("gltf-model", model.url);
};

function renderItems() {
  let scene = document.querySelector("a-scene");

  document.querySelector("a-circle").addEventListener("click", function() {
    var entity = document.querySelector("[gltf-model]");
    modelIndex++;
    var newIndex = modelIndex % models.length;
    setModel(models[newIndex], entity);
  });
}
