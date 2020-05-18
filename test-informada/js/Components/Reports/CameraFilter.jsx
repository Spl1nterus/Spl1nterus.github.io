export default class CameraFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0
        };
        this.clickCameraItem = this.clickCameraItem.bind(this);
    }

    clickCameraItem(cameraId) {
        this.setState({ activeItem: cameraId });
        this.props.onChangeCamera(cameraId);
    }

    render() {
        let cssAllCamera = 'tab__item';
        if (this.state.activeItem === 0) {
            cssAllCamera += ' active';
        }
        let activeItem = this.state.activeItem;
        return (
            <ul className="tabs">
                <li className={cssAllCamera} onClick={this.clickCameraItem.bind(this, 0)}>Все камеры</li>
                {this.props.cameras !== null
                    ?
                    this.props.cameras.map(item => {
                        let cssItem = 'tab__item';
                        if (item.id === activeItem) {
                            cssItem += ' active';
                        }
                        return (
                            <li className={cssItem} key={item.id} onClick={this.clickCameraItem.bind(this, item.id)}>{item.name}</li>
                        );
                    })
                    :
                    ''
                }
            </ul>
        );
    }
}