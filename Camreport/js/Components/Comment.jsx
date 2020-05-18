export default class Comment extends React.Component {
    state = {
        isOpen: true
    }

    handleClick = () => {
        console.log('Clicked');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const body = this.state.isOpen && 'Some comment';
        return (
            <div>
                <h3>{this.props.author}</h3>
                <p>{body}</p>
                <button onClick={this.handleClick}>
                    {this.state.isOpen ? 'close' : 'open'}
                </button>
            </div>
        );
    }
}