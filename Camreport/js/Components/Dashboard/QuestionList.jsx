import QuestionItem from './QuestionItem.jsx';
import Spinner from '../Spinner.jsx';
export default class DashboardQuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionLoaded: true,
            waitSec: 3,
            currentWaitSec: 3
        };

        this.onClick = this.onClick.bind(this);
        this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
    }

    componentDidMount() {
        this.waitTimer();
    }

    waitTimer(){
        this.timer = setInterval(() => {
            this.setState({
                currentWaitSec: this.state.currentWaitSec - 1
            });
            if (this.state.currentWaitSec === 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    onClick(e) {
        this.setState({ questionLoaded: false });
        let quest = this.props.questions;
        let frame = this.props.frame;
        let _this = this.props;
        let _mainThis = this;
        this.setState({
            currentWaitSec: this.state.waitSec
        });

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Operator/SendAnswer");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            frame.status = 'Completed';
            quest.map(function (question) {
                question.isGood = false;
            });
            _mainThis.setState({ questionLoaded: true });
            _mainThis.waitTimer();
            _this.onFrameUpdate();
        }.bind(this);
        xhr.send('frameId=' + frame.id + '&questions=' + JSON.stringify(quest) + '&screenshotTime=' + frame.planTimestamp + '&dots=' + JSON.stringify(this.props.createdDots));

        console.log(this.props.createdDots);
    }

    getCurrentQuestion(val) {
        this.props.onCheckedQuestion(val);
    }

    render() {
        const load = this.state.questionLoaded;
        const questions = this.props.questions;
        const framesLength = 50 - this.props.frames.filter(c => c.status === 'Assigned').length;
        const framesPercent = framesLength / 50 * 100 + '%';
        const waitSec = this.state.currentWaitSec;
        const getCurrentQuestion = this.getCurrentQuestion;
        $('[data-toggle="tooltip"]').tooltip();
        return (
            <div className="check-list-container shadow-sm">
                <h4>Checklist</h4>
                {load &&
                    < div >
                        <small className="text-muted"><i className="fas fa-film" /> {framesLength}/50</small>
                        <div className="progress mb-3">
                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: framesPercent }} aria-valuenow={framesLength} aria-valuemin="0" aria-valuemax="50" />
                        </div>
                    </div>
                }                
                {load ?
                    questions.map(function (question) {

                        return <QuestionItem key={question.id} question={question} currentQuestion={getCurrentQuestion} />;
                    })
                    :
                    <Spinner nameSpinner="normal" />
                }
                {waitSec !== 0 ?
                    <button className="btn btn-secondary btn-block mt-2" disabled>Следующий кадр ({waitSec})</button>
                    :
                    <button className="btn btn-success btn-block mt-2" onClick={this.onClick}>Следующий кадр</button>
                }
            </div>
        );
    }
}