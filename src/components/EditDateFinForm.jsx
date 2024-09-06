import React from "react";

const EditDateFinForm = ({ editingLibelle, newDateFin, onDateFinChange, onUpdateDateFin, onCancel }) => {
  return (
    <div className="card mb-5">
      <div className="card-body">
        <h5 className="card-title">
          Modifier la Date de Fin pour "{editingLibelle}"
        </h5>
        <div className="form-group">
          <label>Nouvelle Date de Fin :</label>
          <input
            type="date"
            className="form-control"
            value={newDateFin}
            onChange={(e) => onDateFinChange(e.target.value)}
          />
        </div>
        <button className="btn btn-success mr-2" onClick={onUpdateDateFin}>
          Enregistrer
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
};

export default EditDateFinForm;
