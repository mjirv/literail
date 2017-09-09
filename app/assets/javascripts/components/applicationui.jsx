var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel
var FormControl = ReactBootstrap.FormControl;
var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Panel = ReactBootstrap.Panel;
var Well = ReactBootstrap.Well;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var Tab = ReactBootstrap.Tab;
var Row = ReactBootstrap.Row;
var SplitButton = ReactBootstrap.SplitButton;
var MenuItem = ReactBootstrap.MenuItem;

var Index = React.createClass({
    getInitialState() {
        console.log(this.props.is_admin)
        return {
            posts: this.props.posts,
            sitetitle: "",
            pageNumber: 1,
            defaultPost: {
                id: null,
                title: "",
                text: ""
            },
            newPostLabel: "New Post",
            isAdmin: this.props.is_admin
        }
    },

    deletePost(post) {
        $.ajax({
            url: "/posts/" + post.id,
            dataType: 'json',
            type: 'DELETE',

            success: function(res) {
                this.setState({posts: this.state.posts.filter(post => post.id != res.id)});
            }.bind(this),

            error: function() {
                console.log("An error occured.");
            }

        });
    },

    editPost(post) {
        this.setState({defaultPost: {id: post.id, title: post.title, text: post.text}, newPostLabel: "Edit Post"});
        document.getElementById("tab-container-tab-2").click();
    },

    newPostCallback(newPost) {
        this.setState({posts: this.state.posts.concat([newPost])});
    },

    homeProps() {
        this.setState({defaultPost: {id: null, title: "", text: ""}, newPostLabel: "New Post"});
    },
 
    render: function() {
        var self = this;
        return (
            <Tab.Container id="tab-container" defaultActiveKey={1}>
                <Row>
                    <NavInstance page={1} homeProps={this.homeProps} newPostLabel={this.state.newPostLabel}
                        isAdmin={self.state.isAdmin}
                    />
                    <Tab.Content animation={false}>
                        <Tab.Pane eventKey={1}>
                            <Panel>
                                {this.state.posts.map(function(post) {
                                    return (
                                        <Panel id={"post-" + post.id} key={post.id} header=<h3>{post.title}</h3>>
                                            <div dangerouslySetInnerHTML={{__html: marked(post.text, {sanitize: true})}} />
                                                {self.state.isAdmin &&
                                                    <ButtonGroup bsSize="xsmall">
                                                        <Button bsStyle="warning" onClick={self.editPost.bind(self, post)}>Edit</Button>
                                                        <Button bsStyle="danger" onClick={self.deletePost.bind(self, post)}>Delete</Button>
                                                    </ButtonGroup>
                                                }
                                        </Panel>
                                    );
                                })}
                            </Panel>
                        </Tab.Pane>
                        <Tab.Pane eventKey={2}>
                            <NewPost newPostCallback={this.newPostCallback} defaultPost={this.state.defaultPost}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Row>
            </Tab.Container>
        );
    }
});

var NavInstance = React.createClass({
    render: function() {
        return (
            <Nav bsStyle="pills" style={{paddingBottom: '5px'}}>
                <NavItem eventKey={1} onClick={this.props.homeProps}>Home</NavItem>
                { this.props.isAdmin &&
                <NavItem eventKey={2}>{this.props.newPostLabel}</NavItem>
                }
            </Nav>
        );
    }
});

var NewPost = React.createClass({
    getInitialState(nextProps={defaultPost: {title: null, text: null, id: null}}) {
        console.log("hello");
        console.log(nextProps);
        return {
            title: nextProps.defaultPost.title ? nextProps.defaultPost.title : this.props.defaultPost.title,
            text: nextProps.defaultPost.text ? nextProps.defaultPost.text : this.props.defaultPost.text,
            id: nextProps.defaultPost.id ? nextProps.defaultPost.id : this.props.defaultPost.id
        };
    },

    submitNewPost(e) {
        e.preventDefault();

        $.ajax({
            url: "/posts",
            dataType: 'json',
            type: 'POST',
            data: {newpost: {title: this.state.title, text: this.state.text}},

            success: function(res) {
                document.getElementById("tab-container-tab-1").click();
                this.props.newPostCallback({title: this.state.title, text: this.state.text, id: res.id});
                this.setState(this.getInitialState());
            }.bind(this),

            error: function() {
                console.log("An error occured.");
            }
        });
    },

    submitEditPost(e) {
        e.preventDefault();

        $.ajax({
            url: "/posts/" + this.state.id,
            dataType: "json",
            type: 'PATCH',
            data: {newpost: {title: this.state.title, text: this.state.text}},

            success: function(res) {
                document.getElementById("tab-container-tab-1").click();
            }.bind(this),

            error: function() {
                console.log("An error occured.");
            }
        });
    },

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    },

    handleTextChange(e) {
        this.setState({ text: e.target.value});
    },

    componentWillReceiveProps(nextProps) {
        // Check if we have to re-set state because we're editing a post
        //if (nextProps.defaultPost.id && !(this.state.title) && !(this.state.text)) {
                this.setState(this.getInitialState(nextProps));
        //};
        console.log(nextProps);
    },

    render: function() {
        return (
            <div>
                <Panel>
                    <Form id="new-post" onSubmit={this.state.id ? this.submitEditPost : this.submitNewPost}>
                        <FormGroup
                            controlId="formBasicText"
                        >
                            <FormControl
                                type="text"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                                placeholder="Enter title"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                placeholder="Your post here..."
                                value={this.state.text}
                                onChange={this.handleTextChange}
                                componentClass="textarea"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button type="submit" bsStyle="primary">
                                        Post
                                    </Button>
                                    {/*<Button>
                                        Save
                                    </Button>*/}
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button bsStyle="danger">
                                        Cancel
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </div>
        );
    }
});

var PostDetail = React.createClass({
    render: function() {

    }
});
