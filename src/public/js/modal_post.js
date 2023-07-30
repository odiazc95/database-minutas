function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function confirmSignature() {
    const matricula = document.getElementById('matriculaInput').value;
    const rfc = document.getElementById('rfcInput').value;
    const data = {
        matricula: matricula,
        rfc: rfc
    };
    fetch('/dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la petición');
            }
        })
        .then(data => {
            if (data.auth) {
                // Usuario autenticado
                Swal.fire({
                    title: 'Se firmó el documento',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '/dashboard';
                });
            } else {
                // Error de autenticación
                Swal.fire({
                    title: 'Error',
                    text: data.error || 'No se pudo autenticar el usuario',
                    icon: 'error'
                });
            }
        })
        .catch(error => {
            console.error('Error en la petición:', error);
            // Mostrar error genérico
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error en la solicitud',
                icon: 'error'
            });
        });
    closeModal();
}
