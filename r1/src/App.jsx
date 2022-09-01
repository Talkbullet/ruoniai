import './App.scss';
import Text from './Components/017/Text';
import { useState } from "react";
import Show from './Components/017/Show';
import Cb from './Components/017/Cb';

function App() {

    const [showText, setShowText] = useState('');
    const [color, setColor] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <div className="dog-bin">
                    <div className="dog" style={{backgroundColor: color ? 'crimson' : 'black'}}></div>
                </div>
                <h1>State Uplifting</h1>
                <Text setShowText={setShowText} />
                <Show showText={showText} />
                <Cb setColor={setColor} />
            </header>
        </div>
    );
}

export default App;