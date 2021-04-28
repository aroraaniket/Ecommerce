import React from 'react'
import {Link} from 'react-router-dom'

function FooterScreen() {
    return (
       <footer className="desktop-footerContainer">
           <div>

           </div>
           <div className="desktop-genericInfo" >
               <div className="desktop-shopLinks" >
                   <p className="desktop-gInfoTitle" >
                       <Link to="/" className="footer-p"> ONLINE SHOPPING </Link>
                       </p>
                       <Link to="/shop/men"> Men</Link>
                       <Link to="/shop/women"> Women</Link> 
                        <Link to="/shop/kids"> Kids</Link>

                      
                           
                           </div>
                           </div>
                           <div className="desktop-usefulLinks">
                           <p className="desktop-gInfoTitle" >
                      USEFUL LINKS
                       </p>

                       <Link to="/#"> Contact us</Link>
                       <Link to="/#"> FAQ</Link>
                       <Link to="/#"> T&C</Link>
                       <Link to="/#"> Terms of Use</Link>
                       <Link to="/#"> Track Orders</Link>


                           </div>
                          
                           <div className="desktop-appExperience" >
                               <p className="desktop-gInfoTitle" > 
                               EXPERIENCE APP ON MOBILE
                                </p>
                                <div className="desktop-downLinkContainer" >
                                    <a href="/#" >
                              <img className="desktop-androidDownLink" src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" alt="App download " >

                              </img>
                                            </a>
                                            <a href="/#" >
                                                <img className="desktop-iOSDownLink" src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" alt="App download "></img>
                                                    </a>
                                                    </div>
                                                    <div className="desktop-keepInTouch" > KEEP IN TOUCH </div>
                                                    <a href="/#" className="desktop-facebook" data-reactid="95">
                                                        <img src="https://constant.myntassets.com/web/assets/img/d2bec182-bef5-4fab-ade0-034d21ec82e31574604275433-fb.png"  alt="Facebook icon"  style={{width: "20px", height: "20px"}}>
                                                        </img>
                                                    </a>
                                                    <a href="/#" className="desktop-facebook" data-reactid="95">
                                                        <img src="https://constant.myntassets.com/web/assets/img/f10bc513-c5a4-490c-9a9c-eb7a3cc8252b1574604275383-twitter.png"    alt="Twitter icon"  style={{width: "20px", height: "20px"}}>
                                                        </img>
                                                    </a>
                                                    <a href="/#" className="desktop-facebook" data-reactid="95">
                                                        <img src="https://constant.myntassets.com/web/assets/img/a7e3c86e-566a-44a6-a733-179389dd87111574604275355-yt.png"   alt="Youtube icon"  style={{width: "20px", height: "20px"}}>
                                                        </img>
                                                    </a>
                                                    <a href="/#" className="desktop-facebook" data-reactid="95">
                                                        <img src="https://constant.myntassets.com/web/assets/img/b4fcca19-5fc1-4199-93ca-4cae3210ef7f1574604275408-insta.png"   alt="Instagram icon"  style={{width: "20px", height: "20px"}}>
                                                        </img>
                                                    </a>
                                                    
                           </div>


                           <div className="desktop-promises" >
                               <div className="desktop-section" >
                                   <div className="desktop-original">
                                       <img src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
                                         style={{width: "48px", height: "40px"}} alt="">
                                            </img>
                                           </div>
                                           <div data-reactid="107">
                                               <strong >
                                                   100% ORIGINAL
                                                    </strong>
                                                   </div>
                                                   </div>
                                                   <div className="desktop-section" data-reactid="110"><div className="desktop-return" >
                            <img src="https://constant.myntassets.com/web/assets/img/ef05d6ec-950a-4d01-bbfa-e8e5af80ffe31574602902427-30days.png"
                               alt=""
                               style={{width: "48px", height: "49px"}}>
                                 </img>
                                 
                                 </div>
                                 <div data-reactid="113">
                                     <strong data-reactid="114">
                                         Return within 30days </strong>
                                    </div>
                                    </div>
                                    <div className="desktop-section" >
                                        <div className="desktop-delivery">
                <img src="https://constant.myntassets.com/web/assets/img/cafa8f3c-100e-47f1-8b1c-1d2424de71041574602902399-truck.png" 
                alt=""
                style={{width: "48px", height: "43px"}}>
                  </img>
                    </div>
                    <div >
                        <strong >
                            Get free delivery 
                            </strong>
                            </div>
                            </div>
                            </div>



                           <div>

                           </div>
                        
                           </footer>


                          )
                          }

export default FooterScreen
