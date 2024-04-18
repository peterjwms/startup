import React from 'react';
import './search.css';

export function Search() {

    

  return (
    <main className="container-fluid">
            <div id="search-form-container">
                <h1>Search</h1>
                <form method="get" className="form-inline" onsubmit="event.preventDefault(); search()">
                    <input type="text" id="search-bar" placeholder="Enter the name of a game" className="form-control"/>
                    <input type="button" className="btn btn-primary" onclick="search()" value="Search"></input>
                </form>
            </div>
            <hr></hr>
            <div id="results-container">
                <h1>Results</h1>
                <div className="table-responsive">
                    <table className="table table-bordered" id="results-table">
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Name</th>
                                <th>Year</th>
                                <th>Add game?</th>
                                <th>Publisher</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody id="results-table-body">
                            
                        </tbody>
                    </table>
                </div>
            </div>
            
        </main>
  );
}