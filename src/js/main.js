socialNetwork.initializeFirebase();
let db = firebase.firestore(); // Variable que inicializa Firestore


const logout = document.getElementById('logout').addEventListener('click', event => {
  firebase.auth().signOut();
  location.href = '../index.html';
});

const publicar = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const publishButton = document.getElementById('publish').addEventListener('click', event => { // Evento que detona el botón de 'publicar'
        event.preventDefault();
        let postDate = firebase.firestore.FieldValue.serverTimestamp();
        const contentPost = document.getElementById('publication-content').value;
        db.collection('post').add({ // En database, agrega una colección llamada 'post' que tiene los siguientes datos
          content: contentPost,
          date: postDate,
          userID: user.email,
          likes: []
        })
          .then(docRef => {
            console.log('Document written with ID: ', docRef.id);
            document.getElementById('publication-content').value = ''; // Este id vacía el contenido de la text area después de publicar.
            drawPost();
          })
          .catch(error => {
            console.error('Error adding document: ', error);
          });
      });
    } else {
      location.href = ('../index.html');
    }
  });
};

// Función para eliminar post
function deletePost(id) { // el parámetro id es el identificador del post
  db.collection('post').doc(id).delete().then(function() {
    console.log('Document successfully deleted!');
  }).catch(function(error) {
    console.error('Error removing document: ', error);
  });
};


const drawPost = () => {
  const postContainer = document.getElementById('publications'); // Este id es el contenedor que pinta las publicaciones.
  db.collection('post').onSnapshot((querySnapshot) => { // onSnapshot es un agente de escucha, que va a estar 'escuchando' cada que se haga un cambio en la base de datos.
    querySnapshot.forEach((doc) => { // Este forEach se va a ir repitiendo por cada documento que esté dentro de 'post'
    // console.log(`${doc.id} => ${doc.data()}`);
      postContainer.innerHTML += `<div class="card text-white bg-info" my-5 px-2>
                                   <div class="card-header" id= "${doc.id}">
                                     <h5> <i class="fas fa-user-circle"></i> ${doc.data().userID}</h5>
                                     <p>${doc.data().date}</p>
                                    </div>
                                    <div class="card-body">
                                      <h6 class="card-text">${doc.data().content}</h6>
                                    </div>
                                    <div class="card-footer mr-auto">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                       <button class="btn btn-info  float-right">
                                         <i class="fas fa-heart"></i> 0
                                       </button>
                                       <button class="btn btn-info float-right">
                                        <i class="fas fa-edit"></i> Editar
                                       </button>
                                       <button class="btn btn-info float-right" onclick ="deletePost('${doc.id}')">
                                        <i class= "fas fa-trash-alt"></i> Eliminar
                                       </button>
                                    </div>
                                   </div>
                                    <div class="card-footer mr-auto">
                                      <input id="comment" type="text"> 
                                      <button class="btn btn-info float-right" id="commenting"><i class="fas fa-comment-alt"></i></button>
                                      </div>
                                </div>
                                <br/>`;
    });
  });
};

publicar();
drawPost();