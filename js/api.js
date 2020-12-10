const API = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scottbanks';

  function getBookmarks(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }


  function createNewBookmark(bookmarkObject, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmarkObject),
      success: callback,
      error: errorCallback
    });
  }


  function deleteBookmark(id, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
      error: errorCallback
    });
  }


  function updateBookmark(id, updateObject, callback, errorCallback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateObject),
      success: callback,
      error: errorCallback
    });
  }

  return {
    createNewBookmark,
    deleteBookmark,
    getBookmarks,
    updateBookmark
  };
})();
