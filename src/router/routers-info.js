import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routersInfo = {
    home: {
        path: '/',
        name: 'Home',
        component: Home
      },
      about: {
        path: '/',
        name: 'About',
        component: About
      },
}

export default routersInfo;