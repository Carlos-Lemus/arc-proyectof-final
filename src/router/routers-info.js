import Home from '../views/Home.vue';
import Report from '../views/Report.vue';
import Login from '../views/Login.vue'; 
import Users from '../views/users/Users.vue'
import UserCreateOrEdit from '../views/users/UserCreateOrEdit.vue'
import { isAuthorized } from '../helpers/is-authorized';

const routersInfo = {
      home: {
        path: '/',
        name: Home.name,
        component: Home,
        title: 'Home',
        // beforeEnter: isAuthorized,
      },
      login: {
        path: '/login',
        name: Login.name,
        component: Login,
        title: 'Iniciar Sesion',
        beforeEnter: isAuthorized,
      },
      reports: {
        path: '/report',
        name: Report.name,
        component: Report,
        title: 'Informe',
        beforeEnter: isAuthorized,
      },
      users: {
        path: '/users',
        name: Users.name,
        component: Users,
        title: 'Listas de Usuarios',
        beforeEnter: isAuthorized,
      },
      usersCreate: {
        path: '/users/create',
        name: 'UserCreate',
        component: UserCreateOrEdit,
        title: 'Crear Usuario',
        beforeEnter: isAuthorized,
      },
      usersEdit: {
        path: '/users/:id/edit',
        name: 'UserEdit',
        component: UserCreateOrEdit,
        title: 'Editar Usuario',
        beforeEnter: isAuthorized,
      },


}

export default routersInfo;