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


class BlackSchole{

  constructor(strike, spot, time, vol, rate) {
      this.time_period = time;
      this.strike_price = strike;
      this.volatility = vol;
      this.risk_rate = rate;
      this.spot_price = spot;
  }

  cummulativeNormalDistribution(X)
  {
      var L = 0.0;
      var K = 0.0;
      var dCND = 0.0;
      var a1 = 0.31938153;
      var a2 = -0.356563782;
      var a3 = 1.781477937
      var a4 = -1.821255978;
      var a5 = 1.330274429;
      L = Math.abs(X);
      K = 1.0 / (1.0 + 0.2316419 * L);
      dCND = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) *
          Math.exp(-L * L / 2.0) * (a1 * K + a2 * K * K + a3 * Math.pow(K, 3.0) +
          a4 * Math.pow(K, 4.0) + a5 * Math.pow(K, 5.0));

      if (X < 0)
      {
          return (1.0 - dCND);
      }
      else
      {
          return (dCND);
      }
  }

  cal_premium() {
      var term1, term2, d1, d2, norm1, norm2, call_premium, put_premium;
      term1 = Math.log(this.spot_price / this.strike_price) + ((this.risk_rate + (Math.pow(this.volatility, 2.0) / 2)) * this.time_period);
      term2 = 1 / (this.volatility * Math.sqrt(this.time_period));
      d1 = term1 * term2;
      d2 = d1 - (this.volatility * Math.sqrt(this.time_period));
      norm1 = this.cummulativeNormalDistribution(d1);
      norm2 = this.cummulativeNormalDistribution(d2);
      call_premium = (norm1 * this.spot_price) - (norm2 * this.strike_price * Math.exp((-1) * this.risk_rate * this.time_period));
      norm1 = this.cummulativeNormalDistribution(-d1);
      norm2 = this.cummulativeNormalDistribution(-d2);
      put_premium = (norm2 * this.strike_price * Math.exp((-1) * this.risk_rate * this.time_period)) - (norm1 * this.spot_price);
      call_black_premium = call_premium;
      put_black_premium = put_premium;
      document.getElementById("callprice").innerHTML = call_premium;
      document.getElementById("putprice").innerHTML = put_premium;
  }
}

function calculate_black() {
    var strike, spot, time, vol, rate;
    
    strike = document.getElementById("strike").value;
    spot = document.getElementById("spot").value;
    time = document.getElementById("time").value / 360.0;
    vol = document.getElementById("vol").value / 100.0;
    rate = document.getElementById("rate").value / 100.0;
    
    if (strike == "" && spot == "" && time == "" && vol == "" && rate == "" ) {
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
    else {
        // const cal = new BlackSchole(50,50,0.5,0.3,0.05);
        const cal = new BlackSchole(strike, spot, time, vol, rate);
        
        document.getElementById("result").style.display = "block";
     	document.getElementById('result').style.boxShadow ="0 10px 6px -6px #777";
     	document.getElementById('result').style.padding ="0 0 20px 20px";
        cal.cal_premium();
    }
}

function resetAllValues() {
    document.getElementById('strike').value = '';
    document.getElementById('spot').value = '';
    document.getElementById('time').value = '';
    document.getElementById('vol').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('simulation').value = '';
    call_black_premium = -1;
    put_black_premium = -1;
    call_payoff_array = [];
    put_payoff_array = [];
    document.getElementById('chartdiv').innerHTML = '';
    document.getElementById('chart').innerHTML = '';
    document.getElementById('result').style.display = 'none';
}


function showSummary(){
	document.getElementById('3').style.backgroundColor = "white";
     	document.getElementById('3').style.boxShadow ="0 10px 6px -6px #777";
     	document.getElementById('3').style.padding ="0 0 20px 20px";
     	document.getElementById('summaryText').innerHTML ="<br><h2 align='center'>Broad Overview About Option pricing</h2><br><ul><li>Option pricing refers to the amount per share at which an option is traded. Options are derivative contracts that give the holder (the 'buyer') the right, but not the obligation, to buy or sell the underlying instrument at an agreed-upon price on or before a specified future date. Although the holder of the option is not obligated to exercise the option, the option writer (the 'seller') has an obligation to buy or sell the underlying instrument if the option is exercised.</li><li>Option traders use various options pricing models to calculate theoretical option values. These mathematical models use certain fixed knowns in the present – items such as underlying price, strike price and days until expiration – along with forecasts (or assumptions) for factors such as implied volatility, to compute the theoretical value of specific options at certain points in time. Variables fluctuate over the life of the option, and the option's theoretical value adapts to reflect these changes.</li><li>The Black-Scholes formula (also called  Black-Scholes-Merton) was the first widely used model for option pricing. It's used to calculate the theoretical value of European-style options using current stock prices, expected dividends, the option's strike price, expected interest rates, time to expiration and expected volatility.</li><li>Six primary factors influence options pricing: the underlying price, strike price, time until expiration, volatility, interest rates and dividends.</li><li>The price, or cost, of an option is an amount of money known as the premium. The buyer pays the premium to the seller in exchange for the right granted by the option. For example, a buyer might pay a seller for the right to purchase 100 shares of stock XYZ at a strike price of $60 on or before May 19. If the position becomes profitable, the buyer will decide to exercise the option; if it does not become profitable, the buyer will let the option expire worthless. The buyer pays the premium so that he or she has the 'option' (or the choice) to either exercise or allow the option to expire worthless.</li><li>Monte-Carlo simulation is another option pricing model we will consider. The Monte-Carlo simulation is a more sophisticated method to value options. In this method, we simulate the possible future stock prices and then use them to find the discounted expected option payoffs.</li></ul><img src='Option-Pricing-Models.png' alt='Factors Influencing Option Value'  width='50%' height='50%' >"
}


$(function() {
    $('#graph').on('click', function() {
    	if(call_black_premium != -1 && put_black_premium != -1 && call_payoff_array.length > 0 && put_payoff_array.length > 0){
		selective_chart(put_black_premium,call_black_premium,call_payoff_array,put_payoff_array);
    	}
        });
  });

$(function() {
    $('#summary').on('click', function() {
    		showSummary();
        });
  });
