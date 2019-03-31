import React, {Component} from 'react';
import "./InputValue.css";

class InputValue extends Component {
    state = {
        getMoney: undefined,
        curUAH: {txt: "Українська гривня", rate: 1, cc: "UAH"}
    };
    getMoney = async (e) => {
        e.preventDefault();
        const countCurrency = e.target.elements.exchangeInput.value;
        const typeExchangeCurrency = e.target.elements.exchangeSelect.value;
        const typeGetCurrency = e.target.elements.getSelect.value;
        const api_url = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`);
        const data = await api_url.json();
        data.unshift(this.state.curUAH);

        let currentExchange, currentGet;

        if (typeExchangeCurrency === typeGetCurrency) {
            this.setState({
                getMoney: countCurrency
            });
        } else {
            for (let key in data) {
                if (data[key]["cc"] === typeExchangeCurrency) {
                    currentExchange = data[key]["rate"] * countCurrency;
                }

                if (data[key]["cc"] === typeGetCurrency) {
                    currentGet = data[key]["rate"];
                }
            }
            this.setState({
                getMoney: (currentExchange / currentGet).toFixed(2)
            });
        }


    };

    render() {
        return (
            <div className="dflex-col">
                <form className="dflex-col" onSubmit={this.getMoney}>
                    <h1>Конвертирование валют</h1>
                    <div className="currentBlock dflex">
                        <div className="blockSelect">
                            <select defaultValue="USD" name="exchangeSelect">
                                {
                                    this.props.currentSelectCountry.map((item) =>
                                        <option value={item["cc"]} key={item["cc"]}>{item["txt"]}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="inputBlock">
                            <label htmlFor="exchangeInput">Обмениваю</label>
                            <input type="text" id="exchangeInput" name="exchangeInput" defaultValue={this.props.val}/>
                        </div>
                        <div className="inputBlock">
                            <label htmlFor="getInput" className="right">Получаю</label>
                            <input type="text" id="getInput" name="getInput" defaultValue={this.state.getMoney}
                                   placeholder="0"/>
                        </div>
                        <div className="blockSelect">
                            <select defaultValue="USD" name="getSelect">
                                {
                                    this.props.currentSelectCountry.map((item) =>
                                        <option value={item["cc"]} key={item["cc"]}>{item["txt"]}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <button type="submit">Конвертировать</button>
                </form>
            </div>
        );
    }

}

export default InputValue;