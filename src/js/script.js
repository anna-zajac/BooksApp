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


  class BookList {

    constructor(){

      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    initData(){

      const thisBookList = this;

      thisBookList.data = dataSource.books;

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];

  
    }

    getElements(){
      const thisBookList = this;

      thisBookList.bookContainer = document.querySelector(select.containerOf.bookList);
  
    }

    render(){ 
      const thisBookList = this;

      for(let eachBook of dataSource.books){
  
        const ratingBgc = thisBookList.determineRatingBgc(eachBook.rating);
        const ratingWidth = eachBook.rating * 10;

  
        /* generate HTML based on template*/
        const generatedHTML = templates.bookTemplate({
          id: eachBook.id,
          name: eachBook.name,
          price: eachBook.price,
          image: eachBook.image,
          rating: eachBook.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,

        });
  
        /* create element using utils.createElementFromHTML */
        thisBookList.element = utils.createDOMFromHTML(generatedHTML);
  
        /* find book container */
        const bookContainer = document.querySelector(select.containerOf.bookList);
  
        /* add book to menu */
        bookContainer.appendChild(thisBookList.element);
  
      } 
    }

    initActions(){
      const thisBookList = this;

  
      thisBookList.bookContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
  
        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id');
        //event.target.offsetParent.getAttribute('data-id')
  
        if(!thisBookList.favoriteBooks.includes(bookId)){
  
          image.classList.add('favorite');
          thisBookList.favoriteBooks.push(bookId);
           
        } else {
          const indexOfBook = thisBookList.favoriteBooks.indexOf(bookId);
          thisBookList.favoriteBooks.splice(indexOfBook, 1);
          image.classList.remove('favorite');
        }
  
        console.log('favoriteBooks', thisBookList.favoriteBooks);
  
      });
      
      console.log('filters', thisBookList.filters);
  
      const bookFilter = document.querySelector(select.containerOf.filters);
  
      bookFilter.addEventListener('click', function(event){
  
        const clickedOption = event.target;
  
        if(clickedOption.tagName == 'INPUT' && clickedOption.type == 'checkbox' && clickedOption.name == 'filter'){   
          console.log('clickedOption', clickedOption.value);
  
          if(clickedOption.checked){
            thisBookList.filters.push(clickedOption.value);
          } else {
  
            const indexOfUncheckedValue = thisBookList.filters.indexOf(clickedOption.value);
            thisBookList.filters.splice(indexOfUncheckedValue);
          }
        }
  
        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;

      for (let book of thisBookList.data) {
        console.log(book);
        const hiddenBookFilter = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHiddden;
  
        for(const filter of thisBookList.filters){
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

    determineRatingBgc(rating){

      let background = '';
  
      if(rating < 6) {
  
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
  
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  
      } else if(rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
  
      return background;
    }



  }

  const app = new BookList();

  app;
  

}