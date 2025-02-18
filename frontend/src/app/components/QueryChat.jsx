import { Button } from "@/components/ui/button"; // Shadcn button UI component
import { Textarea } from "@/components/ui/textarea"; // Shadcn textarea UI component

const QueryChat = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Ask a Question</h2>
      <Textarea placeholder="Type your query here..." className="my-2" />
      <Button>Submit</Button>
    </div>
  );
};

export default QueryChat;
