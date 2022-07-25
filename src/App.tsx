import React, { Component } from 'react';
import { Header } from './components/header/header';
import './styles/app.scss';
import { Movies } from './components/movieList/movies';
import { Form } from './components/createMovies/createForm';

interface AppState {
    showForm: boolean;
}

class App extends Component<{}, AppState> {    
    
    state = {
        showForm: false
    };

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };     

    render() {
        return (
            <div className={'app'}>
                <Header/>
                <main>
                    <div className={'container'}>
                        <h1 className={'app__title'}>
                            Movies
                        </h1>
                        <Movies/>
                        <div className={'app-add_movie add-movie'}>
                            <button className={'add-movie__btn primary-button'} onClick={this.toggleForm}>
                                {this.state.showForm ? 'Cancel' : 'Add'}
                            </button>
                            { this.state.showForm ? <Form hideForm={this.toggleForm} /> : null }
                        </div>                        
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
