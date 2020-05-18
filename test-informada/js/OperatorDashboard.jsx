import Video from './Components/Dashboard/Video.jsx';
import QuestionList from './Components/Dashboard/QuestionList.jsx';
import Spinner from './Components/Spinner.jsx';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frames: [],
            cameras: [],
            questions: [],
            videoLink: '',
            currentCamera: { id: 0, name: "" },
            currentFrame: '',
            cameraLoaded: true,
            isFinish: false,
            freeFrames: 0,
            finishFrames: 0,
            lastCheckedQuestionName: '',
            createdDots: []
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onFrameUpdate = this.onFrameUpdate.bind(this);
        this.onCheckedQuestion = this.onCheckedQuestion.bind(this);
        this.onCreateDot = this.onCreateDot.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/Operator/GetFrames", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            this.setState({ frames: data.frames });
            this.setState({ cameras: data.cameras });
            this.setState({ questions: data.questions });
            this.setState({ currentCamera: data.cameras[0] });
            this.setState({ currentFrame: data.frames.find(c => c.cameraId === data.cameras[0].id) });
            this.setState({ videoLink: data.videoLink });
        }.bind(this);
        xhr.send();
    }

    // Загрузка количества необработанных фреймов
    loadFreeFrame() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/Operator/GetUserFramesInfo", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ freeFrames: data.availableCount });
            this.setState({ finishFrames: data.finishCount });
        }.bind(this);
        xhr.send();
    }

    onTextChange(value) {
        this.setState({ currentCamera: value });
        this.setState({ cameraLoaded: false });
        this.getUrlVideo();
    }

    onFrameUpdate() {
        let newFrame = this.state.frames.find(c => c.status === 'Assigned');
        this.setState({ createdDots: [] });
        this.setState({ lastCheckedQuestionName: '' });
        if (newFrame !== undefined) {
            let newCamera = this.state.cameras.find(c => c.id === newFrame.cameraId);
            this.setState({ currentFrame: newFrame });
            this.setState({ currentCamera: newCamera });
            this.getUrlVideo();
        }
        else {
            this.loadFreeFrame();
            this.setState({ isFinish: true });
        }
    }

    getUrlVideo() {
        this.setState({ cameraLoaded: false });
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/Operator/GetCameraUrl?frameId=" + this.state.currentFrame.id, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ videoLink: data.cameraUrl });
            this.setState({ cameraLoaded: true });
        }.bind(this);
        xhr.send();
    }

    onCheckedQuestion(val) {
        this.setState({ lastCheckedQuestionName: val });
    }

    onCreateDot(val) {
        let dots = this.state.createdDots;
        dots.push(val);
        this.setState({ createdDots: dots });
    }

    render() {
        const textVideo = this.state.currentCamera.name;
        const videoUrl = this.state.videoLink;
        const cameraId = this.state.currentCamera.id;
        const questions = this.state.questions.filter(c => c.cameraId === cameraId);
        const frame = this.state.currentFrame;
        const load = this.state.cameraLoaded;
        const frames = this.state.frames;
        const freeFrames = this.state.freeFrames;
        const finishFrames = this.state.finishFrames;
        const waitSec = 7;
        const lastCheckedQuestionName = this.state.lastCheckedQuestionName;
        const onCreateDot = this.onCreateDot;
        if (this.state.isFinish === true) {
            return (
                <div className="col-md-12">
                    <p>
                        Ура! Вы закончили обработку кадров. За сегодня вы обработали <strong>{finishFrames}</strong> кадров.
                    </p>
                    {freeFrames > 0 ?
                        <p>
                            У нас для Вас есть <strong>{freeFrames}</strong> не обработанных кадров. Хотите продолжить? <br />
                            <a className="btn btn-success ml-1" href="../Operator/GetTasks">Да, хочу!</a>
                        </p>
                        :
                        <p>
                            К сожалению у нас закончились карды. Если Вы хотите продолжить обработку кадров, попробуйте вернуться позже
                        </p>
                    }
                </div>
            );
        }
        if (this.state.cameras.length === 0) {
            return (
                <div className="col-md-3">
                    <Spinner nameSpinner="normal" />
                </div>
            );
        }
        return (
            <div className="row">             
                <div className="col-md-9" id="video_panel">
                    {load ?
                        <Video videoLink={videoUrl} nameVideo={textVideo} questName={lastCheckedQuestionName.text} dots={onCreateDot} />
                        :
                        <Spinner nameSpinner="normal" />
                    }
                    <div className="debug-info text-white">
                        {'ID=' + frame.id + ' Created At=' + frame.createdAt}
                    </div>
                </div>
                <div className="col-md-3" id="questions_list">
                    <QuestionList questions={questions} cameraId={cameraId} frame={frame} frames={frames}
                        onFrameUpdate={this.onFrameUpdate} onCheckedQuestion={this.onCheckedQuestion}
                        waitSec={waitSec} createdDots={this.state.createdDots} />
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('content')
);