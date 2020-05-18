import HorizontalReport from './Components/Reports/HorizontalReport.jsx';
import Spinner from './Components/Spinner.jsx';
class OperatorActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userActivity: [],
            loaded: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    // загрузка данных
    loadData() {
        let dateNow = new Date;
        let year = dateNow.getFullYear();
        let month = dateNow.getMonth() + 1;
        let params = (new URL(document.location)).searchParams;
        if (params.has('year') === true) {
            year = params.get('year');
            month = params.get('month');
        }
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/Operator/GetUserActivity?year=' + year + '&month=' + month, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ userActivity: data.activity });
            this.setState({ loaded: true });
        }.bind(this);
        xhr.send();
    }

    render() {
        const load = this.state.loaded;
        const monthReport = this.state.userActivity;
        let monthLabel = monthReport.map(c => c.date);
        for (var i = 0; i < monthLabel.length; i++) {
            let dateActivity = new Date(monthLabel[i]);
            var options = { day: 'numeric' };
            monthLabel[i] = dateActivity.toLocaleDateString('ru-RU', options);
        }
        let monthData = monthReport.map(c => c.count);
        return (
            <div className="row">
                <div className="col-12">
                    {load ?
                        <HorizontalReport label={monthLabel} data={monthData} type='bar' labelName='Все кадры' />
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