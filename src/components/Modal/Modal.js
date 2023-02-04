import { useState } from "react";
import "./Modal.css"

export default function Modal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
        <button
        onClick={toggleModal}
        className="btn-modal">
            Open
        </button>

        {modal &&(
            <div className="modal">
            <div
            onClick={toggleModal}
            className="overlay"></div>
            <div className="modal-content">
                <h4>Change your Avatar</h4>
                <p>
                    Change the image to your preference.
                </p>
            <button
                className="close-modal"
                onClick={toggleModal}
                >Close</button>
            </div>
        </div>
        )}

        </>
    )
}
