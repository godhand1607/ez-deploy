/* global document */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import '../style/style.css';

import SearchBar from './components/SearchBar.jsx';
import VideoList from './components/VideoList.jsx';
import VideoDetail from './components/VideoDetail.jsx';

const API_KEY = 'AIzaSyBgDut5qa2V-AZOAsFLQ57bHgUkGTOl9XI';

// Create a new component. This component should produce some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
        };

        this.searchVideo('');
    }

    searchVideo(term) {
        YTSearch({ key: API_KEY, term }, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0],
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.searchVideo(term); }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
