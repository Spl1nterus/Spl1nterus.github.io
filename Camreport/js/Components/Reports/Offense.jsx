import Spinner from '../Spinner.jsx';
import { FormatDateToHuman } from '../ReactTimeConverter.jsx';
export default class Offense extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            frames: [],
            filterFrames: [],
            framePhoto: '',
            isLoad: false,
            frameId: '',
            frameTime: '',
            frameViolations: '',
            attentionPoints: [],
            violationsArr: [],
            cameraId: this.props.cameraId,
            prevFrame: '',
            nextFrame: ''
        };
        this.openModal = this.openModal.bind(this);
        this.changeViolation = this.changeViolation.bind(this);
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
        var cameraId = this.state.cameraId;
        if (cameraId === 0) {
            cameraId = null;
        }
        xhr.open("get", "/Client/LocationFrame/?locationId=" + location + "&year=" + year + "&month=" + month + "&day=" + day + '&cameraId=' + cameraId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            var filterFrames = data.frameHistories;
            this.setState({ frames: filterFrames });
            this.setState({ filterFrames: filterFrames });
            this.setState({ violationsArr: data.violationsArr });
            this.setState({ loaded: true });
            this.props.changeFilterFrames(filterFrames);
        }.bind(this);
        xhr.send();
    }

    openModal(frameId) {
        this.props.clickOnPhoto(frameId);
    }

    changeViolation(event) {
        let fFrames = this.state.frames;
        let filterFrames = this.state.frames.filter(function (el) {
            return el.violations.includes(event.target.value);
        });
        if (event.target.value !== 'Все нарушения') {
            fFrames = filterFrames;
        }
        this.setState({ filterFrames: fFrames });
        this.props.changeViolation(event.target.value);
    }

    render() {
        const opnMdl = this.openModal;
        let filterFrames = this.state.filterFrames;
        let propVS = this.props.violationSelected;
        if (propVS !== '' && propVS !== 'Все нарушения') {
            filterFrames = this.state.frames.filter(function (el) {
                return el.violations.includes(propVS);
            });
        }
        
        return (
            <React.Fragment>
                {this.state.loaded ?
                    <React.Fragment>
                        <div className="offense__filter" id='offense-filter'>
                            <div className="filter__item">
                                <label htmlFor="filter__type">Вид нарушения:</label>
                                <select className="form-filter filter__type filter__select" onChange={this.changeViolation} value={propVS}>
                                    <option value="Все нарушения">Все нарушения</option>
                                    {
                                        this.state.violationsArr.map(function (item) {
                                            return (
                                                <option key={item} value={item}>{item}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        {
                            this.state.frames.map(function (item) {
                                const convertedTime = FormatDateToHuman(item.createdAt);
                                const violations = item.violations.join(', ');
                                let cssHide = 'offense__item cursor-pointer';
                                if (!filterFrames.includes(item)) {
                                    cssHide += ' d-none';
                                }
                                return (
                                    <div className={cssHide} key={item.id} data-toggle="modal" data-target="#gallery" onClick={opnMdl.bind(this, item.id)}>
                                        <div className="row">
                                            <div className="col-lg-1 col-md-2 col-3">
                                                <div className="offense__time camera_color1 time-converter">{convertedTime}</div>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-9 pl-sm-3 pl-0">
                                                <div className="offense__descript critical">
                                                    <svg width="16" height="16" role="img" fill="#EC6B60">
                                                        <use xlinkHref="/img/sprite.svg#error-circle" />
                                                    </svg>
                                                    {violations}
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-12">
                                                <div className="offense__photo">
                                                    <a>
                                                        <svg width="24" height="24" role="img">
                                                            <use xlinkHref="/img/sprite.svg#camera" />
                                                        </svg> 
                                                        Фото
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </React.Fragment>
                    :
                    <Spinner nameSpinner="normal" />
                }
            </React.Fragment>
        );
    }
}