export default class NewEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inviteForm: false,
            readyToInvite: false,
            waitInvite: false,
            needEmail: false,
            phone: '',
            companyId: this.props.companyId,
            schemes: [],
            checkedItems: new Map()
        };
        this.changeEmail = this.changeEmail.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        const thisState = this;
        $(this.refs.phoneInput).inputmask("+7(999)999-99-99", {
            "clearIncomplete": true, "showMaskOnHover": false,
            "oncomplete": function () {
                const phoneVal = '7' + $(this).inputmask('unmaskedvalue');
                thisState.setState({ phone: phoneVal });
                thisState.setState({ waitInvite: true });
                fetch('/client/hasuser?phone=' + phoneVal)
                    .then(response => response.json())
                    .then(data => {
                        thisState.setState({ waitInvite: false });
                        if (data.hasUser) {
                            thisState.setState({ readyToInvite: true });
                            thisState.setState({ needEmail: false });
                        }
                        else {
                            thisState.setState({ readyToInvite: false });
                            thisState.setState({ needEmail: true });
                        }
                    });
            }
        });
    }

    changeEmail(event) {
        if (event.target.checkValidity()) {
            this.setState({ readyToInvite: true });
        }
        else {
            this.setState({ readyToInvite: false });
        }
    }

    submitForm(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var model = JSON.stringify({
            'phone': this.state.phone,
            'name': data.get('name'),
            'email': data.get('email')
        });

        fetch('/client/AddMember/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: model
        }).then(window.location = '/client/members');
    }

    render() {
        let btnInviteColor = 'secondary';
        if (this.state.readyToInvite) {
            btnInviteColor = 'primary';
        }
        return (
            <div className='member-block'>
                <p className='employee-new-card__info'>Для добавления пользователя необходимо ввести его номер телефона</p>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Имя" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Номер телефона</label>
                        <input type='text' className='form-control phone-mask' placeholder='+7(___)___-__-__' ref="phoneInput" />
                    </div>
                    {
                        this.state.needEmail
                            ?
                            <React.Fragment>
                                <p className='employee-new-card__info'>Пользователь не найден. Введите его email, чтобы мы могли выслать ему приглашение</p>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="email" onChange={this.changeEmail} required />
                                </div>
                            </React.Fragment>
                            :
                            ''
                    }
                    <button type="submit" className={`btn btn-block btn-${btnInviteColor}`} disabled={!this.state.readyToInvite}>
                        {
                            this.state.waitInvite
                                ?
                                <i className='fas fa-circle-notch fa-spin' />
                                :
                                <React.Fragment>Пригласить</React.Fragment>
                        }
                    </button>
                </form>
            </div>
        );
    }
}
