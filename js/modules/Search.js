import $ from 'jquery';

class Search {
  constructor() {
    this.openButton = $('.js-search-trigger');
    this.closeButton = $('.search-overlay__close');
    this.searchOverlay = $('.search-overlay');
    this.searchField = $('search-term');
    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
  }

  events() {
    this.openButton.on('click', this.openOverlay.bind(this));
    this.closeButton.on('click', this.closeOverlay.bind(this));
    $(document).on('keydown', this.keyPressDispatcher.bind(this));
    this.searchField.on('keydown', this.typingLogic.bind(this));
  }

  getResults() {
    $.getJSON(
      'http://localhost:3000/wp-json/wp/v2/posts?search=biology' +
        this.searchField.val(),
      function(posts) {
        var testArray = ['red', 'orange', 'yellow'];
        this.resultsDiv.html(`
          <h2 class="search-overlay__section-title">General Information</h2>
          ${
            posts.length
              ? '<ul class="link-list min-list">'
              : '<p>No general information matches that search.</p>'
          }
            ${posts
              .map(
                item =>
                  `<li><a href="${item.link}">${item.title.rendered}</a></li>`
              )
              .join('')}
          </ul>
          
        `);
      }
    );
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass('search-overlay--active');
    $('body').addClass('body-no-scroll');
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass('search-overlay--active');
    $('body').removeClass('body-no-scroll');
    this.isOverlayOpen = false;
  }
}

export default Search;
