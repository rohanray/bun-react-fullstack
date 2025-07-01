import { AppRouter, Link } from "@/components/AppRouter";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import "./index.css";
import HomePage from "@/pages/HomePage";
import { AlbumsTablePage } from "@/pages/albums/AlbumsTablePage";

const routes = [
  {
    path: '/',
    component: <HomePage />,
    title: 'Home',
  },
  {
    path: '/about-me',
    component: <div>Someday!</div>,
    title: 'About Me',
  },
  {
    path: '/users',
    component: <div>Users</div>,
    title: 'Users',
  },
  {
    path: '/albums/:id',
    component: <AlbumsTablePage />,
    title: 'Albums',
  },
  {
    path: '/albums/:id/photos',
    component: <div>Album Photos of #id </div>,
    title: 'Album Photos',
  },
  {
    path: '/photos',
    component: <div>Photos</div>,
    title: 'Photos',
  },
  {
    path: '/posts',
    component: <div>Posts</div>,
    title: 'Posts',
  },
  {
    path: '/todos',
    component: <div>Todos</div>,
    title: 'Todos',
  },
  {
    path: '/comments',
    component: <div>Comments</div>,
    title: 'Comments',
  }
];

const navLinks = [
   {
    path: '/',
    component: <HomePage />,
    title: 'Home',
  },
  // {
  //   path: '/about-me',
  //   component: <div>Someday!</div>,
  //   title: 'About Me',
  // },
  {
    path: '/users',
    component: <div>Users</div>,
    title: 'Users',
  },
  {
    path: '/albums/1?page=1&limit=10',
    component: <AlbumsTablePage />,
    title: 'Albums',
  },
  // {
  //   path: '/albums/:id/photos',
  //   component: <div>Album Photos of #id </div>,
  //   title: 'Album Photos',
  // },
  {
    path: '/photos',
    component: <div>Photos</div>,
    title: 'Photos',
  },
  {
    path: '/posts',
    component: <div>Posts</div>,
    title: 'Posts',
  },
  {
    path: '/todos',
    component: <div>Todos</div>,
    title: 'Todos',
  },
  {
    path: '/comments',
    component: <div>Comments</div>,
    title: 'Comments',
  }
]

const NavBar = () => (
  <NavigationMenu className=" max-w-7xl my-4 mx-auto">
    <NavigationMenuList>
      {navLinks.map(nl => (
        <NavigationMenuItem key={nl.path}>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={nl.path} className="navigation-menu-link mr-4 text-blue-600" >
              {nl.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export function App() {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto">
        <AppRouter routes={routes} defaultRoute="/" />
      </main>
    </>
  );
}

export default App;
