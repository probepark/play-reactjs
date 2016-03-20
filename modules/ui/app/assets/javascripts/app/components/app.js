import React from "react";
import Navigation from "./navigation";
import StoryList from "./story";

var App = React.createClass({
    componentDidMount: function() {
        var _this = this;
        var cbname = "fn" + Date.now();
        var script = document.createElement("script");
        script.src = "http://www.reddit.com/reddits.json?jsonp=" + cbname;

        window[cbname] = function(jsonData) {
            _this.setState({
                navigationItems: jsonData.data.children
            });
            delete window[cbname];
        };

        document.head.appendChild(script);
    },
    getInitialState: function() {
        return ({
            activeNavigationUrl: "",
            navigationItems: [],
            storyItems: [],
            title: "Please select a sub"
        });
    },
    render: function() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <Navigation
                    activeUrl={this.state.activeNavigationUrl}
                    items={this.state.navigationItems}
                    itemSelected={this.setSelectedItem} />
                <StoryList items={this.state.storyItems} />
            </div>
        );
    },
    setSelectedItem: function(item) {
        var _this = this;
        var cbname = "fn" + Date.now();
        var script = document.createElement("script");
        script.src = "http://www.reddit.com/" + item.data.url +
            ".json?sort=top&t=month&jsonp=" + cbname;

        window[cbname] = function(jsonData) {
            _this.setState({storyItems: jsonData.data.children});
            delete window[cbname];
        };

        document.head.appendChild(script);

        this.setState({
            activeNavigationUrl: item.data.url,
            storyItems: [],
            title: item.data.display_name
        });
    }
});

export default App;
