export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.onClickImg = this.onClickImg.bind(this);
    }

    onClickImg(e) {
        if (this.props.questName === undefined) {
            return;
        }
        let img = e.target.getBoundingClientRect();
        let body = document.body;
        let docEl = document.documentElement;
        let dot_count = document.getElementsByClassName('dot').length;
        let top_offset = img.top - body.scrollTop;
        let left_offset = img.left - body.scrollLeft;
        let top_px = Math.round(e.clientY - top_offset - 12);
        let left_px = Math.round(e.clientX - left_offset - 12);
        let top_perc = top_px / img.height * 100;
        let left_perc = left_px / img.width * 100;
        let dot = '<div class="dot" style="top: ' + top_perc + '%; left: ' + left_perc + '%;" title="' + this.props.questName + '"></div>';
        e.target.insertAdjacentHTML('afterend', dot);

        this.props.dots({ top: top_perc, left: left_perc, description: this.props.questName });
    }

    render() {
        let img = 'data:image/jpeg;base64,' + this.props.videoLink;
        return (
            <div className="outfit">
                <img className="img-fluid border-radius-5" src={img} onClick={this.onClickImg} id="videoImg" />
            </div>
        );
    }
}