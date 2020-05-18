import VerticalReport from './Components/Reports/VerticalReport.jsx';
import HorizontalReport from './Components/Reports/HorizontalReport.jsx';
import Spinner from './Components/Spinner.jsx';
import SummaryByDay from './Components/Reports/SummaryByDay.jsx';
import CameraFilter from './Components/Reports/CameraFilter.jsx';
import Offense from './Components/Reports/Offense.jsx';
import ModalShowPhoto from './Components/Reports/ModalShowPhoto.jsx';
import PrevNextArrow from './Components/PrevNextArrow.jsx';
import { FormatDateToHuman } from './Components/ReactTimeConverter.jsx';

class ClientReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayReportFilter: [],
            dayReport: [],
            monthReport: [],
            yearReport: [],
            loaded: false,
            targetDate: '',
            locationName: '',
            cameras: [],
            violationReportLoad: false,
            changedCamera: 0,
            violationSelected: '',
            framePhoto: '',
            isLoadFrame: false,
            frameId: '',
            frameTime: '',
            frameViolations: '',
            attentionPoints: [],
            violationsArr: [],
            cameraId: this.props.cameraId,
            prevFrame: '',
            nextFrame: '',
            filterFrames: [],
            frames: []
        };
        this.changeCamera = this.changeCamera.bind(this);
        this.changeViolation = this.changeViolation.bind(this);
        this.onPrevNextClick = this.onPrevNextClick.bind(this);
        this.clickOnPhoto = this.clickOnPhoto.bind(this);
        this.checkIsLoadFrame = this.checkIsLoadFrame.bind(this);
        this.changeFilterFrames = this.changeFilterFrames.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    // загрузка данных
    loadData() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        let year = url.searchParams.get("year");
        let month = url.searchParams.get("month");
        let day = url.searchParams.get("day");
        var location = url.searchParams.get("location");
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/Client/GetDetailReports/?locationId=" + location + "&year=" + year + "&month=" + month + "&day=" + day, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            var dayReport = data.dayReport.map(function (rep) {
                var data = rep.question, dataId = rep.questionId, count = rep.violationCount;
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
            this.setState({ violationReportLoad: true });
            this.setState({ loaded: true });
            this.setState({ targetDate: data.targetDate });
            this.setState({ locationName: data.locationName });
            this.setState({ cameras: data.cameras });
        }.bind(this);
        xhr.send();
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

    changeCamera(val) {
        this.setState({ violationReportLoad: false });
        var url_string = window.location.href;
        var url = new URL(url_string);
        let year = url.searchParams.get("year");
        let month = url.searchParams.get("month");
        let day = url.searchParams.get("day");
        var location = url.searchParams.get("location");
        let sendUrl = "/Client/GetViolationByCamera/?locationId=" + location + "&year=" + year + "&month=" + month + "&day=" + day;
        if (val > 0) {
            sendUrl += '&cameraId=' + val;
        }
        this.setState({ changedCamera: val });
        var xhr = new XMLHttpRequest();
        xhr.open("get", sendUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            var dayReport = data.report.map(function (rep) {
                var data = rep.question, dataId = rep.questionId, count = rep.violationCount;
                return ({
                    data: data,
                    dataId: dataId,
                    count: count
                });
            });
            this.setState({ dayReport: dayReport });
            this.setState({ dayReportFilter: dayReport });
            this.setState({ monthReport: data.monthReport });
            this.setState({ violationReportLoad: true });
        }.bind(this);
        xhr.send();
    }

    changeViolation(name) {
        let fFrames = this.state.frames;
        let filterFrames = this.state.frames.filter(function (el) {
            return el.violations.includes(name);
        });
        if (name !== 'Все нарушения') {
            fFrames = filterFrames;
        }
        this.setState({ filterFrames: fFrames });

        this.setState({ violationReportLoad: false });
        this.setState({ violationSelected: name, violationReportLoad: true });
    }

    changeFilterFrames(frames) {
        this.setState({ frames });
        this.setState({ filterFrames: frames });
    }

    clickOnPhoto(frameId) {
        let currentFrame = this.state.filterFrames.find(c => c.id === frameId);
        const convertedTime = FormatDateToHuman(currentFrame.createdAt);
        const violations = currentFrame.violations.join(', ');

        this.setState({ isLoadFrame: false });

        const indexFrame = this.state.filterFrames.findIndex(c => c.id === frameId);
        let nextFrame = -1;
        if (indexFrame < (this.state.filterFrames.length - 1)) {
            nextFrame = indexFrame + 1;
        }
        this.setState({ nextFrame: nextFrame });

        let prevFrame = -1;
        if (indexFrame !== 0) {
            prevFrame = indexFrame - 1;
        }
        this.setState({ prevFrame: prevFrame });

        var xhr = new XMLHttpRequest();
        xhr.open("get", "/Client/GetFramePhoto/" + frameId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({
                framePhoto: 'data:image/jpg;base64,' + data.photo.data,
                attentionPoints: data.attentionPoints, frameTime: convertedTime, frameViolations: violations, frameId, isLoadFrame: true
            });
        }.bind(this);
        xhr.send();
    }

    checkIsLoadFrame(isLoadFrame) {
        this.setState({ isLoadFrame });
    }

    onPrevNextClick(prevNext) {
        let frameId = -1;
        if (prevNext === 'prev') {
            frameId = this.state.prevFrame;
        }
        if (prevNext === 'next') {
            frameId = this.state.nextFrame;
        }
        if (frameId !== -1) {
            const frame = this.state.filterFrames[frameId];
            this.clickOnPhoto(frame.id);
        }
    }

    render() {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let year = url.searchParams.get("year");
        let month = url.searchParams.get("month");
        let day = url.searchParams.get("day");
        let location = url.searchParams.get("location");
        let link = '&locationId=' + location;
        if (year !== null && year !== 'null') {
            link += '&dateStart=' + year + '-' + month + "-" + day + '&dateFinish=' + year + '-' + month + "-" + day;
        }
        const load = this.state.loaded;
        const dayReport = this.state.dayReport;
        const monthReport = this.state.monthReport;
        const targetDate = new Date(this.state.targetDate);
        let totalDay = 0;
        const linksDayReport = [];
        for (var i = 0; i < dayReport.length; i++) {
            totalDay += dayReport[i].count << 0;
            linksDayReport.push("/Client/FrameHistory?violationId=1&questionId=" + dayReport[i].dataId + link);
        }
        let totalMonth = 0;
        for (let i = 0; i < monthReport.length; i++) {
            totalMonth += monthReport[i].violationCount << 0;
        }
        let avgMonth = totalMonth / monthReport.length;

        let monthLabel = [];
        let monthData = monthReport.map(c => c.violationCount);
        const linkReport = [];
        for (let i = 1; i <= monthReport.length; i++) {
            monthLabel.push(i);
            linkReport.push('/Client/ReportDetail?year=' + targetDate.getFullYear() + '&month=' + (targetDate.getMonth() + 1) + '&day=' + i + '&location=' + location);
        }

        let monthPrev = new Date(targetDate);
        monthPrev.setDate(targetDate.getDate() - 1);
        let linkPrev = `?location=${location}&year=${monthPrev.getFullYear()}&month=${monthPrev.getMonth() + 1}&day=${monthPrev.getDate()}`;
        let monthNext = new Date(targetDate);
        monthNext.setDate(targetDate.getDate() + 1);
        let linkNext = `?location=${location}&year=${monthNext.getFullYear()}&month=${monthNext.getMonth() + 1}&day=${monthNext.getDate()}`;
        let linkThisPage = `../client/reportdetail?location=${location}&`;

        let stringDate = this.DayToHuman(targetDate);
        return (
            <React.Fragment>
                {load ?
                    <React.Fragment>
                        <ModalShowPhoto photo={this.state.framePhoto} attentionPoints={this.state.attentionPoints} isLoad={this.state.isLoadFrame}
                            date={stringDate} time={this.state.frameTime} violations={this.state.frameViolations} frameId={this.state.frameId}
                            onPrevNextClick={this.onPrevNextClick} />
                        <section className="report__top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 col-12">
                                        <div className="row mb-5">
                                            <div className="col-lg-9 col-sm-10 col-10 pl-sm-3 pl-0">
                                                <div className="report__object">
                                                    <h3>{this.state.locationName}</h3>
                                                    <PrevNextArrow monthName={stringDate} linkPrev={linkPrev} linkNext={linkNext} linkPage={linkThisPage} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3>Статистика за день</h3>
                                                <CameraFilter cameras={this.state.cameras} onChangeCamera={this.changeCamera} />
                                                {this.state.violationReportLoad ?
                                                    <VerticalReport report={dayReport} reportFilter={this.state.dayReportFilter} changeViolation={this.changeViolation} />
                                                    :
                                                    <Spinner nameSpinner="normal" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SummaryByDay totalViolation={totalDay} avgViolation={avgMonth.toFixed()} />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-12">
                                        <h3>Динамика нарушений за месяц</h3>
                                        {this.state.violationReportLoad ?
                                            <HorizontalReport label={monthLabel} data={monthData} type='line' labelName='Все нарушения' links={linkReport} />
                                            :
                                            <Spinner nameSpinner="normal" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>

                        {this.state.violationReportLoad ?
                            <section className="offense">
                                <div className="container">
                                    <Offense humanDate={stringDate} cameraId={this.state.changedCamera}
                                        violationSelected={this.state.violationSelected} changeViolation={this.changeViolation}
                                        clickOnPhoto={this.clickOnPhoto} checkIsLoadFrame={this.checkIsLoadFrame}
                                        changeFilterFrames={this.changeFilterFrames}/>
                                </div>
                            </section>
                            :
                            <Spinner nameSpinner="normal" />
                        }

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