import React, {Component} from "react";
import {Container, Row, Col, Card} from "reactstrap";
import {Button} from "reactstrap";
import {Table} from "reactstrap";
import moment from "moment";
import {listpublisher, getPrice, getTotalPrice} from '../../actions/publishers';
import {createInvoice} from '../../actions/invoice';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import Header from '../Header';
import {AppHeader} from '@coreui/react';

import pub1 from '../../assets/img/daily_news.png'
import pub2 from '../../assets/img/ft_logo.png'


let publishers = [];
let total_price = 0;

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publisher: []
        };

        this.onQuickClick = this.onQuickClick.bind(this);
    }
    componentDidMount() {
        this.props.listpublisher();
        publishers = JSON.parse(localStorage.getItem("publishers"));
        this.props.getPrice(publishers);
        this.props.getTotalPrice(publishers);

    }

    onQuickClick() {
        console.log("total_price", total_price)
        this.props.createInvoice(publishers, total_price);
        window.location.href = "/dashboard";
    }

    back_hander = () => {
        window.location.href = "/category"
    }

    render() {
        const date = moment().format("DD-MM-YYYY")
        let publisher = localStorage.getItem("publisher name:");
        const price = localStorage.getItem("publisher id:");
        //  this.props.listpublisher(price); console.log(this.props.publishers) const
        // pubs = this.props.getPrice(publishers); console.log("publishers: ", pubs);
        // this.setState({date})
        return (
            <div className="animated fadeIn">
                <AppHeader >
                    <Header/>
                </AppHeader>
				<Container className="mt-5">
					<Row>
						<Col>
							<h2>Invoice</h2>
							<p>Date : {date}</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<Table>
								<thead>
									<tr>
										<th>Publisher</th>
										<th className="text-right">Amount</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<div className="mr-3">
													<img src={pub1} width="90" />
												</div>
												<div>
													<p>Daily News</p>
													<p>Sports - English</p>
												</div>
											</div>
										</td>
										<td className="text-right">
											<p>Rs. 20,000.00</p>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<div className="mr-3">
													<img src={pub2} width="90" />
												</div>
												<div>
													<p>Daily FT</p>
													<p>Classified - English</p>
												</div>
											</div>
										</td>
										<td className="text-right">
											<p>Rs. 20,000.00</p>
										</td>
									</tr>
									
								</tbody>
								<tfoot>
									<tr className="table-active">
										<th>Total</th>
										<th className="text-right">Rs. 40,000.00</th>
									</tr>
								</tfoot>
							</Table>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button color="success" style={{ float: "right"}}onClick={this.onQuickClick}>Submit</Button>{" "}
							<Button color="danger" onClick={() => this.props.history.go(-1)}>Back</Button>
						</Col>
					</Row>
				</Container>
            </div>
        );
    }
}

function mapStateToProps({publisher, publisherPrice, totalPrice}) {
    return {publisher, publisherPrice, totalPrice};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        listpublisher,
        getPrice,
        getTotalPrice,
        createInvoice
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoice));
