import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sample from './Sample';

function App() {
    return (
        <BrowserRouter>
            <h1>Hello React Router</h1>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/sample">
                    <Sample />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

const  Home = () => {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Contact() {
    return <h2>Contact</h2>;
}

export default App;