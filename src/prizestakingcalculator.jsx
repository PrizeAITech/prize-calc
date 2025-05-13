import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function PrizeStakingCalculator() {
  const [totalStaked, setTotalStaked]         = useState(700_000_000);
  const [userStake, setUserStake]             = useState(10000);
  const [industryPercent, setIndustryPercent] = useState(10);
  const [tokenPrice, setTokenPrice]           = useState(0.01);

  const INDUSTRY_TOTAL = 400_000_000_000;
  const BUSINESS_CUT   = 0.03;
  const MAX_REVENUE    = INDUSTRY_TOTAL * BUSINESS_CUT;

  // Calculate revenue captured based on slider percentage
  const revenueCaptured      = (industryPercent / 100) * MAX_REVENUE;
  // User's share of total staked tokens
  const userShare            = userStake / totalStaked;
  // User's annual USD revenue
  const userRevenue          = userShare * revenueCaptured;
  // USD value of user's stake
  const initialInvestmentUSD = userStake * tokenPrice;

  // Calculate APR percentage (annual return as percent of investment)
  const aprPercent = initialInvestmentUSD > 0
    ? (userRevenue / initialInvestmentUSD) * 100
    : 0;

  // Price required for 20% APR (simple inverse calculation)
  const tokenPriceFor20APR = (revenueCaptured / totalStaked) / 0.20;

  // Formatting functions
  const formatNumber = (num, decimals = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).replace(/,/g, ' ');
  };
  const formatInputValue = (num) => num.toLocaleString();
  const parseInputValue  = (val) => Number(val.replace(/,/g, ""));

  return (
    <div className="calculator-wrapper" style={{ margin: '0 auto', padding: '1.5rem', maxWidth: '1200px', fontFamily: 'Chelsea Market', color: 'black', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'transparent', border: '2px solid white', borderRadius: '8px' }}>
        <div className="heading-box"><h1>$PRIZE Staking Calculator</h1></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Input Panel */}
          <div className="green-box" style={{ backgroundColor:'#FFF031', border:'none', boxShadow:'none' }}>
            <div style={{ color:'#1427B8', fontSize:'1.5rem' }}>
              <div className="space-y-8 pt-2">

                {/* Total Staked */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">Total $PRIZE Tokens Currently Staked</label>
                  <div style={{ width:'100%', maxWidth:'500px' }}>
                    <Input
                      type="text"
                      value={formatInputValue(totalStaked)}
                      onChange={e => setTotalStaked(parseInputValue(e.target.value))}
                      className="text-black"
                      style={{ fontSize:'1.3rem', padding:'10px', borderRadius:'8px', width:'100%' }}
                    />
                  </div>
                </div>
                <hr className="border-white" />

                {/* Your Stake */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">Your $PRIZE Stake</label>
                  <div style={{ width:'100%', maxWidth:'500px' }}>
                    <Input
                      type="text"
                      value={formatInputValue(userStake)}
                      onChange={e => setUserStake(parseInputValue(e.target.value))}
                      className="text-black"
                      style={{ fontSize:'1.3rem', padding:'10px', borderRadius:'8px', width:'100%' }}
                    />
                  </div>
                </div>
                <hr className="border-white" />

                {/* Token Price */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">$PRIZE Token Price (USD)</label>
                  <div style={{ width:'100%', maxWidth:'500px' }}>
                    <Input
                      type="number"
                      value={tokenPrice}
                      onChange={e => setTokenPrice(parseFloat(e.target.value) || 0)}
                      className="text-black"
                      style={{ fontSize:'1.3rem', padding:'10px', borderRadius:'8px', width:'100%' }}
                    />
                  </div>
                </div>
                <hr className="border-white" />

                {/* Industry Revenue Capture */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-2">Industry Revenue Capture (% of $400B)</label>
                  <div style={{ width:'100%', maxWidth:'500px' }}>
                    <Slider
                      min={2} max={100} step={1}
                      value={[industryPercent]}
                      onValueChange={val => setIndustryPercent(val[0])}
                      className="slider-field"
                    />
                  </div>
                  <div className="mt-2">{industryPercent}%</div>
                </div>

              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="green-box" style={{ width:'100%' }}>
            <div className="text-2xl font-bold text-center text-white" style={{ fontSize:'2.5rem' }}>RESULTS</div>
            <hr className="border-white" />

            {/* Share of Pool */}
            <div>
              <strong style={{ fontSize:'1.5rem' }}>Your Share of Pool (%):</strong>
              <div style={{ color:'#1427B8', fontSize:'1.5rem', fontWeight:'bold' }}>
                {formatNumber(userShare * 100, 5)}%
              </div>
            </div>
            <hr className="border-white" />

            {/* Annual Income */}
            <div>
              <strong style={{ fontSize:'1.5rem' }}>Your Annual Income (USD):</strong>
              <div style={{ color:'#1427B8', fontSize:'1.5rem', fontWeight:'bold' }}>
                ${formatNumber(userRevenue, 2)}
              </div>
            </div>
            <hr className="border-white" />

            {/* APR */}
            <div>
              <strong style={{ fontSize:'1.5rem' }}>APR (%):</strong>
              <div style={{ color:'#1427B8', fontSize:'1.5rem', fontWeight:'bold' }}>
                {formatNumber(aprPercent, 2)}%
              </div>
            </div>
            <hr className="border-white" />

            {/* Price for 20% APR */}
            <div>
              <strong style={{ fontSize:'1.5rem' }}>Price for 20% APR (USD):</strong>
              <div style={{ color:'#1427B8', fontSize:'1.5rem', fontWeight:'bold' }}>
                ${formatNumber(tokenPriceFor20APR)}
              </div>
            </div>

            <button onClick={() => window.open('https://www.prizetech.xyz/buy-prize-ico','_blank')} className="button" style={{ padding:'12px 48px', marginTop:'auto', marginBottom:'20px' }}>
              BUY $PRIZE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

