import React, { useState } from "react";

export default function PrizeStakingCalculator() {
  const [totalStaked, setTotalStaked] = useState(700_000_000);
  const [userStake, setUserStake] = useState(10_000);
  const [industryPercent, setIndustryPercent] = useState(10);

  const INDUSTRY_TOTAL = 400_000_000_000;
  const BUSINESS_CUT = 0.03; // 3 cents per dollar
  const MAX_REVENUE = INDUSTRY_TOTAL * BUSINESS_CUT; // $12B

  const revenueCaptured = (industryPercent / 100) * MAX_REVENUE;
  const userShare = userStake / totalStaked;
  const userRevenue = userShare * revenueCaptured;
  const apr = (userRevenue / userStake) * 100;

  const tokenPriceFor20APR = (revenueCaptured / totalStaked) / 0.20;

  const formatNumber = (num) => num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const formatInputValue = (num) => num.toLocaleString();
  const parseInputValue = (val) => Number(val.replace(/,/g, ""));

  return (
    <div className="mx-auto p-6" style={{ maxWidth: '1200px', fontFamily: 'Chelsea Market', color: 'black' }}>
      <div className="yellow-box">
        <div className="w-full py-4 px-6 mb-8 rounded-t-[20px] text-3xl font-bold text-center tracking-wide" style={{ backgroundColor: '#1C1C1C', color: 'white' }}>
          $PRIZE Staking Calculator
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div style={{ color: '#1427B8', fontSize: '1.5rem' }}>
            <div className="space-y-8 pt-2">
              <div>
                <label className="font-semibold">Total $PRIZE Tokens Currently Staked</label>
                <input
                  className="text-black mt-1"
                  style={{ fontSize: '1.4rem' }}
                  type="text"
                  value={formatInputValue(totalStaked)}
                  onChange={(e) => setTotalStaked(parseInputValue(e.target.value))}
                />
                <p className="text-sm mt-1">Enter the total number of $PRIZE tokens currently staked on the platform.</p>
              </div>
              <div>
                <label className="font-semibold">Your $PRIZE Stake</label>
                <input
                  className="text-black mt-1"
                  style={{ fontSize: '1.4rem' }}
                  type="text"
                  value={formatInputValue(userStake)}
                  onChange={(e) => setUserStake(parseInputValue(e.target.value))}
                />
                <p className="text-sm mt-1">Enter how many $PRIZE tokens you are considering to stake.</p>
              </div>
              <div>
                <label className="font-semibold">Industry Revenue Capture (% of $400B)</label>
                <input
                  className="slider"
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={industryPercent}
                  onChange={(e) => setIndustryPercent(Number(e.target.value))}
                />
                <div className="mt-2">{industryPercent}%</div>
                <p className="text-sm mt-1">Adjust the slider to estimate what portion of the $400 billion annually revenue the arcade, vending, and gaming industry the business captures.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="green-box">
              <div className="text-2xl font-bold text-center text-white">RESULTS</div>
              <hr className="border-white" />
              <div>
                <strong style={{ fontSize: '1.25rem' }}>$1</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>${formatNumber(userRevenue)}</div>
                <p className="text-sm text-white">This is the estimated revenue in USD that your staked $PRIZE tokens would generate based on the captured market share.</p>
              </div>
              <hr className="border-white" />
              <div>
                <strong style={{ fontSize: '1.25rem' }}>$1</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>{formatNumber(apr)}%</div>
                <p className="text-sm text-white">This is your projected return on staked tokens as a percentage, calculated annually.</p>
              </div>
              <hr className="border-white" />
              <div>
                <strong style={{ fontSize: '1.25rem' }}>$1</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>${formatNumber(tokenPriceFor20APR)}</div>
                <p className="text-sm text-white">This is the estimated value of a single $PRIZE token assuming every staked token earns 20% APR under the current revenue capture scenario.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
