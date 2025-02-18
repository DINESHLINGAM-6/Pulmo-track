import { Card } from "@/components/ui/card"; // Shadcn card UI component
import { Progress } from "@/components/ui/progress"; // Shadcn progress UI component

const ProgressCharts = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <h2 className="text-lg font-semibold">Lung Health Progress</h2>
        <Progress value={70} />
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Rehabilitation Status</h2>
        <Progress value={50} />
      </Card>
    </div>
  );
};

export default ProgressCharts;
