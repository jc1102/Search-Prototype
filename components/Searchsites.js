import React from 'react'

class Searchsites extends React.Component {

	constructor() {
		super();
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		this.props.onSearch(e.target.value);
	}

	render() {
		return (
			<div className="row search-sites">
			  <div className="col-md-12">
			    <div className="input-group">
			      <input id="SearchSites" onChange= {this.handleSearch} placeholder="Search" type="text" className="form-control" aria-label="Search Sites" />
			      <span className="glyphicon glyphicon-search"></span>
			    </div>
			  </div>
			</div>
		)
	}
}

export default Searchsites