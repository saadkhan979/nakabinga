import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../../Components/BackButton";
import CustomModal from "../../../Components/CustomModal";
import CustomButton from "../../../Components/CustomButton";
import { usePageTitle } from "../../../Hooks/usePageTitle";
import { getNewsfeed } from "../../../Services/Admin/UserManagement";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import "./styles.css";
import { Dropdown } from "react-bootstrap";

const Newsfeed = () => {
  usePageTitle("Newsfeed");

  const [showReactedModal, setShowReactedModal] = useState(false);
  const [showCommentedModal, setShowCommentedModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["newsfeed"],
    queryFn: getNewsfeed,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading newsfeed...</p>;

  const handleShowReactions = (post) => {
    setSelectedPost(post);
    setShowReactedModal(true);
  };

  const handleShowComments = (post) => {
    setSelectedPost(post);
    setShowCommentedModal(true);
  };

  const handleDeletePost = (postId) => {
    console.log("Delete post", postId);
    // You can integrate delete mutation here later
  };


  return (
    <div className="newsfeed-container">
      <div className="d-flex align-items-start mb-4 justify-content-between flex-wrap">
        <h2 className="screen-title m-0 d-inline">
          <BackButton /> Newsfeed
        </h2>
      </div>

      <div className="newsfeed-list">
        {posts?.map((post) => (
          <div key={post.id} className="newsfeed-card">
            {/* ---- Post Header ---- */}
            {/* <div className="newsfeed-header">
              <img src={post.authorImage} alt="" className="author-img" />
              <div>
                <h6 className="mb-0">{post.authorName}</h6>
                <p className="mb-0">{post.time}</p>
              </div>
            </div> */}
            {/* ---- Post Header with Dropdown ---- */}
            <div className="newsfeed-header justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={post.authorImage} alt="" className="author-img" />
                <div>
                  <h6 className="mb-0">{post.authorName}</h6>
                  <p className="mb-0">{post.time}</p>
                </div>
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  className="newsfeed-dropdown-toggle"
                  id={`dropdown-${post.id}`}
                >
                  ⋯
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>


            {/* ---- Post Content ---- */}
            <p className="post-text">{post.text}</p>

            {post.images?.length > 0 && (
              <div className="post-images">
                {post.images.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt="post" className="post-img" />
                ))}
              </div>
            )}

            {/* ---- Reactions + Comments Summary ---- */}
            <div className="post-actions">
              <CustomButton
                text={`${post.reactionsCount} Likes`}
                icon={<FaRegHeart />}
                variant="outline"
                onClick={() => handleShowReactions(post)}
              />
              <CustomButton
                text={`${post.commentsCount} Comments`}
                icon={<FaRegCommentDots />}
                variant="outline"
                onClick={() => handleShowComments(post)}
              />
            </div>

            {/* ---- Show 3 Comments ---- */}
            <div className="post-comments">
              {post.comments.slice(0, 3).map((comment, i) => (
                <div key={i} className="comment-preview">
                  <div className="d-flex gap-2 align-items-center mb-3">
                    <img
                      src={comment.avatar}
                      alt=""
                      className="comment-avatar"
                    />
                    <h6 className="comment-name mb-0">{comment.name}</h6>
                  </div>
                  <div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))}

              {post.comments.length > 3 && (
                <button
                  className="view-all-comments"
                  onClick={() => handleShowComments(post)}
                >
                  View all {post.comments.length} comments
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- People Who Reacted Modal --- */}
      <CustomModal
        show={showReactedModal}
        close={() => setShowReactedModal(false)}
        title="People Who Reacted"
      >
        <div className="reaction-list">
          {selectedPost?.reactions?.map((user, i) => (
            <div key={i} className="reaction-item">
              <img src={user.avatar} alt="" className="reaction-avatar" />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </CustomModal>

      {/* --- People Who Commented Modal --- */}
      <CustomModal
        show={showCommentedModal}
        close={() => setShowCommentedModal(false)}
        title="People Who Commented"
      >
        <div className="comment-list">
          {selectedPost?.comments?.map((comment, i) => (
            <div key={i} className="comment-item">
              <div className="comment-header">
                <img src={comment.avatar} alt="" className="comment-avatar" />
                <p className="comment-name">{comment.name}</p>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
      </CustomModal>
    </div>
  );
};

export default Newsfeed;
