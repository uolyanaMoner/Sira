import { Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function MiniTopBar() {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0  z-40 text-white backdrop-blur-md border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Search */}
                <Button variant="nav"
                    onClick={() => navigate("/saints")}
                    className="p-2 rounded-lg  transition"
                >
                    <Search size={20} />
                </Button>

                {/* Title */}
                <h1
                    onClick={() => navigate("/synaxarium")}
                    className="font-bold text-lg cursor-pointer"
                >
                    📖 السنكسار
                </h1>

                {/* Home */}
                <Button variant="nav"
                    onClick={() => navigate("/")}
                    className="p-2 rounded-lg transition"
                >
                    <Home size={20} />
                </Button>
            </div>
        </header>
    );
}