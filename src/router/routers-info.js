import Home from '../views/Home.vue';
import Informe from '../views/Informe.vue';
import Login from '../views/Login.vue'; 
import AddUser from '../views/AddUser.vue'

const routersInfo = {
      home: {
        path: '/',
        name: 'Home',
        component: Home
      },
      about: {
        path: '/informe',
        name: 'Informes',
        component: Informe
      },
      login: {
        path: '/login',
        name: 'Login',
        component: Login
      },
      adduse: {
        path: '/users',
        name: 'Usuarios',
        component: AddUser
      },


}

export default routersInfo;