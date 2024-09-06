import React, { useState } from "react";
import PatrimoineChart from "./PatrimoineChart";

const PatrimoineIntervalChart = ({ patrimoine }) => {
  const [dateDebut1, setDateDebut1] = useState("");
  const [dateFin1, setDateFin1] = useState("");
  const [dateDebut2, setDateDebut2] = useState("");
  const [dateFin2, setDateFin2] = useState("");

  const handleDateDebut1Change = (e) => setDateDebut1(e.target.value);
  const handleDateFin1Change = (e) => setDateFin1(e.target.value);
  const handleDateDebut2Change = (e) => setDateDebut2(e.target.value);
  const handleDateFin2Change = (e) => setDateFin2(e.target.value);

  const getIntervalData = (startDate, endDate) => {
    if (!patrimoine || !startDate || !endDate) return { dates: [], valeurs: [] };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    const valeurs = [];

    patrimoine.possessions.forEach((possession) => {
      let currentDate = new Date(possession.dateDebut);
      while (currentDate <= end) {
        if (currentDate >= start) {
          dates.push(currentDate.toLocaleDateString());
          valeurs.push(possession.getValeur(start, end).toFixed(2));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return { dates, valeurs };
  };

  const interval1Data = getIntervalData(dateDebut1, dateFin1);
  const interval2Data = getIntervalData(dateDebut2, dateFin2);

  return (
    <div className="mb-5 bg-dark">
      <h4 className="text-center mb-4">Évolution de la Valeur du Patrimoine</h4>

      <div className="form-group">
        <label>Date de Début Intervalle 1 :</label>
        <input
          type="date"
          className="form-control"
          value={dateDebut1}
          onChange={handleDateDebut1Change}
        />
      </div>
      <div className="form-group">
        <label>Date de Fin Intervalle 1 :</label>
        <input
          type="date"
          className="form-control"
          value={dateFin1}
          onChange={handleDateFin1Change}
        />
      </div>

      <div className="form-group">
        <label>Date de Début Intervalle 2 :</label>
        <input
          type="date"
          className="form-control"
          value={dateDebut2}
          onChange={handleDateDebut2Change}
        />
      </div>
      <div className="form-group">
        <label>Date de Fin Intervalle 2 :</label>
        <input
          type="date"
          className="form-control"
          value={dateFin2}
          onChange={handleDateFin2Change}
        />
      </div>

      <div className="mb-4">
        <h5>Intervalle 1</h5>
        <PatrimoineChart dates={interval1Data.dates} valeurs={interval1Data.valeurs} />
      </div>

      <div className="mb-4">
        <h5>Intervalle 2</h5>
        <PatrimoineChart dates={interval2Data.dates} valeurs={interval2Data.valeurs} />
      </div>
    </div>
  );
};

export default PatrimoineIntervalChart;
