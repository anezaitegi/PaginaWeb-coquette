/*  1.- Primer paso crear muchas funciones.(en proceso)
    2.- Luego intentar leer toda la informacion desde el API de peliculas (listo)
    3.- Intentar usar solo un js (falta)
    4.- Una vez que tenga todas las peliculas con la informacion sacada desde la API o parseo de json 
    realizar detalles con js, como botones, animaciones o etc. ( a medias)
    5.- Tambien arreglar detalles como arreglar el menu de movil que funciona pero se repite codigo. (falta)
    6.- Ver sino tambien se puede tomar el mismo codigo en todas las paginas de html que se repiten como en el header/footer. ( no se si lo hare)
    7.- Al intentar cambiar todas las peliculas de las paginas en una sola pagina PELICULAS--> tendria que cambiar la pelicula principal 
    en el CSS, o dejo una sola. COMO UNA PORTADA. (REalizado)
    8.- Falta hacer que las paginas html esten relacionadas con el boton ( quizas no usa un onclick o quizas deba usar un solo js para que lo tome?)
    9.- Me falta filtrar los titulos por generos ${genero: generogetid()}(por ejemplo)(listo)
    10.- arreglar los links de youtube, ver si los dejo o no,(listo)
    11.- ver si la api me pasa peliculas espeicificas para usar en el grid o en la lista de peliculas de màs abajo (listo)
    12.- hacer que la pagina web traiga informacion desde la base de datos (falta)
    13.- Podria hacer otra pagina de estrenos. hare una pagina de login tamnbien( pagina mejorada de estrenos)
    14.- hacer el login con conexion a bbdd y la direccion de los cines. ( me falta hacer bien la pagina logeado)
    15.- realizar el unico js y ver que funciones me funcionan y porque no me funciona ( me funciona con index y peliculas.html)
    16.- los botones de compra obtienen el id al hacer click. AHORA necesito hacer que me redijan a otro html y creen la informacion desde ahi 
            tendria que hacer todo en este js pero uhhhhhhh me complico la vida sola.



    GENERO ID DE TMBD: https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
    */

// intento de hacer fetch await con el TMDB.( la pagina no lo trae pero a ver si funciona.)
// funciona super bien la API DE TMBD. EN ESPAÑOL, podria pasar toda la pagina web usando api
// GENEROS ID TMBD: https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
// EL TEMA ES QUE SON LAS PELICULAS POPULARES---> me sirve para proximos estrenos.
// necesito ver como sacar las imagenes porque estan en un jpg pero no se de donde los sacaran
// ya encontre la solucion, https://www.themoviedb.org/talk/5aeaaf56c3a3682ddf0010de
// esta seria la ruta entera: https://image.tmdb.org/t/p/original/pWsD91G2R1Da3AKM3ymr3UoIfRb.jpg
// esta seria la ruta sola sin https://image.tmdb.org/t/p/original(supongo que va cambiando la id o cosas asi en la informacion o la ruta o etc?) supongo que yo me entiendo.





// peliculas llamada a las peliculas populares del api
async function fetchPopularMovies() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzgyZDhhODFkYjgzYTNjNDUwNjIxNDkzMzVmNGZjMCIsInN1YiI6IjY1YmI2ODFjZjAzMTc0MDE3YzY3OWQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tv7XQu-LlSPMXh1-0uNmH14X0w-L7hZuZVPd4xOsUVk'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        currentPage(data);

        // Guardar los IDs de todas las películas en el localStorage
        if (data && data.results && data.results.length > 0) {
            for (let i = 0; i < data.results.length; i++) {
                saveMovieId(data.results[i].id);
            }

        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// llamada a las peliculas por id a la api, //la llamada funciona//

async function fetchMovieId(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=es-ES&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzgyZDhhODFkYjgzYTNjNDUwNjIxNDkzMzVmNGZjMCIsInN1YiI6IjY1YmI2ODFjZjAzMTc0MDE3YzY3OWQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tv7XQu-LlSPMXh1-0uNmH14X0w-L7hZuZVPd4xOsUVk'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);


    } catch (error) {
        console.error('Error:', error);
    }
}

// guardar el id en el localstorage // idPeliculaSeleccionada es el nombre que le doy a la lista objeto json
// todavia no se porque me filtra la pelicula orio. no se de donde toma el item.

function saveMovieId(movieId) {
    localStorage.setItem('idPeliculaSeleccionada', movieId);
    console.log('ID de la película guardado en localStorage:', movieId);
   // usar el window href no me funciona correctamente, quizas me falta mejorar la pagina de ticket para que tome el id en el localstorage

}

// Función para obtener el ID de la película desde el localStorage
function getIDMovie() {
    return localStorage.getItem('idPeliculaSeleccionada');
}

// filtrar peliculas por genero, pasar parametro genero-id, se llama a la api para tener generos especificos
async function filterByGenre(genre_id) {
     // Desplazar hacia arriba cada vez que se aprete el genero.
     window.scrollTo({ top: 0, behavior: 'smooth' });

    const url = `https://api.themoviedb.org/3/discover/movie?language=es-ES&with_genres=${genre_id}&sort_by=popularity.desc`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzgyZDhhODFkYjgzYTNjNDUwNjIxNDkzMzVmNGZjMCIsInN1YiI6IjY1YmI2ODFjZjAzMTc0MDE3YzY3OWQ2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tv7XQu-LlSPMXh1-0uNmH14X0w-L7hZuZVPd4xOsUVk'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        /*: filtra las películas según si el genre_id especificado está incluido en el array genre_ids de cada película.
         El resultado se almacena en la variable filteredMovies
         includes es una funcion/libreria de JS e igual FILTER/filtrar.*/
        const filteredMovies = data.results.filter(movie => movie.genre_ids.includes(genre_id));

        //const backgroundImageUrl = data.backdrop_path;


        // filtrar,(retornar la copia de un arreglo desde el indice del inicio hasta el penúltimo final, excluyendo el final)
        // esta filtrando cuando se elige el género en el menú y se filtra por consola
        console.log(filteredMovies.slice(0, 10));
        renderMovies(filteredMovies.slice(0, 10));
        // luego se llama a la funcion que crea las peliculas por genero
        renderGenrerMovies(filteredMovies, genre_id);

        console.log("obtuve las peliculas de genero: ");

    } catch (error) {
        console.error('Error:', error);
    }
}

// llama a la funcion que crea index.html
function indexPage(data) {
    if (data && data.results) {
        renderIndex(data.results);
    }
}

// llama a la funcion que crea peliculas.html
function peliculasPage(data) {
    if (data && data.results) {
        renderMovies(data.results);
    }
}

// llama a la funcion que crea tickets.html
// function ticketsPage(data) {
//     if (data && data.results) {
//         renderMovieTicket(data.results);
//     }
// }

// verifica que elementos crear en que html
async function currentPage(data) {
    const path = window.location.pathname;
    console.log(path);
    console.log("obtengo los datos de: ", data);
    if (path === "/src/index.html" || path === "/src/" || path === "/index.html" || path === "/") {
        indexPage(data);
    } else if (path === "/src/peliculas.html" || path === "/peliculas.html") {
        peliculasPage(data);
    } 

}
// funcion diccionario para saber cuales son los generos usando los id de la api
function getGenreByID(id) {
    // Diccionarrio (en js):
    // Llave: valor
    const genres = {
        28: "Acción",
        12: "Aventura",
        16: "Animación",
        35: "Comedia",
        80: "Crimen",
        99: "Documental",
        18: "Drama",
        10751: "Familia",
        14: "Fantasía",
        36: "Historia",
        27: "Terror",
        10402: "Música",
        9648: "Misterio",
        10749: "Romance",
        878: "Ciencia Ficción",
        10770: "Película de TV",
        53: "Thriller",
        10752: "Guerra",
        37: "Western"
    };

    return genres[id]; // le doy un id como llave y me da un genero como valor

}
// funcion para adultos o no
function getClasification(isAdult) {
    if (isAdult) {
        return "Apto para mayores de 18";
    }

    return "Apto para todo público";
}

//////pagina peliculas //////////

// funcion crear (contenedores) pelicula(s)
function createMovieElement(movie) {
    // contenedor principal
    const peliculaContainer = document.createElement("div");
    peliculaContainer.className = "peliculas-container";
    peliculaContainer.innerHTML = `<br>`;

    // contenedor especifico (cada pelicula)
    const peliculaMini = document.createElement("div");
    peliculaMini.className = "pelicula-mini borde-top";

    // dentro de cada contenedor 
    const caratula = document.createElement("div");
    caratula.className = "caratula";
    const imagen = document.createElement("img");
    imagen.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    imagen.alt = `Carátula de la película ${movie.title}`;
    caratula.appendChild(imagen);
    const containerBoton = document.createElement("div");
    containerBoton.className = "container-buttom";
    const form = document.createElement("form");
    const botonTrailer = document.createElement("button");
    // arreglar esto sino que no vaya a ningun lado.
    botonTrailer.setAttribute("formaction", "https://youtu.be/"); // ver que hago con el link? como podria pasarlo. o sino no lo hago funcional.
    botonTrailer.setAttribute("formtarget", "_blank");
    // i = imagen "play" dibujo vectorizado
    botonTrailer.innerHTML = `<i class="fa-regular fa-circle-play" style="color: #fcfcfc;"></i> Trailer`;
    form.appendChild(botonTrailer);
    containerBoton.appendChild(form);
    // contenedor resumen
    const containerResumen = document.createElement("div");
    containerResumen.className = "container-resumen width-100";
    const resumen = document.createElement("div");
    resumen.className = "resumen";
    // split para separar la fecha y solo colocar la primera posicion(año)
    resumen.innerHTML = `<h2>${movie.title} (${movie.release_date.split("-")[0]})</h2>
        <br>
        <p>${movie.overview}</p>`;
    // contenedor duracion-adulto-genero-boton ticket
    const duracionTicket = document.createElement("div");
    duracionTicket.className = "duracion-ticket";
    // duracion ticket tiene dos contenedores grandes: duracion y boton ticket.
    // dentro de duracion: duracionTiempo-ADULTO-GENEROS
    const duracion = document.createElement("div");
    duracion.className = "duracion";
    duracion.innerHTML = "<br>";
    // duracion no lo estoy usando todavia
    const duracionTiempo = document.createElement("h3");
    duracionTiempo.innerHTML = "Duración: X";
    // ADULTO o no --> crear
    const duracionEdad = document.createElement("h3");
    duracionEdad.innerHTML = `${getClasification(movie.adult)}`;

    //duracion.appendChild(duracionTiempo);

    const generosPelicula = movie.genre_ids;
    generosPelicula.forEach(genero => {
        const generoBox = document.createElement("div");
        generoBox.className = "borde-genero";
        generoBox.innerHTML = `<h4>${getGenreByID(genero)}</h4>`;
        duracion.appendChild(generoBox);
    });
    // ADULTO O NO --> insertar
    duracion.appendChild(duracionEdad);
    // BOTON tickets.
    const mainSection = document.createElement("div");
    mainSection.className = "main-section";
    const firstButton = document.createElement("button");
    firstButton.className = "first-button";
    firstButton.innerHTML = `¡ Tickets ! <i class="fa-solid fa-ticket"></i>`;
    const secondButton = document.createElement("button");
    secondButton.className = "second-button";
    secondButton.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="#ffd300" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> Compra Ahora!`;
    secondButton.onclick = function() {  
        saveMovieId(movie);  // me funciona obtener el id por localstorage con el boton
    };
    // contenedor de caratula y boton de trailer
    const caratulaDiv = document.createElement("div");
    caratulaDiv.appendChild(caratula);
    caratulaDiv.appendChild(containerBoton);
    // otros contenedores 
    peliculaMini.appendChild(caratulaDiv);
    peliculaMini.appendChild(containerResumen);
    resumen.appendChild(duracionTicket);
    duracionTicket.appendChild(duracion);
    duracionTicket.appendChild(mainSection);
    mainSection.appendChild(firstButton);
    mainSection.appendChild(secondButton);
    containerResumen.appendChild(resumen);
    peliculaContainer.appendChild(peliculaMini);
    // cada div pelicula grande para asignarle width100.
    const peliculaDiv = document.createElement("div");
    peliculaDiv.className = "width-100";
    peliculaDiv.appendChild(peliculaContainer);

    // el return me devuelve una pelicula creada(width100nombrediv)
    return peliculaDiv;
}

/* tengo que vaciar el contenido despues de llamar al div main, crear los elementos
dejarlos fuera del for, asi el for no itera.
*/
// funcion mostrar/renderizar los elementos en la pagina
function renderMovies(movies) {
    // tomo mi main
    const peliculasContainer = document.getElementById("peliculas-div");

    // si encuentro peliculas-div:
    if (peliculasContainer) {
        peliculasContainer.innerHTML = "";
        // lo importante es que rendermovies deje vacio luego de insertar la pelicula principal.
        // con un innerHTML = "", lo dejamos vacio para que resetee, porque sino cada vez que apreto el menu,
        // se van agregando peliculas a la lista pero sin resetearse.

        // crear div principal (poster)
        const peliculaPrincipal = document.createElement("div");
        peliculaPrincipal.className = "principal";
        peliculaPrincipal.id = "pagterror";// mantendre el id (ver si lo uso)

        const contenedorPrincipal = document.createElement("div");
        contenedorPrincipal.className = "contenedor";

        const tituloPrincipal = document.createElement("h1");
        tituloPrincipal.className = "titulo";
        tituloPrincipal.innerText = movies[1].title;// solo ocupare la primera posicion de la lista (pelicula)

        const descripcionPrincipal = document.createElement("h3");
        descripcionPrincipal.innerText = movies[1].overview;// solo ocupare la primera posicion de la descripcion

        // crear los botones que van dentro( sin funcionalidad)
        const botonesPrincipal = document.createElement("div");
        botonesPrincipal.className = "botones";

        // con innerTEXT no me agregaba los iconos sino el codigo. tuve que utilizar innerHTML.
        // --> https://www.freecodecamp.org/news/innerhtml-vs-innertext-vs-textcontent/

        const botonEntradas = document.createElement("button");
        botonEntradas.className = "boton";
        botonEntradas.innerHTML = '<i class="fa-solid fa-ticket"></i>¡Compra ya tus entradas!';

        const botonInfo = document.createElement("button");
        botonInfo.className = "boton";
        botonInfo.innerHTML = '<i class="fas fa-info-circle"></i>Más información';
        botonInfo.onclick = function() {
            window.location.href = 'tickets.html?id=' + movies[1].id;
            console.log('tickets.html?id=' + movies[1].id); // me pasa el id por la url pero me tira otra pelicula diferente
          };

        botonesPrincipal.appendChild(botonEntradas);
        botonesPrincipal.appendChild(botonInfo);
        contenedorPrincipal.appendChild(tituloPrincipal);
        contenedorPrincipal.appendChild(descripcionPrincipal);
        contenedorPrincipal.appendChild(botonesPrincipal);
        peliculaPrincipal.appendChild(contenedorPrincipal);
        peliculasContainer.appendChild(peliculaPrincipal);

        // para manejar el CSS desde el JS se le ponge.style.
        peliculaPrincipal.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movies[1].backdrop_path}')`;

        // el titulo de cada pagina( me falta poder asignarle el genero. solo si puedo sino no )
        const tituloMasVistos = document.createElement("div");
        tituloMasVistos.className = "titulo";
        const h1MasVistos = document.createElement("h1");
        h1MasVistos.textContent = "¡ Disfruta de nuestra cartelera !";
        tituloMasVistos.appendChild(h1MasVistos);
        peliculasContainer.appendChild(tituloMasVistos);


        /*COMO USAR EL FOR EACH: 
        ARREGLO.PorCadaElemento( variable_de_iteracion(nombre que le di)
        => { hacer algo})*/

        // si quiero que la primera pelicula usada en el poster principal no aparezca abajo 
        // puedo usar un slice(1) ---> movies.slice(1).forEach(movie => {});
        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            peliculasContainer.appendChild(movieElement);
        });
    }
}
// que quiero que haga primero
// que al hacer click tome el id y me redirija a otro html y me guarde ese id en el localstorage
// podre usar la mismo funcion de arriba que guarda las id ?


////// pagina index ////////////////

// mostrar peliculas por un genero especifico, se llama a la funcion crear 4 y se crean 4 cartas por genero (0-4 posiciones array)

function renderGenrerMovies(movies, genero) {
    const imagengrid = document.getElementById("main-estrenos");

    if (imagengrid) {
        const containerPelis = document.createElement("div");
        containerPelis.className = "width-100 contenedor";

        const tituloGenero = document.createElement("div");
        tituloGenero.className = "titulo";
        const h1titulogenero = document.createElement("h1");
        h1titulogenero.textContent = "Los más vistos en: " + getGenreByID(genero);
        tituloGenero.appendChild(h1titulogenero);
        imagengrid.appendChild(tituloGenero);

        movies.slice(0, 4).forEach(movie => {
            createCARD(movie, containerPelis);
            console.log("agregadas peliculas genero x:");
        });
        imagengrid.appendChild(containerPelis);
    }
}

// funcion crea 1 carta por cada pelicula, 
// se pasa como parametro el lugar donde iran insertadas cada tarjeta (containerPelis)
// containerPelis está declara en renderGenrerMovies.
function createCARD(movie, containerPelis) {

    // Poner peliculas por genero:

    // 1.Obtener arreglo de peliculas del Genero Horror
    // 2.Poner titulo: Lo más visto en horror
    // 3.Hacer un foreach que ponga una tarjeta por cada pelicula 

    // Repetir para los demás generos

    // carta individual 

    const card = document.createElement("div");
    card.className = "carta";

    const cardImg = document.createElement("img");
    cardImg.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    cardImg.alt = `Carátula de la película ${movie.title}`;
    card.appendChild(cardImg);

    const description = document.createElement("div");
    description.className = "descripcion";
    description.innerHTML = `<h3>${movie.title}</h3><br><p>Género: ${getGenreByID(movie.genre_ids[0])}</p>`;
    card.appendChild(description);

    containerPelis.appendChild(card);

}

//funcion crear el index //
//es asincrona porque filtra los generos de peliculas y una vez cargados los generos los renderiza en el index
async function renderIndex(movies) {

    // se toma el id del main
    const containerIndex = document.getElementById("main-estrenos");
    console.log(containerIndex);
    containerIndex.innerHTML = "";

    // se crea pelicula/backdrop principal index.
    const peliculaPrincipal = document.createElement("div");
    peliculaPrincipal.className = "principal";
    peliculaPrincipal.id = "pagterror";// mantendre el id (ver si lo uso)

    const contenedorPrincipal = document.createElement("div");
    contenedorPrincipal.className = "contenedor";

    const tituloPrincipal = document.createElement("h1");
    tituloPrincipal.className = "titulo";
    tituloPrincipal.innerText = movies[0].title;// solo ocupare la primera posicion de la lista (pelicula)
    //tituloPrincipal.style.color = "black";

    const descripcionPrincipal = document.createElement("h3");
    descripcionPrincipal.innerHTML = movies[0].overview;// solo ocupare la primera posicion de la descripcion

    // crear los botones que van dentro( sin funcionalidad)
    const botonesPrincipal = document.createElement("div");
    botonesPrincipal.className = "botones";

    // con innerTEXT no me agregaba los iconos sino el codigo. tuve que utilizar innerHTML.
    // --> https://www.freecodecamp.org/news/innerhtml-vs-innertext-vs-textcontent/

    contenedorPrincipal.appendChild(tituloPrincipal);
    contenedorPrincipal.appendChild(descripcionPrincipal);
    peliculaPrincipal.appendChild(contenedorPrincipal);
    containerIndex.appendChild(peliculaPrincipal);

    // para manejar el CSS desde el JS se le ponge.style.
    peliculaPrincipal.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movies[0].backdrop_path}')`;

    // el titulo de cada pagina( me falta poder asignarle el genero. solo si puedo sino no )
    const tituloMasVistos = document.createElement("div");
    tituloMasVistos.className = "titulo";
    const h1MasVistos = document.createElement("h1");
    h1MasVistos.textContent = " ! Próximos estrenos !";
    tituloMasVistos.appendChild(h1MasVistos);
    containerIndex.appendChild(tituloMasVistos);


    // aqui empieza el grid
    const container_grid = document.createElement("div");
    container_grid.className = "container-img";

    movies.slice(0, 7).forEach(imagen => {

        const boxImg = document.createElement("div");
        boxImg.className = "box-img";
        const figure1 = document.createElement("figure");
        figure1.className = "width-100";
        const img = document.createElement("img");
        img.className = "width-100";
        img.src = `https://image.tmdb.org/t/p/original${imagen.backdrop_path}`; // como ejemplo.
        img.alt = `Carátula de la película ${imagen.title}`;

        figure1.appendChild(img);
        boxImg.appendChild(figure1);
        container_grid.appendChild(boxImg);
    });
    containerIndex.appendChild(container_grid);
    console.log("Tarjetas de películas agregadas al DOM");


    await Promise.all([
        filterByGenre(27),
        filterByGenre(18),
        filterByGenre(35),
        filterByGenre(878)
    ]);

    //default ( funcion para insertar al final del dom el elemento desde js obligatoriamente)
    containerIndex.insertAdjacentHTML('beforeend', `
            <div class="apartado3">
                <div class="titulo">
                    <h1>¿ NO ERES PARTE DEL CLUB DE SOCIOS ?</h1>
                </div>
                <div class="texto">
                    <h2>¡Únete al Club de Socios Cine Usurbil y Descubre un Mundo de Experiencias Cinematográficas
                        Exclusivas!</h2>
                    <h2>En Cine Usurbil, valoramos a nuestros apasionados amantes del cine, y para mostrar nuestro
                        agradecimiento, hemos creado el Club de Socios Cine Usurbil, un espacio exclusivo dedicado a
                        brindarte experiencias únicas y beneficios especiales.</h2>
                </div>
                <div>
                    <div class="imagen">
                        <img src="img/postersocios.png" alt="Imagen Socios" title="Cine Usurbil">
                    </div>
                </div>
            </div>`);
}

// funcion que crea renderiza pag tickets

// function renderMovieTicket(movie) {
//     const pagTicket = document.getElementById("main-tickets");

//     if (pagTicket) {
//         pagTicket.innerHTML = ""; // quiza tenga que borrarlo


//         const movieId = getIDMovie();
//         if (!movieId) {
//             console.error("No se encontró ninguna película guardada en localStorage.");
//             return;
//         }

//         // Obtener los datos de la película utilizando el ID
//         const movieData = fetchMovieId(movieId);

//         // crear el poster principal de la pelicula 
//         // queria tomar los elementos del html pero creo que se me hace más dificil de esa manera 
//         // que crearlos directamente con el js ( quizas es mala practica no lo se)

//         const peliculaPrincipal = document.createElement("div");
//         peliculaPrincipal.className = "principal";
//         peliculaPrincipal.id = "pagterror";// mantendre el id (ver si lo uso)

//         const contenedorPrincipal = document.createElement("div");
//         contenedorPrincipal.className = "contenedor";

//         const tituloPrincipal = document.createElement("h1");
//         tituloPrincipal.className = "titulo";
//         tituloPrincipal.innerText = movie.title;// solo ocupare la primera posicion de la lista (pelicula)

//         const descripcionPrincipal = document.createElement("h3");
//         descripcionPrincipal.innerText = movie.overview;// solo ocupare la primera posicion de la descripcion

//         // crear los botones que van dentro( sin funcionalidad)
//         const botonesPrincipal = document.createElement("div");
//         botonesPrincipal.className = "botones";

//         // con innerTEXT no me agregaba los iconos sino el codigo. tuve que utilizar innerHTML.
//         // --> https://www.freecodecamp.org/news/innerhtml-vs-innertext-vs-textcontent/

//         const botonEntradas = document.createElement("button");
//         botonEntradas.className = "boton";
//         botonEntradas.innerHTML = '<i class="fa-solid fa-ticket"></i>¡Compra ya tus entradas!';

//         const botonInfo = document.createElement("button");
//         botonInfo.className = "boton";
//         botonInfo.innerHTML = '<i class="fas fa-info-circle"></i>Más información';

//         botonesPrincipal.appendChild(botonEntradas);
//         botonesPrincipal.appendChild(botonInfo);
//         contenedorPrincipal.appendChild(tituloPrincipal);
//         contenedorPrincipal.appendChild(descripcionPrincipal);
//         contenedorPrincipal.appendChild(botonesPrincipal);
//         peliculaPrincipal.appendChild(contenedorPrincipal);
//         pagTicket.appendChild(peliculaPrincipal);

//         // para manejar el CSS desde el JS se le ponge.style.
//         peliculaPrincipal.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;

//         // el titulo de cada pagina( me falta poder asignarle el genero. solo si puedo sino no )
//         const tituloMasVistos = document.createElement("div");
//         tituloMasVistos.className = "titulo";
//         const h1MasVistos = document.createElement("h1");
//         h1MasVistos.textContent = "¡ Tickets para tus mejores peliculas !";
//         tituloMasVistos.appendChild(h1MasVistos);
//         pagTicket.appendChild(tituloMasVistos);



//           // Crear el elemento de la película utilizando la función createMovieElement
//           const movieElement = createMovieElement(movieData.results);

//           // Añadir el elemento al contenedor principal
//           pagTicket.appendChild(movieElement);

//           pagTicket.insertAdjacentHTML('beforeend', ` <div>
//           <div class="imagen-salascine">
//               <img src="img/salascine.png" alt="Imagen Socios" title="Cine Usurbil">
//           </div>
//       </div>`);

//     }
// }


///////funciones para la barra del navegador/////////
//////// esto fue lo que mas me costo encontrar infomacion, al final tuve que usar foros externos para poder entender algo.

document.addEventListener("DOMContentLoaded", () => {
    fetchPopularMovies();
    renderGenrerMovies();
    currentPage();

    // seleccionamos todos los selectores que tengan 
    const menuItems = document.querySelectorAll('.menu-item a');

    // hacemos un foreach donde le agregamos evento listener a cada uno de ellos.
    menuItems.forEach(item => {
        item.addEventListener('click', menuItemClick);
    });

    // esta dentro para asegurarse que se ejecute despues de tener cargador los archivos del doom
    filterGenrepage();
});

function menuItemClick(event) {
    const genreId = parseInt(event.currentTarget.dataset.genre);
    if (isValidGenreId(genreId)) {
        filterByGenre(genreId);
    } else {
        redirectToPage(event.currentTarget.href);
    }
}

// id sea valido
function isValidGenreId(genreId) {
    return genreId !== null && genreId !== undefined && !isNaN(genreId);
}

// redirigir a la url
function redirectToPage(url) {
    window.location.href = url;
}

// maneja el filtrado por genero, leyemos la url para saber si tiene un genero y si en el caso que tenga
// se filtra el genero y asi mismo se crea la pagina o redirige a la pagina segun el genero.

function filterGenrepage() {
    // urlsearchparams permite acceder a los parametros de la url y tomar lo que necesitemos o todo.
    const urlParams = new URLSearchParams(window.location.search);
    // usa un get para tomar un valor especifico (genero)
    const genreParam = urlParams.get('genre');
    // si el id genero es valido
    if (isValidGenreId(genreParam)) {
        // lo pasamos a un int y lo filtramos por el genero.
        filterByGenre(parseInt(genreParam));
    }
}

