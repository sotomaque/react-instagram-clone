import React from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { makeStyles, AppBar, Dialog, Toolbar, Typography, Button, Divider, TextField, Avatar, Paper, InputAdornment } from '@material-ui/core'
import { ArrowBackIos, PinDrop } from '@material-ui/icons';
import { UserContext } from '../../App';
import serialize from '../../utils/serialize';
import handleImageUpload from '../../utils/handleImageUpload';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from '../../graphql/mutations';

const useAddPostDialogStyles = makeStyles (theme => ({
    appBar: {
        position: 'relative',
        background: '#fff !important',
        color: 'black !important',
        display: 'flex',
        justifyContent: 'space-between',
        height: '54px !important'
    },
    toolbar: {
        minHeight: '54px !important'
    },
    title: {
        flex: 1,
        fontWeight: 600
    },
    paper: {
        display: 'flex',
        alignItems: 'flex-start',

        '& > *': {
            margin: theme.spacing(1)
        }
    },
    editor: {
        flex: 1
    },
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    input: {
        padding: '10px !important',
        fontSize: '14px !important'
    },
    root: {
        border: '1px solid #e6e6e6',
        marginTop: '10px !imporant'
    },
    underline: {
        '&::before': {
            border: 'none !imporant',
        },
        '&::after': {
            border: 'none !imporant',
        },
        '&:hover&before': {
            border: 'none !imporant',
        },
    }

}))

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: "" }]
    }
]

function AddPostDialog({ media, handleClose }) {
    const classes = useAddPostDialogStyles();
    const { me, currentUserId } = React.useContext(UserContext);
    // create a slate editor obj that wont change across renders
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [createPost] = useMutation(CREATE_POST);

    const [value, setValue] = React.useState(initialValue);
    const [location, setLocation] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    async function handleSharePost() {
        setSubmitting(true)
        const url = await handleImageUpload(media);
        const variables = {
            userId: currentUserId,
            location,
            caption: serialize({ children: value }),
            media: url
        }
        await createPost({ variables });
        setSubmitting(false);
        window.location.reload();
    }

    return (
        <Dialog fullScreen open onClose={handleClose}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <ArrowBackIos onClick={handleClose} />
                    <Typography align="center" variant="body1" className={classes.title}>
                        New Post
                    </Typography>
                    <Button color="primary" className={classes.share} disabled={submitting} onClick={handleSharePost}>
                        Share
                    </Button>
                </Toolbar>
            </AppBar>
            <Divider />
            <Paper className={classes.paper}>
                <Avatar src={me.profile_image} />
                <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                    <Editable
                        className={classes.editor}
                        placeholder="Write your caption..."
                    />
                </Slate>
                <Avatar
                    src={URL.createObjectURL(media)}
                    className={classes.avatarLarge}
                    variant="square"
                />
            </Paper>
            <TextField 
                fullWidth 
                placeholder="Location" 
                InputProps={{
                    classes: {
                        root: classes.root,
                        input: classes.input,
                        underline: classes.underline
                    },
                    startAdornment: (
                        <InputAdornment>
                            <PinDrop />
                        </InputAdornment>
                    )
                }}
                
                onChange={event => setLocation(event.target.value)}
            />
        </Dialog>
        
    )
}

export default AddPostDialog
