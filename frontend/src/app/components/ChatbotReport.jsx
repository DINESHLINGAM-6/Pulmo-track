import { useState } from 'react';

export default function ChatbotReport() {
    const [visitDetails, setVisitDetails] = useState({ date: "", notes: "" });
    const [report, setReport] = useState("");

    const handleGenerate = async () => {
        const res = await fetch("/api/chatbot/generate-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(visitDetails),
        });
        const data = await res.json();
        setReport(data.report);
    };

    return (
        <div>
            <h3>Generate Visit Report</h3>
            <input
                type="date"
                value={visitDetails.date}
                onChange={(e) => setVisitDetails({ ...visitDetails, date: e.target.value })}
            />
            <textarea
                placeholder="Additional notes"
                value={visitDetails.notes}
                onChange={(e) => setVisitDetails({ ...visitDetails, notes: e.target.value })}
            />
            <button onClick={handleGenerate}>Generate Report</button>
            {report && (
                <div>
                    <h4>Report</h4>
                    <p>{report}</p>
                </div>
            )}
        </div>
    );
}
