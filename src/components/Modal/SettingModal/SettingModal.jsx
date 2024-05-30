import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../../store/darkModeSlice'; // 경로를 맞춰주세요
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import classes from './SettingModal.module.css';
import closeIcon from '../../../assets/closeIcon.svg';

function SettingModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [language, setLanguage] = useState('한국어');

  useEffect(() => {
    // 모달이 열릴 때 로컬 상태를 Redux 상태로 초기화
    setLocalDarkMode(isDarkMode);
  }, [show, isDarkMode]);

  const handleApply = () => {
    if (localDarkMode !== isDarkMode) {
      dispatch(toggleDarkMode());
    }
    handleClose();
  };

  const handleModalClose = () => {
    setLocalDarkMode(isDarkMode); // 모달이 닫힐 때 로컬 상태를 Redux 상태로 초기화
    handleClose();
  };

  useEffect(() => {
    // 다크 모드 변경 시 클래스 업데이트
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <>
      <Modal show={show} onHide={handleModalClose} centered>
        <Modal.Header className={classes.header}>
          <Modal.Title>설정</Modal.Title>
          <img onClick={handleModalClose} className={classes.closeIcon} src={closeIcon}/>
        </Modal.Header>
        <Modal.Body className={classes.modal_body}>
          <Form>
            <Form.Group className={classes.form_group}>
              <Form.Label className={classes.label}>다크모드</Form.Label>
              <Form.Check 
                type="switch"
                id="dark-mode-switch"
                label={localDarkMode ? "ON" : "OFF"}
                checked={localDarkMode}
                onChange={(e) => setLocalDarkMode(e.target.checked)}
                className={localDarkMode ? classes.switch_checked : ""}
              />
            </Form.Group>
           
            <Form.Group className={classes.form_group}>
              <Form.Label className={classes.label}>언어설정</Form.Label>
              <Form.Control 
                as="select" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className={classes.custom_select}
              >
                <option>한국어</option>
                <option>영어</option>
                <option>일본어</option>
              </Form.Control>
            </Form.Group>
           
            <Form.Group className={classes.form_group}>
              <Form.Label className={classes.label}>색약모드</Form.Label>
              <Form.Check 
                type="switch"
                id="color-blind-mode-switch"
                label={colorBlindMode ? "ON" : "OFF"}
                checked={colorBlindMode}
                onChange={(e) => setColorBlindMode(e.target.checked)}
                className={colorBlindMode ? classes.switch_checked : ""}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={classes.footer}>
          <Button variant="primary" onClick={handleApply}>
            적용
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SettingModal;