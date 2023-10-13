const urlPageTitle = 'Green Waste';

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

const routes = {
  404: {
    page: '/pages/404.html',
    title: '404 | ' + urlPageTitle,
    description: 'page not found',
  },
  '/': {
    page: '/pages/index.html',
    title: 'Home | ' + urlPageTitle,
    description: 'This is the homepage',
  },
  '/solution': {
    page: '/pages/solution.html',
    title: 'Solution | ' + urlPageTitle,
    description: 'Page Solution',
  },
  '/forum': {
    page: '/pages/forum.html',
    title: 'Forum | ' + urlPageTitle,
    description: 'Page Forum',
  },
};

const handleLocation = async () => {
  const path = window.location.pathname;
  let links = document.querySelectorAll('#menu a');

  links.forEach(function (link) {
    let linkPath = link.getAttribute('href');

    if (path === linkPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const route = routes[path] || routes[404];
  const html = await fetch(route.page).then((res) => res.text());
  document.getElementById('content').innerHTML = html;

  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', route.description);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
