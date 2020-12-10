
$(function() {
  Bookmarks.bindEventListeners();
  API.getBookmarks(bookmarks => {
    bookmarks.forEach(bookmark => Store.addBookmark(bookmark));
    Bookmarks.render();
  });
});
