import React, { useEffect, useState } from 'react';
import jdata from '../data.json';
//import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap';
import AsyncSelect from 'react-select/async';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { Printer } from 'react-bootstrap-icons'
import '../App.css';
import { Tooltip } from 'react-tooltip';
import debounce from 'lodash.debounce';
import CustomTooltip from './CustomTooltip';

function TestComponent() {
  const [listData, setListData] = useState([]);
  const loadOptions = debounce((query, cbfn) => {
    cbfn(listData.filter((i) => i.label.toLowerCase().indexOf(query.toLowerCase()) >= 0));
  }, 500);

  useEffect(() => {
    let data = [];
    Array.apply(null, Array(10)).forEach((a, i) => data.push({ value: i, label: `Item ${Math.random() * (25 - 1) + 1}` }));
    setListData(data);
  }, []);
  useEffect(() => {
  }, [listData])

  const columns = [
    { key: 'name', name: 'Name' },
    { key: 'abbreviation', name: 'Abbreviation' },
    { key: 'capital', name: 'Capital' },
    { key: 'timezone', name: 'Time Zone' }
  ];
  const rows = jdata.states;

  return (
    <div>
      <Formik enableReinitialize={true} initialValues={{}}
        onSubmit={(values, fprops) => window.location.href = '/T2'}
      >
        {(formikProps) =>
        (
          <>
            <Form className='form-control p-4' noValidate onSubmit={(e) => formikProps.handleSubmit(e, formikProps)}>
              <Row>
                <Form.Group as={Col} md={8}>
                  <Form.Label>This is a label</Form.Label>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={4}>
                  <div data-tooltip-id='custom-tooltip' data-tooltip-content={'Type to filter items'}>
                    <AsyncSelect cacheOptions
                      defaultOptions={listData}
                      loadOptions={loadOptions} />
                  </div>
                </Form.Group>
              </Row>
              <Row className='pt-2'>
                <Form.Group as={Col} md={8}>
                  <DataGrid columns={columns} rows={rows} />
                </Form.Group>
              </Row>
              <Row className='pt-2'>
                <Form.Group as={Col} md={4}>
                  <Button type='submit'
                    data-tooltip-id='custom-tt' data-tooltip-content={'Click me to find out'}>
                    <Printer /> Click Me
                  </Button>
                </Form.Group>
              </Row>
            </Form>
            <Tooltip id="custom-tooltip" place="right" delayHide={2000}
              style={{ backgroundColor: "rgb(0, 255, 30)", color: "#222" }} />
            <CustomTooltip id="custom-tt" place="top-start" delayHide={1000}
              data-tooltip-class-name="custom-tooltip"
              style={{ backgroundColor: "rgb(128,0,0)", color: "#ff0" }} />
          </>
        )}
      </Formik>
    </div>
  );
}

export default TestComponent;
