const express = require('express') // la récupération d'express
const app = express() // variable utilisant la librairie express
const livre = require('./livres.json')

app.use(express.json())

//Affiche tous les livres
app.get("/livre", (req,res) => {
    res.status(200).json(livre);
});

//affichage d'un livre par rapport à son Id
app.get("/livre/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const TheLivre = livre.find(livre => livre.id === id)
    res.status(200).json(TheLivre);
});

//affichage d'un livre par rapport à son titre
app.get("/livre/titre/:titre", (req, res) => {
    const titre = req.params.titre;
    const TheLivre = livre.find((livre) => livre.titre === titre);
    res.status(200).json(TheLivre);
});


//ajout d'un nouveau livre
app.post("/livre", (req,res) => {
    livre.push(req.body)
    res.status(200).json(livre);
});

//Modification d'un livre par rapport à son id
app.put("/livre/:id", (req,res) => {
    const id = parseInt(req.params.id)
    let TheLivre = livre.find(livre => livre.id === id)
    TheLivre.titre =req.body.titre,
    TheLivre.auteur =req.body.auteur,
    TheLivre.prix =req.body.prix,
    TheLivre.description =req.body.description,
    res.status(200).json(TheLivre);
});

//Suppression d'un livre par rapport à son id
app.delete("/livre/:id", (req,res) => {
    const id = parseInt(req.params.id)
    let TheLivre = livre.find(livre => livre.id === id)
    livre.splice(livre.indexOf(TheLivre),1)
    res.status(200).json(livre);
});


app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})

