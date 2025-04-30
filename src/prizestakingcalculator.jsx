import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";

export default function PrizeStakingCalculator() {
  const [totalStaked, setTotalStaked] = useState(700_000_000);
  const [userStake, setUserStake] = useState(10000);
  const [industryPercent, setIndustryPercent] = useState(10);

  const INDUSTRY_TOTAL = 400_000_000_000;
  const BUSINESS_CUT = 0.03;
  const MAX_REVENUE = INDUSTRY_TOTAL * BUSINESS_CUT;

  const revenueCaptured = (industryPercent / 100) * MAX_REVENUE;
  const userShare = userStake / totalStaked;
  const userRevenue = userShare * revenueCaptured;
  const apr = (userRevenue / userStake) * 100;
  const tokenPriceFor20APR = (revenueCaptured / totalStaked) / 0.20;

  const formatNumber = (num) => num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const formatInputValue = (num) => num.toLocaleString();
  const parseInputValue = (val) => Number(val.replace(/,/g, ""));

  return (
    <div
      className="calculator-wrapper"
      style={{
        margin: '0 auto',
        padding: '1.5rem',
        maxWidth: '1200px',
        fontFamily: 'Chelsea Market',
        color: 'black',
        boxSizing: 'border-box',
      }}
    >
      <div className="yellow-box">
        <div className="heading-box">
          <h1>$PRIZE Staking Calculator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="green-box" style={{ backgroundColor: '#FFF031', border: 'none', boxShadow: 'none' }}>
            <div style={{ color: '#1427B8', fontSize: '1.5rem' }}>
              <div className="space-y-8 pt-2">

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">Total $PRIZE Tokens Currently Staked</label>
                  <div style={{ width: '100%', maxWidth: '500px' }}>
                    <Input
                      type="text"
                      value={formatInputValue(totalStaked)}
                      onChange={(e) => setTotalStaked(parseInputValue(e.target.value))}
                      className="text-black"
                      style={{ fontSize: '1.3rem', padding: '10px', borderRadius: '8px', width: '100%' }}
                    />
                  </div>
                  <p className="text-sm mt-2" style={{ fontSize: '0.9rem' }}>
                    Enter the total number of $PRIZE tokens currently staked on the platform.
                  </p>
                </div>

                <hr className="border-white" />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">Your $PRIZE Stake</label>
                  <div style={{ width: '100%', maxWidth: '500px' }}>
                    <Input
                      type="text"
                      value={formatInputValue(userStake)}
                      onChange={(e) => setUserStake(parseInputValue(e.target.value))}
                      className="text-black"
                      style={{ fontSize: '1.3rem', padding: '10px', borderRadius: '8px', width: '100%' }}
                    />
                  </div>
                  <p className="text-sm mt-2" style={{ fontSize: '0.9rem' }}>
                    Enter how many $PRIZE tokens you are considering to stake.
                  </p>
                </div>

                <hr className="border-white" />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-2">
                    Industry Revenue Capture (% of $400B)
                  </label>
                  <div style={{ width: '100%', maxWidth: '500px' }}>
                    <Slider
                      min={2}
                      max={100}
                      step={1}
                      value={[industryPercent]}
                      onValueChange={(val) => setIndustryPercent(val[0])}
                      className="slider-field"
                    />
                  </div>
                  <div className="mt-2">{industryPercent}%</div>
                  <p className="text-sm mt-1" style={{ fontSize: '0.9rem' }}>
                    Adjust the slider to estimate what portion of the $400 billion annually revenue the arcade, vending, and gaming industry captures.
                  </p>
                </div>

                <hr className="border-white" />

                <div>
                  <p className="text-sm text-white mt-2" style={{ fontSize: '0.8rem' }}>
                    • All the results in the green box are based on the fee of 3 cents per dollar from that industry revenue.
                  </p>
                  <p className="text-sm text-white mt-2" style={{ fontSize: '0.8rem' }}>
                    • The results and figures you have placed in the white fields are all based on your speculations & the potential outcomes from Prize AI Technologies business activities.
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className="green-box" style={{ width: '100%' }}>
            <div className="text-2xl font-bold text-center text-white" style={{ fontSize: '2.5rem' }}>RESULTS</div>
            <hr className="border-white" />

            <div>
              <strong style={{ fontSize: '1.5rem' }}>Staking Revenue (USD):</strong>
              <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${formatNumber(userRevenue)}
              </div>
              <p className="text-sm text-white" style={{ fontSize: '0.9rem' }}>
                This is the estimated revenue in USD that your staked $PRIZE tokens would generate based on the captured market share.
              </p>
            </div>

            <hr className="border-white" />

            <div>
              <strong style={{ fontSize: '1.5rem' }}>APR (Annual Percentage Return):</strong>
              <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {formatNumber(apr)}%
              </div>
              <p className="text-sm text-white" style={{ fontSize: '0.9rem' }}>
                This is your projected return on staked tokens as a percentage, calculated annually.
              </p>
            </div>

            <hr className="border-white" />

            <div>
              <strong style={{ fontSize: '1.5rem' }}>Predicted Token Price @ 20% APR:</strong>
              <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${formatNumber(tokenPriceFor20APR)}
              </div>
              <p className="text-sm text-white" style={{ fontSize: '0.9rem' }}>
                This is the estimated value of a single $PRIZE token assuming every staked token earns 20% APR under the current revenue capture scenario.
              </p>
            </div>

            <button
              onClick={() => window.open('https://www.prizetech.xyz/buy-prize-ico', '_blank')}
              className="button"
              style={{
                padding: '12px 48px',
                width: 'calc(28% * 3)',
                marginTop: 'auto',
                marginBottom: '20px',
              }}
            >
              BUY $PRIZE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}