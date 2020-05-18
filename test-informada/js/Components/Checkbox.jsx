export default class Checkbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <input id={this.props.id} type='checkbox' name={this.props.name} checked={this.props.checked} onChange={this.props.onChange} />
        );
    }
}