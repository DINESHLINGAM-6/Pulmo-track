import VisitList from "@/components/VisitList"
import AddVisitForm from "@/components/AddVisitForm"

export default function DoctorVisits() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Doctor Visits</h1>
      <AddVisitForm />
      <VisitList />
    </div>
  )
}

