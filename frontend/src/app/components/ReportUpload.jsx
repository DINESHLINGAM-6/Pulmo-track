import { Input } from "@/components/ui/input"; // Shadcn input UI component
import { Button } from "@/components/ui/button"; // Shadcn button UI component

const ReportUpload = () => {
  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-semibold">Upload Rehabilitation Report</h2>
      <Input type="file" className="my-2" />
      <Button>Upload</Button>
    </div>
  );
};

export default ReportUpload;
