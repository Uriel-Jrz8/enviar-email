//variables
const form = document.querySelector('#enviar-mail');
const btnEnviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const reset = document.querySelector('#resetBtn');


eventListeners();
function iniciandoApp(){
    btnEnviar.disabled =true;
    btnEnviar.classList.add('cursor-not-llowed', 'opacity-50');
}

function eventListeners(){
    document.addEventListener('DOMContentLoaded',iniciandoApp);
    /* Campos de formulario */
    email.addEventListener('blur',validarForm);
    asunto.addEventListener('blur',validarForm);
    mensaje.addEventListener('blur',validarForm);
    reset.addEventListener('click',resetearForm);
    form.addEventListener('submit',enviarForm);
    
}

function validarForm(event){
    const expR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(event.target.value.length > 0){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        

        event.target.classList.remove('border', 'border-red-500');
        event.target.classList.add('border', 'border-green-500');

    }else{
        event.target.classList.remove('border', 'border-green-500');
        event.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos obligatorios');
    }
    
    if(event.target.type === 'email'){
        if(expR.test(event.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            event.target.classList.remove('border', 'border-red-500');
            event.target.classList.add('border', 'border-green-500');
        }else{
            event.target.classList.remove('border', 'border-green-500');
            event.target.classList.add('border', 'border-red-500'); 
            mostrarError('El email no es valido');
        }
    }

    if(expR.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled =false;
        btnEnviar.classList.remove('cursor-not-llowed', 'opacity-50');

    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','error');
    const error = document.querySelectorAll('.error');

    if(error.length === 0){
        form.appendChild(mensajeError);
    }   
}

function enviarForm(event){
    event.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display ='none';
        /* insertar mensaje donde esta el spinner */
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje Enviado';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white', 'font-bold', 'uppercase');
        form.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetearForm();
        },3000);
    }, 3000 );
}

function resetearForm(){
    form.reset();
    iniciandoApp();
}