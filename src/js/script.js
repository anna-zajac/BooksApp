{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      images: '.book_image',
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };

  


  function render(){ 

    for(let eachBook of dataSource.books){

      /* generate HTML based on template*/
      const generatedHTML = templates.bookTemplate(eachBook);

      /* create element using utils.createElementFromHTML */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      /* find book container */
      const bookContainer = document.querySelector(select.containerOf.bookList);

      /* add book to menu */
      bookContainer.appendChild(generatedDOM);

    } 
  }

  const favoriteBooks = [];
  const filters = [];

  function initActions(){

    const booksList = document.querySelector(select.containerOf.bookList);

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const image = event.target.offsetParent;
      const bookId = image.getAttribute('data-id');
      //event.target.offsetParent.getAttribute('data-id')

      if(!favoriteBooks.includes(bookId)){

        image.classList.add('favorite');
        favoriteBooks.push(bookId);
         
      } else {
        const indexOfBook = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBook, 1);
        image.classList.remove('favorite');
      }

      console.log('favoriteBooks', favoriteBooks);

    });

    
    
    console.log('filters', filters);

    const bookFilter = document.querySelector(select.containerOf.filters);

    bookFilter.addEventListener('click', function(event){

      const clickedOption = event.target;

      if(clickedOption.tagName == 'INPUT' && clickedOption.type == 'checkbox' && clickedOption.name == 'filter'){   
        console.log('clickedOption', clickedOption.value);

        if(clickedOption.checked){
          filters.push(clickedOption.value);
        } else {

          const indexOfUncheckedValue = filters.indexOf(clickedOption.value);
          filters.splice(indexOfUncheckedValue);
        }
      }

      filterBooks();
    });



  }

  function filterBooks() {
    for (let book of dataSource.books) {
      console.log(book);
      const hiddenBookFilter = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHiddden;

      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHiddden = true;
          break;
        }
      }

      if(shouldBeHiddden){
        hiddenBookFilter.classList.add('hidden');
      }else {
        hiddenBookFilter.classList.remove('hidden');
      }
      
    }
  }


  

  render();
  initActions();

}