export default class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.question };
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked(e) {
        const checkedItem = this.props.question;
        checkedItem.isGood = e.target.checked;
        this.setState({ data: checkedItem });
        this.props.currentQuestion(this.state.data);
    }

    render() {
        const inputId = 'checkQuestion' + this.props.question.id;
        const isGood = this.props.question.isGood === true;
        return (
            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id={inputId} onChange={this.handleChecked}
                    checked={isGood} />
                <label className="form-check-label" htmlFor={inputId}>
                    {this.props.question.text} <i className="fas fa-info-circle" data-toggle="tooltip" title={this.props.question.description} />
                </label>
            </div>
        );
    }
}