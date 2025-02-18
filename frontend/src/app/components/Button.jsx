import { Button } from "@/components/ui/button";

const CustomButton = ({ children, onClick, variant = "default" }) => {
  return (
    <Button
      className={`px-4 py-2 rounded-md text-white ${variant === "primary" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
