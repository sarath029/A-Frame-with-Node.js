window.onload = () => {
  renderItems();
};


var models = [
  {
    url:
      "https://cdn.glitch.com/d2ef3a07-e8ff-4d41-ad3d-621a0282115c%2Fsingle_seater_chair.glb?v=1621456132605",
    scale: "0.8 0.8 0.8"
    // rotation: "0 180 0"
  },
  {
    url:
      "https://cdn.glitch.com/d2ef3a07-e8ff-4d41-ad3d-621a0282115c%2Fwall_storage_large.glb?v=1621456133550",
    scale: "0.01 0.01 0.01"
    // rotation: "0 180 0"
  },
  {
    url:
      "https://cdn.glitch.com/d2ef3a07-e8ff-4d41-ad3d-621a0282115c%2Fsofa_bed.glb?v=1621456138278",
    scale: "0.004 0.007 0.007"
    // rotation: "0 180 0"
  },
  {
    url:
      "https://cdn.glitch.com/d2ef3a07-e8ff-4d41-ad3d-621a0282115c%2Fliving_room_chair.glb?v=1621527867245",
    scale: "1 1 1"
    // rotation: "0 180 0"
  },
  {
    url:
      "https://cdn.glitch.com/d2ef3a07-e8ff-4d41-ad3d-621a0282115c%2Fcoffe_table.glb?v=1621452737239",
    scale: "1 1 1"
    // rotation: "0 180 0"
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

  // scene.appendChild(model);
  // let model = document.createElement("a-entity");

  document.querySelector("a-circle").addEventListener("click", function() {
    var entity = document.querySelector("[gltf-model]");
    modelIndex++;
    var newIndex = modelIndex % models.length;
    setModel(models[newIndex], entity);
  });

}
