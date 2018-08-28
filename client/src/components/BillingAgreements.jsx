import React from "react";
import qs from 'qs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

var serverHost = process.env.REACT_APP_HOST;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#FFFFFF' || theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {

  },
  input: {
    display: 'none',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#005EA6' || theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    paddingRight: theme.spacing.unit * 3,

  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  progress: {
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit
  }
});

function getSteps() {
  return ['Create billing plan', 'Create agreement', 'Approve agreement', 'Execute agreement'];
}

class StepContent extends React.Component{

  handleChange(event) {
    // Save to Local Storage
    localStorage.setItem(event.target.id, event.target.value);
    this.setState({[event.target.id]: event.target.value})
  }

  constructor(props) {
    super(props);
    this.state = {
      agreementStatus: "",
      activeStep: 0,
      skipped: new Set(),
      expanded: "panel1",
      mode: 'quick',
      planType: localStorage.getItem("planType"),
      planValue: localStorage.getItem("planValue"),
      planFrequency: localStorage.getItem("planFrequency"),
      planFrequencyInt: localStorage.getItem("planFrequencyInt"),
      agreementName: localStorage.getItem("agreementName"),
      agreementDesc: localStorage.getItem("agreementDesc"),
      agreementStart: localStorage.getItem("agreementStart"),

    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleSelectChange = event => {
    localStorage.setItem(event.target.name, event.target.value);
    this.setState({[event.target.name]: event.target.value})
  };

  render(){
    const { classes } = this.props;
    var { step } = this.props

    switch (step) {

      case 0:
        return (
          <div>
            Please define billing plan details <br/>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Plan Type</InputLabel>
              <Select
                className={classes.textField}
                label="Plan Type"
                value={this.state.planType}
                defaultValue='regular'
                onChange={this.handleSelectChange}
                inputProps={{
                  name: 'planType',
                  id: 'planType-simple',
                }}
              >
                <MenuItem value={'regular'}>Regular</MenuItem>
                <MenuItem value={'trial'}>Trial</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Plan Frequency</InputLabel>
              <Select
                className={classes.textField}
                label="Plan Frequency"
                defaultValue='day'
                value={this.state.planFrequency}
                onChange={this.handleSelectChange}
                inputProps={{
                  name: 'planFrequency',
                  id: 'planFrequency-simple',
                }}
              >
                <MenuItem value={'day'}>Day</MenuItem>
                <MenuItem value={'week'}>Week</MenuItem>
                <MenuItem value={'month'}>Month</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="planFrequencyInt"
                label="Plan Frequency Interval"
                type="search"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange}
                defaultValue='1'
                value={this.state.planFrequencyInt}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="planValue"
                label="Plan Value"
                type="search"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange}
                defaultValue='100'
                value={this.state.planValue}
              />
            </FormControl>
            <FormHelperText>All fields are optional and will use defaults where blanks are received.</FormHelperText>
          </div>
        );
      case 1:
      return (
        <div>
          Please define agreement details <br/>
          <FormControl className={classes.formControl}>
            <TextField
              id="agreementName"
              label="Agreement Name"
              type="search"
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange}
              value={this.state.agreementName}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="agreementDesc"
              label="Agreement Description"
              type="search"
              className={classes.textField}
              margin="normal"
              style={{width: '500px'}}
              onChange={this.handleChange}
              value={this.state.agreementDesc}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="agreementStart"
              label="Agreement Start"
              type="datetime-local"
              className={classes.textField}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.agreementStart}
            />
          </FormControl>
          <FormHelperText>All fields are optional and will use defaults where blanks are received.</FormHelperText>
        </div>
      );
      case 2:
        return 'Approve the agreement that was just created';
      case 3:
        return 'Execute the agreement';
      default:
        return 'Unknown step';
    }
  }
}

class PayPalAgreements extends React.Component {
  isStepOptional = step => {
    //return step === 1;
    return step === null;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    switch(activeStep){
      case 0:
        this.createBillingPlan();
        console.log('create billing plan');
        break;

      case 1:
        this.createAgreement();
        console.log('create agreement');
        break;

      case 2:
        this.approveAgreement();
        console.log('approve agreement');
        break;

      case 3:
        this.executeAgreement();
        console.log('execute agreement');

        break;


      default:
        break;
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({activeStep: 0, pData: null});
    localStorage.setItem("step", 0);
    localStorage.setItem("pData", null);
    this.setState({chipStatus:''})
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  constructor(props) {
    super(props);
    this.state = {
      agreementStatus: "",
      activeStep: 0,
      skipped: new Set(),
      expanded: "panel1",
      mode: 'quick',
      chipStatus: '',
      chipIndicator: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createAgreement = this.createAgreement.bind(this);
  }

  handleChange(event) {
    // Save to Local Storage
    localStorage.setItem(event.target.id, event.target.value);
  }

  handlePanel = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  getStepButtonText(step){
    switch (step) {
      case 0:
        return 'Create Billing Plan'
      case 1:
        return 'Create Agreement'
      case 2:
        return 'Approve Agreement';
      case 3:
        return 'Execute Agreement';
      default:
        return 'Unknown';
    }
  }

  createBillingPlan() {
    var apiKey = localStorage.getItem("clientID")
    var apiSecret = localStorage.getItem("clientSecret")

    var planType = localStorage.getItem("planType")
    var planValue = localStorage.getItem("planValue")
    var planFrequency = localStorage.getItem("planFrequency")
    var planFrequencyInt = localStorage.getItem("planFrequencyInt")

    var isoDate = new Date();
    isoDate.setSeconds(isoDate.getSeconds() + 10);
    isoDate = isoDate.toISOString().slice(0,19) + 'Z';
    console.log(isoDate);
    this.setState({chipStatus:'Creating billing plan...', chipIndicator:'loading'})
    var redirectURL = 'https://'+ serverHost + '/agreements'
    var billingPlanAttributes = {
        "description": "Create Plan for Regular",
        "merchant_preferences": {
            "auto_bill_amount": "yes",
            "cancel_url": redirectURL,
            "initial_fail_amount_action": "continue",
            "max_fail_attempts": "1",
            "return_url": redirectURL,
            "setup_fee": {
                "currency": "USD",
                "value": "25"
            }
        },
        "name": "Testing1-Regular1",
        "payment_definitions": [
            {
                "amount": {
                    "currency": "USD",
                    "value": planValue || "100"
                },
                "charge_models": [
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "10.60"
                        },
                        "type": "SHIPPING"
                    },
                    {
                        "amount": {
                            "currency": "USD",
                            "value": "20"
                        },
                        "type": "TAX"
                    }
                ],
                "cycles": "0",
                "frequency": planFrequency || "DAY",
                "frequency_interval": planFrequencyInt || "1",
                "name": "Regular 1",
                "type": planType || "REGULAR"
            }
        ],
        "type": "INFINITE"
    };

    var data = {billingPlanAttributes:billingPlanAttributes, apiCredentials: {key:apiKey, secret:apiSecret}}
    var url = 'https://'+ serverHost + '/api/create-billingplan'

    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then( response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error
      }).then(data => {
        if(data.response){
          var sdkError = 'PayPal SDK Failure: ' + data.response.details[0].issue + '. (' + data.response.debug_id + ')'
          this.setState({chipStatus:sdkError, chipIndicator:'error'})
        } else {
          this.setState({
            chipStatus:'Billing plan created successfully!',
            chipIndicator:'success',
            pDataPlan:data,
            activeStep: 1
          })

          localStorage.setItem("step", 1);
          localStorage.setItem("pRedirect", data.links[0].href);
          localStorage.setItem("pBillPlanId", data.id);

          if(localStorage.getItem("mode") === 'quick'){
            if(localStorage.getItem("step") === '1'){
              this.createAgreement();
            }
          }

        }
      }).catch( err => {
            this.setState({chipStatus:'Error making request to API ('+url+'): ' + err.status + ' - ' + err.statusText, chipIndicator:'error'})
        })
  }

  createAgreement() {
    var apiKey = localStorage.getItem("clientID")
    var apiSecret = localStorage.getItem("clientSecret")
    var billPlanId = localStorage.getItem("pBillPlanId")

    var agreementName = localStorage.getItem("agreementName")
    var agreementDesc = localStorage.getItem("agreementDesc")

    var agreementStart = new Date(localStorage.getItem("agreementStart")).toISOString().slice(0,19) + 'Z';;

    var isoDate = new Date();
    isoDate.setSeconds(isoDate.getSeconds() + 10);
    isoDate = isoDate.toISOString().slice(0,19) + 'Z';


    this.setState({chipStatus:'Creating billing agreement...', chipIndicator:'loading'})
    var billingAgreementAttributes = {
        "name": agreementName || "Fast Speed Agreement",
        "description": agreementDesc || "Agreement for Fast Speed Plan",
        "start_date": agreementStart || isoDate,
        "plan": {
            "id": billPlanId
        },
        "payer": {
            "payment_method": "paypal"
        },
        "shipping_address": {
            "line1": "StayBr111idge Suites",
            "line2": "Cro12ok Street",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95112",
            "country_code": "US"
        }
    };

    console.log(billingAgreementAttributes)

    var data = { billingAgreementAttributes:billingAgreementAttributes, apiCredentials: {key:apiKey, secret:apiSecret}}
    var url = 'https://'+ serverHost + '/api/create-agreement'

    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => {
        if (!response.ok) { throw response }
        return response.json()
      }).then(data => {
        if(data.response){
          var sdkError = 'PayPal SDK Failure: ' + data.response.details[0].issue + '. (' + data.response.debug_id + ')'
          this.setState({chipStatus:sdkError, chipIndicator:'error'})
        } else {
          this.setState({pData:data});
          this.setState({activeStep: 2});
          localStorage.setItem("step", 2);
          localStorage.setItem("pRedirect", data.links[0].href);
          this.setState({chipStatus:'Billing agreement created successfully!', chipIndicator:'success'})
          if(localStorage.getItem("mode") === 'quick'){
            if(localStorage.getItem("step") === '2'){
              this.approveAgreement();
            }
          }
        }
      }).catch( err => {
            this.setState({chipStatus:'Error making request to API ('+url+'): ' + err.status + ' - ' + err.statusText, chipIndicator:'error'})
        })
  }

  approveAgreement() {
    localStorage.setItem("pData",JSON.stringify(this.state.pData));
    localStorage.setItem("step",2);
    this.setState({chipStatus:'Redirecting to PayPal for approval...', chipIndicator:'loading'})
    window.location = localStorage.getItem("pRedirect");
  }

  componentWillMount(){
    var urlParams = qs.parse(this.props.location.search.slice(1));
    this.setState({activeStep: 0, mode: localStorage.getItem("mode")});
    if (urlParams.token) {
      localStorage.setItem("agreementToken", urlParams.token);
      this.setState({activeStep: 3});
      this.setState({pData:JSON.parse(localStorage.getItem("pData"))})
      this.setState({chipStatus:'Billing agreement approved', chipIndicator:'success'})
      if(localStorage.getItem("mode") === 'quick'){
        this.executeAgreement();
      }
    }

  }

  executeAgreement(){
    var apiKey = localStorage.getItem("clientID")
    var apiSecret = localStorage.getItem("clientSecret")
    var token = localStorage.getItem("agreementToken")
    var url = 'https://'+ serverHost + '/api/execute-agreement'
    var data = {apiCredentials: {key:apiKey, secret:apiSecret}, token:token}
    this.setState({chipStatus:'Executing agreement...', chipIndicator:'loading'})
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => {
        if (!response.ok) { throw response }
        return response.json()
      }).then(data => {
        if(data.response){
          var sdkError = 'PayPal SDK Failure: ' + data.response.details[0].issue + '. (' + data.response.debug_id + ')'
          this.setState({chipStatus:sdkError, chipIndicator:'error'})
        } else {
          this.setState({activeStep: 4});
          this.setState({pData:data});
          this.setState({chipStatus:'Billing agreement has been executed successfully!', chipIndicator:'success'})
        }
      }).catch( err => {
            this.setState({chipStatus:'Error making request to API ('+url+'): ' + err.status + ' - ' + err.statusText, chipIndicator:'error'})
        })
  }

  handleModeChange = event => {
    this.setState({ mode: event.target.value });
    localStorage.setItem("mode", event.target.value)
  };

  getChipIcon(chipIndicator){
    const { classes } = this.props;
    switch (chipIndicator) {
      case 'loading':
        return (
          <CircularProgress className={classes.progress} size={15} />
        );
      case 'success':
        return (
          <i className="far fa-check-circle" style={{color: '#090',padding: '8px 12px'}}/>
        );
      case 'error':
        return (
          <i className="far fa-times-circle" style={{color: '#900',padding: '8px 12px'}}/>
        );
      default:
        return 'Unknown';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps(this.state.mode);
    const { activeStep } = this.state;
    var pData = this.state.pData;
    var pDataStringified = JSON.stringify(pData, null, ' ');
    const { expanded } = this.state;
    var {chipStatus} = this.state;
    var {chipIndicator} = this.state;
    return (
      <TabContainer>
        <div>
          <h4>Create Billing Agreement</h4>
        </div>
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Agreement Mode:</FormLabel>
                  <RadioGroup
                    aria-label="Mode"
                    name="mode"
                    className={classes.group}
                    value={this.state.mode}
                    onChange={this.handleModeChange}
                  >
                    <FormControlLabel value="quick" control={<Radio />} label="Quick" />
                    <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                  </RadioGroup>
                  <FormHelperText>Quick agreements will be processed automatically, Custom agreements require user action for each step.</FormHelperText>
                </FormControl>
              </div>
            </Paper>

            <Paper className={classes.paper}>
              <div className={classes.root}>

                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const props = {};
                    const labelProps = {};
                    if (this.isStepOptional(index)) {
                      labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (this.isStepSkipped(index)) {
                      props.completed = false;
                    }
                    return (
                      <Step key={label} {...props}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <div className={classes.root}>
                  {activeStep === steps.length ? (
                    <div>
                      <Typography className={classes.instructions}>
                        Agreement completed succesfully.
                      </Typography>
                      <Button variant="outlined" onClick={this.handleReset} className={classes.button}>
                        Start Over
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {this.state.mode === 'custom' ? (
                          <StepContent {...this.props} step={activeStep} />
                          ):(null)
                        }
                      </Typography>
                      <div>
                        {activeStep !== 0 ? (
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                        ):(null)}

                        {this.isStepOptional(activeStep) && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.handleSkip}
                            className={classes.button}
                          >
                            Skip
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {this.getStepButtonText(activeStep)}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {chipStatus !== '' ? (
                  <Chip
                    avatar={
                      this.getChipIcon(chipIndicator)
                    }
                    label={chipStatus}
                    className={classes.chip}
                  />
                ):(null)}

              </div>
            </Paper>
            {pData ? (
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handlePanel('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    <i className="far fa-check-circle" style={{
                          color: '#090',
                          paddingRight: '25px'
                        }}/>
                    <span style={{fontWeight: 375}}><b>Agreement ID: </b>{pData.id}</span>
                  </Typography>
                  <Typography className={classes.heading}>
                    <span style={{fontWeight: 375}}><b>Status: </b>{pData.state}</span>
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    <span style={{fontWeight: 350}}>{moment(pData.create_time).format('ddd, MMM Do YYYY @ h:mm:ss A')}</span>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {pData.plan.payment_definitions.map((pDef, key) =>
                      <Typography key={key} variant="caption">
                        <span style={{ paddingRight: '25px' }}><b>Type: </b>{pDef.type}</span>
                        <span style={{ paddingRight: '25px' }}><b>Value: </b>{pDef.amount.value}</span>
                        <span style={{ paddingRight: '25px' }}><b>Frequency: </b>{pDef.frequency}</span>
                        <span style={{ paddingRight: '25px' }}><b>Frequency Interval: </b>{pDef.frequency_interval}</span>
                        <span style={{ paddingRight: '25px' }}><b>Cycles: </b>{pDef.cycles}</span>
                        <hr/>
                      </Typography>
                    )}
                    <div>
                      <h4>Agreement Details</h4>
                      <CodeMirror
                        ref='ipnMessage'
                        value={pDataStringified}
                        options={{
                          lineNumbers: true,
                          mode: { name: 'javascript', json: true },
                          theme: 'material',
                          readOnly: 'nocursor' // Nocursor for proper mobile handling
                        }}
                        onChange={(editor, pDataStringified, value) => {}}
                        preserveScrollPosition={true}
                      />
                    </div>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ):(
              null
            )}
          </main>
        </React.Fragment>
      </TabContainer>
    );
  }
}

PayPalAgreements.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PayPalAgreements);
