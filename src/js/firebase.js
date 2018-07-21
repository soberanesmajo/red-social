// Para autenticar con correo y contraseña

// Inicializar Firebase
const config = {
  apiKey: 'AIzaSyC9JZpmKLPBvfy3FN6n-HeHJ8g1ncj_xFM',
  authDomain: 'red-social-98290.firebaseapp.com',
  databaseURL: 'https://red-social-98290.firebaseio.com',
  projectId: 'red-social-98290',
  storageBucket: 'red-social-98290.appspot.com',
  messagingSenderId: '186702904423'
};
firebase.initializeApp(config);

const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('log-in');
const signup = document.getElementById('sign-up');
const logout = document.getElementById('log-out');

// Agregar evento para el botón de inicio de sesión
login.addEventListener('click', event => {
// Obtenemos valor de email y password
  const emailValue = email.value;
  const passwordValue = password.value;
  const auth = firebase.auth();
  // Para iniciar sesión 
  const promise = auth.signInWithEmailAndPassword(emailValue, passwordValue);
  promise.catch(event => console.log(event.message));
});

// Añadiendo el evento del botón de registrarse

signup.addEventListener('click', event => {
  const emailValue = email.value;
  const passwordValue = password.value;
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(emailValue, passwordValue);
  promise.catch(event => console.log(event.message));
});

// Botón para cerrar sesión

logout.addEventListener('click', event => {
  firebase.auth().signOut();
}); 

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser); // Este "console.log" es para verificar que se esté guardando la info de usuario.
  } else {
    console.log('not logged in');
    logout.classList.add('hide');
  } 
});

// Para autenticar con google

const provider = new firebase.auth.GoogleAuthProvider();
const loginGoogle = document.getElementById('login-google');

loginGoogle.addEventListener('click', event => {
  firebase.auth()
    .signInWithPopup(provider) // popUp te va a dar la ventana de acceso a tu cuenta de google. parámetro de la variable provider que tiene la autenticación con google
    
    .then(function(provider) { // entonces ejecuta la función que es el resultado (acceder con google)
      // console.log(result);
      // console.log(provider);
    });
});