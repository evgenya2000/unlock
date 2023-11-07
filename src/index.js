import React from 'react';
import ReactDOM from 'react-dom/client';

import "./resert.css";
import "./index.css";

import './fonts/CocoGothicAlternate-Bold.ttf';
import './fonts/CocoGothicAlternate.ttf';

import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Footer />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)

