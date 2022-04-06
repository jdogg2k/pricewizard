import React, { useEffect } from 'react';
import { ComposedChart, Cell, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { object, string } from 'prop-types';

PriceChart.propTypes = {
    builddata: object,
    catname: string,
    changeState: string,
}

export default function PriceChart(props) {

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    let deliveredprice = 0;
    let data = [];

    var buildStats = props.builddata;

    function addData (pName, dollars) {
        var color = "#69a2ff";
        if (pName.startsWith("Subtotal"))
            color = "#413ea0";
        if (pName != "Delivered Price" && !pName.startsWith("Subtotal")) {
            deliveredprice += dollars;
        } else {
            color = "#1c8219";
        }
            
        data.push({name: pName, cost: dollars, color: color, total: deliveredprice});
    }

    addData("Cost of Acquisition", buildStats.compacquisition);
    addData("Replacement", buildStats.comprelacement);
    addData("Segment / Margin Advantage", buildStats.compsegment);
    addData("Subtotal for Market Component Value", deliveredprice);
    addData("Component Shrink", buildStats.compshrink);
    addData("Packaging", buildStats.packaging);
    addData("Finished Good Shrink", buildStats.finishedshrink);
    addData("Interplant Freight", buildStats.interplantfreight);
    addData("Manufacturing Cost", buildStats.manufacturingcost);
    addData("Subtotal for Cost to Pricing", deliveredprice);
    addData("External Consulting Margin", buildStats.externalconsulting);
    addData("Service & Value Margin", buildStats.servicevalue);
    addData("Non-Standard Service Premium", buildStats.nonstandard);
    addData("Discount Premium", buildStats.discountpremium);
    addData("Inflation Premium", buildStats.inflationpremium);
    addData("Currency Risk Premium", buildStats.curriskpremium);
    addData("Cash Payment Premium", buildStats.cashpremium);
    addData("Tax Premium", buildStats.taxpremium);
    addData("Subtotal for Adjustable Price", deliveredprice);
    addData("Market Freight", buildStats.marketfreight);
    addData("Delivered Price", deliveredprice);


    return(
        <Container>
            <Row>
                <Col></Col>
                <Col xs={9} className="text-align: center;">
                    <h2>{props.catname} Build</h2>
                    <h4>Delivered Price: <CurrencyFormat className='chartTotal' value={deliveredprice} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} /></h4>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div style={{ width: '100%', height: 600 }}>
                        <ResponsiveContainer>
                            <ComposedChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis height={200} name='Category' dataKey="name" angle={-90} interval={0} textAnchor='end' />
                            <YAxis width={100} type='number' tickFormatter={currencyFormat}/>
                            <Tooltip formatter={(value) => currencyFormat(value)} />
                            <Legend />
                            <Area name='Totaled Cost' type="monotone" dataKey="total" stroke="#1c8219" fill="#75a174" />
                            <Bar name='Component Cost' dataKey="cost" barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            </Bar>
                            
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col xs={9}>
                <Button variant="secondary" onClick={goBack} className="mb-2">Back</Button>
                </Col>
                <Col></Col>
            </Row>
            </Container>
    )
    

    function goBack() {
        props.changeState("category", "");
      }

    

    
    
}