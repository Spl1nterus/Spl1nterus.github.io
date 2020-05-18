export default class SummaryByMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const totalViolation = this.props.totalViolation;
        let prevViolation = this.props.totalPrevViolation;
        let percentPrevViolation = '0';
        let cssPercent = 'summary__comment';
        if (prevViolation === 0) {
            prevViolation = totalViolation;
        }
        let prc = (totalViolation / prevViolation) * 100;
        if (prevViolation > totalViolation) {
            percentPrevViolation = '-' + prc.toFixed() + '%';
            cssPercent += ' green';
        }
        else {
            percentPrevViolation = '+' + (prc.toFixed() - 100) + '%';
            cssPercent += ' red';
        }
        return (
            <div className="summary">
                <div className="summary__item">
                    <div className="number">{totalViolation}</div>
                    <div className={cssPercent}>{percentPrevViolation}</div>
                    <div className="text">Всего нарушений</div>
                </div>
                <div className="summary__item">
                    <div className="number">~{this.props.avgViolation}</div>
                    <div className="text">Нарушений в день</div>
                </div>
                <div className="summary__item">
                    <div className="number">{prevViolation}</div>
                    <div className="text">Нарушений за прошлый период</div>
                </div>
            </div>
        );
    }
}