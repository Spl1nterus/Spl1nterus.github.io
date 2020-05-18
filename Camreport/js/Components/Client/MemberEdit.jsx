import Checkbox from '../Checkbox.jsx';
class MemberEdit extends React.Component {
    constructor(props) {
        const url_string = window.location.href;
        const memberId = url_string.substring(url_string.lastIndexOf('/') + 1);

        super(props);
        this.state = {
            memberId: memberId,
            user: null,
            access: new Map(),
            locations: []
        };
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.submitMemberLocation = this.submitMemberLocation.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
    }

    componentDidMount() {
        console.log(this.state.memberId);
        let xhr = new XMLHttpRequest();
        xhr.open("get", "/Client/GetMemberInfo/" + this.state.memberId, true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            this.setState({ user: data.user, locations: data.locations });
            let dataItems = new Map();
            data.access.forEach(function (item) {
                dataItems.set(item.locationId, true);
            });
            this.setState({ access: dataItems });
        }.bind(this);
        xhr.send();
    }

    handleChangeLocation(e) {
        const item = parseInt(e.target.name, 10);
        const isChecked = e.target.checked;
        this.setState(function (prevState, props) {
            let items = new Map(prevState.access);
            items.set(item, isChecked);
            return { access: items };
        });
    }

    submitMemberLocation() {
        let locations = this.state.access;
        for (let k of locations) {
            if (!k[1]) {
                locations.delete(k[0]);
            }
        }

        var model = JSON.stringify({
            'locations': Array.from(locations, c => c[0])
        });
        console.log(model);

        fetch('/client/memberlocationsedit/' + this.state.memberId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: model
        }).then(data => {
            location.href = '/client/members';
        });
    }

    deleteMember() {
        fetch('/client/DeleteMember/' + this.state.memberId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            location.href = '/client/members';
        });
    }

    render() {
        return (
            <div className='container'>
                {this.state.user !== null
                    ?

                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='member-block'>
                                <div className="form-group">
                                    <label>Фамилия</label>
                                    <input type="text" className="form-control" value={this.state.user.lastName !== null ? this.state.user.lastName : 'Фамилия не указана'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input type="text" className="form-control" value={this.state.user.firstName !== null ? this.state.user.firstName : 'Имя не указано'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input type="text" className="form-control" value={`+${this.state.user.phone}`} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={this.state.user.email} readOnly />
                                </div>
                                <button className='btn btn-danger' onClick={this.deleteMember}>Удалить пользователя</button>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='member-block'>
                                <h3>Локации камер</h3>
                                {
                                    this.state.locations.map(item => (
                                        <div className="form-check" key={item.id}>
                                            <Checkbox id={`chbScheme_${item.id}`} name={item.id} checked={this.state.access.get(item.id) === true ? true : false}
                                                onChange={this.handleChangeLocation} />
                                            <label htmlFor={`chbScheme_${item.id}`} className="form-check-label">
                                                {item.name}
                                            </label>
                                        </div>
                                    ))
                                }
                                <button className='btn btn-primary' onClick={this.submitMemberLocation}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        );
    }
}

ReactDOM.render(
    <MemberEdit />,
    document.getElementById('content')
);