export default class VerticalReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkDate: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.loadJS();
        this.getUrlParams();
    }

    handleClick(e) {
        console.log(e.target);
        //let locationId = e.target.dataset.location !== undefined ? e.target.dataset.location : null;
        if (this.props.changeViolation !== undefined) {
            this.props.changeViolation(e.target.dataset.item);
            document.getElementById('offense-filter').scrollIntoView();
        }

        if (this.props.links !== undefined) {
            location.href = this.props.links[e.target.dataset.linkid];
        }

    }

    loadJS() {
        $(this.refs.verticalChart).horizBarChart({
            selector: '.bar',
            speed: 500
        });

        setTimeout(function () {
            var reportItem = document.getElementsByClassName('report-item');
            for (let i = 0; i < reportItem.length; i++) {
                let titleString = reportItem[i].title;
                let pseudoElement = document.createElement('span');
                pseudoElement.style.visibility = 'false';
                pseudoElement.innerText = titleString;
                reportItem[i].appendChild(pseudoElement);
                let titleWidth = pseudoElement.offsetWidth;
                let bar = reportItem[i].getElementsByClassName('bar');
                let barWidth = bar[0].offsetWidth;
                if (barWidth < titleWidth) {
                    let leftPadding = titleWidth - barWidth + 15;
                    let spanNumber = reportItem[i].getElementsByClassName('number');
                    spanNumber[0].style = 'padding-left: ' + leftPadding + 'px';
                }
                reportItem[i].removeChild(pseudoElement);
            }
        }, 500);
    }

    getUrlParams() {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let year = url.searchParams.get("year");
        let month = url.searchParams.get("month");
        let day = url.searchParams.get("day");
        let link = '&year=' + year + "&month=" + month + "&day=" + day;
        this.setState({ linkDate: link });
    }

    render() {
        const report = this.props.report;
        var click = this.handleClick;
        const links = this.props.links;
        const reportFilter = this.props.reportFilter;
        return (
            <React.Fragment>
                {this.props.report.length > 0 ?
                    <div className="chart-horiz clearfix">
                        <ul className="chart" ref="verticalChart">
                            {
                                report.map(function (item, index) {
                                    let cssHide = 'past report-item';
                                    if (!reportFilter.includes(item)) {
                                        cssHide += ' d-none';
                                    }
                                    return (
                                        <li key={item.data} className={cssHide} title={item.data} data-toggle="tooltip" onClick={click}
                                            data-location={item.dataId} data-linkid={index} data-item={item.data}>
                                            <span className="bar" data-number={item.count} data-location={item.dataId} data-linkid={index} />
                                            {links !== undefined ?
                                                <a href={links[index]}><span className="number">{item.count}</span></a>
                                                :
                                                <span className="number" data-item={item.data}>{item.count}</span>
                                            }
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    :
                    <div className="reportNoItems">Нет элементов для отображения</div>
                }
            </React.Fragment>
        );
    }
}