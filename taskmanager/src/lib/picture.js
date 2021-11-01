const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const updatePreview = (file, imageElement) => {
  const reader = new FileReader();
  reader.addEventListener(`load`, function () {
    imageElement.src = reader.result;
  });
  reader.readAsDataURL(file);
};

export const createPreview = function (fileElement, imageElement) {
  const file = fileElement.files[0];
  if (file && FILE_TYPES.some((ending) => file.name.toLowerCase().endsWith(ending))) {
    updatePreview(file, imageElement);
  }
};
