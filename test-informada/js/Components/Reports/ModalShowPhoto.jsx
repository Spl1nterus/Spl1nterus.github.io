import Spinner from '../Spinner.jsx';
export default class ModalShowPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: this.props.isLoad
        };
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    componentDidMount() {
        let modal = document.getElementById('gallery');
        document.body.appendChild(modal);
    }

    onClickPrev() {
        this.props.onPrevNextClick('prev');
    }

    onClickNext() {
        this.props.onPrevNextClick('next');
    }

    render() {
        return (
            <div className="modal fade" id="gallery" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {this.props.isLoad ?
                                <div className="outfit">
                                    <img className="img-fluid gallery__img" src={this.props.photo} />
                                    {
                                        this.props.attentionPoints.map(function (item) {
                                            return (
                                                <div key={item.top + '-' + item.left} className="dot" style={{ top: item.top + '%', left: item.left + '%' }} title={item.description} >
                                                    <div className="small-circle" />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                :
                                <Spinner nameSpinner="normal" />
                            }


                            <div className="prev-btn">
                                <svg width="48" height="48" role="img" onClick={this.onClickPrev}>
                                    <use xlinkHref="/img/sprite.svg#chevron-right" />
                                </svg>
                            </div>
                            <div className="next-btn">
                                <svg width="48" height="48" role="img" onClick={this.onClickNext}>
                                    <use xlinkHref="/img/sprite.svg#chevron-right" />
                                </svg>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9 col-12">
                                        <div className="photo__date">
                                            <div className="date">{this.props.date}</div>
                                            <div className="time">{this.props.time}</div>
                                            <div className="ml-1">#{this.props.frameId}</div>
                                        </div>
                                        <div className="photo__name">
                                            {this.props.violations}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}