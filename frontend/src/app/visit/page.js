import DashboardCard from "@/components/DashboardCard"

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="SpO₂ Levels" value="98%" />
                <DashboardCard title="Cough Count" value="5" />
                <DashboardCard title="Next Doctor Visit" value="May 15, 2023" />
            </div>
            {/* Add more dashboard content here */}
        </div>
    )
}

