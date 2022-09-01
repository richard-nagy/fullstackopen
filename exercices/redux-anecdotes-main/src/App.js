import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
    return (
        <>
            <AnecdoteList />
            <Notification />
            <AnecdoteForm />
        </>
    );
};

export default App;
