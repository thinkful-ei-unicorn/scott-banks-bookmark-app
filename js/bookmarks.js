

const Bookmarks = (function() {
  function bindEventListeners() {
    handleNewBookmarkClicked();
    handleAddBookmarkClicked();
    handleDeleteBookmarkClicked();
    handleFilterRatingsDropdown();
    handleToggleExpandedBookmarkView();
    handleEditBookmarkClicked();
    handleCancelButton();
  }


  function handleNewBookmarkClicked() {
    $('#js-new-bookmark').on('click', () => {
      Store.setAddingBookmarkStatus(true);
      Store.setUpdatingBookmarkStatus(false);
      render();
    });
  }


  function handleAddBookmarkClicked() {
    $('#js-form-container').on('submit', '#js-new-item-form', event => {
      event.preventDefault();

      const serializedJSON = JSON.parse($(event.target).serializeJSON());
      const newBookmarkObject = constructBookmarkObject(serializedJSON);

      API.createNewBookmark(
        newBookmarkObject,
        newBookmark => {
          Store.addBookmark(newBookmark);
          Store.setAddingBookmarkStatus(false);
          render();
        },
        error => errorCallback(error)
      );
    });
  }


  function handleDeleteBookmarkClicked() {
    $('.js-bookmarks-container').on('click', '.js-btn-delete', event => {
      const bookmarkUniqueID = getDataID(event.currentTarget);
      const confirmedDeletion = confirm(
        'Are you sure you want to delete this bookmark?'
      );
      if (confirmedDeletion) {
        API.deleteBookmark(
          bookmarkUniqueID,
          () => {
            Store.findAndDelete(bookmarkUniqueID);
            render();
          },
          error => errorCallback(error)
        );
      }
    });
  }


  function handleEditBookmarkClicked() {
    $('.js-bookmarks-container').on('click', '.js-btn-edit', event => {
      const bookmarkUniqueID = getDataID(event.currentTarget);
      const currentBookmarkObject = Store.findByID(bookmarkUniqueID);
      Store.setUpdatingBookmarkStatus(true);
      Store.setAddingBookmarkStatus(false);
      Store.setEditingObject(currentBookmarkObject);
      render();

      $('#js-edit-form').on('submit', event => {
        console.log('listening');
        event.preventDefault();


        const title = $('#js-form-title').val();
        const description = $('#js-form-description').val();
        const url = $('#js-form-url').val();
        const rating = $('#js-form-rating').val();

        const editedObject = constructBookmarkObject({
          title: title,
          rating: rating,
          description: description,
          url: url
        });


        API.updateBookmark(
          bookmarkUniqueID,
          editedObject,
          () => {
            Store.updateBookmark(bookmarkUniqueID, editedObject);
            Store.setUpdatingBookmarkStatus(false);
            Store.resetEditingObject();
            render();
          },
          error => errorCallback(error)
        );
      });
    });
  }

  function handleCancelButton() {
    $('#js-form-container').on('click', '#js-cancel-bookmark', () => {
      Store.setAddingBookmarkStatus(false);
      Store.setUpdatingBookmarkStatus(false);
      render();
    });
  }

  function handleFilterRatingsDropdown() {
    $('#js-filter-control').change(() => {
      Store.setRatingFilter(getRatingsFilterDropdownValue());
      render();
    });
  }

  function getRatingsFilterDropdownValue() {
    return $('#js-filter-control').val();
  }

  function handleToggleExpandedBookmarkView() {
    $('.js-bookmarks-container').on('click', '.js-bookmark-header', event => {
      Store.toggleBookmarkExpanded(getDataID(event.currentTarget));
      render();
    });
  }


  function errorCallback(error) {
    console.log('error');
    Store.setErrorMessage(`Error - ${getErrorMessage(error)}`);
    render();
  }


  function getErrorMessage(error) {
    return error.responseJSON.message;
  }


  function constructBookmarkObject(serializedJSON) {
    const newObject = {};


    if (serializedJSON.title.length > 0) {
      newObject['title'] = serializedJSON.title;
    } else {
      newObject['title'] = '';
    }

    if (serializedJSON.url.length > 5) {
      newObject['url'] = serializedJSON.url;
    } else {
      newObject['url'] = '';
    }

    if (serializedJSON.description.length > 0) {
      newObject['desc'] = serializedJSON.description;
    }

    if (
      parseInt(serializedJSON.rating) > 0 &&
      parseInt(serializedJSON.rating) <= 5
    ) {
      newObject['rating'] = serializedJSON.rating;
    }

    return newObject;
  }

  function getDataID(bookmark) {
    return getDataIDAttributeValue(bookmark);
  }

  function getDataIDAttributeValue(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-item')
      .attr('data-id');
  }

  function clearFormValues() {
    $('#js-form-title').val('');
    $('#js-form-description').val('');
    $('#js-form-url').val('');
    $('#js-form-rating').val('');
  }




  function render() {
    const bookmarks = Store.bookmarks;
    const filterValue = Store.ratingFilter;
    let bookmarkListHTML;


    if (Store.checkIfAddingBookmark()) {
      $('#js-form-container').html(Generator.generateNewBookmarkFormHTML());
    } else if (Store.checkIfEditingBookmark()) {
      $('#js-form-container').html(Generator.generateUpdateBookmarkForm());
    } else {
      $('#js-form-container').html('');
    }

    
    if (Store.editingObject && !Store.checkIfAddingBookmark()) {
      $('#js-form-title').val(Store.editingObject.title);
      $('#js-form-description').val(Store.editingObject.desc);
      $('#js-form-url').val(Store.editingObject.url);
      $('#js-form-rating').val(Store.editingObject.rating);
    } else if (!Store.checkIfAddingBookmark()) {
      clearFormValues();
    }


    if (Store.errorMessage) {
      $('#js-error-message').html(Store.errorMessage);
      Store.setErrorMessage('');
    } else {
      $('#js-error-message').html('');
    }

    if (filterValue > 0) {
      bookmarkListHTML = Generator.generateBookmarksListHTML(
        bookmarks,
        filterValue
      );

      $('.js-bookmarks-container').html(bookmarkListHTML);
    } else {

      bookmarkListHTML = Generator.generateBookmarksListHTML(
        bookmarks,
        filterValue
        
      );
      $('.js-bookmarks-container').html(bookmarkListHTML);
    }
  }

  return {
    render,
    bindEventListeners
  };
})();
