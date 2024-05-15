import './App.css'
import {ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppProvider from "./providers/AppProvider";
import Main from "./Main";

const queryClient = new QueryClient()

function App() {
    return (
        <ChakraProvider>
            <AppProvider>
                <QueryClientProvider client={queryClient}>
                    <Main />
                </QueryClientProvider>
            </AppProvider>
        </ChakraProvider>
    )
}

export default App
