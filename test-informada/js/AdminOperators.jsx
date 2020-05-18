import HorizontalReport from './Components/Reports/HorizontalReport.jsx';
import Spinner from './Components/Spinner.jsx';
class OperatorActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userActivity: [],
            operators: [],
            changedOperator: '',
            loaded: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
        this.loadUsers();
    }

    handleChange(event) {
        const val = event.target.value;
        this.setState({ loaded: false });
        this.setState({ changedOperator: val });
        this.loadData(val);
    }

    // загрузка данных
    loadData(userId) {
        let dateNow = new Date;
        let year = dateNow.getFullYear();
        let month = dateNow.getMonth() + 1;
        let params = (new URL(document.location)).searchParams;
        if (params.has('year') === true) {
            year = params.get('year');
            month = params.get('month');
        }
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/Admin/GetOperatorsActivity?year=' + year + '&month=' + month + '&userId=' + userId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ userActivity: data.activity });
            this.setState({ loaded: true });
        }.bind(this);
        xhr.send();
    }

    // Загрузка операторов
    loadUsers() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/Admin/GetOperators', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ operators: data.users });
        }.bind(this);
        xhr.send();
    }

    render() {
        const monthReport = this.state.userActivity;
        const load = this.state.loaded;
        let monthLabel = monthReport.map(c => c.date);
        let totalFrames = 0;
        for (var i = 0; i < monthLabel.length; i++) {
            let dateActivity = new Date(monthLabel[i]);
            var options = { day: 'numeric' };
            monthLabel[i] = dateActivity.toLocaleDateString('ru-RU', options);
        }
        let monthData = monthReport.map(c => c.count);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if (monthData.length > 0) {
            totalFrames = monthData.reduce(reducer);
        }
        
        return (
            <div className="row">
                <div className="col-12">
                    <select onChange={this.handleChange} value={this.state.changedOperator} className='form-control mb-3'>
                        <option value="">-- Все операторы --</option>
                        {
                            this.state.operators.map(function (operator) {
                                let userName = '';
                                if (operator.lastName !== null) {
                                    userName = operator.lastName;
                                }
                                if (operator.firstName !== null) {
                                    userName += ' ' + operator.firstName;
                                }
                                userName += ' ' + operator.email;
                                return <option value={operator.id} key={operator.id}>{userName}</option>;
                            })
                        }
                    </select>
                    <h3>Всего кадров: {totalFrames}</h3>
                    {load ?
                        <HorizontalReport label={monthLabel} data={monthData} type='bar' labelName='Обработанные кадры' />
                        :
                        <Spinner nameSpinner="normal" />
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <OperatorActivity />,
    document.getElementById('content')
);