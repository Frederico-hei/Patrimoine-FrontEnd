import React from "react";
import PatrimoineChart from "../PatrimoineChart";

const PatrimoineChartWrapper = ({ patrimoine, date }) => {
  const getIntervalDates = () => {
    if (!patrimoine) return [];

    // Supposons que tu veux des dates mensuelles
    const startDate = new Date(Math.min(...patrimoine.possessions.map(pos => pos.dateDebut)));
    const endDate = new Date(date);
    const intervalDates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      intervalDates.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1); // Ajouter un mois
    }

    return intervalDates.map(date => date.toLocaleDateString());
  };

  const getValeurs = () => {
    if (!patrimoine) return [];
    
    // Récupérer les dates d'intervalles
    const intervalDates = getIntervalDates();

    // Calculer les valeurs pour chaque date d'intervalle
    return intervalDates.map(date => {
      const intervalDate = new Date(date);
      return patrimoine.possessions.reduce((total, pos) => {
        const { dateDebut, dateFin, valeur, tauxAmortissement } = pos;
        if (intervalDate >= new Date(dateDebut) && (!dateFin || intervalDate <= new Date(dateFin))) {
          // Calculer la valeur actuelle de la possession
          const duree = (intervalDate - new Date(dateDebut)) / (1000 * 60 * 60 * 24 * 365); // en années
          const amortissement = valeur * (tauxAmortissement / 100) * duree;
          total += valeur - amortissement;
        }
        return total;
      }, 0).toFixed(2);
    });
  };

  return (
    <div className="mb-5 bg-dark">
      <h4 className="text-center mb-4">
        Évolution de la Valeur du Patrimoine
      </h4>
      <PatrimoineChart dates={getIntervalDates()} valeurs={getValeurs()} />
    </div>
  );
};

export default PatrimoineChartWrapper;
