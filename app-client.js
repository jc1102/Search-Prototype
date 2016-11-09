import React from 'react'
import ReactDOM from 'react-dom'

import Searchsites from './components/Searchsites'

class MainInterface extends React.Component {

	constructor() {
		super();
		this.state = {
			sites: [
					  {
					    "id": 1,
					    "siteName": "SurferMag",
					    "siteUrl": "www.surfermag.com",
					    "description": "This is the description for SurferMag",
					    "categoryIds": [
					      2
					    ]
					  },
					  {
					    "id": 2,
					    "siteName": "Ebay",
					    "siteUrl": "www.ebay.com.au",
					    "description": "This is the description for ebay",
					    "categoryIds": [
					      1
					    ]
					  },
					  {
					    "id": 3,
					    "siteName": "Robs UI Tips",
					    "siteUrl": "www.awesomeui.com.au",
					    "description": "This is the description for the best site in the world. It is the best:)",
					    "categoryIds": [
					      4, 3
					    ]
					  },
					  {
					    "id": 4,
					    "siteName": "Table Tennis Tips - How to not come runners up",
					    "siteUrl": "www.ttt.com",
					    "description": "This is the description for Table Tennis Tips",
					    "categoryIds": [
					      1, 2, 3, 4
					     ]
					  }
					],
			categories: [
						  {
						    id: 1,
						    description: "Arts & Entertainment"
						  },
						  {
						    id: 2,
						    description: "Automotive"
						  },
						  {
						    id: 3,
						    description: "Business"
						  },
						  {
						    id: 4,
						    description: "Careers"
						  }
						],
			queryText: '',
			searchResultVisible: false,
		},
		this.searchSites = this.searchSites.bind(this);
	}

	searchSites(q) {
		this.setState ({
			queryText: q.toLowerCase(),
			searchResultVisible: true
		});
	}

	render() {
		let filteredSites = [];
		let queryText = this.state.queryText;
		let sites = this.state.sites;
		let categories = this.state.categories;

		if (queryText.indexOf(',') > -1) { 
			let queryText_array = queryText.split(',') 
			for(var i = 0; i < queryText_array.length; i++) {
				// Trim the excess whitespace.
				queryText_array[i] = queryText_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
				console.log(queryText_array[i]);
				sites.forEach(function(item) {
					item.categoryIds.forEach(function(id) {
						if ( 
							// Match SiteCategory
							(categories[id-1].description.toLowerCase().indexOf(queryText_array[i])!=-1) ||
							// Match sitename
							(item.siteName.toLowerCase().indexOf(queryText_array[i])!=-1) 
						) {
							filteredSites.push(item);

							console.log(filteredSites);		    

							// Remove duplicated object in the array
							var arr = {};

							for ( var i=0, len=filteredSites.length; i < len; i++ )
								arr[filteredSites[i]['siteName']] = filteredSites[i];

							filteredSites = new Array();
							for ( var key in arr )
							    filteredSites.push(arr[key]);
						} 
					})
				});				   	
			}
		} else {
				sites.forEach(function(item) {
					item.categoryIds.forEach(function(id) {
						if ( 
							// Match SiteCategory
							(categories[id-1].description.toLowerCase().indexOf(queryText)!=-1) ||
							// Match sitename
							(item.siteName.toLowerCase().indexOf(queryText)!=-1) 
						) {
							filteredSites.push(item);

							console.log(filteredSites);		    

							// Remove duplicated object in the array
							var arr = {};

							for ( var i=0, len=filteredSites.length; i < len; i++ )
								arr[filteredSites[i]['siteName']] = filteredSites[i];

							filteredSites = new Array();
							for ( var key in arr )
							    filteredSites.push(arr[key]);
						} 
					})
				});
		}

		if (filteredSites.length == 0) {
			return (
				<div className="interface">
					<Searchsites 
						onSearch = { this.searchSites }
					/>
					<div className="no-result"><span>We Currently don't have any results for your search, try another </span></div>			
				</div>
			)
		} else {
			filteredSites = filteredSites.map(function(item, index) {
				return (
					<li className="site-info" key={index}>
						<div className="site-url">
							<a href={'http://' + filteredSites[index].siteUrl} target="_blank">{filteredSites[index].siteName}</a>
						</div>
						<div className="site-desc">
							<span>{filteredSites[index].description}</span>
						</div>
					</li>
				)
			}.bind(this));
		}

		return (
			<div className="interface">
				<Searchsites 
					onSearch = { this.searchSites }
				/>
				{ this.state.searchResultVisible ? <ul className="item-list">{filteredSites}</ul> : null }
			</div>
		)
	}
}

ReactDOM.render (
    <MainInterface />,
    document.getElementById('react-container')
);