import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticleContainer from '../components/ArticleContainer';

function App() {
    const a = 10;
    a == 10;
    return (
        <section>
            <div className="row justify-content-center">
                <nav className="p-20x">
                    <ul>
                        <li>TECH - Test</li>
                    </ul>
                </nav>
                <section className="p-20x">
                    <div className="flex">
                        <ArticleContainer />
                    </div>
                </section>
                <footer></footer>
            </div>
        </section>
    );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
