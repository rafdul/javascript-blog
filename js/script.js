"use strict";

function myBlog() {
  // document.getElementById('test-button').addEventListener('click', function(){
  //     const links = document.querySelectorAll('.titles a');
  //     console.log('links:', links);
  //   });

  // Wyświetlanie artykułu po kliknięciu
  const titleClickHandler = function (event) {
    console.log("Link was clicked!");
    // console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    clickedElement.classList.add("active"); //pętla nie jest potrzebna, bo odniesienie do pojedynczego elementu

    console.log("clickedElement:", clickedElement);
    console.log("clickedElement (with plus): " + clickedElement); //console.log z + pokazuje cały adres elementu

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll("article.active"); //selektor po elemencie article i kalsie .active

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    // const articleSelector = clickedElement.getAttribute("href").substring(1);
    //dodałem substring czyli wyrzucenie # z nazwy w href
    console.log(clickedElement.getAttribute("href"));
    // console.log(clickedElement.getAttribute("href").substring(1));

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(
      clickedElement.getAttribute("href")
    );
    console.log(targetArticle);

    // Alternatywna opcja z wykorzystaniem elementu zidentyfikowanego po id;
    // konieczna jest wtedy modyfikacja nazwy "href" poprzez .substring(1)
    // const targetArticle = document.getElementById(clickedElement.getAttribute("href").substring(1));
    // console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    const printedArticle = targetArticle.classList.add("active");
  };

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }

  // Generowanie listy tytułów
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';

  function generateTitleLinks(){
      console.log('Title Links generated!');

      /* [DONE] remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
        
        // function clearTitleList() {
            //       document.querySelector('.titles').innerHTML = ''; //działa też z textContent
            //       console.log("clearTitleList made");
            //   }
            //   clearTitleList();

      /* [IN PROGRESS] for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {

        /* [DONE] get the article id */
            const articleId = article.getAttribute("id");
            console.log(article.getAttribute("id"));

        /* [DONE] find the title element & get the title from the title element*/
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);
        
        /* [IN PROGRESS] create HTML of the link*/
            // <a href="#article-1"><span>Article-1</span></a>
            // <a href="#id"><span>title</span></a>
            // <a href="#articleId"><span>articleTitle</span></a>

            const articleHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(articleHTML);
        }


        /* insert link into titleList */

  }
  generateTitleLinks();
}
myBlog();
