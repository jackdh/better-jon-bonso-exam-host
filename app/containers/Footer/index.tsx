/* tslint:disable:jsx-no-lambda */
/*
 *
 * Footer
 *
 */

import React, { useState } from 'react';
import { Row, Col, Button, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import store2 from 'store2';
import JSON5 from 'json5';

export function Footer() {
  const [showStorage, setStorage] = useState(false);
  const [showInput, setInput] = useState(false);

  const [inputQuestions, setInputQuestions] = useState('');
  const [showInputQuestions, setShowInputQuestions] = useState(false);

  const [text, setText] = useState('');
  const [copyText, setCopiedText] = useState('Copy');
  const data = JSON.stringify(localStorage);

  const loadData = () => {
    const items = JSON.parse(text);

    localStorage.clear();

    for (const key of Object.keys(items)) {
      localStorage.setItem(key, items[key]);
    }
    window.location.reload(false);
  };

  const copyData = () => {
    copy(data);
    setCopiedText('Copied!');
  };

  const onChange = () => {
    const data = store2('showStats');
    store2('showStats', !data);
    window.location.reload(false);
  };

  const loadQuestions = () => {
    const data = JSON5.parse(inputQuestions);
    store2('questionData', data);
    window.location.reload(false);
  };

  const clearAll = () => {
    store2(false);
    window.location.reload(false);
  };

  const clearData = () => {
    const data = store2('questionData');
    store2(false);
    store2('questionData', data);
    window.location.reload(false);
  };

  return (
    <Row>
      <Col span={12}>
        <Row>
          <p>Show's yours stats in the top of the page.</p>
          <Switch checked={store2('showStats')} onChange={onChange} /> {store2('showStats') ? 'Hide' : 'Show'} Stats
        </Row>
        <Row>
          <p>Clears just the answers you've made but not all the questions.</p>
          <Button onClick={clearData}>Clear Data</Button>
        </Row>
        <Row>
          <p>Resets the whole site back to default</p>
          <Button onClick={clearAll}>Clear All (Including Questions)</Button>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <p>Copy in total saved data.</p>
          <Button onClick={() => setInput(!showInput)}>Import</Button>
          {showInput && <textarea value={text} onChange={(e) => setText(e.target.value)} />}
          {text && <Button onClick={loadData}>Save</Button>}
        </Row>
        <Row>
          <p>Export all data</p>
          <Button onClick={() => setStorage(!showStorage)}>Export</Button>
          {showStorage && <Button onClick={copyData}>{copyText}</Button>}
          {showStorage && <pre>{data}</pre>}
        </Row>
        <Row>
          <p>Import a new set of questions</p>
          <Button onClick={() => setShowInputQuestions(!showInputQuestions)}>Import Questions</Button>
          {
            showInputQuestions && <textarea value={inputQuestions} onChange={(e) => setInputQuestions(e.target.value)} />
          }
          <Button onClick={loadQuestions}>Save</Button>
        </Row>

      </Col>
    </Row>
  );
}

export default Footer;
