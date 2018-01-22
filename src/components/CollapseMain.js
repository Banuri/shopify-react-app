import React, { Component } from 'react';
import Collapse2 from './collapse2';
import * as axios from 'axios';
import { Row, Col, Collapse, Card } from 'reactstrap';
import { Thumbnail,  Page, Button, Stack, TextStyle } from '@shopify/polaris';
const QRCode = require('qrcode.react');

class CollapseMain extends Component {

    constructor(props) {
        super(props);
        this.fulfillOrder = this.fulfillOrder.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });  
    }

    fulfillOrder(){
        const url = '/shopify/shop-api/orders/' + this.props.order.id + '/fulfill';
         alert("Order fulfilled" + url);
     }

    render() {

        let buttonProps = this.state.collapse ? {text:"Hide Details"} : {text:"View Details"}
        let cardStyle = {   backgroundColor: 'white', 
                            margin: 10, 
                            padding: 10,
                            boxShadow: "0.2px 0.2px 1px 0.5px rgba(0, 0, 0, .2)"
                        }
    
        return (
  
            // <Card key={this.props.order.order_number} sectioned subdued={false}>
            <Card style={cardStyle}>

                <Row >
                    <Col sm="2" >
                        <TextStyle variation="strong">{this.props.title}</TextStyle>
                    </Col> 
                    <Col sm="3">
                        <TextStyle variation="subdued"><strong>Created on:</strong> {this.props.order.created_at}</TextStyle>
                    </Col >
                    <Col xs="3" sm="5" style={{paddingRight: 0, width: 420}}>
                        <TextStyle variation="subdued"><strong>Customer:</strong> {this.props.order.customer}</TextStyle>
                    </Col >
                    <Col sm="2" style={{paddingRight: 0, width: 130}}>
                        <Button 
                                size="slim" 
                                outline  
                                onClick={this.toggle} 
                            >
                                {buttonProps.text}
                        </Button>
                    </Col>                          
                </Row>
                      
                {/* <Stack>
                    <Stack.Item >
                        <TextStyle variation="strong">{this.props.title}</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                        <TextStyle variation="subdued"><strong>Created on:</strong> {this.props.order.created_at}</TextStyle>
                    </Stack.Item>
                    <Stack.Item fill>
                        <TextStyle variation="subdued"><strong>Customer:</strong> {this.props.order.customer}</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                        <Button 
                            size="slim" 
                            outline  
                            onClick={this.toggle} 
                            style={{ marginBottom: '1rem' }}
                        >
                            {buttonProps.text}
                        </Button>
                    </Stack.Item>
                </Stack> */}
                
                <Collapse isOpen={this.state.collapse}>
                    <Row style={{paddingTop: '1rem' }}>
                        <Col sm="12">
                            <Row style={{padding: 20}}>
                                <Col sm="3" style={{paddingBottom: 20}}>
                                    <Button primary onClick={this.fulfillOrder}>Mark as Fulfilled</Button>
                                </Col> 
                                <Col sm="7">
                                </Col >
                                <Col sm="2" >
                                    <QRCode value={this.props.qrVal} />
                                </Col>                          
                            </Row>
                            <Row style={{paddingRight: 20, paddingLeft: 20}}>   
                                <Collapse2 itemArray={this.props.order.lineItems} products={this.props.productsProp} />                            
                            </Row>
                        </Col>                 
                    </Row>
                </Collapse>   
            </Card>                
        );
    }
}

export default CollapseMain;
