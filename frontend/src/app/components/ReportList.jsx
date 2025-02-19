export default function ReportList() {
  // Mock data - replace with actual data fetching logic
  const reports = [
    { id: 1, title: "Monthly Progress Report", date: "2023-05-01" },
    { id: 2, title: "Quarterly Health Summary", date: "2023-04-01" },
  ];

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold text-lg">{report.title}</h2>
            <p className="text-gray-600">{report.date}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            View Report
          </button>
        </div>
      ))}
    </div>
  );
}
