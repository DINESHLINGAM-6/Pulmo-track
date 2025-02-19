export default function VisitList() {
  // Mock data - replace with actual data fetching logic
  const visits = [
    {
      id: 1,
      date: "2023-05-01",
      doctor: "Dr. Smith",
      notes: "Regular checkup",
    },
    {
      id: 2,
      date: "2023-04-15",
      doctor: "Dr. Johnson",
      notes: "Follow-up appointment",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Past Visits</h2>
      {visits.map((visit) => (
        <div key={visit.id} className="bg-white p-4 rounded-lg shadow-md">
          <p className="font-semibold">{visit.date}</p>
          <p>{visit.doctor}</p>
          <p className="text-gray-600">{visit.notes}</p>
        </div>
      ))}
    </div>
  );
}
