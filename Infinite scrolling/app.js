'use strict';

// select element
const formInput = document.querySelector('.form__input');
const blogPosts = document.querySelector('.blog');
const loaderContainer = document.querySelector('.loader__container');
const errorContanier = document.querySelector('.error');
const errorMessage = document.querySelector('.error__message');

// state variables
let currentPage = 1;
let totalPosts = 0;
const limits = 5;

const renderErrorMessage = function (error) {
  // 1) the hide-error class from error message container
  errorContanier.classList.remove('hide-error');

  // 2) set the error message as text into errorMessage element
  errorMessage.textContent = error.message;

  // 3) add the hide-error class to the error message container
  setTimeout(() => {
    errorContanier.classList.add('hide-error');
  }, 2000);
};

// get the length of the posts
const getPostsLength = async function () {
  try {
    // 1) store the API URL in a varible
    const API_URL = `https://jsonplaceholder.typicode.com/posts`;

    // 2) pass the url into fetch function to request for an api call
    const res = await fetch(API_URL);

    // 3) throw an error if the respond.ok is false
    if (!res.ok)
      throw new Error(`Failed to get post length, status (${res.status})`);

    // 4) convert the api request into json format
    const data = await res.json();

    // 5) return the data length when the getPostsLength is called
    return data.length;
  } catch (err) {
    throw err;
  }
};

// get the posts from an api
const getPosts = async function (page, limit) {
  try {
    // 1) store the API URL in a variable
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;

    // 2) pass the url into fetch function to request for an api call
    const res = await fetch(API_URL);

    // 3) throw an error if the respond.ok is false
    if (!res.ok)
      throw new Error(`Failed to get the post, status (${res.status})`);

    // 4) convert the api request into json format
    const data = await res.json();

    // 5) return the data when getPosts is called
    return data;
  } catch (err) {
    throw err;
  }
};

// generate html markup for each of the post
const generateHtmlMarkup = function (posts) {
  // 1) check if the posts exist or not
  if (!posts) return;

  // 2) loop through the posts and generate html markup
  const postHtmlMarkup = posts
    .map(post => {
      const markup = `
      <div class="blog__content">
        <p class="blog__id">${post.id}</p>
        <h2 class="heading--2 blog__title">
          ${post.title}
        </h2>
        <p class="blog__article">
          ${post.body}
        </p>
      </div>
    `;
      return markup;
    })
    .join('');

  // 3) insert the markup to the dom
  blogPosts.insertAdjacentHTML('beforeend', postHtmlMarkup);
};

// check if there is still more posts
const hasMorePosts = function (page, limit, total) {
  // get the start index of the post
  const startIndex = (page - 1) * limit + 1;

  // return a boolean variable to check if there is more posts
  return total === 0 || startIndex < total;
};

// show the loader
const showLoader = () => {
  loaderContainer.classList.remove('hidden');
};

// hide the loader
const hideLoader = () => {
  loaderContainer.classList.add('hidden');
};

// render the post to the user interface
const renderPost = async function (page, limit) {
  try {
    // 1) show the loader
    showLoader();

    // 2) before getting data from the api, check if there is still more posts to fetch
    if (hasMorePosts(page, limit, totalPosts)) {
      // store the posts received from getPosts function in a variable
      const data = await getPosts(page, limit);

      // pass the data received as an arguement to generateHtmlMarkup
      generateHtmlMarkup(data);

      // pass the length of the total posts to the total parameter
      totalPosts = await getPostsLength();
    }
  } catch (err) {
    renderErrorMessage(err);
  } finally {
    // 3) hide the loader
    hideLoader();
  }
};

//
window.addEventListener('scroll', function () {
  /**
   1) document.documentElement is the root element in our html. html element is the root element.

  2) get the scrollTop, scrollHeight and clientHeight number from the root element.

  3) scrollTop properties is the number of pixels the user scroll vertically from the top of the page to where the page ends.

  4) scrollHeight is the entire height of the page

  5) clientHeight is the view port height of a page e.g the hieght of the clientHeight will be different in mobile phone compare to tablet.

   */
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // check if the horizontal scrollbar have reach the bottom and check if there is more posts
  if (
    scrollTop + clientHeight >= scrollHeight - 5 &&
    hasMorePosts(currentPage, limits, totalPosts)
  ) {
    // increase the currentPage is the condition are met
    currentPage++;

    // render the posts to the user interface
    renderPost(currentPage, limits);
  }
});

// render the post when the page load
renderPost(currentPage, limits);

// filter posts function
const filterPost = function (e) {
  // 1) store the user input to a variable and convert it to uppercase
  const inputValue = e.target.value.toUpperCase();

  // 2) select all the blog content element
  const blogContents = document.querySelectorAll('.blog__content');

  // 3) convert it to an array and loop through it to select all blog title and blog article element
  Array.from(blogContents).forEach((blogContent, i) => {
    // 4) select all blog title and blog article
    const blogTitles = document.querySelectorAll('.blog__title');
    const blogArticles = document.querySelectorAll('.blog__article');

    // 5) loop though both blog titles and blog articles to get all the text and convert it to uppercase
    const blogTitle = blogTitles[i].textContent.toUpperCase();
    const blogArticle = blogArticles[i].textContent.toUpperCase();

    // 6) check if the user input exit in both the blog title and blog article
    if (
      blogTitle.indexOf(inputValue) > -1 ||
      blogArticle.indexOf(inputValue) > -1
    ) {
      // 7) display the blog content that meet the condition
      blogContent.style.display = 'block';
    } else {
      // 8) hide the blog content that does not meet the condition
      blogContent.style.display = 'none';
    }
  });
};

// filter the posts
formInput.addEventListener('input', filterPost);
