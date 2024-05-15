import HomePage from "./views/HomePage";
import DjangoPage from "./views/DjangoPage";
import ReactPage from "./views/ReactPage";
import VitePage from "./views/VitePage";
import ChakraPage from "./views/ChakraPage";
import { SiDjango, SiVite, SiChakraui, SiReact, SiHomeadvisor } from "react-icons/si";
import {IconType} from "react-icons";
import {ReactNode} from "react";

export interface routeProps {
    name: string,
    icon: IconType,
    destination: string,
    element: ReactNode,
    showInSidebar: boolean
}

export const routes: routeProps[] = [
    {
        name: "HomePage",
        icon: SiHomeadvisor,
        destination: "/",
        element: <HomePage />,
        showInSidebar: true
    },
    {
        name: "Django",
        icon: SiDjango,
        destination: "/django",
        element: <DjangoPage />,
        showInSidebar: true
    },
    {
        name: "React",
        icon: SiReact,
        destination: "/react",
        element: <ReactPage />,
        showInSidebar: true
    },
    {
        name: "Vite",
        icon: SiVite,
        destination: "/vite",
        element: <VitePage />,
        showInSidebar: true
    },
    {
        name: "Chakra",
        icon: SiChakraui,
        destination: "/chakra",
        element: <ChakraPage />,
        showInSidebar: true
    }
]