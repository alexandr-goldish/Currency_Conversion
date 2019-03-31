import React, {Component} from 'react';
import "./CurrentTable.css";


class CurrentTable extends Component {
    render() {
        return (
            <div className="tableCurrent">
                <h1>Таблица курса относительно гривны</h1>
                <table>
                    <tbody>
                    {
                        this.props.currentCountryTable.map((item,index) =>
                            <tr className={index%2===0 ? 'da' : ''} key={index}>
                                <td>{item["txt"]}</td>
                                <td style={{width: 25 + '%'}}>{item["cc"]}</td>
                                <td>{item["rate"]}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default CurrentTable;