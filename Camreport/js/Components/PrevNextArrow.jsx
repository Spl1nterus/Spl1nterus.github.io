export default class PrevNextArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.loadJS = this.loadJS.bind(this);
        this.monthPickerClick = this.monthPickerClick.bind(this);
    }

    componentDidMount() {
        this.loadJS();
    }

    loadJS() {
        let monthClick = this.monthPickerClick;
        $(this.refs.monthPicker).datepicker({
            autoclose: true,
            language: "ru",
            format: "yyyy-mm-dd"
        })
            .on('changeDate', function (e) {
                monthClick(e.date.getFullYear(), (e.date.getMonth() + 1), e.date.getDate());
            });
    }

    monthPickerClick(year, month, day) {
        $(this.refs.monthPicker).datepicker('hide');
        location.href = this.props.linkPage + `year=${year}&month=${month}&day=${day}`;
    }

    render() {
        return (
            <React.Fragment>
                <a href={this.props.linkPrev}><i className="fas fa-chevron-left mr-2" style={{ fontSize: 20 }} /></a>
                <h2 className="d-inline-block firstLetterUpper">
                    <span className="month-picker" ref="monthPicker">{this.props.monthName}</span> <strong>{this.props.boldTitle}</strong>
                </h2>
                <a href={this.props.linkNext}><i className="fas fa-chevron-right ml-2" style={{ fontSize: 20 }} /></a>
            </React.Fragment>
        );
    }
}