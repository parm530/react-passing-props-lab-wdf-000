const React = require('react');

const FruitBasket = require('./FruitBasket');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fruit: [],
      filters: [],
      currentFilter: null,
    }

    this.fetchFilters = this.fetchFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);

  }
  componentWillMount(){
    this.fetchFilters();
    this.fetchFruit();
  }

  fetchFilters() {
    fetch('/api/fruit_types')
      .then(res => res.json())
      .then(filters => this.setState({filters: filters}));
  }

  fetchFruit() {
    fetch('/api/fruit')
      .then(res => res.json())
      .then(fruit => this.setState({fruit: fruit}));
  }

  updateFilter(e){
    console.log('updated filter: ', e.target.value);
    this.setState({ currentFilter: e.target.value });
  }

  render() {
    return(
      <FruitBasket 
        fruit={this.state.fruit} 
        filters={this.state.filters} 
        currentFilter={this.state.currentFilter} 
        updateFilterCallback={this.updateFilter}/>
    );
  }

}

module.exports = App;
