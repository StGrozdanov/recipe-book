import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}