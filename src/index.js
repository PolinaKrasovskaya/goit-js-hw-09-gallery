import './sass/main.scss';

const galleryItems = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];

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