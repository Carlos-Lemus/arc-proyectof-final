import Swal from 'sweetalert2';

export const toastMessage = (icon, title, text) => Swal.fire(({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    icon,
    title,
    text,
}));

export const deleteMessage = (callback) => Swal.fire({
    title: '¿Estas seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2196F3',
    cancelButtonColor: '#E53935',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
}).then((result) => {
    if (result.isConfirmed) {
        callback();
    }
});