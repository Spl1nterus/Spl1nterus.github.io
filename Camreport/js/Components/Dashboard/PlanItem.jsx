export default class PlanItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.camera, crnt: props.crnt };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onChange(this.state.data);
    }

    render() {
        let activeClass = 'btn btn-outline-primary';
        if (this.state.data.id === this.props.crnt.id) {
            activeClass += ' active';
        }
        return (
            <button className={activeClass} type="button" onClick={this.onClick}>
                {this.state.data.name}
            </button>
        );
    }
}