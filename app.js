const express = require ("express");

const app = express();

const {infoCursos} = require ('./cursos.js')

//routing

app.get("/",(req,res) => {
    res.send("mi primer servidor.Cursos 💻.")
})
//se coloca el api para tenr orden
app.get("/api/cursos",(req, res) => {
    res.send(infoCursos);
})

//mostrar solo los cursos de programacion
app.get("/api/cursos/programacion", (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
});

//mostrar  cursos de matematica
app.get("/api/cursos/matematicas", (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

app.get("/api/cursos/programacion/:lenguaje", (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0){
        return res.status(404).send("No se encontraron cursos de " + lenguaje + ".")
    }

    res.send(JSON.stringify(resultados));
})
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO,() => {
    console.log("El servidor esta escuchando en el puerto " + PUERTO, "...")
});