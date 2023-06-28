import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Livres = () => {
  const [livres, setLivres] = useState([]);
  const [nouveauLivre, setNouveauLivre] = useState({
    titre: '',
    auteur: '',
    prix: '',
    description: ''
  });

  useEffect(() => {
    chargerLivres();
  }, []);

  const chargerLivres = async () => {
    try {
      const response = await axios.get('http://localhost:3000/livre');
      setLivres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ajouterLivre = async () => {
    try {
      await axios.post('http://localhost:3000/livre', nouveauLivre);
      chargerLivres();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const supprimerLivre = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/livre/${id}`);
      chargerLivres();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setNouveauLivre({
      titre: '',
      auteur: '',
      prix: '',
      description: ''
    });
  };

  return (
    <div>
      <ul>
        {livres.map((livre) => (
          <li key={livre.id}>
            <strong>{livre.titre}</strong> par {livre.auteur} - {livre.prix} €
            <button onClick={() => supprimerLivre(livre.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h2>Ajouter un livre</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        ajouterLivre();
      }}>
        <input
          type="text"
          placeholder="Titre"
          value={nouveauLivre.titre}
          onChange={(e) => setNouveauLivre({ ...nouveauLivre, titre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Auteur"
          value={nouveauLivre.auteur}
          onChange={(e) => setNouveauLivre({ ...nouveauLivre, auteur: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prix"
          value={nouveauLivre.prix}
          onChange={(e) => setNouveauLivre({ ...nouveauLivre, prix: parseFloat(e.target.value) })}
        />
        <textarea
          placeholder="Description"
          value={nouveauLivre.description}
          onChange={(e) => setNouveauLivre({ ...nouveauLivre, description: e.target.value })}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Livres;
