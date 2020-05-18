import ModalAddAccount from './Admin/Accounts/ModalAddAccount.jsx';

class AdminAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameAccount: ''
        };
        this.handleAddAccount = this.handleAddAccount.bind(this);
    }

    handleAddAccount(name) {
        this.setState({ nameAccount: name });
    }

    render() {
        const nameAcc = this.state.nameAccount;
        return (
            <div className="adminAccounts">
                <ModalAddAccount name={nameAcc} />
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-success" data-toggle="modal" data-target="#addAccountModal" onClick={() => this.handleAddAccount()}>
                            <i className="fas fa-plus" /> Добавить аккаунт
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AdminAccounts />,
    document.getElementById('content')
);