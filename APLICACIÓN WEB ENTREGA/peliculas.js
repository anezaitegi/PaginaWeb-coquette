/*  1.- Primer paso crear muchas funciones.
    2.- Luego intentar leer toda la informacion desde el API de peliculas
    3.- Intentar usar solo un js
    4.- Una vez que tenga todas las peliculas con la informacion sacada desde la API o parseo de json 
    realizar detalles con js, como botones, animaciones o etc.
    5.- Tambien arreglar detalles como arreglar el menu de movil que funciona pero se repite codigo.
    6.- Ver sino tambien se puede tomar el mismo codigo en todas las paginas de html que se repiten como en el header/footer.
    7.- Al intentar cambiar todas las peliculas de las paginas en una sola pagina PELICULAS--> tendria que cambiar la pelicula principal 
    en el CSS, o dejo una sola. COMO UNA PORTADA.


    GENERO ID DE TMBD: https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
    */ 

    
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
        } catch (error) {
            console.error('Error:', error);
        }
        
    }

