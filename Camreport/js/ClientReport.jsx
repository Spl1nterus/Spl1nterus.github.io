import VerticalReport from './Components/Reports/VerticalReport.jsx';
import MonthFilterReport from './Components/Reports/MonthFilterReport.jsx';
import Spinner from './Components/Spinner.jsx';
import SummaryByMonth from './Components/Reports/SummaryByMonth.jsx';
import FindObjectInput from './Components/Reports/FindObjectInput.jsx';
import PrevNextArrow from './Components/PrevNextArrow.jsx';

class ClientReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayReportFilter: [],
            dayReport: [],
            monthReport: [],
            yearReport: [],
            locationArr: [],
            loaded: false,
            targetDate: '',
            totalPrevViolation: 0
        };
        this.onCheckFindInput = this.onCheckFindInput.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    // загрузка данных
    loadData() {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let year = url.searchParams.get("year");
        let month = url.searchParams.get("month");
        let day = url.searchParams.get("day");
        let location = url.searchParams.get("location");
        let xhr = new XMLHttpRequest();
        xhr.open("get", "/Client/GetConsolidatedReports?year=" + year + "&month=" + month + "&day=" + day + "&location=" + location + "", true);
        xhr.onload = function () {
            console.log(xhr.responseText);
            let data = JSON.parse(xhr.responseText);
            let dayReport = data.dayReport.map(function (rep) {
                let data = rep.location, dataId = rep.locationId, count = rep.violationCount;
                return ({
                    data: data,
                    dataId: dataId,
                    count: count
                });
            });
            this.setState({ dayReport: dayReport });
            this.setState({ dayReportFilter: dayReport });
            this.setState({ monthReport: data.monthReport });
            this.setState({ yearReport: data.yearReport });
            this.setState({ loaded: true });
            this.setState({ targetDate: data.targetDate });
            this.setState({ locationArr: data.locationArr });
            this.setState({ totalPrevViolation: data.totalPrevViolation });
        }.bind(this);
        xhr.send();
    }

    onCheckFindInput(val) {
        let monthReport = this.state.dayReport.filter(function (el) {
            return el.data.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });

        this.setState({ dayReportFilter: monthReport });
    }

    DayToHuman(date) {
        let dateNow = new Date(Date.now());
        let dateYesterday = new Date(Date.now());
        dateYesterday = new Date(dateYesterday.setDate(dateYesterday.getDate() - 1));
        let optionsDate = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        let stringDate = '';
        if (dateNow.toDateString() === date.toDateString()) {
            stringDate = 'сегодня ';
        }
        else if (dateYesterday.toDateString() === date.toDateString()) {
            stringDate = 'вчера ';
        }
        stringDate += date.toLocaleDateString('ru-RU', optionsDate);
        return stringDate;
    }

    render() {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let year = url.searchParams.get("year");
        let month = url.searchParams.get("month");
        let day = url.searchParams.get("day");
        let link = '&year=' + year + "&month=" + month + "&day=" + day;
        const load = this.state.loaded;
        const dayReport = this.state.dayReport;
        const monthReport = this.state.monthReport;
        const linkReport = [];
        const targetDate = new Date(this.state.targetDate);
        const linksDayReport = [];
        for (var i = 0; i < dayReport.length; i++) {
            linksDayReport.push("../Client/ReportDetail?location=" + dayReport[i].dataId + link);
        }
        let totalMonth = 0;
        for (let i = 0; i < monthReport.length; i++) {
            totalMonth += monthReport[i].violationCount << 0;
        }
        let avgMonth = totalMonth / monthReport.length;

        let monthLabel = [];
        let monthData = monthReport.map(c => c.violationCount);
        for (let i = 1; i <= monthReport.length; i++) {
            monthLabel.push(i);
            linkReport.push('../Client/Report?year=' + targetDate.getFullYear() + '&month=' + (targetDate.getMonth() + 1) + '&day=' + i);
        }
        let monthPrev = new Date(targetDate);
        monthPrev.setDate(targetDate.getDate() - 1);
        let linkPrev = `?year=${monthPrev.getFullYear()}&month=${monthPrev.getMonth() + 1}&day=${monthPrev.getDate()}`;
        let monthNext = new Date(targetDate);
        monthNext.setDate(targetDate.getDate() + 1);
        let linkNext = `?year=${monthNext.getFullYear()}&month=${monthNext.getMonth() + 1}&day=${monthNext.getDate()}`;
        let linkThisPage = '../client/report?';

        let stringDate = this.DayToHuman(targetDate);
        return (
            <React.Fragment>
                {load ?
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <MonthFilterReport label={monthLabel} data={monthData} type='bar'
                                        links={linkReport} year={targetDate.getFullYear()} month={targetDate.getMonth() + 1} monthName={targetDate.toLocaleString('ru-RU', { month: 'long' })}
                                        locations={this.state.locationArr} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <SummaryByMonth totalViolation={totalMonth} avgViolation={avgMonth.toFixed()} totalPrevViolation={this.state.totalPrevViolation} />
                                </div>
                            </div>
                        </div>
                        <div className="objects bg-light">
                            <div className="container overflow-hidden h-100">
                                <div className="row mb-4">
                                    <div className="col-lg-8 col-md-7 col-12 firstLetterUpper objects__today">
                                        <PrevNextArrow monthName={stringDate} linkPrev={linkPrev} linkNext={linkNext} linkPage={linkThisPage} />
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-12">
                                        <FindObjectInput onCheckFindInput={this.onCheckFindInput} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <VerticalReport report={dayReport} links={linksDayReport} reportFilter={this.state.dayReportFilter} />
                                    </div>
                                </div>
                            </div>
                            <div className="objects__bottom" />
                            <button className="button button_more">
                                <span>Показать все</span> <i className="fas fa-chevron-down" />
                            </button>
                        </div>
                    </React.Fragment>
                    :
                    <div className="col-12">
                        <Spinner nameSpinner="normal" />
                    </div>
                }
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <ClientReport />,
    document.getElementById('content')
);