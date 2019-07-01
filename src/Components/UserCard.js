import React from 'react';

class UserCard extends React.Component {
    renderList() {
        return this.props.listOfUsers.map( user => (
                <div className="item" key={user.login} >
                    <img 
                        className="user-image" 
                        src={user.avatar_url} 
                        alt="user" 
                    />
                    <div className="content">
                        <div className="description">
                            <h2>{user.login}</h2>
                            <a href={user.html_url} target="blank">{user.html_url}</a>
                        </div>
                    </div>
                </div>
            )
        );
    }

    render() {
        return <div className="item-container">
            {this.renderList()}
        </div>;
    }
}

export default UserCard;
