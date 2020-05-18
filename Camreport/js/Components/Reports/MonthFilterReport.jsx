import HorizontalReport from './HorizontalReport.jsx';

export default class MonthFilterReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputYear: props.year,
            inputMonth: props.month,
            inputObject: '',
            nameObject: ''
        };

        this.loadJS = this.loadJS.bind(this);
        this.monthPickerClick = this.monthPickerClick.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.changeObject = this.changeObject.bind(this);
    }

    componentDidMount() {
        this.loadJS();
    }

    componentWillReceiveProps(props) {
        this.setState({ inputYear: props.year });
        this.setState({ inputMonth: props.month });

        let url_string = window.location.href;
        let url = new URL(url_string);
        let urlObject = url.searchParams.get("location");
        if (urlObject === null || urlObject === undefined || urlObject === 0) {
            this.setState({ inputObject: 0 });
        }
        else if (props.locations.length !== 0) {
            this.setState({ inputObject: parseInt(urlObject) });
        }
    }

    loadJS() {
        let monthClick = this.monthPickerClick;
        $(this.refs.monthPicker).datepicker({
            autoclose: true,
            language: "ru",
            format: "MM yy",
            startView: 1,
            viewMode: "months",
            minViewMode: "months"
        })
            .on('changeMonth', function (e) {
                monthClick(e.date.getFullYear(), (e.date.getMonth() + 1));
            });
    }

    monthPickerClick(year, month) {
        $(this.refs.monthPicker).datepicker('setDate', new Date(year, month, 1));
        $(this.refs.monthPicker).datepicker('hide');
        this.setState({ inputYear: year });
        this.setState({ inputMonth: month });
    }

    changeFilter() {
        location.href = '../client/report?year=' + this.state.inputYear + '&month=' + this.state.inputMonth + '&day=1' + '&location=' + this.state.inputObject;
    }

    changeObject(event) {
        let idObject = parseInt(event.target.value);

        this.setState({ inputObject: idObject });
    }

    render() {
        let month = this.state.inputMonth;
        let monthArray = {
            1: 'Январь',
            2: 'Февраль',
            3: 'Март',
            4: 'Апрель',
            5: 'Май',
            6: 'Июнь',
            7: 'Июль',
            8: 'Август',
            9: 'Сентябрь',
            10: 'Октябрь',
            11: 'Ноябрь',
            12: 'Декабрь'
        };
        let nameObject = 'Все обекты';
        if (this.props.locations.length > 0) {
            const object = this.props.locations.find(c => c.key === this.state.inputObject);
            if (object !== undefined) {
                nameObject = object.value;
            }
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Динамика нарушений</h2>
                        <div className="dinamic__filter justify-content-center">
                            <select className="form-control filter__select" onChange={this.changeObject} value={this.state.inputObject}>
                                <option value="0">Все объекты</option>
                                {                                    
                                    this.props.locations.map(function (item) {
                                        return (
                                            <option key={item.key} value={item.key}>{item.value}</option>
                                        );
                                    })
                                }
                            </select>
                            <b className="filter_datepicker-show firstLetterUpper month-picker" ref="monthPicker">{monthArray[month]} {this.state.inputYear}</b>
                            <div className="text-center">
                                <button className="button filter__button" onClick={this.changeFilter}>Построить график</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.locations.length > 0 ?
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <HorizontalReport label={this.props.label} data={this.props.data} type='line' labelName={nameObject} links={this.props.links} />
                        </div>
                    </div>
                    :
                    ''
                }

            </React.Fragment>
        );
    }
}