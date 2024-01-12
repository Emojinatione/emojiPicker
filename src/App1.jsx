import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { isMobile } from "react-device-detect";

const App = () => {
  const [emojiInput, setEmojiInput] = useState("");

  const handleBlur = (e) => {
    var text = e.target.innerHTML;
    console.log (text)
    setEmojiInput(text);
  };

  return (
    <Container
      className={`fixed-top sticky-top ${isMobile ? "mt-2" : "mt-4"}`}
      fluid={isMobile}
    >
      <Form.Control
        as="div"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: emojiInput }}
        onBlur={handleBlur}
        className="mb-3 pt-1 pb-1 emoji-input"
        id="emoji-input"
      />
    </Container>
  );
};

export default App;
