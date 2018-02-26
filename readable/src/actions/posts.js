import * as PostsAPI from '../util/PostsAPI';

export const POSTS_SET = 'POSTS_SET';
export const POSTS_ADD = 'POSTS_ADD';
export const POSTS_REMOVE = 'POSTS_REMOVE';
export const POSTS_UPDATE = 'POSTS_UPDATE';
export const POSTS_SET_LOADING_STATE = 'POSTS_SET_LOADING_STATE';
export const POSTS_SET_LOAD_ERROR = 'POSTS_SET_LOAD_ERROR';

// Action creators

export const setPosts = (posts) => ({
  type: POSTS_SET,
  posts,
});

export const addPost = (post) => ({
  type: POSTS_ADD,
  post,
});

export const removePost = (post) => ({
  type: POSTS_REMOVE,
  post,
});

export const updatePost = (post, updatedData) => ({
  type: POSTS_UPDATE,
  post,
  newData: updatedData,
});

export const setLoadingState = (loading) => ({
  type: POSTS_SET_LOADING_STATE,
  loading,
});

export const setLoadError = (errorOnLoad) => ({
  type: POSTS_SET_LOAD_ERROR,
  errorOnLoad,
});

// Async action creators

export const fetchPosts = (category) => ((dispatch) => {
  dispatch(setLoadingState(true));

  return PostsAPI.get.posts(category)
    .then((posts) => {
      dispatch(setPosts(posts));
      dispatch(setLoadingState(false));
      dispatch(setLoadError(false));
    })
    .catch(() => {
      dispatch(setLoadingState(false));
      dispatch(setLoadError(true));
    });
});

export const fetchAddPost = (postData) => ((dispatch) => {
  return PostsAPI.create.post(postData)
    .then((createdPost) => {
      dispatch(addPost(createdPost));
    });
});

export const fetchRemovePost = (post) => ((dispatch) => {
  return PostsAPI.del.post(post.id)
    .then(() => {
      dispatch(removePost(post));
    });
});

export const fetchUpdatePost = (post, updatedData) => ((dispatch) => {
  return PostsAPI.update.post(post.id, updatedData)
    .then(() => {
      dispatch(updatePost(post, updatedData));
    });
});
