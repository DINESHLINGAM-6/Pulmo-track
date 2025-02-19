"use client";

import { useState } from "react";

export default function DoctorVisitsPage() {
    const [visits, setVisits] = useState([
        { id: 1, date: "2023-03-15", doctor: "Dr. Smith", notes: "Routine check-up." },
        { id: 2, date: "2023-04-10", doctor: "Dr. Jones", notes: "Follow-up visit." },
    ]);

    const [newVisit, setNewVisit] = useState({
        date: "",
        doctor: "",
        notes: "",
    });

    const handleInputChange = (e) => {
        setNewVisit({ ...newVisit, [e.target.name]: e.target.value });
    };

    const handleAddVisit = (e) => {
        e.preventDefault();
        const visitToAdd = { ...newVisit, id: Date.now() };
        setVisits((prev) => [...prev, visitToAdd]);
        setNewVisit({ date: "", doctor: "", notes: "" });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Doctor Visits</h2>
            <form onSubmit={handleAddVisit} className="mb-6 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Add New Visit</h3>
                <input
                    type="date"
                    name="date"
                    value={newVisit.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <input
                    type="text"
                    name="doctor"
                    placeholder="Doctor's Name/Clinic"
                    value={newVisit.doctor}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <textarea
                    name="notes"
                    placeholder="Visit Notes"
                    value={newVisit.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Add Visit
                </button>
            </form>
            <div className="space-y-4">
                {visits.map((visit) => (
                    <div key={visit.id} className="p-4 bg-white rounded shadow">
                        <h3 className="text-xl font-semibold text-blue-600">
                            {visit.date} - {visit.doctor}
                        </h3>
                        <p className="text-gray-600">{visit.notes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
