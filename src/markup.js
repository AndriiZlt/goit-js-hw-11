import Notiflix from 'notiflix';
export function createMarkup(data) {
  return data
    .map(card => {
      return `<a class="gallery-link" href="${card.largeImageURL}">
                  <div class="result">
                      <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy"/>
                      <div class="info">
                          <p class="info-item">
                            <b>Likes <span>${card.likes}</span></b>
                          </p>
                          <p class="info-item">
                            <b>Views <span>${card.views}</span></b>
                          </p>
                          <p class="info-item">
                            <b>Comments <span>${card.comments}</span></b>
                          </p>
                          <p class="info-item">
                            <b>Downloads <span>${card.downloads}</span></b>
                          </p>
                    </div>
                  </div>
                </a>`;
    })
    .join(' ');
}
