import { useNavigate } from "react-router-dom";
import sorec from "../images/sorec.png";
import { Button } from "./ui/button";
export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex  items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <img src={sorec} alt="Logo" className="h-8 w-auto md:h-10" />

        <Button onClick={() => navigate("/login")}>Se connecter</Button>
      </header>
    </>
  );
}
