export default class ModalAddAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleAddAccount = this.handleAddAccount.bind(this);
    }

    componentDidMount() {
        let modal = document.getElementById('addAccountModal');
        document.body.appendChild(modal);
    }

    handleAddAccount() {
        var xhr = new XMLHttpRequest();
        var params = 'orem=ipsum&name=binny';
        xhr.open('post', '/Admin/GetOperatorsActivity', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ loaded: true });
        }.bind(this);
        xhr.send(params);
    }

    render() {
        return (
            <div className="modal fade" id="addAccountModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Добавить/Редактировать аккаунт</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="name_account">Название аккаунта</label>
                                <input type="text" className="form-control" id="name_account" defaultValue={this.props.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bv_account">Аккаунт в BasicVideo</label>
                                <select className="form-control" id="bv_account">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.handleAddAccount()}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}