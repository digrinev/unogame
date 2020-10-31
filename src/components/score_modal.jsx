import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'


const ScoreModal = (props) => {
  const [show, setShow] = useState(false);

  const [numeric_cards, setNumCards] = useState('');
  const [special_cards, setSpCards] = useState('');
  const [black_cards, setBlkCards] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const wrapper = React.createRef();

  const addScore = () => {
      handleClose()

      // Формула подсчета очков
      let scores = numeric_cards*7 + special_cards*20 + black_cards*50
      // Обнулим введенное количество карт
      setNumCards('')
      setSpCards('')
      setBlkCards('')
      return props.scores_callback(scores)
  };

  return (
    <>
      <Button variant="primary" ref={wrapper} onClick={handleShow} className='form-control'>
        ПОБЕДА
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
      <Modal.Title>Ура, {props.name} молодец!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Подсчитаем победные очки
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic_cards">0-9</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Карты с цифрой"
                aria-label="Cards"
                aria-describedby="basic_cards"
                value={numeric_cards}
                onChange={e => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setNumCards(e.target.value)
                  }               
                }}
                pattern="[0-9]*"
              />
            </InputGroup>   
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="pic_cards">Картинки</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Карты с картинкой"
                aria-label="pic_cards"
                aria-describedby="pic_cards"
                value={special_cards}
                onChange={e => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setSpCards(e.target.value)
                  }               
                }}
                pattern="[0-9]*"
              />
            </InputGroup>    
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="black_cards">Черные</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Черные карты"
                aria-label="black_cards"
                aria-describedby="black_cards"
                value={black_cards}
                onChange={e => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setBlkCards(e.target.value)
                  }               
                }}
                pattern="[0-9]*"
              />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={addScore}>
            Начислить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ScoreModal