import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { isBrowser, isMobile } from 'react-device-detect';
import ContentEditable from './ContentEditable';

const App = () => {
    const [emojiInput, setEmojiInput] = useState('');
    const [emojiData, setEmojiData] = useState();
    const [emojiGroup, setEmojiGroup] = useState();
    const [myEmoji, setMyEmoji] = useState();

    // const handleChangeGroup = (e) => {
    //     const selectedText = e.target.value;
    //     setEmojiGroup(selectedText);
    // };

    const insertEmoji = (emoji) => {
        emoji = React.createElement('span', { title: emoji.name, children: emoji.char });
        console.log(emoji.props.children)
        setMyEmoji(emoji);
        setEmojiInput((prevInput) => prevInput + emoji.props.children);
    };

    const handleChangeInput = (e) => {
        // var text = e.target.value;
        //     //text = text.split("").reverse().join("");
        var text = e.currentTarget.innerHTML;
        var text1 = document.getElementById("emoji-input").innerHTML;
        console.log(text, text1);
        //var text = e.currentTarget.textContent;
        setEmojiInput(text);
    };

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(emojiInput);
        } catch (err) {
            console.error('Unable to copy text:', err);
        }
    };


    const setData = (data) => {
        function removeFirstWord(inputString) {
            // Split the string into an array of words
            const words = inputString.split(' ');
            words.shift();
            const resultString = words.join(' ');
            return resultString;
        }

        console.log(data);
        var obj = {};
        Object.values(data).forEach((element) => {
            if (!obj[element.group]) obj[element.group] = {};
            if (!obj[element.group][element.subGroup]) obj[element.group][element.subGroup] = [];
            obj[element.group][element.subGroup].push({
                char: element.character,
                name: removeFirstWord(element.unicodeName),
            });
        });

        setEmojiData(obj);
        setEmojiGroup(Object.keys(obj)[0]);
    };

    useEffect(() => {
        console.clear()
        fetch(`https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_EMOJI_KEY}`)
            .then((data) => data.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));

        const unicodeChar = `\u{E0030}`;
        console.log(unicodeChar);
        setEmojiInput(unicodeChar)

        // fetch(`https://emoji-api.com/emojis/grinning-squinting-face?access_key=${process.env.REACT_APP_EMOJI_KEY}`)
        //     .then((data) => data.json())
        //     .then((data) => console.log(data))
        //     .catch((err) => console.error(err));
    }, []);

    if (!(emojiData && emojiGroup)) return <div></div>;
    return (
        <>
            <Container className={`fixed-top sticky-top ${isMobile ? "mt-2" : "mt-4"}`} fluid={isMobile} id="myDivInput">
                {/* <Form.Control
                    as="div" // Use textarea for better input handling
                    contentEditable="true"
                    value={emojiInput} // Bind value to the input
                    dangerouslySetInnerHTML={{ __html: emojiInput }}
                    //onChange={handleChangeInput} 
                    // onInput={handleChangeInput}
                    // onBlur={handleChangeInput}
                    className="mb-3 pt-1 pb-1 emoji-input"
                    // style={{ fontSize: "25px" }}
                    id="emoji-input"
                /> */}

                <ContentEditable // Use textarea for better input handling
                    html={emojiInput} // Bind value to the input
                    onChange={handleChangeInput}
                    onInput={handleChangeInput}
                    onBlur={handleChangeInput}
                    value={emojiInput}
                    className="mb-3 pt-1 pb-1 emoji-input"
                    id="emoji-input"
                />

                {/* <Form.Control
                    as="textarea"
                    // onChange={handleChangeInput}
                    onChange={e => setEmojiInput(e.target.value)}
                    // onInput={e => e.currentTarget.textContent}
                    value={emojiInput}
                    className="mb-3 pt-1 pb-1 emoji-input"
                    id="emoji-input"
                ></Form.Control> */}
            </Container>
            <Container className="mb-3 pe-4 ps-4" fluid={isMobile} >
                <Form.Group>
                    <Row>
                        {/* <Col lg="auto" md="auto" sm="auto" xs="auto" className='ps-0'>
                            <InputGroup size="sm">
                                <Form.Select aria-label="Default select example" onChange={handleChangeGroup}>
                                    {Object.keys(emojiData).map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Col> */}

                        <Col lg="auto" md="auto" sm="auto" xs="auto" className="p-0">
                            <InputGroup size="sm">
                                <Button onClick={handleCopyClick} variant="primary">
                                    Copy
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col lg="auto" md="auto" sm="auto" xs="auto" className='pe-0'>
                            <InputGroup size="sm">
                                <InputGroup.Text className='alert alert-info'>{emojiGroup}</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg="auto" md="auto" sm="auto" xs="auto" className='pe-0'>
                            <InputGroup size="sm">
                                <InputGroup.Text className='alert alert-info' id="emoji">{myEmoji}</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form.Group>
                <Row className="g-col-1 text-start mt-0">
                    {Object.keys(emojiData).map((group, i) => (
                        <Col lg="auto" md="auto" sm="auto" xs="auto" className='p-0 me-2 ms-0 mb-2'
                            key={group}>
                            <Button size="sm" key={i} onClick={() => setEmojiGroup(group)}
                                variant={`${group === emojiGroup ? "light" : 'primary'}`}
                            >{group}</Button>
                        </Col>
                    ))}
                </Row>
                <Row className={`emoji-container grid gap-1 mb-3 ${isBrowser && "mt-3"}`}
                    style={{ border: `${isMobile ? "" : "1px solid black"}` }}>
                    {Object.keys(emojiData[emojiGroup]).map((subGroup) => (
                        <React.Fragment key={subGroup}>
                            {emojiData[emojiGroup][subGroup].map((emoji) => (
                                <Col key={emoji.name} xs="auto" sm="auto" md="auto" lg="auto" className='p-0 m-0'>
                                    <span
                                        className="emoji"
                                        onClick={() => insertEmoji(emoji)}
                                        title={emoji.name}
                                    >
                                        {emoji.char}
                                    </span>
                                </Col>
                            ))}
                        </React.Fragment>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default App;
