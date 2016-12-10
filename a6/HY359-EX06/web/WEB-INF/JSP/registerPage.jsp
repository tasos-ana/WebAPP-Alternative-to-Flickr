<%-- 
    Document   : registerPage
    Created on : Nov 25, 2016, 2:57:26 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="animated_container">
    <h2 id="register_form_title" class="text-center">Registration form</h2>
    <form id="register_form" name="registration" class="form-horizontal">
        <!--LOGIN CREDENTIAL FORM-->
        <!--USERNAME-->
        <div class="form-group">
            <label for="usrID" class="control-label col-sm-3">Username:</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="usrID" name="usrID" placeholder="Enter Username" 
                       autofocus required size="38" onchange="validationAPI.usrID(true)">
            </div>
            <div id="usrID_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--EMAIL-->
        <div class="form-group">
            <label for="usrEMAIL" class="control-label col-sm-3">Email:</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="usrEMAIL" name="usrEMAIL" placeholder="Enter Email" 
                       size="38" required onchange="validationAPI.usrEMAIL(true)">
            </div>
            <div id="usrEMAIL_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--PASSWORD 1-->
        <div class="form-group">
            <label for="usrPW" class="control-label col-sm-3">Password:</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" id="usrPW" name="usrPW" placeholder="Enter Password" 
                       required size="38" onchange="validationAPI.usrPW(true)">
            </div>
            <div id="usrPW_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--PASSWORD 2-->
        <div class="form-group">
            <label for="usrPW2" class="control-label col-sm-3">Repeat:</label>
            <div class="col-sm-6">
                <input type="password" class="form-control" id="usrPW2" name="usrPW2" placeholder="Enter Password" 
                       required size="38" onchange="validationAPI.usrPW2(true)">
            </div>
            <div id="usrPW2_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--PERSONAL INFO FORM-->
        <!--FIRST NAME-->
        <div class="form-group">
            <label for="usrFNAME" class="control-label col-sm-3">First Name:</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="usrFNAME" name="usrFNAME" placeholder="Enter First Name" 
                       required size="38" onchange="validationAPI.usrFNAME()">
            </div>
            <div id="usrFNAME_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--LAST NAME-->
        <div class="form-group">
            <label for="usrLNAME" class="control-label col-sm-3">Last Name:</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="usrLNAME" name="usrLNAME" placeholder="Enter Last Name" 
                       required size="38" onchange="validationAPI.usrLNAME()">
            </div>
            <div id="usrLNAME_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--BORN DATE(BIRTH DATE)-->
        <div class="form-group">
            <label class="control-label col-sm-3" id="usrBDATE">Birthday</label>
            <div class="col-sm-6">
                <label>Month: 
                    <select id="usrBDATE_M" name="BirthMonth" onchange="validationAPI.usrBDATE()">
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select> 
                </label>
                <label>Day: <input id="usrBDATE_D" maxlength="2" name="BirthDay" size="3"
                                   placeholder="Day" required=""
                                   onchange="validationAPI.usrBDATE()"></label>
                <label>Year: <input id="usrBDATE_Y" min="1900" max="2016" maxlength="4" name="BirthYear" size="5"
                                    placeholder="Year" required="" 
                                    onchange="validationAPI.usrBDATE()"></label>
            </div>
            <div id="usrBDATE_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--GENDER-->
        <div class="form-group">
            <div><label class="control-label col-sm-3">Gender:</label>
                <div class="col-sm-6">
                    <input type="radio" value="Male" name="usrSEX">Male 
                    <input type="radio" value="Female" name="usrSEX">Female
                    <input type="radio" value="Unknown" name="usrSEX" checked>Unknown
                </div>
            </div>
        </div>
        <!--Country-->
        <div class="form-group">
            <label for="usrCOUNTRY" class="control-label col-sm-3">Country:</label>
            <div class="col-sm-6">
                <select class="form-control" id="usrCOUNTRY" name="usrCOUNTRY">
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece" selected>Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                    <option value="Korea, Republic of">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </select>
            </div><br>
        </div>
        <!--TOWN-->
        <div class="form-group">
            <label for="usrTOWN" class="control-label col-sm-3">Town:</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="usrTOWN" name="usrTOWN" placeholder="Enter Town" 
                       required size="38" onchange="validationAPI.usrTOWN();">
            </div>
            <div id="usrTOWN_err" class="col-sm-3 text-left" style="color: red;">*</div>
        </div>
        <!--MORE INFO-->
        <div class="form-group">
            <label for="txtarea" id="txtarea_desc" class="control-label col-sm-3">More Info:</label>
            <div class="col-sm-6">
                <textarea id="txtarea" class="form-control" name="usrEXTRA" placeholder="Enter Extra info for you" 
                          maxlength="500"></textarea>
            </div>
        </div>
        <div id="form_alert" class="alert alert-danger" hidden>
            <strong>Incomplete form!</strong> You should check it again.
        </div>
        <div id="new_usr_action" class="form-group">
            <div class="col-sm-5"></div>
            <button type="button" onclick="ajaxRegisterRequest()" class="btn btn-default btn_style col-sm-2">Register</button>
            <input type="reset" id="clear_form" class="btn btn-default col-sm-1 btn_style"
                   onclick="register_error_reset()" value="Clear">
        </div>
    </form>
</div>