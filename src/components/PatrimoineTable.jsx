import React from "react";

const PatrimoineTable = ({
  patrimoine,
  date,
  onEditClick,
  onDelete,
  onClose,
}) => {
  return (
    <div className="mb-5">
      <table className="table table-bordered">
        <thead>
          <tr className="bg-light">
            <th>Libellé</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux d'Amortissement (%)</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patrimoine.possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>
                {possession.valeurConstante
                  ? `${possession.valeurConstante} Ar`
                  : `${possession.valeur} Ar`}
              </td>
              <td>{possession.dateDebut.toLocaleDateString()}</td>
              <td>
                {possession.dateFin
                  ? possession.dateFin.toLocaleDateString()
                  : "Non définie"}
              </td>
              <td>
                {possession.tauxAmortissement !== null
                  ? possession.tauxAmortissement
                  : 0}
              </td>
              <td>{possession.getValeur(date).toFixed(2)} Ar</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning mr-2"
                  onClick={() =>
                    onEditClick(possession.libelle, possession.dateFin)
                  }
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(possession.libelle)}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-secondary"
                  type="button" // Assurez-vous que le type est "button"
                  onClick={(e) => onClose(possession.libelle, e)} // Passez l'événement
                >
                  Clôturer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatrimoineTable;
