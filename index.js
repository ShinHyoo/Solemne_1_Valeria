console.log("¡Ingresaste a la Pokedex!, Hola User, ¿qué necesitas?")
const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const https = require("https")
const PORT = 8000


app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
    console.log("recibi una solicitud get.")
})

app.post("/Pokedex", (req, res) =>{
    const pokemon = req.body.pokemon
    // console.log = pokemon
    const URI = "https://pokeapi.co/api/v2/pokemon/" + pokemon

    https.get(URI, (response) => {
            let data = ""
            response.on("data", (chunk) => {
                data += chunk
            })
        
            response.on("end", () => {
                console.log(JSON.parse(data))
                res.send("Esta es la información de " + pokemon + " que pediste: " + JSON.stringify(JSON.parse(data).stats))
            })
        })
})
app.listen(PORT, ()=> {
    console.log("Servidor escuchando puerto:" + PORT)
})