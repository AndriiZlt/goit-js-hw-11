export function getRefs() {
  return {
    inputRef: document.querySelector('[name="searchQuery"]'),
    formRef: document.querySelector('#search-form'),
    galleryRef: document.querySelector('.gallery'),
    axios: require('axios').default,
  };
}
