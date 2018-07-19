const videoList = document.querySelector('.videolist');
const videoChunks = _.chunk(videos, 5);
const lastChunk = _.lastIndexOf(videoChunks);
const navButton = document.querySelector('.toggleNav');
const flexNav = document.querySelector('.flex-nav ul');
const menuButtons = document.querySelectorAll('.menu-link');
const pageNumber = document.querySelector('.page-number');
let chunk = 0;

const loopVideos = (chunk) =>
videoChunks[chunk].map(({url, name}) =>
  `
    <h2>${name}</h2>
    <div class="embed-container">
      <iframe width="560" height="315"
       src="${url}"
       frameborder="0" encrypted-media" allowfullscreen>
      </iframe>
    </div>
  `);

const showVideos = (chunk) => {
  videoList.innerHTML = loopVideos(chunk).join('');
};

showVideos(0);

navButton.addEventListener('click', () => {
  flexNav.classList.toggle("open");
});

const showPageNumber = () => {
  pageNumber.textContent = `Page: ${chunk + 1} / ${videoChunks.length}`;
};
showPageNumber();

function menuFunction () {
  if (this.dataset.page === 'next') {
    if (chunk < (videoChunks.length - 1)) {
      chunk++;
      showVideos(chunk);
      showPageNumber();
    }
  } else if (this.dataset.page === 'previous') {
    if (chunk !== 0) {
      chunk--;
      showVideos(chunk);
      showPageNumber();
    }
  } else if (this.dataset.page === 'first') {
    chunk = 0;
    showVideos(chunk);
    showPageNumber();
  } else if (this.dataset.page === 'last') {
    chunk = lastChunk - 1;
    showVideos(chunk);
    showPageNumber();
  }
  if (this.dataset.bottomlink) {
    window.scrollTo(0, 0);
  }
};

menuButtons.forEach(button => button.addEventListener('click', menuFunction));
