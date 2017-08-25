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
        return {
            posts: this.props.posts,
            sitetitle: "",
            pageNumber: 1
        }
    },

    deletePost(post) {
        $.ajax({
            url: "/posts/" + post.id,
            dataType: 'json',
            type: 'DELETE',

            success: function(res) {
                //TODO: Fix this
                // document.getElementById("post-" + post.id).style.visibility = "hidden";
                this.setState({posts: this.state.posts.filter(post => post.id != res.id)});
            }.bind(this),

            error: function() {
                console.log("An error occured.");
            }

        });
    },

    newPostCallback(newPost) {
        this.setState({posts: this.state.posts.concat([newPost])});
    },
 
    render: function() {
        var self = this;
        return (
            <Tab.Container id="tab-container" defaultActiveKey={1}>
                <Row>
                    <NavInstance page={1}/>
                    <Tab.Content animation={false}>
                        <Tab.Pane eventKey={1}>
                            <Panel>
                                {this.state.posts.map(function(post) {
                                    return (
                                        <Panel id={"post-" + post.id} key={post.id} header=<h3>{post.title}</h3>>
                                            <div dangerouslySetInnerHTML={{__html: marked(post.text, {sanitize: true})}} />
                                        <ButtonGroup bsSize="xsmall">
                                            <Button bsStyle="warning">Edit</Button>
                                            <Button bsStyle="danger" onClick={self.deletePost.bind(self, post)}>Delete</Button>
                                        </ButtonGroup>
                                        </Panel>
                                    );
                                })}
                            </Panel>
                        </Tab.Pane>
                        <Tab.Pane eventKey={2}>
                            <NewPost newPostCallback={this.newPostCallback}/>
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
                <NavItem eventKey={1}>Home</NavItem>
                <NavItem eventKey={2}>New Post</NavItem>
            </Nav>
        );
    }
});

var NewPost = React.createClass({
    getInitialState() {
        return {
            title: '',
            text: ''
        };
    },

    submitPost(e) {
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

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    },

    handleTextChange(e) {
        this.setState({ text: e.target.value});
    },

    render: function() {
        return (
            <div>
                <Panel>
                    <Form id="new-post" onSubmit={this.submitPost}>
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
                                    <Button>
                                        Save
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button bsStyle="danger">
                                        Delete
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
