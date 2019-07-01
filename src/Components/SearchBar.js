import React from 'react';
import Select from 'react-select';

class SearchBar extends React.Component {
    onSearch= (event) => {
        this.props.onSearch(event.target.value);
    }

    getSortOptions = () => [
        { label: "Name (A - Z)", value: 1 },
        { label: "Name (Z - A)", value: 2 },
        { label: "Rank ↑", value: 3 },
        { label: "Rank ↓", value: 4 }
    ]
   
    render() {
        const { onSortOptionSelect, selectedSortOption, user, userCount } = this.props;
        return(
            <div className="searchbar-container">
                <div className="bar-container">
                    <Select 
                        className="sort-dropdown"
                        options={this.getSortOptions()} 
                        onChange={onSortOptionSelect}
                        value={selectedSortOption}
                        placeholder="Sort here..."
                    />
                </div>
                <div className="bar-container">
                    <input 
                        className="input-bar"
                        type="text"
                        onBlur={this.onSearch}
                        defaultValue={user}
                        placeholder="Search here..."
                    />
                    <div>
                        <label>Total Count :{userCount}</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;
