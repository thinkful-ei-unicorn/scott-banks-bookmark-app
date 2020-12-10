const Generator = (function() {

  function generateBookmarksListHTML(arrayOfBookmarks, filterValue) {
    return mapFilteredArrayOfBookmarksToHTML(
      filterArrayOfBookmarks(arrayOfBookmarks, filterValue)
    );
  }

  function generateSingleBookmarkListHTML(bookmark) {
    let hiddenStatus = Store.checkIfShouldBeHidden(bookmark);

    return runGeneratorFunctions(bookmark, hiddenStatus);
  }


  function runGeneratorFunctions(bookmark, hiddenStatus) {
    return `
    ${generateLiItemWithDataID(bookmark)}
    ${generateBookmarkHeader(bookmark)}
    ${genereateDivWithClassHTML(hiddenStatus)}
      ${generateBookmarkDescriptionHTML(bookmark)}
      ${generateBookmarkURLHTML(bookmark)}${generateBookmarkEditButtonHTML()}
      ${generateDeleteButtonHTML(bookmark)}
    ${generateAsideLiClosingTags()}
    `;
  }


  function generateLiItemWithDataID(bookmark) {
    return `<li class='bookmark-item js-bookmark-item' data-id=${bookmark.id}>`;
  }


  function generateAsideLiClosingTags() {
    return `</aside>
    </li>`;
  }

  function genereateDivWithClassHTML(hiddenStatus) {
    return `<aside class='bookmark-body ${hiddenStatus}' role="complementary">`;
  }

  function generateBookmarkHeader(bookmark) {
    return `<section class='bookmark-header js-bookmark-header'><button class='header-button'>${
      bookmark.title
    } ${generateBookmarkRatingHTML(bookmark)}</button></section>`;
  }

  function generateBookmarkURLHTML(bookmark) {
    return `<a href='${bookmark.url}'>${generateBookmarkVisitButtonHTML()}</a>`;
  }

  function generateBookmarkVisitButtonHTML() {
    return '<button class="js-btn-visit" aria-label="Visit site">VISIT</button>';
  }

  function generateBookmarkEditButtonHTML() {
    return '<button class="edit-btn js-btn-edit" aria-label="Edit bookmark">EDIT</button>';
  }

  function generateDeleteButtonHTML() {
    return '<button class="bookmark-button js-btn-delete" aria-label="Delete bookmark">DELETE</button>';
  }

  function generateBookmarkDescriptionHTML(bookmark) {
    return checkIfBookmarkHasDescription(bookmark)
      ? `<p>Description: ${bookmark.desc}</p>`
      : '';
  }

  function checkIfBookmarkHasDescription(bookmark) {
    if (bookmark.desc) return true;
    return false;
  }


  function generateBookmarkRatingHTML(bookmark) {
    return checkIfBookmarkHasRating(bookmark)
      ? `| ${generateStarsHTML(bookmark.rating)}`
      : '';
  }


  function checkIfBookmarkHasRating(bookmark) {
    if (bookmark.rating) return true;
    return false;
  }

  function generateStarsHTML(rating) {
    const ariaLabel = `<span aria-label="rating: ${rating} stars">`;
    const arrayOfStarsHTML = [ariaLabel];
    const closeSpan = '</span>';

    for (let i = 0; i < rating; i++) {
      generateStarHTML(arrayOfStarsHTML, rating);
    }
    arrayOfStarsHTML.push(closeSpan);
    return arrayOfStarsHTML.join('');
  }

  function generateStarHTML(array) {
    array.push('<i class="fa fa-star" aria-hidden="true"></i>');
  }

  function filterArrayOfBookmarks(arrayOfBookmarks, filterValue) {
    return arrayOfBookmarks.filter(bookmark => bookmark.rating >= filterValue);
  }

  function mapFilteredArrayOfBookmarksToHTML(arrayOfBookmarks) {
    return arrayOfBookmarks.map(generateSingleBookmarkListHTML);
  }

  function generateUpdateBookmarkForm() {
    return `
      <form id='js-edit-form'>
      <fieldset>
      <legend>Update Bookmark</legend>
        <div class='col-6'>
          <label for='js-form-title'>Title</label>
          <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='The title of the bookmark'></li>

          <label for='js-form-description'>Description</label>
          <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="The description of the bookmark"></textarea>
        </div>
        <div class='col-6'>
          <label for='js-form-url'>URL</label>
          <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='http:// or https://'></li>

          <label for='js-form-rating' id='rating-label'>Rating: </label>
          <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
        </div>
        <div class='add-btn-container col-12'>
          <button type='submit' id='js-update-bookmark' class='add-button'>UPDATE BOOKMARK</button>
          <button type='button' id='js-cancel-bookmark'>CANCEL</button>
        </div>
        </fieldset>
      </form>
      `;
  }


  function generateNewBookmarkFormHTML() {
    return `
    <form id='js-new-item-form'>
    <fieldset>
    <legend>New Bookmark</legend>
      <div class='col-6'>
        <label for='js-form-title'>Title</label>
        <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='The title of the bookmark'></li>

        <label for='js-form-description'>Description</label>
        <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="The description of the bookmark"></textarea>
      </div>
      <div class='col-6'>
        <label for='js-form-url'>URL</label>
        <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='http:// or https://'></li>

        <label for='js-form-rating' id='rating-label'>Rating: </label>
        <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
          <option value='5' selected>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
      </div>
      <div class='add-btn-container col-12'>
        <button type='submit' id='js-add-bookmark' class='add-button'>ADD BOOKMARK</button>
        <button type='button' id='js-cancel-bookmark'>CANCEL</button>
      </div>
      </fieldset>
    </form>
    `;
  }

  return {
    generateUpdateBookmarkForm,
    generateNewBookmarkFormHTML,
    generateBookmarksListHTML
  };
})();
