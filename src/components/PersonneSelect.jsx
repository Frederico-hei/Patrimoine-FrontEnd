import React from "react";

const PersonneSelect = ({ personnes, selectedPersonne, onPersonneChange }) => {
  return (
    <div className="mb-3">
      <select
        className="form-control"
        value={selectedPersonne}
        onChange={onPersonneChange}
      >
        <option value="">Sélectionner une personne</option>
        {personnes.map((personne, index) => (
          <option key={index} value={personne.nom}>
            {personne.nom}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PersonneSelect;
