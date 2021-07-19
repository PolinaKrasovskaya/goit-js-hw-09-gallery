import galleryItems from './gallery';
//   Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

  const refs = {
      listGallery: document.querySelector('.js-gallery'),
      lightBoxEl: document.querySelector('.js-lightbox'),
      lightBoxOverlay: document.querySelector('.lightbox__overlay'),
      lightBoxImage: document.querySelector('.lightbox__image'),
      lightBoxButton: document.querySelector('[data-action="close-lightbox"]'),
  };

  const galleryMarkup = createGalleryMarkUp(galleryItems);
refs.listGallery.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkUp(el) {
  return el.map(({preview, original, description}) => {
  return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img src="${preview}"
      alt="${description}"
      class="gallery__image"
      data-source="${original}" />
    </a>
    </li>`
  })
  .join('');
};
  
console.log(refs.listGallery);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refs.listGallery.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  e.preventDefault();
  if(e.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = e.target;
  const originalImage = imageRef.dataset.source;
  const originalAlt = imageRef.alt;

  setLargeImageSrc(originalImage);  
  setLargeImageAlt(originalAlt);

  refs.lightBoxEl.classList.add('is-open');

  function setLargeImageSrc(url) {
    refs.lightBoxImage.src = url;
    };
      
  function setLargeImageAlt(alt) {
    refs.lightBoxImage.alt = alt;
  };

  console.log(e.target);
}
console.log(refs.lightBoxEl);

refs.lightBoxButton.addEventListener('click',  onCLoseModal);
refs.lightBoxOverlay.addEventListener('click', onCLoseModal);

function onCLoseModal() {
  refs.lightBoxEl.classList.remove('is-open');
  setLargeImageSrc('');
  setLargeImageAlt('');
}

document.addEventListener('keydown', (e) => {
 if (e.code === 'Escape' && refs.lightBoxEl.classList.contains('is-open')) {
  onCLoseModal(e);
 }
})