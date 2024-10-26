import NavBar from "./components/NavBar/NavBar.tsx";
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AllQuotes from "./containers/AllQuotes/AllQuotes.tsx";
import CategoryQuotes from "./containers/CategoryQuotes/CategoryQuotes.tsx";
import MutateQuote from "./containers/MutateQuote/MutateQuote.tsx";


const App = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <Container component='main'>
                <Routes>
                    <Route path='/' element={<AllQuotes />} />
                    <Route path='/quotes' element={<CategoryQuotes />} />
                    <Route path='/new-quote' element={<MutateQuote />} />
                    <Route path='/new-quote/:id/edit' element={<MutateQuote />} />
                    <Route path='*' element={<Typography variant='h2'>Not Found</Typography>} />
                </Routes>
            </Container>
        </>
    );
};

export default App;
