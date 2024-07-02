import React, { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import AsyncSelect from 'react-select/async';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'react-data-grid/lib/styles.css';
import { Printer } from 'react-bootstrap-icons'
import '../App.css';
import { Tooltip } from 'react-tooltip';
import debounce from 'lodash.debounce';

function TestComponent2() {
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const loadOptions = debounce((query, cbfn) => {
    cbfn(listData.filter((i) => i.label.toLowerCase().indexOf(query.toLowerCase()) >= 0));
  }, 500);

  useEffect(() => {
    let data = [];
    Array.apply(null, Array(10)).forEach((a, i) => data.push({ value: i, label: `Item ${Math.random() * (25 - 1) + 1}` }));
    setListData(data);
  }, []);

  return (
    <div>
      <Formik enableReinitialize={true} initialValues={{}}
        onSubmit={(values, fprops) => window.location.href = '/'}
      >
        {(formikProps) =>
        (
          <>
            <Form className='form-control p-4'
              noValidate onSubmit={(e) => formikProps.handleSubmit(e, formikProps)}
            >
              <Row>
                <Form.Group as={Col} md={8}>
                  <Form.Label>Mock List</Form.Label>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={4}>
                  <div data-tooltip-id='custom-tooltip' data-tooltip-content={'Type to filter items'}>
                    <AsyncSelect cacheOptions
                      defaultOptions={listData}
                      loadOptions={loadOptions}
                      onChange={(e) => setSelectedItem(e)} />
                  </div>
                </Form.Group>
              </Row>
              <Row className='pt-2'>
                <Form.Group as={Col}>
                  <Form.Label>{selectedItem.label}</Form.Label>
                </Form.Group>
              </Row>
              <Row className='pt-2'>
                <Form.Group as={Col} md={4} className='d-flex'>
                  <Button data-tooltip-id='custom-tooltip' data-tooltip-content={'Go home...'}
                    type='submit'>
                    <Printer /> <span className='align-middle'>Click Me</span></Button>
                </Form.Group>
              </Row>
            </Form>
            <Tooltip id="custom-tooltip" place="right" delayHide={1000} />
          </>
        )}
      </Formik>
    </div>
  );
}

export default TestComponent2;
