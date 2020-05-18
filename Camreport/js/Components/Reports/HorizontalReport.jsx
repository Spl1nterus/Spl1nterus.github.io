export default class HorizontalReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartJs: ''
        };
        this.graphClickEvent = this.graphClickEvent.bind(this);
    }

    componentDidMount() {
        this.loadJS();
    }

    loadJS() {
        let ctx = $(this.refs.horizontalBarChart);
        let chart = new Chart(ctx, {
            type: this.props.type,
            data: {
                labels: this.props.label,
                datasets: [{
                    label: this.props.labelName,
                    data: this.props.data,
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                onClick: this.graphClickEvent
            }
        });
        this.setState({ chartJs: chart });
    }

    graphClickEvent(event, array) {
        if (this.props.links !== undefined) {
            var checkedElement = this.props.links[array[0]._index];
            location.href = checkedElement;
        }
    }

    render() {
        
        return (
            <canvas id="horizontalBarChart" ref="horizontalBarChart" width="400" height="200" />
        );
    }
}