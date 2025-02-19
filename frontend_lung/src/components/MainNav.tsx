
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserRound, 
  FileText, 
  History, 
  MessagesSquare, 
  Settings 
} from "lucide-react";

const MainNav = () => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Doctor Visits", icon: UserRound, path: "/visits" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Timeline", icon: History, path: "/timeline" },
    { name: "AI Doctor", icon: MessagesSquare, path: "/ai-doctor" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-white/90 backdrop-blur-md border-r border-gray-200 px-4 py-6 transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold">LH</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            LungHealth
          </h1>
        </div>
        
        <div className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Health Score</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4 transition-all duration-1000"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Good condition</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
