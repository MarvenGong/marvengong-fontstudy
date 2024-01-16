import navConfig from './nav.config';

const load = function (path) {
  return (r) => require.ensure([], () => r(require(`./pages/${path}.vue`)));
};

const loadDocs = function (path) {
  return (r) => require.ensure([], () => r(require(`./docs${path}.md`)));
};

const registerRoute = (navConfig) => {
  const route = [
    {
      path: `/`,
      redirect: `/installation`,
      component: load('component'),
      children: []
    }
  ];
  navConfig.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addRoute(nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addRoute(nav);
      });
    } else {
      addRoute(nav);
    }
  });
  function addRoute (page) {
    const component = loadDocs(page.path);
    const child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang: 'zh-CN'
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    };

    route[0].children.push(child);
  }

  return route;
};

const route = registerRoute(navConfig);

export default route;
