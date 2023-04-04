import React from "react";
import Header2 from "../../componets/Header2";
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { MdDisabledByDefault } from 'react-icons/md'
import StripeCheckout from 'react-stripe-checkout'
import "./subscription.css"
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const MySwal = withReactContent(Swal);

const Subscription = () => {

    const publishableKey =
        'pk_test_51MXehlSEcvnxp27qm3Ccbt3v96KD2PvC6XkfrLvoyZZrvVSO5YV2TiaQHeLRP9KOFBxoTEFDg7JDXvOyw8Gj0OzG006uZgk9Sn';

    const priceForStripe = 1000 * 100;

    const handleSuccess = () => {
        MySwal.fire({
            icon: 'success',
            title: 'Payment was successful',
            time: 4000,
        });
    };
    const handleFailure = () => {
        MySwal.fire({
            icon: 'error',
            title: 'Payment was not successful',
            time: 4000,
        });
    };
    const payNow = async token => {
        try {
            const response = await axios({
                url: 'http://localhost:5000/payment',
                method: 'post',
                data: {
                    amount: 1000 * 100,
                    token,
                },
            });
            if (response.status === 200) {
                handleSuccess();
            }
        } catch (error) {
            handleFailure();
            console.log(error);
        }
    };
    return (
        <div>
            <Header2 />
            <>
                <div className="head">
                    <p>If you're looking to stay up-to-date on our latest travel deals, sign up for our newsletter and never miss out on an opportunity to explore new destinations!
                    </p><p>Our subscription service is the perfect way to stay in the loop and receive exclusive offers straight to your inbox.</p>
                </div>
                <div className="background">
                    <div className="container package_container" >
                        <article className="package">
                            <div className="package_head">
                                <h2>Free Plan<br />
                                    Rs.0%</h2>
                                <button className='my-button'>Sign Up-Its Free</button>
                            </div>
                            <ul className="package_features">
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>

                                <li>
                                    <p><MdDisabledByDefault className="package_features_icon2" />
                                    </p>
                                </li>
                                <li>
                                    <p><MdDisabledByDefault className="package_features_icon2" />
                                    </p>
                                </li>
                                <li>
                                    <p><MdDisabledByDefault className="package_features_icon2" />
                                    </p>
                                </li>
                                <li>
                                    <p><MdDisabledByDefault className="package_features_icon2" />
                                    </p>
                                </li>



                            </ul>
                        </article>
                        <article className="package">
                            <div className="package_head">
                                <h2>Premium Plan<br />Rs.1000</h2>



                                <StripeCheckout
                                    stripeKey={publishableKey}
                                    label="Pay Now"
                                    name="Pay With Credit Card"

                                    amount={priceForStripe}
                                    description={`Your total is $${1000}`}
                                    token={payNow}
                                />
                            </div>
                            <ul className="package_features">
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>
                                <li>
                                    <p><BsFillCheckCircleFill className="package_features_icon" />
                                        Add feature</p>
                                </li>

                            </ul>
                        </article>
                    </div>
                </div>
            </>

        </div>
    )
}

export default Subscription;