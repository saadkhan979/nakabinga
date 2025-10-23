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
      loading: false, // 🟢 NEW
    });

    const showModal = (
      title,
      description,
      action,
      variant = 'info',
      postAction = null,
      loading = false // 🟢 NEW
    ) => {
      setModalState({
        title,
        description,
        action,
        variant,
        show: true,
        postAction, // Set postAction
        loading, // 🟢 NEW
      });
    };

    const handleModalClose = () => {
      setModalState((prev) => ({ ...prev, show: false, action: null }));
      if (modalState.postAction) {
        modalState.postAction(); // Execute the postAction after closing the modal
      }
    };

    // 🟢 Helper to update loading state
    const setModalLoading = (value) => {
      setModalState((prev) => ({ ...prev, loading: value }));
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
          setModalLoading={setModalLoading} // 🟢 pass to wrapped component
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
          loading={modalState.loading} // 🟢 PASS DOWN
        />
      </>
    );
  };
};

export default withModal;
