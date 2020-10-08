'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });
const titleClickHandler = function(event){
    console.log('Link was clicked!');
    // console.log(event);


    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    clickedElement.classList.add('active'); //pętla nie jest potrzebna, bo odniesienie do pojedynczego elementu

    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement); //console.log z + pokazuje cały adres elementu

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active'); //selektor po elemencie article i kalsie .active

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    clickedElement.getAttribute("href");
    console.log(clickedElement.getAttribute("href"));

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
  }
  
const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }