/*  1.- Primer paso crear muchas funciones.
    2.- Luego intentar leer toda la informacion desde el API de peliculas
    3.- Intentar usar solo un js
    4.- Una vez que tenga todas las peliculas con la informacion sacada desde la API o parseo de json 
    realizar detalles con js, como botones, animaciones o etc.
    5.- Tambien arreglar detalles como arreglar el menu de movil que funciona pero se repite codigo.
    6.- Ver sino tambien se puede tomar el mismo codigo en todas las paginas de html que se repiten como en el header/footer.
    7.- Al intentar cambiar todas las peliculas de las paginas en una sola pagina PELICULAS--> tendria que cambiar la pelicula principal 
    en el CSS, o dejo una sola. COMO UNA PORTADA. (REalizado)


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

    /* <!-- AQUI VA LOS CONTENIDOS VACIOS Y YO VOY CARGANDO LA INFORMACION CON JAVASCRIPT TOMANDO LOS ELEMENTOS
        CON GETELEMENTID Y LUEGO AGREGANDO CON UN FOR LOS ITEMS O INFO QUE QUIERO PASAR.    
        Tambien puedo tomar toda la info desde la API -->

    <!-- los fondos tambien puedo hacerlos con jvs que vaya cargando cuando se cargue la pagina -->

    <!-- Aqui esta la base del html que se va a ir repitiendo por cada pelicula en total 4 peliculas por pagina.
             4 paginas por genero: Terror, ciencia fiction, drama, comedia.
            hacerlo cargar con js las paginas dependiendo que es lo que elija la persona -->*/

    // peliculas
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

            renderMovies(data.results);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // filtrar peliculas por genero, pasar parametro genero-id
    async function filterByGenre(genre_id) {
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

            const backgroundImageUrl = data.backdrop_path;


            // filtrar,(retornar la copia de un arreglo desde el indice del inicio hasta el penúltimo final, excluyendo el final)
            // esta filtrando cuando se elige el género en el menú y se filtra por consola
            console.log(filteredMovies.slice(0, 10));
            renderMovies(filteredMovies.slice(0, 10));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // funcion diccionario para saber cuales son los generos usando los id de la api
    function getGenreByID(id) {
        // Diccionarrio (en js):
        // Llave: valor
        const genres = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Science Fiction",
            10770: "TV Movie",
            53: "Thriller",
            10752: "War",
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

        // generos usando foreach, insertando funcion (preguntar)
        // pero creo que esta declarando una array que en este caso es de genero id
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

    // colocar los más vistos titulo, que vaya pasando colocando el genero.

    /* tengo que vaciar el contenido despues de llamar al div main, crear los elementos
    dejarlos fuera del for, asi el for no itera.
    */ 

    function renderMovies(movies) {
        // tomo mi main
        const peliculasContainer = document.getElementById("peliculas-div");

        
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
        tituloPrincipal.innerText = movies[0].title;// solo ocupare la primera posicion de la lista (pelicula)

        const descripcionPrincipal = document.createElement("h3");
        descripcionPrincipal.innerText = movies[0].overview;// solo ocupare la primera posicion de la descripcion

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

        botonesPrincipal.appendChild(botonEntradas);
        botonesPrincipal.appendChild(botonInfo);
        contenedorPrincipal.appendChild(tituloPrincipal);
        contenedorPrincipal.appendChild(descripcionPrincipal);
        contenedorPrincipal.appendChild(botonesPrincipal);
        peliculaPrincipal.appendChild(contenedorPrincipal);
        peliculasContainer.appendChild(peliculaPrincipal);

        // para manejar el CSS desde el JS se le ponge.style.
        peliculaPrincipal.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movies[0].backdrop_path}')`;

        // el titulo de cada pagina( me falta poder asignarle el genero. solo si puedo sino no )
        const tituloMasVistos = document.createElement("div");
        tituloMasVistos.className = "titulo";
        const h1MasVistos = document.createElement("h1");
        h1MasVistos.textContent = "Los más vistos";
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
    document.addEventListener("DOMContentLoaded", fetchPopularMovies);




