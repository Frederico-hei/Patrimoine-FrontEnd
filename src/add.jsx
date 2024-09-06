import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPossessionForm = () => {
    const [formState, setFormState] = useState({
        nomPossesseur: '',
        libelle: '',
        valeur: '',
        dateDebut: new Date(),
        dateFin: null,
        tauxAmortissement: '',
        valeurConstante: '',
        jour: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date, name) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: date
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            possesseur: {
                nom: formState.nomPossesseur
            },
            libelle: formState.libelle,
            valeur: Number(formState.valeur),
            dateDebut: formState.dateDebut.toISOString(),
            dateFin: formState.dateFin ? formState.dateFin.toISOString() : null,
            tauxAmortissement: formState.tauxAmortissement ? Number(formState.tauxAmortissement) : null,
            valeurConstante: formState.valeurConstante ? Number(formState.valeurConstante) : null,
            jour: formState.jour ? Number(formState.jour) : null
        };

        try {
            const response = await axios.post('http://localhost:3000/api/possessions', formData);
            console.log('Possession ajoutée:', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la possession:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNomPossesseur">
                <Form.Label>Nom du Possesseur</Form.Label>
                <Form.Control
                    type="text"
                    name="nomPossesseur"
                    value={formState.nomPossesseur}
                    onChange={handleChange}
                    placeholder="Entrez le nom du possesseur"
                />
            </Form.Group>

            <Form.Group controlId="formLibelle">
                <Form.Label>Libellé</Form.Label>
                <Form.Control
                    type="text"
                    name="libelle"
                    value={formState.libelle}
                    onChange={handleChange}
                    placeholder="Entrez le libellé"
                />
            </Form.Group>

            <Form.Group controlId="formValeur">
                <Form.Label>Valeur</Form.Label>
                <Form.Control
                    type="number"
                    name="valeur"
                    value={formState.valeur}
                    onChange={handleChange}
                    placeholder="Entrez la valeur"
                />
            </Form.Group>

            <Form.Group controlId="formDateDebut">
                <Form.Label>Date de Début</Form.Label>
                <DatePicker
                    selected={formState.dateDebut}
                    onChange={(date) => handleDateChange(date, 'dateDebut')}
                    className="form-control"
                />
            </Form.Group>

            <Form.Group controlId="formDateFin">
                <Form.Label>Date de Fin</Form.Label>
                <DatePicker
                    selected={formState.dateFin}
                    onChange={(date) => handleDateChange(date, 'dateFin')}
                    className="form-control"
                    placeholderText="Sélectionnez une date de fin (facultatif)"
                />
            </Form.Group>

            <Form.Group controlId="formTauxAmortissement">
                <Form.Label>Taux d'Amortissement</Form.Label>
                <Form.Control
                    type="number"
                    name="tauxAmortissement"
                    value={formState.tauxAmortissement}
                    onChange={handleChange}
                    placeholder="Entrez le taux d'amortissement"
                />
            </Form.Group>

            <Form.Group controlId="formValeurConstante">
                <Form.Label>Valeur Constante</Form.Label>
                <Form.Control
                    type="number"
                    name="valeurConstante"
                    value={formState.valeurConstante}
                    onChange={handleChange}
                    placeholder="Entrez la valeur constante"
                />
            </Form.Group>

            <Form.Group controlId="formJour">
                <Form.Label>Jour</Form.Label>
                <Form.Control
                    type="number"
                    name="jour"
                    value={formState.jour}
                    onChange={handleChange}
                    placeholder="Entrez le jour"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Ajouter Possession
            </Button>
        </Form>
    );
};

export default AddPossessionForm;
