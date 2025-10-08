import React, { useState } from 'react';
import CustomModal from '../Components/CustomModal';

const withModal = (WrappedComponent) => {
  return (props) => {
    const [modalState, setModalState] = useState({
      show: false,
      variant: '',
      title: '',
      description: '',
      action: null,
      postAction: null, // Function to be called after modal is closed
      showReason: false,
      errorMessage: '', // For error messages
    });

    const showModal = (
      title,
      description,
      action,
      variant = 'info',
      postAction = null
    ) => {
      setModalState({
        title,
        description,
        action,
        variant,
        show: true,
        postAction, // Set postAction
      });
    };

    const handleModalClose = () => {
      setModalState((prev) => ({ ...prev, show: false, action: null }));
      if (modalState.postAction) {
        modalState.postAction(); // Execute the postAction after closing the modal
      }
    };

    const handleSubmit = () => {
      // Execute action
      if (modalState.action) {
        modalState.action();
      }
    };

    return (
      <>
        <WrappedComponent
          {...props}
          showModal={showModal}
          closeModal={handleModalClose}
        />
        <CustomModal
          show={modalState.show}
          close={handleModalClose}
          action={modalState.showReason ? handleSubmit : modalState.action}
          title={modalState.title}
          description={modalState.description}
          variant={modalState.variant}
          // btnText={'Submit'}
          btnText={modalState.variant === 'success' ? 'Login' : 'Submit'}
          errorMessage={modalState.errorMessage}
        />
      </>
    );
  };
};

export default withModal;

//Example-1 for just confirmation

// const confirmPopup = (id, status) => {
//   showModal(
//     `Are you sure you want to ${status === "Active" ? "Inactivate" : "Activate"} this User?`, //heading
//1-     () => onConfirm(status, id) //action
//2-     () => navigate(`/dashboard`) // If you want direct navigate without any confirmation just use navigate do not use 2 actions
//   );
// };
