'use strict';

// Stałe
const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors',
};

// const opt.articleSelector = '.post';
// const opt.titleSelector = '.post-title';
// const opt.titleListSelector = '.titles';
// const opt.articleTagsSelector = '.post-tags .list';
// const opt.articleAuthorSelector = '.post-author';
// const opt.tagsListSelector = '.tags.list';
// const opt.cloudClassCount = 5;
// const opt.cloudClassPrefix = 'tag-size-';
// const opt.authorsListSelector = '.authors';


function myBlog() {
  // document.getElementById('test-button').addEventListener('click', function(){
  //     const links = document.querySelectorAll('.titles a');
  //     console.log('links:', links);
  //   });

  // Wyświetlanie artykułu po kliknięciu
  const titleClickHandler = function (event) {
    // console.log("Link was clicked!");
    // console.log(event);
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log('remove class active from articles', activeLinks);

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    this.classList.add('active'); //pętla nie jest potrzebna, bo odniesienie do pojedynczego elementu

    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement); //console.log z + pokazuje cały adres elementu

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active'); //selektor po elemencie article i kalsie .active
    console.log('all articles with class active:', activeArticles);

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    // const articleSelector = clickedElement.getAttribute("href").substring(1);
    //dodałem substring czyli wyrzucenie # z nazwy w href
    console.log('get href attribute from the clicked link:', articleSelector);
    // console.log(clickedElement.getAttribute("href").substring(1));

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('correct article:', targetArticle);

    // Alternatywna opcja z wykorzystaniem elementu zidentyfikowanego po id;
    // konieczna jest wtedy modyfikacja nazwy "href" poprzez .substring(1)
    // const targetArticle = document.getElementById(clickedElement.getAttribute("href").substring(1));
    // console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {
    // console.log("Title Links generated!");

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';

    // function clearTitleList() {
    //     document.querySelector(opt.titleListSelector).innerHTML = ""; //działa też z textContent
    //     // console.log("clearTitleList made");
    // }
    // clearTitleList();

    /* [DONE] for each article */
    let html = '';

    // W ten sposób uzyskamy np. selektor .post[data-tags~="cat"],
    // jeśli funkcja została wywołana z argumentem '[data-tags~="cat"]'.
    // Jeżeli natomiast nie podano żadnego argumentu, to wyszukamy elementy
    // pasujące do selektora .post, czyli wszystkie artykuły.
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    console.log('optArticleSelektor=', opt.articleSelector, 'customSelector=', customSelector);
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('id article:', article.getAttribute('id'));

      /* [DONE] find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      console.log('title article:', articleTitle);

      /* [DONE] create HTML of the link*/
      // <a href="#articleId"><span>articleTitle</span></a>

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('link to the article:', linkHTML);

      /* [DONE] insert link into titleList */
      // Zaproponowane w skrypcie
      // titleList.innerHTML = titleList.innerHTML + linkHTML;

      // szybsza metoda
      // titleList.insertAdjacentHTML('beforeend', linkHTML);

      // Też Działa:
      // document.querySelector(opt.titleListSelector).innerHTML += linkHTML;
      html = html + linkHTML;

      // Inna metoda:
      // 1. nad pętlą 'for (let article of articles)' zadeklarować let html = '';
      // 2. w "insert link into titleList" zdefiniować html = html + linkHTML
      // 3. poza pętlą 'for (let article of articles)' wygenerować listę titleList.innerHTML = html;
    }
    titleList.innerHTML = html;
    console.log(html);

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }
  generateTitleLinks();

  function calculateTagsParams (tags) {
    const params = {
      min: 999999,
      max: 0,
    };
    for (let tag in tags) {
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  }

  function calculateTagClass (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
    return opt.cloudClassPrefix + classNumber;
  }


  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object (first it was empty array) */
    let allTags = {};
    console.log('object with tags', allTags);

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(opt.articleSelector);
    for (let article of articles) {
    /* START LOOP: for every article: */

      /* [DONE] find tags wrapper */
      const tagsList = article.querySelector(opt.articleTagsSelector);
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
        // console.log(html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[articleTag]){
        /* [NEW] add generated code to allTags array */
          allTags[articleTag] = 1;
        } else {
          allTags[articleTag] ++;
        }

      /* END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;

      // tagsList.innerHTML = linkTagHTML; // dodaje tylko ostatni link i tag
      // tagsList.insertAdjacentHTML('afterbegin', linkTagHTML); // dodaje tylko ostatni link i tag

    /* END LOOP: for every article: */
    }
    console.log(allTags);

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.tagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */

    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>';
      // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>' + ' (' + allTags[tag] + ')</li> ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  }
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('tag clickedElement:', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href of clickedElement:', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    //metoda proponowana w module
    const tag = href.replace('#tag-', '');
    console.log('tag from href of clickedElement:', tag);
    //metoda alternatywna
    // const tag = href.substring(5);

    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll('.post-tags a.active[href^="#tag-"]');
    console.log('all tag links with class active:', tagsActive);

    /* START LOOP: for each active tag link */
    for (let tagActive of tagsActive) {

      /* remove class active */
      tagActive.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const findTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log('all tag links with attr. "href" equal to const "href" constant:', findTags);

    /* START LOOP: for each found tag link */
    for(let findTag of findTags) {

      /* add class active */
      findTag.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    // ten selektor oznacza "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'".
    generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log('start generateTitleLinks with selector as argument:', tag);
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log('all links to tags:', tagLinks);

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors () {
    /*create a new variable allAuthors with an empty array */
    // let allAuthors = [];
    // console.log('array with authors', allAuthors);
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find authors wrapper */
      const author = article.querySelector(opt.articleAuthorSelector);
      author.innerHTML = '';
      console.log('Finded author wrapper:', author);

      /* make html variable with empty string */
      let authorHTML = '';

      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('author from attribute:', articleAuthor);

      let html = '';

      /* generate HTML of the link with author*/
      /* add generated code to html variable */
      // <li><a href="#articleId">articleTitle</a></li>
      authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      console.log('Link with author:', authorHTML);
      html = html + authorHTML;

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {
        /* [NEW] add author to allTags object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor] ++;
      }

      /* insert HTML of all the links into the authors wrapper */
      // author.innerHTML = authorHTML;
      author.innerHTML = html;

    /* END LOOP: for every article: */
    }

    console.log('object with authors', allAuthors);

    /* [NEW] find list of author in right column */
    const authorList = document.querySelector(opt.authorsListSelector);

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '</a>' + '(' + allAuthors[author] + ')</li>';
      console.log(allAuthorsHTML);
    }
    /* [NEW] END LOOP: for each author in allAuthors: */

    /*[NEW] add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
  }
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('author clickedElement:', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = this.getAttribute('href');
    console.log('get attribute href (author):', href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author:', author);

    /* find all author links with class active */
    // const authorsActive = document.querySelectorAll('.post-author a.active');
    const authorsActive = document.querySelectorAll('a[href^="#author-"]');
    console.log('all authors links with class active:', authorsActive);

    /* START LOOP: for each active author link */
    for (let authorActive of authorsActive) {

      /* remove class active */
      authorActive.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const findAuthors = document.querySelectorAll('.post-author a[href="' + href + '"]');
    console.log('all authors links with attr. "href" equal to const "href" constant:', findAuthors);

    /* START LOOP: for each found author link */
    for (let findAuthor of findAuthors) {

      /* add class active */
      findAuthor.classList.add('active');

    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
    console.log('start generateTitleLinks with selector as argument:', author);
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const links = document.querySelectorAll('a[href^="#author-"]');
    console.log('all links to authors:', links);

    /* START LOOP: for each link */
    for (let link of links) {

      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();

}
myBlog();
