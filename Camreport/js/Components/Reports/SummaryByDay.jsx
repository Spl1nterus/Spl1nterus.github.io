export default class SummaryByDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const totalViolation = this.props.totalViolation;
        let avgViolation = this.props.avgViolation;
        if (avgViolation === 0) {
            avgViolation = totalViolation;
        }
        let percentPrevViolation = '0';
        let cssPercent = 'summary__comment';
        let prc = (totalViolation / avgViolation) * 100;
        if (avgViolation > totalViolation) {            
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
            </div>
        );
    }
}