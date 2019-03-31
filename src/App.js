import React, {Component} from 'react';
import './App.css';
import InputValue from "./components/InputValue";
import CurrentTable from "./components/CurrentTable";

class App extends Component {
    state = {
        data: [],
        curUAH: {txt: "Українська гривня", rate: 1, cc: "UAH"}
    };

    componentDidMount() {
        this.backFunc();
    };

    backFunc = async () => {
        const res = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`);
        const data = await res.json();
        data.unshift(this.state.curUAH);
        this.setState({data});
    };

    render() {
        return (
            <div className="App">
                <InputValue val="100" currentSelectCountry={this.state.data}/>
                <hr/>
                <CurrentTable currentCountryTable={this.state.data}/>
            </div>
        );
    }
}

export default App;
