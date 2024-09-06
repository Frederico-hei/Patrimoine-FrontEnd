import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonneSelect from "./components/PersonneSelect";
import DateInput from "./components/DateInput";
import ApplyButton from "./components/ApplyButton";
import PatrimoineTable from "./components/PatrimoineTable";
import EditDateFinForm from "./components/EditDateFinForm";
import PatrimoineChartWrapper from "./components/PatrimoineChartWrapper";
import data from "../../data/data.json";
import Personne from "../models/Personne";
import Patrimoine from "../models/Patrimoine";
import BienMateriel from "../models/possessions/BienMateriel";
import Flux from "../models/possessions/Flux";

export default function App() {
  const [personnes, setPersonnes] = useState([]);
  const [patrimoines, setPatrimoines] = useState([]);
  const [selectedPersonne, setSelectedPersonne] = useState("");
  const [date, setDate] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(0);
  const [editingLibelle, setEditingLibelle] = useState(null);
  const [newDateFin, setNewDateFin] = useState("");

  useEffect(() => {
    const loadedPersonnes = data
      .filter((item) => item.model === "Personne")
      .map((item) => new Personne(item.data.nom));

    const loadedPatrimoines = data
      .filter((item) => item.model === "Patrimoine")
      .map((item) => {
        const possessions = item.data.possessions.map((pos) => {
          if (pos.valeurConstante !== undefined) {
            return new Flux(
              pos.possesseur.nom,
              pos.libelle,
              pos.valeurConstante,
              new Date(pos.dateDebut),
              pos.dateFin ? new Date(pos.dateFin) : null,
              pos.tauxAmortissement,
              pos.jour
            );
          } else {
            return new BienMateriel(
              pos.possesseur.nom,
              pos.libelle,
              pos.valeur,
              new Date(pos.dateDebut),
              pos.dateFin ? new Date(pos.dateFin) : null,
              pos.tauxAmortissement
            );
          }
        });
        return new Patrimoine(item.data.possesseur.nom, possessions);
      });

    setPersonnes(loadedPersonnes);
    setPatrimoines(loadedPatrimoines);
  }, []);

  const handlePersonneChange = (e) => {
    setSelectedPersonne(e.target.value);
    setValeurPatrimoine(0);
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  const handleApplyClick = () => {
    if (selectedPersonne) {
        const patrimoine = patrimoines.find(
            (p) => p.possesseur === selectedPersonne
        );
        if (patrimoine) {
            // Calculer la valeur totale en fonction de la date
            const totalValue = patrimoine.getValeur(date);
            setValeurPatrimoine(totalValue.toFixed(2));
        } else {
            setValeurPatrimoine(0);
        }
    }
};


  const handleDelete = async (libelle) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/possessions/${libelle}`);
      if (response.status === 200) {
        // Mettre à jour l'état local après la suppression réussie
        setPatrimoines((prevPatrimoines) =>
          prevPatrimoines.map((patrimoine) => {
            if (patrimoine.possesseur === selectedPersonne) {
              return new Patrimoine(
                patrimoine.possesseur,
                patrimoine.possessions.filter((pos) => pos.libelle !== libelle)
              );
            }
            return patrimoine;
          })
        );
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la possession:', error);
    }
  };

  const handleClose = async (libelle, event) => {
    if (event) {
      event.preventDefault(); // Empêche la soumission du formulaire et la réactualisation de la page
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/patrimoines/${selectedPersonne}/possession/${libelle}/close`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Possession mise à jour :', data);
  
        // Met à jour l'état sans réactualiser la page
        setPatrimoines(prevPatrimoines =>
          prevPatrimoines.map(patrimoine => {
            if (patrimoine.possesseur === selectedPersonne) {
              const updatedPossessions = patrimoine.possessions.map(possession => {
                if (possession.libelle === libelle) {
                  return {
                    ...possession,
                    dateFin: data.possession?.dateFin || new Date()
                  };
                }
                return possession;
              });
              return {
                ...patrimoine,
                possessions: updatedPossessions
              };
            }
            return patrimoine;
          })
        );
      } else {
        console.error('Erreur lors de la mise à jour de la possession :', await response.text());
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };
  




  const handleEditClick = (libelle, currentDateFin) => {
    setEditingLibelle(libelle);
    setNewDateFin(
      currentDateFin ? currentDateFin.toISOString().slice(0, 10) : ""
    );
  };

  const handleUpdateDateFin = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/possessions/${selectedPersonne}/${editingLibelle}/dateFin`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dateFin: newDateFin })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la date de fin');
        }

        const data = await response.json();
        console.log('Réponse du serveur:', data);

        // Mettre à jour l'état local si nécessaire
        setPatrimoines((prevPatrimoines) =>
            prevPatrimoines.map((patrimoine) => {
                if (patrimoine.possesseur === selectedPersonne) {
                    const updatedPossessions = patrimoine.possessions.map(
                        (possession) => {
                            if (possession.libelle === editingLibelle) {
                                possession.dateFin = newDateFin ? new Date(newDateFin) : null;
                            }
                            return possession;
                        }
                    );
                    return new Patrimoine(patrimoine.possesseur, updatedPossessions);
                }
                return patrimoine;
            })
        );
        
        setEditingLibelle(null);
        setNewDateFin("");
    } catch (error) {
        console.error('Erreur:', error);
    }
};


  const patrimoine = patrimoines.find((p) => p.possesseur === selectedPersonne);

  return (
    <div className="container mt-3">
      <div className="title text-center">
        <h1 className="text-primary">Vérifier la valeur du Patrimoine</h1>
      </div>

      <PersonneSelect
        personnes={personnes}
        selectedPersonne={selectedPersonne}
        onPersonneChange={handlePersonneChange}
      />

      <DateInput date={date} onDateChange={handleDateChange} />

      <ApplyButton onClick={handleApplyClick} />

      {valeurPatrimoine !== 0 && (
        <div className="text-center mb-4">
          <h4>
            Valeur du patrimoine le {date.toLocaleDateString()} :{" "}
            {valeurPatrimoine} Ar
          </h4>
        </div>
      )}

      {patrimoine && (
        <PatrimoineTable
          patrimoine={patrimoine}
          date={date}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}

      {editingLibelle && (
        <EditDateFinForm
          editingLibelle={editingLibelle}
          newDateFin={newDateFin}
          onDateFinChange={setNewDateFin}
          onUpdateDateFin={handleUpdateDateFin}
          onCancel={() => setEditingLibelle(null)}
        />
      )}

      {patrimoine && (
        <PatrimoineChartWrapper patrimoine={patrimoine} date={date} />
      )}
    </div>
  );
}
