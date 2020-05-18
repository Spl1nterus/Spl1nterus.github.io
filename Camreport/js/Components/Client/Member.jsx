export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            member: null
        };
        this.editMember = this.editMember.bind(this);
    }

    componentDidMount = () => {
        this.setState({ member: this.props.member });
    }

    editMember() {
        location.href = './memberedit/' +this.props.member.id;
    }

    render() {
        const member = this.state.member;
        let userName = '';
        if (member !== null) {
            userName = member.user.email;
            if (member.user.lastName !== null || member.user.firstName !== null) {
                userName = member.user.lastName + ' ' + member.user.firstName;
                userName.trim();
            }
        }
        return (
            <div className='member-block mb-3'>
                <div className='row'>
                    <div className='col-md-10'>
                        <h4>{userName}</h4>
                    </div>
                    <div className='col-md-2 text-right'><i className='fas fa-pen text-muted-btn' onClick={this.editMember} /></div>
                </div>
            </div>
        );
    }
}