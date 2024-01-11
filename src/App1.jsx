import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { isMobile } from "react-device-detect";

const App = () => {
  const [emojiInput, setEmojiInput] = useState("");

  const handleChangeInput = (e) => {
    setEmojiInput(e.target.textContent); // Use textContent for plain text input
  };

  return (
    <>
      <Container
        className={`fixed-top sticky-top ${isMobile ? "mt-2" : "mt-4"}`}
        fluid={isMobile}
      >
        <Form.Control
          as="textarea" // Use textarea for better input handling
          contentEditable="true"
          value={emojiInput} // Bind value to the input
          onChange={handleChangeInput} // Use onChange for textarea
          className="mb-3 pt-1 pb-1 emoji-input"
          // style={{ fontSize: "25px" }}
          id="emoji-input"
        />
      </Container>
    </>
  );
};

export default App;
