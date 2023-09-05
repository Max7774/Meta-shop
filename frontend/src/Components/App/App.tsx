import Login from "@Pages/Auth/Login/Login";
import Register from "@Pages/Auth/Registration/Register";
import EmailForm from "@Pages/Auth/ResetPassword/EmailForm";
import ResetPassword from "@Pages/Auth/ResetPassword/ResetPassword";
import Modal from "@UI/Modal/Modal";

function App() {
  return (
    <>
      {/* <Login /> */}
      <ResetPassword />
      {/* <Register /> */}
      {/* <Modal isOpen={true}>
        <EmailForm />
      </Modal> */}
    </>
  );
}

export default App;
