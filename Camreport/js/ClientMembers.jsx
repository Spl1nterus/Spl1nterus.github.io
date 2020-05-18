import Member from './Components/Client/Member.jsx';
import MemberNew from './Components/Client/MemberNew.jsx';

class ClientMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: null
        };
    }

    componentDidMount() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "/Client/GetAccountMembers", true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            console.log(data.members);
            this.setState({ members: data.members });
        }.bind(this);
        xhr.send();
    }

    render() {
        console.log(this.state.members);

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        {this.state.members !== null
                            ?
                            this.state.members.map(item => {
                                return (
                                    <Member key={item.id} member={item} />
                                );
                            })
                            :
                            ''
                        }
                    </div>
                    <div className='col-md-4 offset-md-2'>
                        <MemberNew />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ClientMembers />,
    document.getElementById('content')
);