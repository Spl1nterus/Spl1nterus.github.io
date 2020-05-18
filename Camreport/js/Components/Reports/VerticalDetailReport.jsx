export default class VerticalReport extends React.Component {
    
    loadJS() {
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
                    let leftPadding = titleWidth - barWidth + 10;
                    let spanNumber = reportItem[i].getElementsByClassName('number');
                    spanNumber[0].style = 'padding-left: ' + leftPadding + 'px';
                    reportItem[i].style.color = 'black';
                }
                reportItem[i].removeChild(pseudoElement);
            }
        }, 1000);
    }

    render() {
        const report = this.props.report;
        $(this.refs.verticalChart).horizBarChart({
            selector: '.bar',
            speed: 500
        });
        return (
            <div className="chart-horiz clearfix">                
                <ul className="chart" ref="verticalChart">
                    {
                        report.map(function (item) {
                            return (
                                <li key={item.question} className="past" title={item.question} data-toggle="tooltip"><span className="bar" data-number={item.violationCount} />
                                    <span className="number">{item.violationCount}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}