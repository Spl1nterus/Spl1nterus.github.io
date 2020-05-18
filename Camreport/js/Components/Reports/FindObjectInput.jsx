export default class FindObjectInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCheckFindInput(event.target.value);
    }

    render() {
        return (
            <div className="objects__search-sort">
                <div className="objects__search">
                    <svg width="17" height="17" role="img"><use xlinkHref='/img/sprite.svg#loupe' /></svg>
                    <input type="search" id="site-search" name="q" placeholder="Найти объект" className="ml-1" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}