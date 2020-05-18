import PlanItem from './PlanItem.jsx';
export default class PlanList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCamera: this.props.cameras[0]
        };
    }

    updateName = (value) => {
        this.setState({ currentCamera: value });
        this.props.onUpdate(value);
    }

    render() {
        var change = this.updateName;
        const crnt = this.state.currentCamera;
        const cameras = this.props.cameras;
        return (
            <div>
                <h4>План на сегодня</h4>
                <div className="btn-group-vertical plan-btn-container">
                    {
                        cameras.map(function (camera) {

                            return <PlanItem key={camera.id} camera={camera} onChange={change} crnt={crnt} />;
                        })
                    }
                </div>
            </div>
        );
    }
}