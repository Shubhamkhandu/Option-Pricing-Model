var call_payoff_array = [], put_payoff_array = [], call_black_premium = -1, put_black_premium = -1;

class MonteCarlo{

 constructor(size, strike, spot, time, vol, rate){
    this.simulation = [];
    this.spot_price = spot;
    this.call_payoff = [];
    this.put_payoff = [];
    this.length_simulation = size;
    this.strike_price = strike;
    this.time_period = time;
    this.volatility = vol;
    this.risk_rate = rate;
  }


  mean(array) {
      var sum = 0;
      var avg;
      for (var i = 0; i < this.length_simulation; i++) {
          sum += array[i];
      }
      avg = sum / this.length_simulation;
      return avg;
  }

  SampleGaussian(mean, stddev)
  {
      // The method requires sampling from a uniform random of (0,1]
      var x1 = 0,x2 = 0;
      while(x1 === 0) x1 = Math.random(); //Converting [0,1) to (0,1)
      while(x2 === 0) x2 = Math.random();
      var y1 = Math.sqrt(-2.0 * Math.log(x1)) * Math.cos(2.0 * Math.PI * x2);
      return y1 * stddev + mean;
  }

  init_array(){
      for (var i = 0; i < this.length_simulation; i++) {
          var term1 = (this.risk_rate - Math.pow(this.volatility,2.0)/2) * this.time_period;
          var term2 = this.volatility * Math.sqrt(this.time_period) * this.SampleGaussian(0.0,1.0);
          this.simulation[i] = this.spot_price * Math.exp(term1 + term2);
      }
  }

  init_call_payoff() {
      for (var i = 0; i < this.length_simulation; i++) {
          this.call_payoff[i] = (Math.max((this.simulation[i]-this.strike_price),0)) * (Math.exp((-1)*(this.risk_rate)*(this.time_period)));
      }
  }

  init_put_payoff()
  {
      for (var i = 0; i < this.length_simulation; i++)
      {
          this.put_payoff[i] = (Math.max((this.strike_price - this.simulation[i]), 0)) * (Math.exp((-1) * (this.risk_rate) * (this.time_period)));
      }
  }

  cal_premium() {
      this.init_array();
      this.init_call_payoff();
      this.init_put_payoff();
      var call_premium = this.mean(this.call_payoff);
      var put_premium = this.mean(this.put_payoff);
      call_payoff_array = this.call_payoff;
      put_payoff_array = this.put_payoff;
      document.getElementById("callprice").innerHTML = call_premium;
      document.getElementById("putprice").innerHTML = put_premium;
  }

 
}

function calculate_monte(){
    var size, strike, spot, time, vol, rate;
    size = document.getElementById("simulation").value;
    strike = document.getElementById("strike").value;
    spot = document.getElementById("spot").value;
    time = document.getElementById("time").value / 360.0;
    vol = document.getElementById("vol").value / 100.0;
    rate = document.getElementById("rate").value / 100.0;
    if (strike == "" && spot == "" && time == "" && vol == "" && rate == "" && size == "") {
        alert("Enter all details!");
    }
    else if(strike == ""){
    	alert("Enter appropriate Strike Price");
    	document.getElementById('strike').value = '';
    }
    else if(spot == ""){
    	alert("Enter appropriate Spot Price");
    	document.getElementById('spot').value = '';
    }
    else if(vol == ""){
    	alert("Enter appropriate Volatility");
    	document.getElementById('vol').value = '';
    }
    else if(rate == ""){
    	alert("Enter appropriate Risk Free Rate");
    	document.getElementById('rate').value = '';
    }
    else if(time == ""){
    	alert("Enter appropriate time period");
    	document.getElementById('time').value = '';
    }
    else if(size == ""){
    	alert("Enter appropriate number of simulation");
    	document.getElementById('simulation').value = '';
    }
    else {
        const cal = new MonteCarlo(size, strike, spot, time, vol, rate);
        document.getElementById("result").style.display = "block";
        document.getElementById('result').style.boxShadow ="0 10px 6px -6px #777";
     	document.getElementById('result').style.padding ="0 0 20px 20px";
        cal.cal_premium();
    }
}
