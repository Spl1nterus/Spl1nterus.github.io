export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const nameSpinner = this.props.nameSpinner;
        return (
            <div>
            {nameSpinner === 'small' ?
                    <div className="loader-small">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        </svg>
                    </div>
                :
                <div id="content">
                    <div id="preloader">
                        <div id="loader" />
                    </div>
                </div>
                }
            </div>
        );
    }
}