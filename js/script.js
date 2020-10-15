'use strict';

function myBlog() {
  // document.getElementById('test-button').addEventListener('click', function(){
  //     const links = document.querySelectorAll('.titles a');
  //     console.log('links:', links);
  //   });

  // Wyświetlanie artykułu po kliknięciu
  const titleClickHandler = function (event) {
    // console.log("Link was clicked!");
    // console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
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

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    // const articleSelector = clickedElement.getAttribute("href").substring(1);
    //dodałem substring czyli wyrzucenie # z nazwy w href
    console.log(clickedElement.getAttribute('href'));
    // console.log(clickedElement.getAttribute("href").substring(1));

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    // Alternatywna opcja z wykorzystaniem elementu zidentyfikowanego po id;
    // konieczna jest wtedy modyfikacja nazwy "href" poprzez .substring(1)
    // const targetArticle = document.getElementById(clickedElement.getAttribute("href").substring(1));
    // console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  // Generowanie listy tytułów
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(customSelector = '') {
    // console.log("Title Links generated!");

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    // function clearTitleList() {
    //     document.querySelector(optTitleListSelector).innerHTML = ""; //działa też z textContent
    //     // console.log("clearTitleList made");
    // }
    // clearTitleList();

    /* [DONE] for each article */
    // let html = '';

    // W ten sposób uzyskamy np. selektor .post[data-tags~="cat"],
    // jeśli funkcja została wywołana z argumentem '[data-tags~="cat"]'.
    // Jeżeli natomiast nie podano żadnego argumentu, to wyszukamy elementy
    // pasujące do selektora .post, czyli wszystkie artykuły.
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('optArticleSelektor=', optArticleSelector, 'customSelector=', customSelector);
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(article.getAttribute('id'));

      /* [DONE] find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of the link*/
      // <a href="#articleId"><span>articleTitle</span></a>

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      // Zaproponowane w skrypcie
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      // szybsza metoda
      // titleList.insertAdjacentHTML('beforeend', linkHTML);

      // Też Działa:
      // document.querySelector(optTitleListSelector).innerHTML += linkHTML;
      // html = html + linkHTML;

      // Inna metoda:
      // 1. nad pętlą 'for (let article of articles)' zadeklarować let html = '';
      // 2. w "insert link into titleList" zdefiniować html = html + linkHTML
      // 3. poza pętlą 'for (let article of articles)' wygenerować listę titleList.innerHTML = html;
    }
    // titleList.innerHTML = html;
    //   console.log(html);

  }
  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
    /* START LOOP: for every article: */

      /* [DONE] find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      tagsList.innerHTML = '';
      // console.log(tagsList.innerHTML);

      /* [DONE] make html variable with empty string */
      let linkTagHTML = '';
      // console.log(linkTagHTML);

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      let html = '';
      for (let articleTag of articleTagsArray) {

        /* [DONE] generate HTML of the link */
        /* [DONE] add generated code to html variable */
        // <a href="#articleId"><span>articleTitle</span></a>
        linkTagHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
        // console.log(articleTag);
        console.log(linkTagHTML);
        html = html + linkTagHTML;

      /* END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;

      // tagsList.innerHTML = linkTagHTML; // dodaje tylko ostatni link i tag
      // tagsList.insertAdjacentHTML('afterbegin', linkTagHTML); // dodaje tylko ostatni link i tag

    /* END LOOP: for every article: */
    }

  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement=', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href of clickedElement=', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    //metoda proponowana w module
    const tag = href.replace('#tag-', '');
    console.log('tag from href of clickedElement=', tag);
    //metoda alternatywna
    // const tag = href.substring(5);

    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll('.post-tags a.active');
    console.log('all tag links with class active=', tagsActive);

    /* START LOOP: for each active tag link */
    for (let tagActive of tagsActive) {

      /* remove class active */
      tagActive.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const findTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log('all tag links with attr. "href" equal to const "href" constant=', findTags);

    /* START LOOP: for each found tag link */
    for(let findTag of findTags) {

      /* add class active */
      findTag.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    // ten selektor oznacza "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'".
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    console.log('all links to tags=', links);

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
}
myBlog();


// let sentence = 'idę do domu bo idzie burze';
// let words = sentence.split(' ');
// console.log(words);
