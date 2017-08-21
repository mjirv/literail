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
            posts: [],
            sitetitle: "",
            pageNumber: 1
        }
    },

    deletePost(post) {
        $.ajax({
            url: "/posts/" + post.id,
            dataType: 'json',
            type: 'DELETE',

            success: function() {
                //TODO: Fix this
                this.setState(this.getInitialState());
            }.bind(this),

            error: function() {
                console.log("An error occured.");
            }

        });
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
                                {this.props.posts.map(function(post) {
                                    return (
                                        <Panel key={post.id} header=<h3>{post.title}</h3>>
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
                            <NewPost/>
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

            success: function() {
                this.setState({title: "Success!"})
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
