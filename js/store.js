
const Store = (function() {

  function addBookmark(bookmarkObject) {
    const defaultObjectProps = {
      expanded: false
    };
    this.bookmarks.push(Object.assign(bookmarkObject, defaultObjectProps));
  }


  function updateBookmark(bookmarkID, bookmarkToMerge) {
    const object = this.bookmarks.find(bookmark => bookmark.id === bookmarkID);
    Object.assign(object, bookmarkToMerge);
  }

  function setAddingBookmarkStatus(bool) {
    this.addingBookmark = bool;
  }

  function setUpdatingBookmarkStatus(bool) {
    this.updatingBookmark = bool;
  }

  function deleteBookmark(bookmarkID) {
    this.bookmarks = this.bookmarks.filter(
      bookmark => bookmark.id !== bookmarkID
    );
  }

  function filterBookmarksByRating(rating) {
    setRatingFilter(rating);
    this.bookmarks = filterStoreBookmarksArray();
  }

  function filterStoreBookmarksArray() {
    this.bookmarks.filter(bookmark => bookmark.rating >= this.ratingFilter);
  }

  function toggleBookmarkExpanded(bookmarkID) {
    const bookmarkToToggle = this.bookmarks.find(
      bookmark => bookmark.id === bookmarkID
    );
    bookmarkToToggle.expanded = !bookmarkToToggle.expanded;
  }

  function setErrorMessage(error) {
    this.errorMessage = error;
  }

  function setRatingFilter(value) {
    this.ratingFilter = value;
  }

  function findByID(bookmarkID) {
    return this.bookmarks.find(bookmark => bookmark.id === bookmarkID);
  }

  function findAndDelete(bookmarkID) {
    this.bookmarks = this.bookmarks.filter(
      bookmark => bookmark.id !== bookmarkID
    );
  }

  function checkIfShouldBeHidden(bookmark) {
    return !bookmark.expanded ? 'hidden' : '';
  }

  function checkIfAddingBookmark() {
    return this.addingBookmark;
  }

  function checkIfEditingBookmark() {
    return this.updatingBookmark;
  }

  function setEditingObject(object) {
    this.editingObject.title = object.title;
    this.editingObject.desc = object.desc;
    this.editingObject.url = object.url;
    this.editingObject.rating = object.rating;
  }

  function resetEditingObject() {
    this.editingObject = {};
  }

  return {
    bookmarks: [],
    ratingFilter: 0,
    editingObject: {},
    addBookmark,
    checkIfAddingBookmark,
    setAddingBookmarkStatus,
    deleteBookmark,
    filterBookmarksByRating,
    toggleBookmarkExpanded,
    setErrorMessage,
    findByID,
    setRatingFilter,
    findAndDelete,
    checkIfShouldBeHidden,
    updateBookmark,
    setUpdatingBookmarkStatus,
    checkIfEditingBookmark,
    setEditingObject,
    resetEditingObject
  };
})();
