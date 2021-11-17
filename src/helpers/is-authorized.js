import store from '../store';

export function isAuthorized(to, from, next) {

    const user = store.getters.user;
    // console.log(store.getters['user'])
    // console.log(store.state.user)
    if(user) {
        if (to.path.includes('users') && user.role.name !== 'Administrador') {
            return next('/');
        }

        if (to.path.includes('login')) {
            return next('/report');
        }
    }


    next();
}
