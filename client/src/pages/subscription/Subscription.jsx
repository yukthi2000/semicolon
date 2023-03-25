import React from "react";
import Header2 from "../../componets/Header2";
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { MdDisabledByDefault } from 'react-icons/md'
import StripeCheckout from 'react-stripe-checkout'
import "./subscription.css"

const Subscription=()=>{
  return(
    <div>
      <Header2/>
      <>
      <div style={{paddingTop:100}}>
            <section id='packages'>
                <div className="container package_container">
                    <article className="package">
                        <div className="package_head">
                            <h2>FREE</h2>
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
                            <h2>FREMIUM</h2>
                            <StripeCheckout/>
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

            </section>
            </div>
        </>

    </div>
  )
}

export default Subscription;