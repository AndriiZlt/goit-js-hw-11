export function getRefs() {
  return {
    inputRef: document.querySelector('[name="searchQuery"]'),
    moreBtnRef: document.querySelector('.load-more'),
    formRef: document.querySelector('#search-form'),
    galleryRef: document.querySelector('.gallery'),
    axios: require('axios').default,
  };
}
