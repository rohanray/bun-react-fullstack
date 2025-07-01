import { AppRouter, Link } from "@/components/AppRouter";
import "./index.css";
import { Card, CardContent } from "@/components/ui/card";

const routes = [
  {
    path: '/',
    component: <div>Home</div>,
    title: 'Home',
  },
  {
    path: '/about-me',
    component: <div>About</div>,
    title: 'About Me',
  },
  {
    path: '/users',
    component: <div>Users</div>,
    title: 'Users',
  },
  {
    path: '/albums',
    component: <div>Albums</div>,
    title: 'Albums',
  },
  {
    path:'albums/:id/photos',
    component: <div>Album Photos of #id </div>,
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
  }
];

export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      asd
    </div>
  );
}

export default App;
