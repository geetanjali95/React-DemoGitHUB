import React from 'react';
import SearchBar from './SearchBar';
import UserCard from './UserCard';
import requestHandler from '../RequestHandler/requestHandler';
import './style.css';

class App extends React.Component {
    state = {
        user: '',
        listOfUsers: [],
        selectedSortOption:'',
        currentPage: 1,
        listOfUsersPerPage: 4
    };


    handleClick= (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    onSearch = user => {
        this.setState(
            { user },
            () => this.onSearchUsers(user)
        );
    }

    onSearchUsers = async user => {    
        if(user === '') {
            return;       
        }
        const response = await requestHandler.get(`users?q=${user}`);
        this.setState({ listOfUsers : response.data.items });
    }

    onSortOptionSelect = selectedSortOption => { 
        this.setState({ selectedSortOption });
    }

    onSortUsersList = () => { 
        const { listOfUsers,selectedSortOption } = this.state; 

        switch(selectedSortOption.value) {
            case 1: return listOfUsers.sort(this.compareA);
            case 2: return listOfUsers.sort(this.compareD);
            case 3: return listOfUsers.sort(this.compareAR);
            case 4: return listOfUsers.sort(this.compareDR);
            default: return listOfUsers;
        }
    }

    getCurrentPageUsersList = () => {
       
        const { currentPage, listOfUsersPerPage} =this.state;
        // Logic for displaying listOfUsers
        const indexOfLastListOfUser = currentPage * listOfUsersPerPage;
        const indexOfFirstListOfUser = indexOfLastListOfUser - listOfUsersPerPage;
        const currentListOfUsers =  this.onSortUsersList().slice(indexOfFirstListOfUser, indexOfLastListOfUser);
        return currentListOfUsers;
    }

    compareA(a, b) {
        if (a.login < b.login){
        return -1;
        }
        if (a.login > b.login){
        return 1;
        }
        return 0;
    }

    compareD(a, b) {
        if (a.login > b.login){
        return -1;
        }
        if (a.login < b.login){
        return 1;
        }
        return 0;
    }

    compareAR(a, b) {
        return a.score - b.score ;
    }

    compareDR(a, b) {
        return b.score - a.score ;
    }

    renderPageNumbers= () => {
        const { listOfUsers, listOfUsersPerPage } = this.state;
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(listOfUsers.length / listOfUsersPerPage); i++) {
        pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

    }

    render() {
        const { user, selectedSortOption, listOfUsers} = this.state;

        return(
            <div className="app-container">
                <SearchBar 
                    user= {user} 
                    onSearch={this.onSearch} 
                    onSortOptionSelect={this.onSortOptionSelect}
                    selectedSortOption={selectedSortOption}
                    userCount={listOfUsers.length}
                />
                <br/>
                <UserCard listOfUsers={this.getCurrentPageUsersList()} />
                <br/>   
                <div>
                <ul id="page-numbers">
                    {this.renderPageNumbers()}
                </ul>
            </div> 
            </div>
        );
    } 
}

export default App;
